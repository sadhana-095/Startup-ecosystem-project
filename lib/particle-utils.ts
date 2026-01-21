// Helper functions for particle background rendering and optimization

import type { Container } from "@tsparticles/engine";

export type PageBackground = "light" | "dark" | "emerald-light" | "emerald-dark" | "gradient";
export type ParticleTheme = "light" | "dark" | "system" | "emerald" | "deepEmerald" | "lightEmerald" | "contrastEmerald" | "whiteEmerald";
export type ParticleDensity = 'low' | 'medium' | 'high';
export type ParticleSpeed = 'slow' | 'medium' | 'fast';

export interface ParticleOptions {
  theme: ParticleTheme;
  density: ParticleDensity;
  speed: ParticleSpeed;
  opacity: number;
  pageBackground?: PageBackground;
  isMobile: boolean;
}

interface ColorConfig {
  background: string;
  particles: string;
  links: string;
}

/**
 * Determines the optimal color configuration based on theme and page background
 */
export function getAdaptiveColors(options: ParticleOptions): ColorConfig {
  const { theme, pageBackground, isMobile } = options;
  
  // First check if we can adapt colors based on the page background context
  if (pageBackground) {
    switch (pageBackground) {
      case "dark":
        return {
          background: "transparent",
          particles: "#ffffff",
          links: "rgba(255, 255, 255, 0.8)", // Increased opacity for better visibility
        };
      case "emerald-dark":
        return {
          background: "transparent",
          particles: "#ffffff",  // White particles for maximum contrast on dark emerald
          links: "rgba(255, 255, 255, 0.8)",  // Increased link opacity
        };
      case "emerald-light":
        return {
          background: "transparent",
          particles: "#064e3b", // Even darker emerald for better contrast on light emerald
          links: "rgba(6, 78, 59, 0.8)",  // Increased link opacity
        };
      case "gradient":
        // Special case for homepage gradient (emerald-50 to white)
        return {
          background: "transparent",
          particles: "#064e3b", // Very dark emerald for maximum contrast on gradient
          links: "rgba(6, 78, 59, 0.9)", // Very high contrast links
        };
      case "light":
      default:
        return {
          background: "transparent",
          particles: "#047857", // Darker emerald for better visibility on light backgrounds
          links: "rgba(4, 120, 87, 0.8)", // Higher contrast links
        };
    }
  }
  
  // If no page background context, fall back to theme-based colors
  switch (theme) {
    case "dark":
      return {
        background: "transparent",
        particles: "#ffffff",
        links: "rgba(255, 255, 255, 0.5)",
      };
    case "emerald": 
      return {
        background: "transparent",
        particles: "#10b981",
        links: "rgba(16, 185, 129, 0.5)",
      };
    case "deepEmerald":
      return {
        background: "transparent",
        particles: "#0a7f56",
        links: "rgba(10, 127, 86, 0.4)",
      };
    case "lightEmerald":
      return {
        background: "transparent",
        particles: "#4ade80",
        links: "rgba(74, 222, 128, 0.4)",
      };
    case "contrastEmerald":
      return {
        background: "transparent",
        particles: "#064e3b", // Very dark emerald for maximum contrast
        links: "rgba(6, 78, 59, 0.6)",
      };
    case "whiteEmerald":
      return {
        background: "transparent",
        particles: "#ffffff", // White particles for dark emerald backgrounds
        links: "rgba(255, 255, 255, 0.5)",
      };
    default: // light
      return {
        background: "transparent",
        particles: "#34d399", // Lighter emerald for better visibility on light backgrounds
        links: "rgba(52, 211, 153, 0.5)",
      };
  }
}

/**
 * Determine particle density based on settings and device type
 */
export function getParticleNumber(density: ParticleDensity, isMobile: boolean): number {
  if (isMobile) {
    // Lower density for mobile
    switch (density) {
      case "low":
        return 30; // Very low for mobile
      case "high":
        return 60; // Medium-high for mobile
      default: // medium
        return 40; // Medium for mobile
    }
  } else {
    // Higher density for desktop
    switch (density) {
      case "low":
        return 50;
      case "high":
        return 150;
      default: // medium
        return 100;
    }
  }
}

/**
 * Determine particle speed based on settings and device type
 */
export function getParticleSpeed(speed: ParticleSpeed, isMobile: boolean): number {
  // Mobile typically needs slower animations
  const mobileMultiplier = 0.8;
  const baseSpeed = (() => {
    switch (speed) {
      case "slow":
        return 1;
      case "fast":
        return 3;
      default: // medium
        return 2;
    }
  })();
  
  return isMobile ? baseSpeed * mobileMultiplier : baseSpeed;
}

/**
 * Get particle size based on device and page background
 */
export function getParticleSize(isMobile: boolean, pageBackground?: PageBackground) {
  // Adjust size based on page background type for better visibility
  switch (pageBackground) {
    case "light":
      // Much larger particles for better visibility on white backgrounds (login page)
      return isMobile ? 
        { min: 3.5, max: 7 } : // Much larger on mobile
        { min: 4, max: 9 };    // Much larger on desktop
        
    case "gradient":
      // Very large particles for gradient backgrounds (like homepage)
      return isMobile ? 
        { min: 4, max: 8 } :   // Very large on mobile
        { min: 5, max: 10 };   // Very large on desktop
        
    case "emerald-light":
      // Large particles for light emerald backgrounds
      return isMobile ? 
        { min: 3.5, max: 7 } :
        { min: 4, max: 9 };
        
    case "emerald-dark":
    case "dark":
      // Medium-large particles for dark backgrounds 
      return isMobile ? 
        { min: 3, max: 6 } :
        { min: 3.5, max: 8 };
        
    default:
      // Default larger sizes
      return isMobile ? 
        { min: 3.5, max: 7 } : // Larger standard size on mobile
        { min: 4, max: 9 };    // Larger standard size on desktop
  }
}

