"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Dynamically import the ParticlesBackground component with no SSR
const ParticlesBackground = dynamic(
  () => import('@/components/particles-background-wrapper').then(mod => mod.ParticlesBackground),
  { ssr: false }
)

export default function ParticlesTestUI() {
  const [particleBackground, setParticleBackground] = useState<"light" | "dark" | "emerald-light" | "emerald-dark" | "gradient">("light")
  const [opacity, setOpacity] = useState(0.4)
  const [density, setDensity] = useState<"low" | "medium" | "high">("medium")
  const [speed, setSpeed] = useState<"slow" | "medium" | "fast">("medium")

  return (
    <div className="min-h-screen">
      {/* Particles Background */}
      <ParticlesBackground 
        pageBackground={particleBackground}
        desktopOpacity={opacity}
        mobileOpacity={opacity}
        density={density}
        mobileDensity={density}
        speed={speed}
        mobileSpeed={speed}
        zIndex={1}
      />
      
      {/* UI Controls */}
      <div className="fixed top-4 right-4 z-50 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-2">Particle Controls</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Background Type:</label>
          <div className="flex gap-2 flex-wrap">
            <Button 
              variant={particleBackground === "light" ? "default" : "outline"} 
              size="sm"
              onClick={() => setParticleBackground("light")}
            >
              Light
            </Button>
            <Button 
              variant={particleBackground === "dark" ? "default" : "outline"} 
              size="sm"
              onClick={() => setParticleBackground("dark")}
            >
              Dark
            </Button>
            <Button 
              variant={particleBackground === "emerald-light" ? "default" : "outline"} 
              size="sm"
              onClick={() => setParticleBackground("emerald-light")}
            >
              Emerald Light
            </Button>
            <Button 
              variant={particleBackground === "emerald-dark" ? "default" : "outline"} 
              size="sm"
              onClick={() => setParticleBackground("emerald-dark")}
            >
              Emerald Dark
            </Button>
            <Button 
              variant={particleBackground === "gradient" ? "default" : "outline"} 
              size="sm"
              onClick={() => setParticleBackground("gradient")}
            >
              Gradient
            </Button>
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="opacity-slider" className="block text-sm font-medium mb-1">Opacity: {opacity}</label>
          <input
            id="opacity-slider"
            type="range"
            min="0.1"
            max="1"
            step="0.05"
            value={opacity}
            onChange={(e) => setOpacity(parseFloat(e.target.value))}
            className="w-full"
            title="Adjust particle opacity"
            aria-label="Adjust particle opacity"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Density:</label>
          <div className="flex gap-2">
            <Button 
              variant={density === "low" ? "default" : "outline"} 
              size="sm"
              onClick={() => setDensity("low")}
            >
              Low
            </Button>
            <Button 
              variant={density === "medium" ? "default" : "outline"} 
              size="sm"
              onClick={() => setDensity("medium")}
            >
              Medium
            </Button>
            <Button 
              variant={density === "high" ? "default" : "outline"} 
              size="sm"
              onClick={() => setDensity("high")}
            >
              High
            </Button>
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Speed:</label>
          <div className="flex gap-2">
            <Button 
              variant={speed === "slow" ? "default" : "outline"} 
              size="sm"
              onClick={() => setSpeed("slow")}
            >
              Slow
            </Button>
            <Button 
              variant={speed === "medium" ? "default" : "outline"} 
              size="sm"
              onClick={() => setSpeed("medium")}
            >
              Medium
            </Button>
            <Button 
              variant={speed === "fast" ? "default" : "outline"} 
              size="sm"
              onClick={() => setSpeed("fast")}
            >
              Fast
            </Button>
          </div>
        </div>
      </div>

      {/* Test Sections */}
      <div className="container mx-auto py-32">
        <Tabs defaultValue="light" className="w-full">
          <TabsList className="mx-auto mb-8">
            <TabsTrigger value="light">Light Background</TabsTrigger>
            <TabsTrigger value="dark">Dark Background</TabsTrigger>
            <TabsTrigger value="gradient">Gradient Background</TabsTrigger>
          </TabsList>
          
          <TabsContent value="light" className="p-8 bg-white rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-4">Light Background Test</h2>
            <p className="mb-4">This section has a white background. The particles should be visible with appropriate contrast.</p>
            <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.</p>
          </TabsContent>
          
          <TabsContent value="dark" className="p-8 bg-gray-900 text-white rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-4">Dark Background Test</h2>
            <p className="mb-4">This section has a dark background. The particles should adjust accordingly for visibility.</p>
            <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.</p>
          </TabsContent>
          
          <TabsContent value="gradient" className="p-8 bg-gradient-to-br from-emerald-500 to-blue-500 text-white rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-4">Gradient Background Test</h2>
            <p className="mb-4">This section has a gradient background. The particles should be visible against the gradient.</p>
            <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
