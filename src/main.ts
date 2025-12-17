// Main TypeScript entry point for Joel Sahli's CV website
// This file is imported in index.html and serves as the application initialization point

import './style.css'
import { getCurrentLanguage, initI18n } from './i18n'

// Motion preference handling
const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
let prefersReducedMotion = motionQuery.matches

const handleMotionPreference = (event: MediaQueryListEvent) => {
  prefersReducedMotion = event.matches
}

if (typeof motionQuery.addEventListener === 'function') {
  motionQuery.addEventListener('change', handleMotionPreference)
} else if (typeof motionQuery.addListener === 'function') {
  motionQuery.addListener(handleMotionPreference)
}

// Project data for modal
interface ProjectData {
  id: string
  title: string
  shortDescription: string
  tagline: string
  description: string
  techStack: string[]
  role: string
  year: string
  liveUrl: string | null
  repoUrl: string | null
  images: string[]
  thumbnailAlt: string
}

const projectsDataEn: Record<string, ProjectData> = {
  sapphirix: {
    id: 'sapphirix',
    title: 'Sapphirix',
    shortDescription: 'A modern portfolio template featuring stunning animations and a dark sapphire theme.',
    tagline: 'Portfolio for my Pseudonym',
    description: 'A modern, sleek portfolio template featuring stunning animations, glassmorphism effects, and a beautiful dark sapphire theme. Built with performance and accessibility in mind, this template showcases best practices in modern web development.',
    techStack: ['TypeScript', 'Vite', 'Tailwind CSS', 'HTML5', 'CSS3'],
    role: 'Full Stack Developer',
    year: '2024',
    liveUrl: 'https://sapphirix.ch',
    repoUrl: null,
    images: [
      'assets/img/sapphirix/sapphirix-00-hero.png',
      'assets/img/sapphirix/sapphirix-02-about.png',
      'assets/img/sapphirix/sapphirix-03-projects.png',
    ],
    thumbnailAlt: 'Sapphirix project screenshot showing the hero section'
  },
  soulomusic: {
    id: 'soulomusic',
    title: 'Soulomusic',
    shortDescription: 'Official musician website with music integration, tour dates, booking, and a dynamic journey timeline.',
    tagline: 'Official Website of a Popular Musician',
    description: 'A vibrant artist portfolio website commissioned by and delivered for an established musician. Features music integration, tour dates display, booking capabilities, and a dynamic journey timeline. The design captures the artist\'s unique style while maintaining professional aesthetics.',
    techStack: ['TypeScript', 'Vite', 'Tailwind CSS', 'HTML5', 'CSS3'],
    role: 'Full Stack Developer',
    year: '2025',
    liveUrl: 'https://soulomusic.ch',
    repoUrl: null,
    images: [
      'assets/img/soulomusic/soulomusic-01-home.png',
      'assets/img/soulomusic/soulomusic-02-about.png',
      'assets/img/soulomusic/soulomusic-03-music.png',
      'assets/img/soulomusic/soulomusic-04-journey.png',
      'assets/img/soulomusic/soulomusic-05-contact.png'
    ],
    thumbnailAlt: 'Soulomusic project screenshot showing the home page'
  },
  tmd: {
    id: 'tmd',
    title: "That's My Duo",
    shortDescription: 'AI-powered League of Legends companion built for the Rift Rewind Hackathon 2025.',
    tagline: 'My Submission to the Rift Rewind Hackathon, An AI powered League of Legends companion.',
    description: "That's My Duo is a League of Legends companion app built for the Rift Rewind Hackathon 2025, powered by AWS and Riot Games. Created by Sapphirix, this project merges a love for gaming with fullstack development — transforming raw match data into meaningful, story-driven insights about how you and your friends play together. Whether you're dominating the Rift or just having fun with your duo, That's My Duo analyzes your shared match history to uncover your synergy, strengths, and standout moments. It goes beyond simple statistics to deliver AI-powered recaps that capture the story of your gameplay.",
    techStack: ['Angular', 'TypeScript', 'Node.js', 'AWS', 'AWS Bedrock', 'Riot Games API', 'Express'],
    role: 'Full Stack Developer',
    year: '2025',
    liveUrl: "tmd.sapphirix.ch",
    repoUrl: 'https://github.com/JoeyTheCoder/RiftRewindHackathon',
    images: [
      "assets/img/tmd/tmd-01-that's-my-duo.png",
      'assets/img/tmd/tmd-03-about.png'
    ],
    thumbnailAlt: "That's My Duo project screenshot showing the main interface"
  }
}