/**
 * Get link width based on device and page background
 */
export function getLinkWidth(isMobile: boolean, pageBackground?: PageBackground): number {
  // Adjust link width based on background for better visibility
  switch (pageBackground) {
    case "light":
      // Thicker links on white backgrounds (login page)
      return isMobile ? 1.0 : 1.2;
      
    case "gradient":
      // Thicker links for gradient backgrounds (homepage)
      return isMobile ? 1.2 : 1.6;
      
    case "emerald-light":
      // Medium-thick links for light emerald backgrounds
      return isMobile ? 1.0 : 1.4;
      
    case "emerald-dark":
    case "dark":
      // Thinner links for dark backgrounds (already good contrast)
      return isMobile ? 0.9 : 1.3;
      
    default:
      // Default link width
      return isMobile ? 1 : 1.5;
  }
}

/**
 * Utility function to force a redraw of particles when needed
 */
export function forceParticlesRedraw(container?: Container): void {
  if (container) {
    try {
      // In tsparticles v3+, the API has changed
      // We need to check which method is available
      if (typeof container.refresh === 'function') {
        // For backwards compatibility with older versions
        container.refresh();
      } else if (typeof container.update === 'function') {
        // For newer versions that might use update instead
        container.update();
      }
      
      // Alternative method to force redraw using canvas manipulation
      const canvas = container.canvas?.element;
      if (canvas) {
        const width = canvas.width;
        const height = canvas.height;
        
        // Safely update the canvas size to trigger a redraw
        if (width && height) {
          // Slightly adjust size to force redraw
          canvas.width = width + 1;
          canvas.height = height + 1;
          
          // Reset to original size
          setTimeout(() => {
            canvas.width = width;
            canvas.height = height;
          }, 50);
        }
      }
    } catch (e) {
      console.error('Error refreshing particles:', e);
    }
  } else {
    // Try to find the container if not provided
    const particlesContainer = document.getElementById("tsparticles");
    if (particlesContainer) {
      // Force a redraw by toggling a class
      particlesContainer.classList.add("redraw");
      setTimeout(() => particlesContainer.classList.remove("redraw"), 50);
    }
  }
}

/**
 * Detect the dominant background color of the element behind the particles
 * This can be used to automatically adjust particle colors
 */
export function detectBackgroundColor(element?: HTMLElement): string | null {
  // Use document.body if no element is provided
  const targetElement = element || document.body;
  
  // Get the computed style
  const computedStyle = window.getComputedStyle(targetElement);
  const backgroundColor = computedStyle.backgroundColor;
  
  // If the background is transparent, try to find the nearest parent with a background
  if (backgroundColor === 'rgba(0, 0, 0, 0)' || backgroundColor === 'transparent') {
    let parent = targetElement.parentElement;
    while (parent) {
      const parentStyle = window.getComputedStyle(parent);
      const parentBg = parentStyle.backgroundColor;
      
      if (parentBg !== 'rgba(0, 0, 0, 0)' && parentBg !== 'transparent') {
        return parentBg;
      }
      
      parent = parent.parentElement;
    }
    
    // If we reach here, no solid background was found
    return null;
  }
  
  return backgroundColor;
}

/**
 * Detect page background type based on DOM elements and CSS classes
 * Helps particles adapt to different page designs
 */
export function detectPageBackgroundType(): PageBackground {
  if (typeof window === 'undefined') {
    return "light"; // Default for SSR
  }
  
  // Helper to check for background classes
  const hasClass = (selector: string): boolean => {
    // Handle comma-separated selectors properly by splitting and checking each
    const selectors = selector.split(',').map(s => s.trim());
    return selectors.some(s => document.querySelectorAll(s).length > 0);
  };
  
  // Check URL path to help identify specific pages
  const path = window.location.pathname;
  
  // Login page typically has white background
  if (path.includes('/login')) {
    return "light";
  }
  
  // Check for gradient backgrounds (common in hero sections)
  if (hasClass('.bg-gradient-to-b, .bg-gradient-to-r, .bg-gradient-to-l, .bg-gradient-to-t')) {
    // Check if this is the homepage (which has a specific gradient)
    if (path === '/') {
      return "gradient";
    }
    
    // Check the gradient colors to determine type
    if (hasClass('.from-emerald-700, .from-emerald-800, .from-emerald-900, .to-emerald-700, .to-emerald-800, .to-emerald-900')) {
      return "emerald-dark";
    }
    
    if (hasClass('.from-emerald-50, .from-emerald-100, .from-emerald-200, .from-emerald-300, .to-emerald-50, .to-emerald-100, .to-emerald-200, .to-emerald-300')) {
      return "emerald-light";
    }
    
    return "gradient";
  }
  
  // Check for emerald backgrounds
  if (hasClass('.bg-emerald-700, .bg-emerald-800, .bg-emerald-900')) {
    return "emerald-dark";
  }
  
  if (hasClass('.bg-emerald-50, .bg-emerald-100, .bg-emerald-200, .bg-emerald-300')) {
    return "emerald-light";
  }
  
  // Check for dark backgrounds
  if (hasClass('.bg-gray-800, .bg-gray-900, .bg-slate-800, .bg-slate-900, .bg-black, .dark')) {
    return "dark";
  }
  
  // Default to light
  return "light";
}