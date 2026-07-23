import { useEffect, useRef, useState } from 'react'

const services = [
  {
    id: 'automation',
    eyebrow: 'AI / Automation',
    title: 'Автоматизация бизнеса',
    text: 'Telegram-боты, AI-ассистенты, обработка заявок, отчёты и процессы без ручной рутины.',
    tags: ['AI', 'Telegram', 'Workflow'],
    icon: 'automation',
    className: 'service-large service-violet',
  },
  {
    id: 'web',
    eyebrow: 'Web systems',
    title: 'Сайты и платформы',
    text: 'От продающего сайта до CRM, личного кабинета и сложной веб-системы.',
    tags: ['Web', 'CRM', 'E-commerce'],
    icon: 'web',
    className: 'service-cyan',
  },
  {
    id: 'mobile',
    eyebrow: 'Mobile products',
    title: 'Мобильные приложения',
    text: 'Проектирование, разработка и публикация приложений для iOS и Android.',
    tags: ['iOS', 'Android', 'Flutter'],
    icon: 'mobile',
    className: 'service-lime',
  },
  {
    id: 'integration',
    eyebrow: 'Connected systems',
    title: 'Интеграции и API',
    text: 'Объединяем сервисы, платежи, телефонию, аналитику и внутренние инструменты.',
    tags: ['API', 'Payments', 'Analytics'],
    icon: 'integration',
    className: 'service-blue',
  },
  {
    id: 'games',
    eyebrow: 'Games / XR',
    title: 'Игры, VR и AR',
    text: 'Создаём интерактивные продукты, игровые механики и иммерсивные решения.',
    tags: ['Unity', 'VR / AR', 'Games'],
    icon: 'games',
    className: 'service-orange',
  },
  {
    id: 'infra',
    eyebrow: 'Cloud / DevOps',
    title: 'Инфраструктура',
    text: 'Серверы, Docker, CI/CD, мониторинг, резервные копии и техническая безопасность.',
    tags: ['Cloud', 'DevOps', 'Security'],
    icon: 'infra',
    className: 'service-slate',
  },
]

const routes = [
  {
    number: '01',
    title: 'Нужно запустить продукт',
    text: 'Сайт, приложение, сервис или игра — от идеи и прототипа до публикации.',
    service: 'Разработка нового цифрового продукта',
  },
  {
    number: '02',
    title: 'Нужно автоматизировать работу',
    text: 'Убираем повторяющиеся действия, связываем системы и ускоряем команду.',
    service: 'Автоматизация бизнес-процессов',
  },
  {
    number: '03',
    title: 'Нужно улучшить готовую систему',
    text: 'Разбираемся в текущем продукте, исправляем слабые места и масштабируем.',
    service: 'Аудит и развитие готовой системы',
  },
]

const process = [
  ['01', 'Диагностика', 'Разбираем задачу и определяем, какое решение даст реальный эффект.'],
  ['02', 'Архитектура', 'Фиксируем структуру, пользовательские сценарии, этапы и риски.'],
  ['03', 'Разработка', 'Работаем короткими итерациями и показываем результат по ходу проекта.'],
  ['04', 'Запуск', 'Тестируем, разворачиваем, подключаем аналитику и остаёмся на поддержке.'],
]

function UIIcon({ name, size = 20 }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }

  const icons = {
    arrow: <><path d="M5 12h13"/><path d="m13 6 6 6-6 6"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    close: <><path d="m6 6 12 12M18 6 6 18"/></>,
    send: <><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></>,
    telegram: <path d="M21.4 4.6 18.5 19c-.2 1-.8 1.2-1.6.7l-4.4-3.2-2.1 2c-.2.2-.4.4-.9.4l.3-4.5 8.2-7.4c.4-.3-.1-.5-.5-.2L7.4 13.2 3 11.8c-1-.3-1-1 .2-1.5L20.4 3.7c.8-.3 1.5.2 1 1Z"/>,
    mouse: <><rect x="7" y="2" width="10" height="20" rx="5"/><path d="M12 6v3"/></>,
  }

  return <svg {...common}>{icons[name]}</svg>
}