const projectsDataDe: Record<string, ProjectData> = {
  sapphirix: {
    id: 'sapphirix',
    title: 'Sapphirix',
    shortDescription: 'Modernes Portfolio-Template mit beeindruckenden Animationen und einem dunklen Saphir-Theme.',
    tagline: 'Portfolio für mein Pseudonym',
    description: 'Ein modernes, schlankes Portfolio-Template mit beeindruckenden Animationen, Glassmorphism-Effekten und einem eleganten, dunklen Saphir-Theme. Entwickelt mit Fokus auf Performance und Barrierefreiheit und als Showcase für Best Practices moderner Webentwicklung.',
    techStack: ['TypeScript', 'Vite', 'Tailwind CSS', 'HTML5', 'CSS3'],
    role: 'Full Stack Developer',
    year: '2024',
    liveUrl: 'https://sapphirix.ch',
    repoUrl: null,
    images: [
      'assets/img/sapphirix/sapphirix-00-hero.png',
      'assets/img/sapphirix/sapphirix-02-about.png',
      'assets/img/sapphirix/sapphirix-03-projects.png'
    ],
    thumbnailAlt: 'Sapphirix Projekt-Screenshot der Hero-Sektion'
  },
  soulomusic: {
    id: 'soulomusic',
    title: 'Soulomusic',
    shortDescription: 'Offizielle Musiker-Website mit Musikintegration, Tourdaten, Booking und dynamischer Journey-Timeline.',
    tagline: 'Offizielle Website eines bekannten Musikers',
    description: 'Eine lebendige Artist-Portfolio-Website, die im Auftrag eines etablierten Musikers umgesetzt wurde. Mit Musikintegration, Anzeige von Tourdaten, Booking-Funktionen und einer dynamischen Journey-Timeline. Das Design greift den einzigartigen Stil des Künstlers auf und bleibt dabei professionell und klar.',
    techStack: ['TypeScript', 'Vite', 'Tailwind CSS', 'HTML5', 'CSS3'],
    role: 'Full Stack Developer',
    year: '2025',
    liveUrl: 'https://soulomusic.ch',
    repoUrl: null,
    images: [
      'assets/img/soulomusic/soulomusic-01-home.png',
      'assets/img/soulomusic/soulomusic-02-about.png',
      'assets/img/soulomusic/soulomusic-03-music.png',
      'assets/img/soulomusic/soulomusic-04-journey.png',
      'assets/img/soulomusic/soulomusic-05-contact.png'
    ],
    thumbnailAlt: 'Soulomusic Projekt-Screenshot der Startseite'
  },
  tmd: {
    id: 'tmd',
    title: "That's My Duo",
    shortDescription: 'KI-gestützter League-of-Legends-Begleiter, entwickelt für den Rift Rewind Hackathon 2025.',
    tagline: 'Mein Beitrag zum Rift Rewind Hackathon – ein KI-gestützter League-of-Legends-Begleiter.',
    description: "That's My Duo ist eine League-of-Legends-Companion-App für den Rift Rewind Hackathon 2025 – powered by AWS und Riot Games. Das Projekt verbindet Gaming-Leidenschaft mit Fullstack-Development und verwandelt Rohdaten aus Matches in sinnvolle, storybasierte Insights darüber, wie du und deine Freunde zusammen spielt. Ob ihr die Kluft dominiert oder einfach nur Spass habt: That's My Duo analysiert eure gemeinsame Match-History, findet Synergien, Stärken und Highlights – und liefert KI-Recaps, die die Story eures Gameplays erzählen.",
    techStack: ['Angular', 'TypeScript', 'Node.js', 'AWS', 'AWS Bedrock', 'Riot Games API', 'Express'],
    role: 'Full Stack Developer',
    year: '2025',
    liveUrl: 'tmd.sapphirix.ch',
    repoUrl: 'https://github.com/JoeyTheCoder/RiftRewindHackathon',
    images: [
      "assets/img/tmd/tmd-01-that's-my-duo.png",
      'assets/img/tmd/tmd-03-about.png'
    ],
    thumbnailAlt: "That's My Duo Projekt-Screenshot der Hauptoberfläche"
  }
}

