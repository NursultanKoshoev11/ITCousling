import { useEffect, useMemo, useRef, useState } from 'react'

const services = [
  {
    number: '01',
    title: 'Автоматизация и AI',
    text: 'Убираем ручную рутину, создаём AI-ассистентов, Telegram-ботов и умные бизнес-процессы.',
    tags: ['AI', 'Боты', 'Автоматизация'],
    icon: 'spark',
  },
  {
    number: '02',
    title: 'Сайты и веб-системы',
    text: 'Лендинги, интернет-магазины, личные кабинеты, CRM и сложные платформы под ваши задачи.',
    tags: ['Web', 'E-commerce', 'CRM'],
    icon: 'code',
  },
  {
    number: '03',
    title: 'Мобильные приложения',
    text: 'Проектируем и запускаем приложения для iOS и Android — от идеи и дизайна до публикации.',
    tags: ['iOS', 'Android', 'Cross-platform'],
    icon: 'phone',
  },
  {
    number: '04',
    title: 'Игры и XR',
    text: 'Разрабатываем мобильные, компьютерные и VR/AR-проекты с продуманной механикой и визуалом.',
    tags: ['Games', 'VR / AR', 'Unity'],
    icon: 'game',
  },
  {
    number: '05',
    title: 'Интеграции',
    text: 'Связываем сервисы, платёжные системы, API, телефонию, аналитику и внутренние инструменты.',
    tags: ['API', 'Payments', 'Analytics'],
    icon: 'nodes',
  },
  {
    number: '06',
    title: 'Cloud и инфраструктура',
    text: 'Настраиваем серверы, Docker, CI/CD, мониторинг, резервное копирование и защиту систем.',
    tags: ['Cloud', 'DevOps', 'Security'],
    icon: 'cloud',
  },
]

const projects = [
  {
    type: 'Бизнес-система',
    title: 'Единая цифровая среда компании',
    text: 'Сайт, CRM, аналитика, автоматические уведомления и интеграции — в одной связанной системе.',
    accent: 'violet',
    visual: 'dashboard',
  },
  {
    type: 'Автоматизация',
    title: 'Процессы работают без рутины',
    text: 'Заявки распределяются, данные синхронизируются, отчёты формируются автоматически.',
    accent: 'cyan',
    visual: 'flow',
  },
  {
    type: 'Цифровой продукт',
    title: 'От идеи до готового приложения',
    text: 'Исследование, дизайн, разработка, тестирование, запуск и дальнейшее развитие продукта.',
    accent: 'lime',
    visual: 'mobile',
  },
]

const process = [
  ['01', 'Разбираемся', 'Изучаем задачу, процессы и цели. Определяем, что действительно даст результат.'],
  ['02', 'Проектируем', 'Собираем структуру, прототип и технический план с понятными этапами.'],
  ['03', 'Разрабатываем', 'Создаём решение короткими итерациями и регулярно показываем прогресс.'],
  ['04', 'Запускаем', 'Тестируем, разворачиваем, обучаем команду и помогаем развивать продукт.'],
]

const rotatingWords = ['сайты', 'приложения', 'игры', 'автоматизацию', 'интеграции']

function Icon({ name, size = 24 }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }

  const paths = {
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    spark: <><path d="m12 3-1.5 5.5L5 10l5.5 1.5L12 17l1.5-5.5L19 10l-5.5-1.5L12 3Z"/><path d="m5 16-.7 2.3L2 19l2.3.7L5 22l.7-2.3L8 19l-2.3-.7L5 16Z"/></>,
    code: <><path d="m8 9-3 3 3 3"/><path d="m16 9 3 3-3 3"/><path d="m14 5-4 14"/></>,
    phone: <><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/></>,
    game: <><path d="M8.5 6h7a5 5 0 0 1 4.8 6.4l-1.1 3.8a2.2 2.2 0 0 1-3.7 1l-1.2-1.2H9.7l-1.2 1.2a2.2 2.2 0 0 1-3.7-1l-1.1-3.8A5 5 0 0 1 8.5 6Z"/><path d="M8 10v4M6 12h4"/><path d="M16.5 11.5h.01M18 13h.01"/></>,
    nodes: <><circle cx="5" cy="12" r="2"/><circle cx="19" cy="5" r="2"/><circle cx="19" cy="19" r="2"/><path d="m7 11 10-5M7 13l10 5"/></>,
    cloud: <><path d="M17.5 19H6a4 4 0 0 1-.4-8A6.5 6.5 0 0 1 18 9.5a4.8 4.8 0 0 1-.5 9.5Z"/><path d="m9 14 3-3 3 3M12 11v6"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    close: <><path d="m6 6 12 12M18 6 6 18"/></>,
    copy: <><rect x="8" y="8" width="11" height="11" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/></>,
  }

  return <svg {...common}>{paths[name]}</svg>
}

