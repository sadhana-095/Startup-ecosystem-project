import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Safely check if we're in the browser
    if (typeof window === 'undefined') {
      return
    }
    
    // Set initial value
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    
    // Add event listener with compatibility fallback
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    try {
      // Modern approach
      const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
      
      // Check if addEventListener is available (modern browsers)
      if (mql.addEventListener) {
        mql.addEventListener("change", onChange)
        return () => mql.removeEventListener("change", onChange)
      } else {
        // Fallback for older browsers
        // @ts-ignore - Older browsers use this deprecated API
        mql.addListener(onChange)
        return () => {
          // @ts-ignore - Older browsers use this deprecated API
          mql.removeListener(onChange)
        }
      }
    } catch (e) {
      // Ultimate fallback: just use resize event
      console.warn('MediaQueryList API not fully supported, using resize event')
      window.addEventListener('resize', onChange)
      return () => window.removeEventListener('resize', onChange)
    }
  }, [])

  // Default to desktop if undefined (e.g., during SSR)
  return isMobile === undefined ? false : isMobile
}