const getProjectsDataForCurrentLanguage = (): Record<string, ProjectData> => {
  const lang = getCurrentLanguage()
  return lang === 'de' ? projectsDataDe : projectsDataEn
}

// Current gallery state
let currentProjectId: string | null = null
let currentImageIndex = 0

// Initialize application
console.log('%c🎨 Website Reborn ', 'background: #0F52BA; color: white; padding: 5px 10px; border-radius: 3px; font-weight: bold;')
console.log('Built with TypeScript + Vite + Tailwind CSS')

const parseDuration = (value: string | null, fallback: number) => {
  if (!value) return fallback
  const trimmed = value.trim()
  if (trimmed.endsWith('ms')) {
    const parsed = Number(trimmed.replace('ms', ''))
    return Number.isFinite(parsed) ? parsed : fallback
  }
  if (trimmed.endsWith('s')) {
    const seconds = Number(trimmed.replace('s', ''))
    return Number.isFinite(seconds) ? seconds * 1000 : fallback
  }
  const numeric = Number(trimmed)
  return Number.isFinite(numeric) ? numeric : fallback
}

const getNavbarHeight = () => {
  const navbar = document.querySelector('.navbar') as HTMLElement | null
  if (navbar?.offsetHeight) {
    return navbar.offsetHeight
  }
  const cssValue = getComputedStyle(document.documentElement).getPropertyValue('--navbar-height')
  const parsed = parseInt(cssValue, 10)
  return Number.isNaN(parsed) ? 72 : parsed
}

// Feature 4 & 6: Smooth scroll with navbar offset
function smoothScrollToSection(targetId: string, behaviorOverride?: ScrollBehavior) {
  if (!targetId) return
  const target = document.getElementById(targetId)
  if (!target) return

  const navbarHeight = getNavbarHeight()
  const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight
  const behavior = behaviorOverride ?? (prefersReducedMotion ? 'auto' : 'smooth')

  window.scrollTo({
    top: Math.max(targetPosition, 0),
    behavior
  })
}

// Feature 2: Typewriter effect for hero tagline
function initTypewriter() {
  const textElement = document.querySelector<HTMLElement>('[data-typewriter-text]')
  if (!textElement) return

  let content = textElement.dataset.typewriterText?.trim() || textElement.textContent?.trim() || ''
  if (!content) return;

  // Split on <br> for multiline support
  const lines = content.split(/<br\s*\/?\s*>/i);
  const joinedContent = lines.join('\n');
  const duration = parseDuration(textElement.dataset.typewriterDuration ?? null, 4200);
  const delay = parseDuration(textElement.dataset.typewriterDelay ?? null, 250);
  const totalCharacters = joinedContent.length;

  const renderStatic = () => {
    textElement.innerHTML = lines.map(line => line).join('<br>');
    textElement.classList.remove('is-typing');
    textElement.classList.add('typewriter-static', 'typing-complete');
  };

  if (prefersReducedMotion) {
    renderStatic();
    return;
  }

  const beginTyping = () => {
    if (textElement.dataset.typingStarted === 'true') return;
    textElement.dataset.typingStarted = 'true';

    textElement.innerHTML = '';
    textElement.classList.add('is-typing');

    const minimumDelay = 18;
    const charDelay = Math.max(Math.floor(duration / Math.max(totalCharacters, 1)), minimumDelay);

    let index = 0;
    const typeNext = () => {
      index += 1;
      // Show up to current index, then replace \n with <br>
      const partial = joinedContent.slice(0, index).replace(/\n/g, '<br>');
      textElement.innerHTML = partial;

      if (index < totalCharacters) {
        window.setTimeout(typeNext, charDelay);
      } else {
        textElement.classList.remove('is-typing');
        textElement.classList.add('typing-complete');
      }
    };

    window.setTimeout(typeNext, 0);
  };

  const triggerTyping = () => {
    window.setTimeout(beginTyping, delay);
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        triggerTyping();
        observer.disconnect();
      }
    }, { threshold: 0.6 });

    observer.observe(textElement);
  } else {
    triggerTyping();
  }
}

// Feature 9: Set dynamic year in footer
function setDynamicYear() {
  const yearElement = document.getElementById('footer-year')
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear().toString()
  }
}

