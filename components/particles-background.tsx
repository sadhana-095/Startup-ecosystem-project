"use client"

import { useCallback, useEffect, useState } from "react"
import { Particles } from "@tsparticles/react"
import { type Container, type Engine } from "@tsparticles/engine"
import { loadSlim } from "@tsparticles/slim"
import { useIsMobile } from "@/hooks/use-mobile"
import { 
  detectPageBackgroundType, 
  forceParticlesRedraw,
  getAdaptiveColors,
  getParticleNumber,
  getParticleSpeed,
  getParticleSize,
  getLinkWidth,
  type PageBackground as PageBackgroundType,
  type ParticleTheme
} from "@/lib/particle-utils"

// Use the imported types
type PageBackground = PageBackgroundType;
type Theme = ParticleTheme;

interface ParticlesBackgroundProps {
  className?: string;
  theme?: Theme;
  mobileTheme?: Theme;
  density?: 'low' | 'medium' | 'high';
  mobileDensity?: 'low' | 'medium' | 'high';
  speed?: 'slow' | 'medium' | 'fast';
  mobileSpeed?: 'slow' | 'medium' | 'fast';
  desktopOpacity?: number;
  mobileOpacity?: number;
  disableOnSmallScreens?: boolean;
  pageBackground?: PageBackground;
  zIndex?: number;
}

export const ParticlesBackground = ({
  className = "",
  theme = "emerald",
  mobileTheme,
  density = 'medium',
  mobileDensity,
  speed = 'medium',
  mobileSpeed,
  desktopOpacity = 0.4,
  mobileOpacity = 0.3,
  disableOnSmallScreens = true,
  pageBackground,
  zIndex = 1,
}: ParticlesBackgroundProps) => {
  const [mounted, setMounted] = useState(false)
  const isMobile = useIsMobile()
  const [windowWidth, setWindowWidth] = useState(0)
  const [particlesContainer, setParticlesContainer] = useState<Container | undefined>(undefined)
  const particlesId = "tsparticles-main"
  
  // Initialize on client-side only
  useEffect(() => {
    setMounted(true)
    
    // Set initial window width
    const checkWindowSize = () => {
      const width = window.innerWidth
      setWindowWidth(width)
    }
    
    // Check size on mount
    checkWindowSize()
    
    // Add resize listener
    window.addEventListener('resize', checkWindowSize)
    
    return () => {
      window.removeEventListener('resize', checkWindowSize)
    }
  }, [])
  
  // Auto-detect page background type if not explicitly provided
  const [detectedBackground, setDetectedBackground] = useState<PageBackground | undefined>(undefined)
  
  useEffect(() => {
    if (mounted && !pageBackground) {
      // Use the utility function from particle-utils.ts
      const detected = detectPageBackgroundType();
      setDetectedBackground(detected);
      console.log("Auto-detected page background:", detected);
    }
  }, [mounted, pageBackground]);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    if (container) {
      setParticlesContainer(container);
      console.log("Particles container loaded");
      forceParticlesRedraw(container);
      console.log("Particles loaded and redrawn");
    }
  }, [])
  
  // Effect to force redraw when container exists and window is resized
  useEffect(() => {
    if (particlesContainer && windowWidth) {
      forceParticlesRedraw(particlesContainer);
    }
  }, [particlesContainer, windowWidth]);

  // Don't render on server or if disabled on small screens and this is a small screen
  if (!mounted || (disableOnSmallScreens && isMobile)) return null
  
  // Adapt to screen size
  const effectiveTheme = isMobile && mobileTheme ? mobileTheme : theme
  const effectiveDensity = isMobile && mobileDensity ? mobileDensity : density
  const effectiveSpeed = isMobile && mobileSpeed ? mobileSpeed : speed
  const effectiveOpacity = isMobile ? mobileOpacity : desktopOpacity
  const effectiveBackground = pageBackground || detectedBackground || "light"
  
  // Get appropriate colors based on theme and background
  const colors = getAdaptiveColors({
    theme: effectiveTheme, 
    density: effectiveDensity,
    speed: effectiveSpeed,
    opacity: effectiveOpacity,
    pageBackground: effectiveBackground,
    isMobile: isMobile,
  })
  
  // Log configuration for debugging
  useEffect(() => {
    if (mounted) {
      console.log('Particles config:', {
        isMobile,
        theme: effectiveTheme,
        density: effectiveDensity,
        speed: effectiveSpeed,
        opacity: effectiveOpacity,
        pageBackground,
        detectedBackground,
        effectiveBackground
      })
    }
  }, [mounted, isMobile, effectiveTheme, effectiveDensity, effectiveSpeed, effectiveOpacity, 
      pageBackground, detectedBackground, effectiveBackground])
  
  return (
    <div className={`fixed inset-0 w-full h-full ${className} z-[${zIndex}]`}>
      <Particles
        id={particlesId}
        options={{
          fullScreen: false,
          background: {
            color: {
              value: colors.background,
            },
          },
          fpsLimit: 60,
          interactivity: {
            detectsOn: "canvas",
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
                parallax: {
                  enable: false,
                  force: 20,
                  smooth: 10,
                },
              },
              resize: {
                enable: true
              },
            },
            modes: {
              repulse: {
                distance: 100,
                duration: 0.4,
              },
              push: {
                quantity: 4,
              },
            },
          },
          particles: {
            color: {
              value: colors.particles,
            },
            links: {
              color: colors.links,
              distance: 150,
              enable: true,
              opacity: effectiveOpacity * 0.8,
              width: getLinkWidth(isMobile),
            },
            collisions: {
              enable: false,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: "bounce",
              random: false,
              speed: getParticleSpeed(effectiveSpeed, isMobile),
              straight: false,
              attract: {
                enable: false,
                rotate: {
                  x: 600,
                  y: 1200
                },
              },
            },
            number: {
              density: {
                enable: true,
              },
              value: getParticleNumber(effectiveDensity, isMobile),
            },
            opacity: {
              value: effectiveOpacity,
            },
            shape: {
              type: "circle",
            },
            size: {
              // @ts-ignore - type definitions incompatible with current version
              value: getParticleSize(isMobile),
            },
          },
          detectRetina: true,
        }}
        className="h-full w-full"
      />
    </div>
  )
}

// Use the same export for both named and default exports
export default ParticlesBackground