function ServiceGlyph({ type }) {
  const common = { viewBox: '0 0 96 96', fill: 'none', 'aria-hidden': true }

  if (type === 'automation') {
    return (
      <svg {...common}>
        <defs><linearGradient id="auto-a" x1="18" y1="16" x2="78" y2="82" gradientUnits="userSpaceOnUse"><stop stopColor="currentColor" stopOpacity=".95"/><stop offset="1" stopColor="currentColor" stopOpacity=".18"/></linearGradient></defs>
        <rect x="14" y="18" width="27" height="21" rx="7" stroke="currentColor" strokeWidth="2"/>
        <rect x="55" y="57" width="27" height="21" rx="7" stroke="currentColor" strokeWidth="2"/>
        <circle cx="68.5" cy="28.5" r="11.5" stroke="currentColor" strokeWidth="2"/>
        <path d="M41 28.5h16M68.5 40v17M28 39v22c0 4.4 3.6 8 8 8h19" stroke="url(#auto-a)" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="m62.5 28.5 4 4 8-9" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="28" cy="28.5" r="3.5" fill="currentColor"/>
        <circle cx="68.5" cy="67.5" r="3.5" fill="currentColor"/>
      </svg>
    )
  }

  if (type === 'web') {
    return (
      <svg {...common}>
        <rect x="13" y="17" width="70" height="58" rx="10" stroke="currentColor" strokeWidth="2"/>
        <path d="M13 31h70" stroke="currentColor" strokeOpacity=".45" strokeWidth="2"/>
        <circle cx="23" cy="24" r="2" fill="currentColor"/><circle cx="30" cy="24" r="2" fill="currentColor" fillOpacity=".55"/><circle cx="37" cy="24" r="2" fill="currentColor" fillOpacity=".3"/>
        <rect x="22" y="40" width="24" height="25" rx="6" fill="currentColor" fillOpacity=".12" stroke="currentColor" strokeOpacity=".65"/>
        <path d="M54 43h18M54 51h15M54 59h11" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"/>
      </svg>
    )
  }

  if (type === 'mobile') {
    return (
      <svg {...common}>
        <rect x="28" y="10" width="40" height="76" rx="13" stroke="currentColor" strokeWidth="2.2"/>
        <rect x="34" y="18" width="28" height="49" rx="8" fill="currentColor" fillOpacity=".1" stroke="currentColor" strokeOpacity=".6"/>
        <path d="M39 30h18M39 38h13" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"/>
        <rect x="39" y="48" width="18" height="11" rx="4" fill="currentColor" fillOpacity=".25"/>
        <path d="M44 76h8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"/>
        <circle cx="68" cy="29" r="8" fill="currentColor"/><path d="m65 29 2 2 4-5" stroke="#071016" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }

  if (type === 'integration') {
    return (
      <svg {...common}>
        <circle cx="48" cy="48" r="12" fill="currentColor" fillOpacity=".16" stroke="currentColor" strokeWidth="2"/>
        <rect x="12" y="18" width="22" height="18" rx="6" stroke="currentColor" strokeWidth="2"/><rect x="62" y="18" width="22" height="18" rx="6" stroke="currentColor" strokeWidth="2"/>
        <rect x="12" y="60" width="22" height="18" rx="6" stroke="currentColor" strokeWidth="2"/><rect x="62" y="60" width="22" height="18" rx="6" stroke="currentColor" strokeWidth="2"/>
        <path d="m34 31 7 10m21-10-7 10M34 65l7-10m21 10-7-10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/><path d="M43 48h10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
      </svg>
    )
  }

  if (type === 'games') {
    return (
      <svg {...common}>
        <path d="M31 30h34c8 0 14.6 5.7 16 13.4l4 22c1.3 7.3-7.5 11.9-12.7 6.6L62 61H34L23.7 72c-5.2 5.3-14 0.7-12.7-6.6l4-22C16.4 35.7 23 30 31 30Z" stroke="currentColor" strokeWidth="2.2"/>
        <path d="M30 42v13M23.5 48.5h13M64 44h.1M72 52h.1" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"/><path d="M38 30V20h20v10" stroke="currentColor" strokeOpacity=".55" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
  }

  return (
    <svg {...common}>
      <path d="M25 68h46c9 0 15-6.4 15-14.4 0-7.6-5.5-13.7-13-14.4C70.8 28.8 61.7 21 50.8 21 38.5 21 28.5 30.8 28 43.1 18.1 43.2 10 50.7 10 60c0 4.4 1.8 8.4 4.7 11.2" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
      <rect x="28" y="52" width="40" height="28" rx="8" fill="currentColor" fillOpacity=".11" stroke="currentColor" strokeWidth="2"/>
      <path d="M36 61h24M36 69h15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/><circle cx="61" cy="69" r="3" fill="currentColor"/>
    </svg>
  )
}

function Logo() {
  return <a className="logo" href="#top" aria-label="IT Tech — главная"><span className="logo-symbol"><i/><i/><i/></span><span className="logo-text">IT TECH</span></a>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [formState, setFormState] = useState({ name: '', contact: '', task: '', service: '', website: '' })
  const [submitState, setSubmitState] = useState({ status: 'idle', message: '' })
  const heroRef = useRef(null)

  useEffect(() => {
    const nodes = document.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    }), { threshold: 0.1, rootMargin: '0px 0px -30px' })
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return undefined
    const onMove = (event) => {
      const rect = hero.getBoundingClientRect()
      hero.style.setProperty('--pointer-x', `${((event.clientX - rect.left) / rect.width) * 100}%`)
      hero.style.setProperty('--pointer-y', `${((event.clientY - rect.top) / rect.height) * 100}%`)
    }
    hero.addEventListener('pointermove', onMove)
    return () => hero.removeEventListener('pointermove', onMove)
  }, [])

  const chooseService = (service) => {
    setFormState((current) => ({ ...current, service, task: current.task || `Хочу обсудить: ${service}.` }))
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (submitState.status === 'loading') return
    setSubmitState({ status: 'loading', message: 'Отправляем заявку в Telegram…' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(result.message || 'Не удалось отправить заявку. Попробуйте ещё раз.')
      setSubmitState({ status: 'success', message: 'Готово. Заявка отправлена в Telegram — мы свяжемся с вами.' })
      setFormState({ name: '', contact: '', task: '', service: '', website: '' })
    } catch (error) {
      setSubmitState({ status: 'error', message: error.message })
    }
  }

  return (
    <div className="site-shell" id="top">
      <header className="header">
        <div className="container header-inner">
          <Logo/>
          <nav className={`nav ${menuOpen ? 'is-open' : ''}`} aria-label="Навигация по сайту">
            <a href="#services" onClick={() => setMenuOpen(false)}>Услуги</a><a href="#routes" onClick={() => setMenuOpen(false)}>С чего начать</a><a href="#process" onClick={() => setMenuOpen(false)}>Процесс</a><a href="#contact" onClick={() => setMenuOpen(false)}>Контакты</a>
          </nav>
          <a className="header-cta" href="#contact">Обсудить проект <UIIcon name="arrow" size={17}/></a>
          <button className="menu-button" type="button" onClick={() => setMenuOpen((value) => !value)} aria-label="Открыть меню" aria-expanded={menuOpen}><UIIcon name={menuOpen ? 'close' : 'menu'}/></button>
        </div>
      </header>

      <main>
        <section className="hero" ref={heroRef}>
          <div className="hero-mesh" aria-hidden="true"/><div className="hero-scan" aria-hidden="true"/>
          <div className="container hero-layout">
            <div className="hero-copy" data-reveal>
              <div className="eyebrow"><span className="live-dot"/> Цифровая разработка полного цикла</div>
              <h1>Создаём системы,<br/><span>которыми удобно пользоваться.</span></h1>
              <p>Сайты, приложения, автоматизация, Telegram-боты, игры и инфраструктура — одна команда отвечает за весь результат.</p>
              <div className="hero-actions"><a className="button button-primary" href="#contact">Обсудить задачу <UIIcon name="arrow" size={18}/></a><a className="button button-secondary" href="#services">Посмотреть направления</a></div>
              <div className="hero-trust"><span><UIIcon name="check" size={15}/> Понятный план</span><span><UIIcon name="check" size={15}/> Регулярный прогресс</span><span><UIIcon name="check" size={15}/> Поддержка после запуска</span></div>
            </div>

            <div className="system-stage" data-reveal aria-label="Визуализация цифровой системы">
              <div className="stage-grid"/>
              <div className="system-core"><div className="core-rings"><i/><i/><i/></div><span className="core-label">IT TECH</span><strong>Digital<br/>system</strong><small>DESIGN · BUILD · CONNECT</small></div>
              <div className="system-node node-web"><span className="node-icon"><ServiceGlyph type="web"/></span><div><small>WEB</small><strong>Platform</strong></div></div>
              <div className="system-node node-mobile"><span className="node-icon"><ServiceGlyph type="mobile"/></span><div><small>MOBILE</small><strong>Application</strong></div></div>
              <div className="system-node node-ai"><span className="node-icon"><ServiceGlyph type="automation"/></span><div><small>AUTOMATION</small><strong>AI workflow</strong></div></div>
              <div className="system-node node-cloud"><span className="node-icon"><ServiceGlyph type="infra"/></span><div><small>CLOUD</small><strong>Infrastructure</strong></div></div>
              <svg className="system-links" viewBox="0 0 600 600" aria-hidden="true"><path d="M300 300C205 260 185 200 146 145"/><path d="M300 300C404 253 430 202 475 156"/><path d="M300 300C206 350 184 411 143 457"/><path d="M300 300C402 350 427 413 474 456"/><circle cx="300" cy="300" r="5"/><circle className="link-pulse pulse-a" cx="146" cy="145" r="5"/><circle className="link-pulse pulse-b" cx="475" cy="156" r="5"/><circle className="link-pulse pulse-c" cx="143" cy="457" r="5"/><circle className="link-pulse pulse-d" cx="474" cy="456" r="5"/></svg>
              <div className="status-panel"><div><span className="live-dot"/><small>System online</small></div><div className="status-bars"><i/><i/><i/><i/><i/></div></div>
            </div>
          </div>
          <a className="scroll-hint" href="#services"><UIIcon name="mouse" size={18}/> Листайте вниз</a>
        </section>

        <div className="section-transition transition-dark-light" aria-hidden="true"/>

        <section className="section services" id="services">
          <div className="container">
            <div className="section-heading" data-reveal><div><span className="section-kicker">Направления</span><h2>Не набор услуг.<br/>Единая инженерная команда.</h2></div><p>Выберите направление или просто опишите задачу. Мы сами соберём нужную комбинацию технологий и специалистов.</p></div>
            <div className="service-bento">
              {services.map((service, index) => (
                <article className={`service-card ${service.className}`} key={service.id} data-reveal style={{ '--delay': `${index * 55}ms` }}>
                  <div className="service-visual"><span className="service-glyph"><ServiceGlyph type={service.icon}/></span><span className="service-code">0{index + 1}</span></div>
                  <div className="service-content"><span className="service-eyebrow">{service.eyebrow}</span><h3>{service.title}</h3><p>{service.text}</p><div className="service-tags">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><button type="button" onClick={() => chooseService(service.title)}>Обсудить направление <UIIcon name="arrow" size={17}/></button></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="routes" id="routes">
          <div className="container routes-inner">
            <div className="routes-heading" data-reveal><span className="section-kicker">С чего начать</span><h2>Не знаете, какая услуга нужна?</h2><p>Выберите ситуацию, которая ближе к вашей. Мы уточним детали и предложим понятный следующий шаг.</p></div>
            <div className="route-list">
              {routes.map((route, index) => <button type="button" className="route-card" onClick={() => chooseService(route.service)} key={route.number} data-reveal style={{ '--delay': `${index * 70}ms` }}><span>{route.number}</span><div><h3>{route.title}</h3><p>{route.text}</p></div><i><UIIcon name="arrow" size={20}/></i></button>)}
            </div>
          </div>
        </section>

        <div className="section-transition transition-light-dark" aria-hidden="true"/>

        <section className="process" id="process">
          <div className="process-mesh" aria-hidden="true"/>
          <div className="container">
            <div className="section-heading section-heading-dark" data-reveal><div><span className="section-kicker">Как проходит работа</span><h2>В каждом этапе<br/>понятно, что происходит.</h2></div><p>Мы убираем технический хаос: фиксируем решения, показываем прогресс и заранее объясняем следующий шаг.</p></div>
            <div className="process-grid">{process.map(([number, title, text], index) => <article key={number} data-reveal style={{ '--delay': `${index * 70}ms` }}><div className="process-top"><span>{number}</span><i>{index + 1}</i></div><h3>{title}</h3><p>{text}</p></article>)}</div>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="container contact-layout">
            <div className="contact-copy" data-reveal>
              <div className="telegram-badge"><UIIcon name="telegram" size={19}/> Заявка сразу поступит в Telegram</div>
              <h2>Расскажите,<br/>что нужно создать.</h2><p>Не обязательно писать техническое задание. Достаточно описать проблему, идею или желаемый результат своими словами.</p>
              <div className="contact-steps"><div><span>1</span><p>Вы отправляете заявку</p></div><div><span>2</span><p>Telegram-бот уведомляет команду</p></div><div><span>3</span><p>Мы связываемся и уточняем детали</p></div></div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit} data-reveal>
              <div className="form-head"><div><span className="live-dot"/><strong>Новая заявка</strong></div><small>Ответим после получения</small></div>
              <label><span>Ваше имя</span><input type="text" value={formState.name} onChange={(event) => setFormState({ ...formState, name: event.target.value })} placeholder="Например, Нурсултан" maxLength="120"/></label>
              <label><span>Телефон, email или Telegram *</span><input type="text" value={formState.contact} onChange={(event) => setFormState({ ...formState, contact: event.target.value })} placeholder="Как с вами связаться?" minLength="3" maxLength="160" required/></label>
              <label><span>Что нужно сделать? *</span><textarea value={formState.task} onChange={(event) => setFormState({ ...formState, task: event.target.value })} placeholder="Опишите задачу, проблему или идею" minLength="10" maxLength="3000" required/></label>
              <input className="form-honeypot" type="text" name="website" value={formState.website} onChange={(event) => setFormState({ ...formState, website: event.target.value })} tabIndex="-1" autoComplete="off" aria-hidden="true"/>
              <button className="button button-primary form-submit" type="submit" disabled={submitState.status === 'loading'}>{submitState.status === 'loading' ? 'Отправляем…' : 'Отправить в Telegram'}<UIIcon name="send" size={18}/></button>
              {submitState.message && <p className={`form-status is-${submitState.status}`} role="status">{submitState.message}</p>}
              <small className="form-note">Данные используются только для связи по вашей заявке.</small>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer"><div className="container footer-main"><Logo/><p>Сайты, приложения, автоматизация, интеграции, игры и инфраструктура.</p><a href="#top">Наверх ↑</a></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} IT Tech</span><span>Digital systems, built clearly.</span></div></footer>
    </div>
  )
}

export default App
