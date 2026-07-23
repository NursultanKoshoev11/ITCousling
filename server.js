import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { existsSync, readFileSync } from 'node:fs'
import { extname, join, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = fileURLToPath(new URL('.', import.meta.url))
const distDir = join(rootDir, 'dist')
const rateWindowMs = 10 * 60 * 1000
const rateLimitMax = 5
const rateBuckets = new Map()

loadEnv(join(rootDir, '.env'))
const port = Number(process.env.PORT || 3000)

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
}

function loadEnv(path) {
  if (!existsSync(path)) return
  const content = readFileSync(path, 'utf8')

  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    const separator = trimmed.indexOf('=')
    if (separator < 1) continue

    const key = trimmed.slice(0, separator).trim()
    let value = trimmed.slice(separator + 1).trim()

    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }

    if (!(key in process.env)) process.env[key] = value
  }
}

function securityHeaders() {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  }
}

function jsonResponse(response, status, payload) {
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    ...securityHeaders(),
  })
  response.end(JSON.stringify(payload))
}

function getClientIp(request) {
  const forwarded = request.headers['x-forwarded-for']
  if (typeof forwarded === 'string' && forwarded) return forwarded.split(',')[0].trim()
  return request.socket.remoteAddress || 'unknown'
}

function isRateLimited(ip) {
  const now = Date.now()
  const current = rateBuckets.get(ip)

  if (!current || now - current.startedAt > rateWindowMs) {
    rateBuckets.set(ip, { startedAt: now, count: 1 })
    return false
  }

  current.count += 1
  return current.count > rateLimitMax
}

function cleanText(value, maxLength) {
  if (typeof value !== 'string') return ''
  return value.replace(/[\u0000-\u001F\u007F]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, maxLength)
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

async function readJsonBody(request) {
  const chunks = []
  let size = 0

  for await (const chunk of request) {
    size += chunk.length
    if (size > 32 * 1024) throw new Error('PAYLOAD_TOO_LARGE')
    chunks.push(chunk)
  }

  return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')
}

async function sendTelegramLead(lead, request) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  const threadId = process.env.TELEGRAM_THREAD_ID

  if (!token || !chatId) throw new Error('TELEGRAM_NOT_CONFIGURED')

  const timestamp = new Intl.DateTimeFormat('ru-RU', {
    timeZone: 'Asia/Bishkek',
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date())

  const message = [
    '🟢 <b>Новая заявка с сайта IT Tech</b>',
    '',
    `<b>Имя:</b> ${escapeHtml(lead.name || 'Не указано')}`,
    `<b>Контакт:</b> ${escapeHtml(lead.contact)}`,
    lead.service ? `<b>Направление:</b> ${escapeHtml(lead.service)}` : null,
    `<b>Задача:</b>\n${escapeHtml(lead.task)}`,
    '',
    `<b>Время:</b> ${escapeHtml(timestamp)} (Бишкек)`,
    `<b>IP:</b> ${escapeHtml(getClientIp(request))}`,
  ].filter(Boolean).join('\n')

  const payload = {
    chat_id: chatId,
    text: message,
    parse_mode: 'HTML',
    disable_web_page_preview: true,
  }

  if (threadId) payload.message_thread_id = Number(threadId)

  const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(10000),
  })

  const result = await telegramResponse.json().catch(() => ({}))
  if (!telegramResponse.ok || result.ok !== true) {
    console.error('Telegram delivery failed:', telegramResponse.status, result.description || 'Unknown Telegram error')
    throw new Error('TELEGRAM_DELIVERY_FAILED')
  }
}

async function handleContact(request, response) {
  const ip = getClientIp(request)

  if (isRateLimited(ip)) {
    jsonResponse(response, 429, { message: 'Слишком много заявок. Повторите попытку через несколько минут.' })
    return
  }

  try {
    const body = await readJsonBody(request)

    if (cleanText(body.website, 200)) {
      jsonResponse(response, 200, { ok: true })
      return
    }

    const lead = {
      name: cleanText(body.name, 120),
      contact: cleanText(body.contact, 160),
      task: cleanText(body.task, 3000),
      service: cleanText(body.service, 160),
    }

    if (lead.contact.length < 3 || lead.task.length < 10) {
      jsonResponse(response, 400, { message: 'Укажите контакт и подробнее опишите задачу.' })
      return
    }

    await sendTelegramLead(lead, request)
    jsonResponse(response, 200, { ok: true })
  } catch (error) {
    if (error.message === 'PAYLOAD_TOO_LARGE') {
      jsonResponse(response, 413, { message: 'Заявка слишком большая.' })
      return
    }

    if (error instanceof SyntaxError) {
      jsonResponse(response, 400, { message: 'Некорректный формат заявки.' })
      return
    }

    if (error.message === 'TELEGRAM_NOT_CONFIGURED') {
      console.error('Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in .env')
      jsonResponse(response, 503, { message: 'Отправка временно не настроена. Попробуйте позже.' })
      return
    }

    console.error('Contact request failed:', error.message)
    jsonResponse(response, 502, { message: 'Не удалось отправить заявку в Telegram. Попробуйте ещё раз.' })
  }
}

async function serveStatic(request, response) {
  const urlPath = decodeURIComponent(new URL(request.url, `http://${request.headers.host || 'localhost'}`).pathname)
  const requestedPath = urlPath === '/' ? 'index.html' : urlPath.replace(/^\/+/, '')
  const safePath = normalize(requestedPath).replace(/^(\.\.(\/|\\|$))+/, '')
  let filePath = join(distDir, safePath)

  try {
    const info = await stat(filePath)
    if (info.isDirectory()) filePath = join(filePath, 'index.html')
  } catch {
    filePath = join(distDir, 'index.html')
  }

  try {
    const content = await readFile(filePath)
    const extension = extname(filePath).toLowerCase()
    response.writeHead(200, {
      'Content-Type': mimeTypes[extension] || 'application/octet-stream',
      'Cache-Control': extension === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable',
      ...securityHeaders(),
    })
    response.end(content)
  } catch {
    jsonResponse(response, 404, { message: 'Страница не найдена.' })
  }
}

const server = createServer(async (request, response) => {
  if (request.method === 'GET' && request.url === '/api/health') {
    jsonResponse(response, 200, {
      ok: true,
      telegramConfigured: Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID),
    })
    return
  }

  if (request.method === 'POST' && request.url === '/api/contact') {
    await handleContact(request, response)
    return
  }

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    jsonResponse(response, 405, { message: 'Метод не поддерживается.' })
    return
  }

  await serveStatic(request, response)
})

server.listen(port, '0.0.0.0', () => {
  console.log(`IT Tech website is running on http://0.0.0.0:${port}`)
  console.log(`Telegram notifications: ${process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID ? 'configured' : 'not configured'}`)
})
