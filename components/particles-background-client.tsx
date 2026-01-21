"use client"

import { useCallback, useEffect, useState } from "react"
import { Particles } from "@tsparticles/react"
import { type Container, type Engine } from "@tsparticles/engine"
import { loadSlim } from "@tsparticles/slim"
import { useIsMobile } from "@/hooks/use-mobile"
import { 
  detectPageBackgroundType, 
  getAdaptiveColors,
  getParticleNumber,
  getParticleSpeed,
  getParticleSize,
  getLinkWidth,
  type PageBackground as PageBackgroundType,
  type ParticleTheme
} from "@/lib/particle-utils"
import { forceParticlesRedraw } from "@/lib/particles-fix"

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

const ParticlesBackgroundClient = ({
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
  
  // Initialize on client-side only
  useEffect(() => {
    setMounted(true)
    
    // Add a debug message
    console.log("ParticlesBackground: Component mounted")
    
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
  const currentTheme = isMobile && mobileTheme ? mobileTheme : theme
  const currentDensity = isMobile && mobileDensity ? mobileDensity : density
  const currentSpeed = isMobile && mobileSpeed ? mobileSpeed : speed
  const opacity = isMobile ? mobileOpacity : desktopOpacity
  
  // Get appropriate colors based on theme
  const colors = getAdaptiveColors({
    theme: currentTheme, 
    density: currentDensity,
    speed: currentSpeed,
    opacity,
    pageBackground: pageBackground || detectedBackground,
    isMobile: !!isMobile,
  })
  
  // Get the appropriate number of particles and links based on density and screen size
  const particleNumber = getParticleNumber(currentDensity, !!isMobile);
  
  // Get the appropriate speed based on speed setting
  const particleSpeed = getParticleSpeed(currentSpeed, !!isMobile);
  
  // Get the appropriate size based on screen size
  const particleSize = getParticleSize(!!isMobile);
  
  // Get the appropriate link width based on screen size
  const linkWidth = getLinkWidth(!!isMobile);

  return (
    <div className={`fixed inset-0 w-full h-full ${className}`} style={{ zIndex }}>
      <Particles
        id="tsparticles"
        className="w-full h-full"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: colors.background,
          },
          fpsLimit: 60,
          fullScreen: false,
          interactivity: {
            detectsOn: "canvas",
            events: {
              onClick: {
                enable: false,
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
              opacity: opacity * 0.8, // Slightly reduce opacity for links
              width: linkWidth,
            },
            collisions: {
              enable: false,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: "bounce",
              random: false,
              speed: particleSpeed,
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
              value: particleNumber,
            },
            opacity: {
              value: opacity,
            },
            shape: {
              type: "circle",
            },
            size: {
              // @ts-ignore - type definitions incompatible with current version
              value: particleSize,
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  )
}

export default ParticlesBackgroundClient