function initNavToggle() {
  const navbar = document.querySelector<HTMLElement>('.navbar')
  const toggle = document.querySelector<HTMLButtonElement>('.nav-toggle')
  const menu = document.getElementById('primary-nav')
  const iconBurger = toggle?.querySelector('.nav-toggle-burger') as HTMLElement | null
  const iconClose = toggle?.querySelector('.nav-toggle-close') as HTMLElement | null

  if (!navbar || !toggle || !menu || !iconBurger || !iconClose) {
    return
  }

  const setOpen = (isOpen: boolean) => {
    navbar.classList.toggle('nav-open', isOpen)
    toggle.setAttribute('aria-expanded', String(isOpen))
    if (isOpen) {
      iconBurger.style.display = 'none'
      iconClose.style.display = 'block'
    } else {
      iconBurger.style.display = 'block'
      iconClose.style.display = 'none'
    }
  }

  toggle.addEventListener('click', () => {
    const nextState = !navbar.classList.contains('nav-open')
    setOpen(nextState)
  })

  menu.querySelectorAll('a').forEach(anchor => {
    anchor.addEventListener('click', () => setOpen(false))
  })

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 900) {
      setOpen(false)
    }
  })
}

// Project Modal Functions
function normalizeUrl(url: string | null): string | null {
  if (!url) return null;
  if (/^https?:\/\//i.test(url)) return url;
  // If it looks like a domain (no slashes, no spaces), add https://
  if (/^[\w.-]+\.[a-z]{2,}(\/.*)?$/i.test(url)) return 'https://' + url;
  return url;
}

function normalizeImagePath(path: string): string {
  // If already absolute (starts with / or http), return as is
  if (/^(\/|https?:)/.test(path)) return path;
  // Otherwise, prefix with / to make it root-relative
  return '/' + path.replace(/^\/+/, '');
}

function openProjectModal(projectId: string) {
  const project = getProjectsDataForCurrentLanguage()[projectId]
  if (!project) return

  const modal = document.getElementById('project-modal')
  if (!modal) return

  currentProjectId = projectId
  currentImageIndex = 0

  // Populate modal content
  const titleEl = modal.querySelector('.project-modal-title')
  const taglineEl = modal.querySelector('.project-modal-tagline')
  const descriptionEl = modal.querySelector('.project-modal-description')
  const roleEl = modal.querySelector('.project-role')
  const yearEl = modal.querySelector('.project-year')
  const techChipsEl = modal.querySelector('.project-tech-chips')
  const liveLink = modal.querySelector('.project-link-live') as HTMLAnchorElement
  const repoLink = modal.querySelector('.project-link-repo') as HTMLAnchorElement

  if (titleEl) titleEl.textContent = project.title
  if (taglineEl) taglineEl.textContent = project.tagline
  if (descriptionEl) descriptionEl.textContent = project.description
  if (roleEl) roleEl.textContent = project.role
  if (yearEl) yearEl.textContent = project.year

  // Populate tech chips
  if (techChipsEl) {
    techChipsEl.innerHTML = project.techStack
      .map(tech => `<span class="project-tech-chip">${tech}</span>`)
      .join('')
  }

  // Set links (normalize to absolute URLs)
  if (liveLink) {
    const url = normalizeUrl(project.liveUrl)
    if (url) {
      liveLink.href = url
      liveLink.style.display = 'inline-flex'
    } else {
      liveLink.style.display = 'none'
    }
  }

  if (repoLink) {
    const url = normalizeUrl(project.repoUrl)
    if (url) {
      repoLink.href = url
      repoLink.style.display = 'inline-flex'
    } else {
      repoLink.style.display = 'none'
    }
  }

  // Setup gallery with normalized image paths
  const normalizedImages = project.images.map(normalizeImagePath)
  updateGalleryImage(normalizedImages, 0)
  setupGalleryDots(normalizedImages)

  // Show modal
  modal.setAttribute('aria-hidden', 'false')
  document.body.classList.add('modal-open')

  // Focus management - focus the close button
  const closeBtn = modal.querySelector<HTMLButtonElement>('.project-modal-close')
  setTimeout(() => closeBtn?.focus(), 100)
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal')
  if (!modal) return

  const projectIdBeforeClose = currentProjectId

  modal.setAttribute('aria-hidden', 'true')
  document.body.classList.remove('modal-open')
  currentProjectId = null

  // Return focus to the card that opened the modal
  const lastFocusedCard = projectIdBeforeClose
    ? document.querySelector<HTMLElement>(`[data-project="${projectIdBeforeClose}"]`)
    : null
  lastFocusedCard?.focus()
}

function updateGalleryImage(images: string[], index: number) {
  const galleryImage = document.querySelector<HTMLImageElement>('.gallery-image')
  if (!galleryImage || !images[index]) return

  currentImageIndex = index
  galleryImage.src = normalizeImagePath(images[index])
  galleryImage.alt = `Project screenshot ${index + 1} of ${images.length}`

  // Update dots
  document.querySelectorAll('.gallery-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === index)
  })
}

