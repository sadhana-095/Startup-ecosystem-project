import type { Container } from "@tsparticles/engine";

/**
 * Updated utility function to force a redraw of particles - works with tsparticles v3
 */
export function forceParticlesRedraw(container?: Container): void {
  if (!container) {
    // If no container provided, try to find it in the DOM
    const particlesElement = document.getElementById("tsparticles");
    if (particlesElement) {
      // Force a redraw by toggling a class
      particlesElement.classList.add("redraw");
      setTimeout(() => particlesElement.classList.remove("redraw"), 50);
    }
    return;
  }

  try {
    // With tsparticles v3, different methods may be available
    // Try various approaches in order of preference

    // First try pause/play toggling (available in v3)
    if (typeof container.pause === 'function' && typeof container.play === 'function') {
      container.pause();
      setTimeout(() => {
        try {
          container.play();
        } catch (e) {
          console.warn('Error playing particles after pause', e);
        }
      }, 10);
      return;
    }

    // Then try refresh method (older versions)
    if (typeof container.refresh === 'function') {
      container.refresh();
      return;
    }

    // Then try canvas manipulation as fallback
    const canvas = container.canvas?.element;
    if (canvas instanceof HTMLCanvasElement) {
      const width = canvas.width;
      const height = canvas.height;
      
      // Only proceed if we have valid dimensions
      if (width && height) {
        // Slightly adjust size to force redraw
        canvas.width = width + 1;
        canvas.height = height + 1;
        
        // Reset to original size
        setTimeout(() => {
          if (canvas) {
            canvas.width = width;
            canvas.height = height;
          }
        }, 50);
      }
    }
  } catch (e) {
    console.error('Error refreshing particles:', e);
  }
}
