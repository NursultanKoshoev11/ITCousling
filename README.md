# IT Tech

Сайт IT-компании с формой заявки, которая отправляет новых клиентов напрямую в Telegram.

## Локальный запуск интерфейса

```bash
npm install
npm run dev
```

Во втором терминале запустите API:

```bash
cp .env.example .env
npm run dev:api
```

Vite проксирует `/api` на `http://localhost:3001`. Для локального запуска API задайте `PORT=3001` в `.env`.

## Настройка Telegram

1. Создайте бота через `@BotFather` и получите токен.
2. Добавьте бота в нужный чат или группу.
3. Узнайте `TELEGRAM_CHAT_ID` чата.
4. Скопируйте `.env.example` в `.env` и заполните:

```env
TELEGRAM_BOT_TOKEN=...
TELEGRAM_CHAT_ID=...
TELEGRAM_THREAD_ID=
PORT=3000
```

`TELEGRAM_THREAD_ID` нужен только при отправке в конкретную тему Telegram-группы.

## Production

```bash
npm install
npm run build
npm start
```

Сервер раздаёт `dist` и принимает заявки на `POST /api/contact`.

## Docker

```bash
cp .env.example .env
# Заполните реальные Telegram-параметры
docker compose up -d --build
```

Сайт будет доступен на порту `3000`.

## Безопасность формы

- Telegram-токен хранится только на сервере в `.env`.
- Есть серверная валидация данных.
- Ограничение: 5 заявок с одного IP за 10 минут.
- Добавлено скрытое honeypot-поле против простых ботов.
- Размер запроса ограничен 32 КБ.