function setupGalleryDots(images: string[]) {
  const dotsContainer = document.querySelector('.gallery-dots')
  if (!dotsContainer) return

  dotsContainer.innerHTML = images
    .map((_, i) => `<button class="gallery-dot${i === 0 ? ' active' : ''}" data-index="${i}" aria-label="Go to image ${i + 1}"></button>`)
    .join('')

  // Add click handlers
  dotsContainer.querySelectorAll<HTMLButtonElement>('.gallery-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.dataset.index || '0', 10)
      if (currentProjectId) {
        // Use normalized images for gallery navigation
        const images = getProjectsDataForCurrentLanguage()[currentProjectId].images.map(normalizeImagePath)
        updateGalleryImage(images, index)
      }
    })
  })
}

function navigateGallery(direction: 'prev' | 'next') {
  if (!currentProjectId) return
  const images = getProjectsDataForCurrentLanguage()[currentProjectId].images.map(normalizeImagePath)
  const newIndex = direction === 'next'
    ? (currentImageIndex + 1) % images.length
    : (currentImageIndex - 1 + images.length) % images.length
  updateGalleryImage(images, newIndex)
}

function updateProjectCardsCopy() {
  const projectsData = getProjectsDataForCurrentLanguage()
  const lang = getCurrentLanguage()
  const ariaLabelPrefix = lang === 'de' ? 'Details ansehen:' : 'View project details:'

  document.querySelectorAll<HTMLElement>('.project-card').forEach(card => {
    const projectId = card.dataset.project
    if (!projectId) return
    const project = projectsData[projectId]
    if (!project) return

    const titleEl = card.querySelector<HTMLElement>('.project-card-title')
    const descEl = card.querySelector<HTMLElement>('.project-card-description')
    const imgEl = card.querySelector<HTMLImageElement>('img')

    if (titleEl) titleEl.textContent = project.title
    if (descEl) descEl.textContent = project.shortDescription
    if (imgEl) imgEl.alt = project.thumbnailAlt

    card.setAttribute('aria-label', `${ariaLabelPrefix} ${project.title}`)
  })
}

function updateOpenProjectModalCopy() {
  const modal = document.getElementById('project-modal')
  if (!modal) return
  if (modal.getAttribute('aria-hidden') === 'true') return
  if (!currentProjectId) return

  const project = getProjectsDataForCurrentLanguage()[currentProjectId]
  if (!project) return

  const titleEl = modal.querySelector('.project-modal-title')
  const taglineEl = modal.querySelector('.project-modal-tagline')
  const descriptionEl = modal.querySelector('.project-modal-description')
  const roleEl = modal.querySelector('.project-role')
  const yearEl = modal.querySelector('.project-year')
  const techChipsEl = modal.querySelector('.project-tech-chips')
  const liveLink = modal.querySelector('.project-link-live') as HTMLAnchorElement
  const repoLink = modal.querySelector('.project-link-repo') as HTMLAnchorElement

  if (titleEl) titleEl.textContent = project.title
  if (taglineEl) taglineEl.textContent = project.tagline
  if (descriptionEl) descriptionEl.textContent = project.description
  if (roleEl) roleEl.textContent = project.role
  if (yearEl) yearEl.textContent = project.year

  if (techChipsEl) {
    techChipsEl.innerHTML = project.techStack
      .map(tech => `<span class="project-tech-chip">${tech}</span>`)
      .join('')
  }

  if (liveLink) {
    if (project.liveUrl) {
      liveLink.href = project.liveUrl
      liveLink.style.display = 'inline-flex'
    } else {
      liveLink.style.display = 'none'
    }
  }

  if (repoLink) {
    if (project.repoUrl) {
      repoLink.href = project.repoUrl
      repoLink.style.display = 'inline-flex'
    } else {
      repoLink.style.display = 'none'
    }
  }

  updateGalleryImage(project.images, currentImageIndex)
  setupGalleryDots(project.images)
}

