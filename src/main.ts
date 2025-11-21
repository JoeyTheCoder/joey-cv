// Main TypeScript entry point for Joel Sahli's CV website
// This file is imported in index.html and serves as the application initialization point

import './style.css'

// Initialize application
console.log('%c🎨 Website Reborn ', 'background: #0F52BA; color: white; padding: 5px 10px; border-radius: 3px; font-weight: bold;')
console.log('Built with TypeScript + Vite + Tailwind CSS')

// Smooth scroll behavior for navigation links (with accessibility respect)
document.addEventListener('DOMContentLoaded', () => {
  // Only apply smooth scrolling if user hasn't requested reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!prefersReducedMotion) {
    // Add smooth scroll behavior to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault()
        const href = this.getAttribute('href')
        if (href && href !== '#') {
          const target = document.querySelector(href)
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            })
          }
        }
      })
    })
  }

  console.log('✅ Navigation initialized with accessibility support')
})
