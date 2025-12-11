// i18n module for language switching without page reload
import enTranslations from './i18n/en.json'
import deTranslations from './i18n/de.json'

type TranslationData = typeof enTranslations
type Language = 'en' | 'de'

const translations: Record<Language, TranslationData> = {
  en: enTranslations,
  de: deTranslations
}

const STORAGE_KEY = 'preferred-language'
const DEFAULT_LANG: Language = 'en'

let currentLang: Language = DEFAULT_LANG

/**
 * Get a nested value from an object using dot notation
 * e.g., getNestedValue(obj, 'hero.tagline')
 */
function getNestedValue(obj: Record<string, unknown>, path: string): string | undefined {
  const keys = path.split('.')
  let current: unknown = obj
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = (current as Record<string, unknown>)[key]
    } else {
      return undefined
    }
  }
  
  return typeof current === 'string' ? current : undefined
}

/**
 * Get translation for a given key path
 */
export function t(key: string): string {
  const value = getNestedValue(translations[currentLang] as unknown as Record<string, unknown>, key)
  if (value === undefined) {
    console.warn(`Missing translation for key: ${key} in language: ${currentLang}`)
    // Fallback to English
    const fallback = getNestedValue(translations.en as unknown as Record<string, unknown>, key)
    return fallback ?? key
  }
  return value
}

/**
 * Get the current language
 */
export function getCurrentLanguage(): Language {
  return currentLang
}

/**
 * Load saved language preference from localStorage
 */
function loadSavedLanguage(): Language {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'en' || saved === 'de') {
      return saved
    }
  } catch {
    // localStorage not available
  }
  
  // Check browser language as fallback
  const browserLang = navigator.language.toLowerCase()
  if (browserLang.startsWith('de')) {
    return 'de'
  }
  
  return DEFAULT_LANG
}

/**
 * Save language preference to localStorage
 */
function saveLanguage(lang: Language): void {
  try {
    localStorage.setItem(STORAGE_KEY, lang)
  } catch {
    // localStorage not available
  }
}

/**
 * Update all translatable elements in the DOM
 */
function updateDOM(): void {
  // Update elements with data-i18n attribute (text content)
  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n')
    if (key) {
      el.textContent = t(key)
    }
  })
  
  // Update elements with data-i18n-placeholder attribute
  document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder')
    if (key) {
      el.placeholder = t(key)
    }
  })
  
  // Update elements with data-i18n-aria-label attribute
  document.querySelectorAll<HTMLElement>('[data-i18n-aria-label]').forEach(el => {
    const key = el.getAttribute('data-i18n-aria-label')
    if (key) {
      el.setAttribute('aria-label', t(key))
    }
  })
  
  // Update elements with data-i18n-alt attribute (for images)
  document.querySelectorAll<HTMLImageElement>('[data-i18n-alt]').forEach(el => {
    const key = el.getAttribute('data-i18n-alt')
    if (key) {
      el.alt = t(key)
    }
  })
  
  // Update typewriter element specially
  const typewriterEl = document.querySelector<HTMLElement>('[data-typewriter-text]')
  if (typewriterEl) {
    const newText = t('hero.typewriterText')
    typewriterEl.setAttribute('data-typewriter-text', newText)
    // If typewriter already completed, update the displayed text
    if (typewriterEl.classList.contains('typing-complete') || typewriterEl.classList.contains('typewriter-static')) {
      typewriterEl.innerHTML = t('hero.tagline')
    }
  }
  
  // Update document title
  document.title = t('meta.title')
  
  // Update html lang attribute
  document.documentElement.lang = currentLang
  
  // Update meta description
  const metaDesc = document.querySelector('meta[name="description"]')
  if (metaDesc) {
    metaDesc.setAttribute('content', t('meta.description'))
  }
  
  // Update language selector buttons
  updateLanguageButtons()
}

/**
 * Update the visual state of language buttons
 */
function updateLanguageButtons(): void {
  document.querySelectorAll('.nav-lang button').forEach(btn => {
    const btnLang = btn.textContent?.trim().toLowerCase()
    if (btnLang === currentLang) {
      btn.setAttribute('aria-current', 'true')
    } else {
      btn.removeAttribute('aria-current')
    }
  })
}

/**
 * Switch to a different language
 */
export function setLanguage(lang: Language): void {
  if (lang === currentLang) return
  if (lang !== 'en' && lang !== 'de') return
  
  currentLang = lang
  saveLanguage(lang)
  updateDOM()
  
  // Dispatch custom event for any listeners
  window.dispatchEvent(new CustomEvent('languagechange', { detail: { language: lang } }))
}

/**
 * Toggle between languages
 */
export function toggleLanguage(): void {
  setLanguage(currentLang === 'en' ? 'de' : 'en')
}

/**
 * Initialize the i18n system and set up language switcher buttons
 */
export function initI18n(): void {
  // Load saved language preference
  currentLang = loadSavedLanguage()
  
  // Initial DOM update
  updateDOM()
  
  // Set up language button click handlers
  document.querySelectorAll('.nav-lang button').forEach(btn => {
    btn.addEventListener('click', () => {
      const btnLang = btn.textContent?.trim().toLowerCase()
      if (btnLang === 'de' || btnLang === 'en') {
        setLanguage(btnLang)
      }
    })
  })
  
  console.log(`🌐 i18n initialized with language: ${currentLang}`)
}
