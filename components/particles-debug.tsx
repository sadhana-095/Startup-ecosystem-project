"use client"

import { useEffect } from "react"

export default function ParticlesDebug() {
  useEffect(() => {
    console.log("Particles Debug: Checking for TSParticles issues")
    
    // Check if the tsparticles container exists
    const particlesContainer = document.getElementById("tsparticles")
    console.log("Particles container exists:", !!particlesContainer)
    
    if (particlesContainer) {
      const particlesRect = particlesContainer.getBoundingClientRect()
      const styles = window.getComputedStyle(particlesContainer)
      
      console.log("Particles container details:", {
        width: particlesContainer.clientWidth,
        height: particlesContainer.clientHeight,
        visibility: styles.visibility,
        display: styles.display,
        opacity: styles.opacity,
        zIndex: styles.zIndex,
        position: styles.position,
        top: particlesRect.top,
        left: particlesRect.left,
        right: particlesRect.right,
        bottom: particlesRect.bottom
      })
      
      // Check if it's being covered by other elements
      const elementsAbove = findElementsAtPosition(
        particlesRect.left + particlesRect.width / 2, 
        particlesRect.top + particlesRect.height / 2
      )
      
      console.log("Elements potentially covering particles:", elementsAbove)
    }
    
    // Check if the canvas was created
    const canvas = document.querySelector("#tsparticles canvas")
    console.log("Particles canvas exists:", !!canvas)
    
    if (canvas) {
      const styles = window.getComputedStyle(canvas)
      console.log("Canvas details:", {
        width: (canvas as HTMLCanvasElement).width,
        height: (canvas as HTMLCanvasElement).height,
        visibility: styles.visibility,
        display: styles.display,
        opacity: styles.opacity,
        zIndex: styles.zIndex
      })
    }
    
    // Check what background colors are present on the page
    const backgroundColors = getPageBackgroundColors()
    console.log("Page background colors:", backgroundColors)
    
    // Check for common background classes that might help with auto-detection
    const checkBackgroundClass = (selector: string) => {
      const elements = document.querySelectorAll(selector);
      return elements.length > 0;
    };
    
    const backgroundClasses = {
      gradient: checkBackgroundClass('.bg-gradient-to-b, .bg-gradient-to-r, .bg-gradient-to-l, .bg-gradient-to-t'),
      emeraldDark: checkBackgroundClass('.bg-emerald-700, .bg-emerald-800, .bg-emerald-900, .from-emerald-700, .from-emerald-800, .from-emerald-900'),
      emeraldLight: checkBackgroundClass('.bg-emerald-50, .bg-emerald-100, .bg-emerald-200, .bg-emerald-300, .from-emerald-50, .from-emerald-100, .from-emerald-200, .from-emerald-300'),
      dark: checkBackgroundClass('.bg-gray-800, .bg-gray-900, .bg-slate-800, .bg-slate-900, .bg-black, .dark')
    };
    
    console.log("Background classes found:", backgroundClasses);
    
  }, [])
  
  return null
}

// Helper function to find elements at a specific position
function findElementsAtPosition(x: number, y: number) {
  const elements: Array<{tag: string; id: string; class: string; zIndex: string; backgroundColor: string}> = []
  const elementStack = document.elementsFromPoint(x, y)
  
  if (elementStack) {
    // Get only first 5 elements to avoid overwhelming the console
    const topElements = elementStack.slice(0, 5)
    
    topElements.forEach(element => {
      if (element.id !== "tsparticles" && !element.closest("#tsparticles")) {
        const styles = window.getComputedStyle(element)
        elements.push({
          tag: element.tagName,
          id: element.id,
          class: element.className,
          zIndex: styles.zIndex,
          backgroundColor: styles.backgroundColor
        })
      }
    })
  }
  
  return elements
}

// Helper function to analyze background colors on the page
function getPageBackgroundColors() {
  const colors: Array<{element: string; backgroundColor: string; backgroundImage: string}> = []
  const sections = document.querySelectorAll('section, div[class*="bg-"]')
  
  sections.forEach(section => {
    const styles = window.getComputedStyle(section)
    if (styles.backgroundColor !== 'rgba(0, 0, 0, 0)') {
      colors.push({
        element: section.tagName + (section.className ? '.' + section.className.replace(/ /g, '.') : ''),
        backgroundColor: styles.backgroundColor,
        backgroundImage: styles.backgroundImage
      })
    }
  })
  
  return colors
}
