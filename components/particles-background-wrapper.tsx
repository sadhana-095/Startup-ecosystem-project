"use client"

import dynamic from 'next/dynamic'

// Dynamically import the ParticlesBackground component with no SSR
const ParticlesBackgroundClient = dynamic(
  () => import('./particles-background-client'),
  { ssr: false }
)

// Fix the missing type definition for props
interface ParticlesBackgroundProps {
  className?: string;
  theme?: "light" | "dark" | "system" | "emerald" | "deepEmerald" | "lightEmerald" | "contrastEmerald" | "whiteEmerald";
  mobileTheme?: "light" | "dark" | "system" | "emerald" | "deepEmerald" | "lightEmerald" | "contrastEmerald" | "whiteEmerald";
  density?: 'low' | 'medium' | 'high';
  mobileDensity?: 'low' | 'medium' | 'high';
  speed?: 'slow' | 'medium' | 'fast';
  mobileSpeed?: 'slow' | 'medium' | 'fast';
  desktopOpacity?: number;
  mobileOpacity?: number;
  disableOnSmallScreens?: boolean;
  pageBackground?: "light" | "dark" | "emerald-light" | "emerald-dark" | "gradient";
  zIndex?: number;
}

export const ParticlesBackground = (props: ParticlesBackgroundProps) => {
  return <ParticlesBackgroundClient {...props} />
}

export default ParticlesBackground
