import React, { useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowDown, ArrowUpRight, Aperture, PenLine, Sparkles } from 'lucide-react'
import './styles.css'

const portraitMono = '/images/portrait-mono.jpeg'
const portraitWarm = '/images/portrait-warm.jpeg'

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const nodes = ref.current?.querySelectorAll('[data-reveal]') ?? []
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible')
      })
    }, { threshold: 0.18 })
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])
  return ref
}

function FilmGrain() { return <div className="film-grain" aria-hidden="true" /> }

function Nav() {
  return <nav className="nav">
    <a href="#top" className="mark">TSB</a>
    <div className="nav-links"><a href="#duality">Duality</a><a href="#fragments">Fragments</a><a href="#contact">Contact</a></div>
  </nav>
}

function Hero() {
  return <header id="top" className="hero">
    <div className="hero-panel left"><img src={portraitMono} alt="Black and white editorial portrait" /></div>
    <div className="hero-panel right"><img src={portraitWarm} alt="Warm editorial portrait" /></div>
    <div className="hero-vignette" />
    <div className="hero-lockup">
      <p className="eyebrow">Berlin / Everywhere</p>
      <h1>We don't finish each other's sentences. <span>We start them.</span></h1>
      <p className="hero-copy">Two voices. One frequency. A fictional creative studio built from portrait, language, shadow and light.</p>
      <a href="#duality" className="scroll-cue">Enter the space <ArrowDown size={16} /></a>
    </div>
  </header>
}

function Duality() {
  return <section id="duality" className="section duality">
    <div className="sticky-portrait" data-reveal><img src={portraitMono} alt="The Eye portrait" /></div>
    <div className="copy-stack">
      <p className="eyebrow" data-reveal>Act I — The Duality</p>
      <h2 data-reveal>The eye, the word, and the charged silence between them.</h2>
      <div className="trait-grid">
        <article data-reveal><Aperture /><h3>The Eye</h3><p>Sees the frame before the moment exists. Obsessed with light, silence, and the stories people wear on their faces.</p></article>
        <article data-reveal><PenLine /><h3>The Word</h3><p>Builds worlds from air. Turns half-thoughts into manifestos. Believes every image deserves a sentence it never asked for.</p></article>
      </div>
      <p className="manifesto" data-reveal>This is the space between: where image meets language, where a glance becomes a narrative, where work stops performing and starts haunting.</p>
    </div>
  </section>
}

function Fragments() {
  const works = [
    ['After Hours', 'A monochrome study in attention, built for galleries that open after midnight.'],
    ['The Quiet Season', 'Warm portraiture, whispered copy, and a campaign that feels like a held breath.'],
    ['Soft Alarm', 'Identity system for projects that want tension without noise.'],
    ['Private Weather', 'An editorial experiment in mood, memory, and unsent letters.'],
  ]
  return <section id="fragments" className="section fragments">
    <div className="spotlight" data-reveal><img src={portraitWarm} alt="Warm color portrait in spotlight frame" /></div>
    <div className="fragment-copy">
      <p className="eyebrow" data-reveal>Act II — Fragments</p>
      <h2 data-reveal>Selected chapters from an ongoing conversation.</h2>
      <div className="work-grid">
        {works.map(([title, body], index) => <article className="work-card" data-reveal key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{body}</p><ArrowUpRight size={18} /></article>)}
      </div>
    </div>
  </section>
}

function Quote() {
  return <section className="quote section"><Sparkles data-reveal /><blockquote data-reveal>“They make it feel like they invented the collaboration just for you.”</blockquote><p data-reveal>— M. Reyes, Kinship Magazine</p></section>
}

function Contact() {
  return <footer id="contact" className="contact section">
    <p className="eyebrow" data-reveal>Act III — Begin</p>
    <h2 data-reveal>Start the conversation.</h2>
    <a data-reveal className="cta" href="mailto:hello@thespacebetween.studio">hello@thespacebetween.studio <ArrowUpRight size={20} /></a>
    <p className="micro" data-reveal>Based in Berlin. Available everywhere. Built with the attached portraits, Vite and React.</p>
  </footer>
}

function App() {
  const ref = useReveal()
  return <main ref={ref}><FilmGrain /><Nav /><Hero /><Duality /><Fragments /><Quote /><Contact /></main>
}

createRoot(document.getElementById('root')).render(<App />)