function initProjectCards() {
  const projectCards = document.querySelectorAll<HTMLElement>('.project-card')
  const modal = document.getElementById('project-modal')
  
  if (!modal) return

  // Card click/enter handlers
  projectCards.forEach(card => {
    const projectId = card.dataset.project
    if (!projectId) return

    const openModal = () => openProjectModal(projectId)
    
    card.addEventListener('click', openModal)
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        openModal()
      }
    })
  })

  // Modal close handlers
  const closeBtn = modal.querySelector('.project-modal-close')
  const backdrop = modal.querySelector('.project-modal-backdrop')

  closeBtn?.addEventListener('click', closeProjectModal)
  backdrop?.addEventListener('click', closeProjectModal)

  // Gallery navigation
  const prevBtn = modal.querySelector('.gallery-prev')
  const nextBtn = modal.querySelector('.gallery-next')

  prevBtn?.addEventListener('click', () => navigateGallery('prev'))
  nextBtn?.addEventListener('click', () => navigateGallery('next'))

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (modal.getAttribute('aria-hidden') === 'true') return

    switch (e.key) {
      case 'Escape':
        closeProjectModal()
        break
      case 'ArrowLeft':
        navigateGallery('prev')
        break
      case 'ArrowRight':
        navigateGallery('next')
        break
    }
  })

  // Trap focus within modal
  modal.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return

    const focusableElements = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstFocusable = focusableElements[0]
    const lastFocusable = focusableElements[focusableElements.length - 1]

    if (e.shiftKey && document.activeElement === firstFocusable) {
      e.preventDefault()
      lastFocusable?.focus()
    } else if (!e.shiftKey && document.activeElement === lastFocusable) {
      e.preventDefault()
      firstFocusable?.focus()
    }
  })
}

// Main initialization
document.addEventListener('DOMContentLoaded', () => {
  // Set contact form action from env variable
  const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT || '';
  const contactForm = document.getElementById('contact-form');
  if (contactForm && formspreeEndpoint) {
    contactForm.setAttribute('action', formspreeEndpoint);
  }
    // Smooth scroll for all contact buttons
    document.querySelectorAll<HTMLButtonElement>('.contact-scroll-trigger').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        smoothScrollToSection('contact');
      });
    });
  console.log('🎬 Animation check:', prefersReducedMotion ? '⚠️ Reduced motion is ON' : '✅ Animations enabled')

  // Feature 4: Scroll arrow buttons
  document.querySelectorAll<HTMLButtonElement>('.scroll-arrow').forEach(button => {
    button.addEventListener('click', event => {
      event.preventDefault()
      const targetId = button.getAttribute('data-scroll-to')
      if (targetId) {
        smoothScrollToSection(targetId)
      }
    })
  })

  // Feature 6: Enhanced navigation links with navbar offset
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', event => {
      const href = anchor.getAttribute('href')
      if (!href || href === '#') {
        return
      }
      event.preventDefault()
      const targetId = href.replace('#', '')
      smoothScrollToSection(targetId)
    })
  })


  // Feature 2: Initialize typewriter
  initTypewriter()

  // Listen for language changes and re-run typewriter with new text
  window.addEventListener('languagechange', () => {
    // Remove typing-complete and typewriter-static classes to allow re-animation
    const typewriterEl = document.querySelector<HTMLElement>('[data-typewriter-text]');
    if (typewriterEl) {
      typewriterEl.classList.remove('typing-complete', 'typewriter-static');
      typewriterEl.dataset.typingStarted = 'false';
      initTypewriter();
    }
  });

  // Feature 3: Navbar toggle
  initNavToggle()

  // Feature: Project cards and modal
  initProjectCards()

  // Feature 9: Set current year
  setDynamicYear()

  // Feature 10: Initialize i18n (internationalization)
  initI18n()

  // Ensure project copy (cards + modal) matches the language-specific source in this file
  updateProjectCardsCopy()
  updateOpenProjectModalCopy()

  console.log('✅ All features initialized with accessibility support')
  console.log('   - Typewriter animation (respects prefers-reduced-motion)')
  console.log('   - Smooth scroll with navbar offset')
  console.log('   - Dynamic footer year')
  console.log('   - Enhanced scroll arrows')
})

window.addEventListener('languagechange', () => {
  updateProjectCardsCopy()
  updateOpenProjectModalCopy()
})