function Logo() {
  return (
    <a className="logo" href="#top" aria-label="IT Tech — на главную">
      <span className="logo-mark"><span>IT</span></span>
      <span className="logo-name">IT<span>TECH</span></span>
    </a>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [wordIndex, setWordIndex] = useState(0)
  const [formState, setFormState] = useState({ name: '', contact: '', task: '' })
  const [formMessage, setFormMessage] = useState('')
  const heroRef = useRef(null)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setWordIndex((current) => (current + 1) % rotatingWords.length)
    }, 2200)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      }),
      { threshold: 0.12 },
    )
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return undefined
    const handlePointer = (event) => {
      const rect = hero.getBoundingClientRect()
      hero.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`)
      hero.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`)
    }
    hero.addEventListener('pointermove', handlePointer)
    return () => hero.removeEventListener('pointermove', handlePointer)
  }, [])

  const brief = useMemo(() => {
    return `Новая заявка для IT Tech\nИмя: ${formState.name || 'не указано'}\nКонтакт: ${formState.contact || 'не указан'}\nЗадача: ${formState.task || 'не описана'}`
  }, [formState])

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!formState.contact.trim() || !formState.task.trim()) {
      setFormMessage('Укажите контакт и коротко опишите задачу.')
      return
    }

    try {
      await navigator.clipboard.writeText(brief)
      setFormMessage('Заявка скопирована. Отправьте её в удобный мессенджер IT Tech.')
    } catch {
      setFormMessage('Заявка сформирована. Подключите Telegram или CRM для автоматической отправки.')
    }
  }

  return (
    <div className="site-shell" id="top">
      <header className="header">
        <div className="container header-inner">
          <Logo />
          <nav className={`nav ${menuOpen ? 'is-open' : ''}`} aria-label="Основная навигация">
            <a href="#services" onClick={() => setMenuOpen(false)}>Услуги</a>
            <a href="#solutions" onClick={() => setMenuOpen(false)}>Решения</a>
            <a href="#process" onClick={() => setMenuOpen(false)}>Как работаем</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Контакты</a>
          </nav>
          <a className="header-cta" href="#contact">Обсудить проект <Icon name="arrow" size={17} /></a>
          <button className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Открыть меню" aria-expanded={menuOpen}>
            <Icon name={menuOpen ? 'close' : 'menu'} />
          </button>
        </div>
      </header>

      <main>
        <section className="hero" ref={heroRef}>
          <div className="grid-plane" aria-hidden="true" />
          <div className="hero-glow" aria-hidden="true" />
          <div className="orb orb-one" aria-hidden="true" />
          <div className="orb orb-two" aria-hidden="true" />

          <div className="container hero-inner">
            <div className="hero-copy" data-reveal>
              <div className="eyebrow"><span className="status-dot" /> IT-команда полного цикла</div>
              <h1>
                Создаём технологии,<br />
                которые <span className="gradient-text">двигают бизнес</span>
              </h1>
              <p className="hero-lead">
                Разрабатываем <span className="rotating-word" key={rotatingWords[wordIndex]}>{rotatingWords[wordIndex]}</span>, объединяем сервисы и превращаем сложные процессы в простые цифровые решения.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#contact">Запустить проект <Icon name="arrow" size={19} /></a>
                <a className="button button-ghost" href="#services">Посмотреть услуги</a>
              </div>
              <div className="hero-points">
                <span><Icon name="check" size={16} /> Под ключ</span>
                <span><Icon name="check" size={16} /> Прозрачные этапы</span>
                <span><Icon name="check" size={16} /> Поддержка после запуска</span>
              </div>
            </div>

            <div className="hero-visual" data-reveal>
              <div className="tech-orbit orbit-outer">
                <span className="orbit-node node-ai">AI</span>
                <span className="orbit-node node-web">WEB</span>
                <span className="orbit-node node-app">APP</span>
                <span className="orbit-node node-game">GAME</span>
              </div>
              <div className="tech-orbit orbit-inner" />
              <div className="core-card">
                <div className="core-logo"><span>IT</span></div>
                <strong>IT TECH</strong>
                <small>BUILD · CONNECT · SCALE</small>
              </div>
              <div className="floating-card card-code">
                <span className="card-dot green" />
                <code>system.ready()</code>
              </div>
              <div className="floating-card card-progress">
                <div className="mini-label">PROJECT STATUS</div>
                <div className="progress-row"><span>Development</span><b>82%</b></div>
                <div className="progress-track"><span /></div>
              </div>
              <div className="data-stream stream-one" />
              <div className="data-stream stream-two" />
            </div>
          </div>

          <div className="container hero-strip" data-reveal>
            <div><strong>От идеи</strong><span>Понимаем задачу</span></div>
            <div><strong>До запуска</strong><span>Создаём продукт</span></div>
            <div><strong>И развития</strong><span>Улучшаем систему</span></div>
            <div className="strip-action"><span>Ваш проект может быть следующим</span><a href="#contact"><Icon name="arrow" size={18} /></a></div>
          </div>
        </section>

        <section className="section services" id="services">
          <div className="container">
            <div className="section-heading" data-reveal>
              <div>
                <span className="section-kicker">Что мы делаем</span>
                <h2>Все IT-задачи —<br />в одной команде</h2>
              </div>
              <p>Не нужно искать разных подрядчиков. Мы проектируем, разрабатываем, интегрируем и поддерживаем цифровые решения целиком.</p>
            </div>

            <div className="services-grid">
              {services.map((service, index) => (
                <article className="service-card" data-reveal key={service.title} style={{ '--delay': `${index * 55}ms` }}>
                  <div className="service-top">
                    <span className="service-number">{service.number}</span>
                    <span className="service-icon"><Icon name={service.icon} size={28} /></span>
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <div className="tag-list">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  <a href="#contact" aria-label={`Обсудить услугу: ${service.title}`}>Обсудить <Icon name="arrow" size={17} /></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            {['WEB DEVELOPMENT', 'MOBILE APPS', 'AI AUTOMATION', 'GAME DEVELOPMENT', 'SYSTEM INTEGRATION', 'CLOUD & DEVOPS', 'WEB DEVELOPMENT', 'MOBILE APPS', 'AI AUTOMATION', 'GAME DEVELOPMENT', 'SYSTEM INTEGRATION', 'CLOUD & DEVOPS'].map((item, index) => (
              <span key={`${item}-${index}`}>{item}<i>✦</i></span>
            ))}
          </div>
        </div>

        <section className="section solutions" id="solutions">
          <div className="container">
            <div className="section-heading compact" data-reveal>
              <div>
                <span className="section-kicker">Цифровые решения</span>
                <h2>Создаём не просто код.<br />Создаём результат.</h2>
              </div>
            </div>

            <div className="project-grid">
              {projects.map((project, index) => (
                <article className={`project-card accent-${project.accent}`} data-reveal key={project.title} style={{ '--delay': `${index * 80}ms` }}>
                  <div className={`project-visual visual-${project.visual}`}>
                    {project.visual === 'dashboard' && (
                      <div className="mock-dashboard">
                        <div className="mock-sidebar"><i/><i/><i/><i/></div>
                        <div className="mock-content">
                          <div className="mock-head"><span/><span/></div>
                          <div className="mock-chart"><i/><i/><i/><i/><i/><i/></div>
                          <div className="mock-cards"><span/><span/><span/></div>
                        </div>
                      </div>
                    )}
                    {project.visual === 'flow' && (
                      <div className="flow-map">
                        <span className="flow-node f1">Lead</span><i className="line l1"/>
                        <span className="flow-node f2">CRM</span><i className="line l2"/>
                        <span className="flow-node f3">Bot</span><i className="line l3"/>
                        <span className="flow-node f4">Report</span>
                        <b className="flow-pulse p1"/><b className="flow-pulse p2"/><b className="flow-pulse p3"/>
                      </div>
                    )}
                    {project.visual === 'mobile' && (
                      <div className="phone-mockup">
                        <div className="phone-screen"><span className="phone-island"/><div className="phone-title"/><div className="phone-hero"/><div className="phone-lines"><i/><i/><i/></div></div>
                        <div className="app-bubble b1">UI</div><div className="app-bubble b2">API</div><div className="app-bubble b3">UX</div>
                      </div>
                    )}
                  </div>
                  <div className="project-copy">
                    <span>{project.type}</span>
                    <h3>{project.title}</h3>
                    <p>{project.text}</p>
                    <a href="#contact">Создать решение <Icon name="arrow" size={17} /></a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section process" id="process">
          <div className="process-grid-bg" aria-hidden="true" />
          <div className="container">
            <div className="section-heading light" data-reveal>
              <div>
                <span className="section-kicker">Как мы работаем</span>
                <h2>Понятный путь<br />от задачи до запуска</h2>
              </div>
              <p>Без хаоса и бесконечных обещаний. Вы всегда понимаете, что происходит, что уже готово и какой шаг следующий.</p>
            </div>
            <div className="process-list">
              {process.map(([number, title, text], index) => (
                <article data-reveal key={number} style={{ '--delay': `${index * 70}ms` }}>
                  <span className="process-number">{number}</span>
                  <div className="process-icon"><span>{index + 1}</span></div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section reasons">
          <div className="container reasons-grid">
            <div className="reasons-copy" data-reveal>
              <span className="section-kicker">Почему IT Tech</span>
              <h2>Сложные технологии.<br />Простое сотрудничество.</h2>
              <p>Мы говорим на языке бизнеса, предлагаем практичные решения и берём ответственность за весь технический результат.</p>
              <a className="button button-dark" href="#contact">Расскажите о задаче <Icon name="arrow" size={18} /></a>
            </div>
            <div className="reason-cards">
              {[
                ['01', 'Одна команда', 'Дизайн, разработка, серверы, интеграции и запуск — без разрыва между подрядчиками.'],
                ['02', 'Прозрачность', 'Понятный план, регулярные демонстрации и доступ к текущему прогрессу проекта.'],
                ['03', 'Масштабируемость', 'Закладываем архитектуру, которую можно развивать вместе с вашим бизнесом.'],
                ['04', 'Фокус на результате', 'Технология должна экономить время, увеличивать продажи или улучшать сервис.'],
              ].map(([number, title, text], index) => (
                <article data-reveal key={number} style={{ '--delay': `${index * 60}ms` }}>
                  <span>{number}</span><h3>{title}</h3><p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="contact-grid" aria-hidden="true" />
          <div className="container contact-inner">
            <div className="contact-copy" data-reveal>
              <span className="section-kicker">Начнём?</span>
              <h2>Расскажите,<br />что нужно создать</h2>
              <p>Опишите задачу своими словами. Мы поможем превратить идею в понятный план цифрового решения.</p>
              <div className="contact-note">
                <span className="status-dot" /> Принимаем новые проекты
              </div>
            </div>
            <form className="contact-form" onSubmit={handleSubmit} data-reveal>
              <label>
                <span>Ваше имя</span>
                <input type="text" value={formState.name} onChange={(event) => setFormState({ ...formState, name: event.target.value })} placeholder="Как к вам обращаться?" />
              </label>
              <label>
                <span>Телефон, email или Telegram *</span>
                <input type="text" value={formState.contact} onChange={(event) => setFormState({ ...formState, contact: event.target.value })} placeholder="Удобный способ связи" required />
              </label>
              <label>
                <span>Что нужно сделать? *</span>
                <textarea rows="4" value={formState.task} onChange={(event) => setFormState({ ...formState, task: event.target.value })} placeholder="Например: нужен сайт, приложение или автоматизация отдела продаж" required />
              </label>
              <button className="button button-primary form-submit" type="submit">Сформировать заявку <Icon name="copy" size={18} /></button>
              {formMessage && <p className="form-message" role="status">{formMessage}</p>}
              <small>Сейчас форма копирует заявку. Для автоматической отправки подключите Telegram-бота, email или CRM.</small>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-top">
          <Logo />
          <p>Разработка, автоматизация и интеграция цифровых решений.</p>
          <a href="#top">Наверх ↑</a>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} IT Tech</span>
          <span>Создаём технологии для роста</span>
        </div>
      </footer>
    </div>
  )
}

export default App
