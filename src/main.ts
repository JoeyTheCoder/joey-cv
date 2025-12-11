// Main TypeScript entry point for Joel Sahli's CV website
// This file is imported in index.html and serves as the application initialization point

import './style.css'
import { initI18n } from './i18n'

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

  // Feature 9: Set current year
  setDynamicYear()

  // Feature 10: Initialize i18n (internationalization)
  initI18n()

  console.log('✅ All features initialized with accessibility support')
  console.log('   - Typewriter animation (respects prefers-reduced-motion)')
  console.log('   - Smooth scroll with navbar offset')
  console.log('   - Dynamic footer year')
  console.log('   - Enhanced scroll arrows')
})
