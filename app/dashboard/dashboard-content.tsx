"use client"

import { memo, useEffect, useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import DashboardGuard from "@/components/dashboard-guard"
import { ParticlesBackground } from "@/components/particles-background"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  LineChart, BarChart, Activity, TrendingUp, PieChart, 
  Users, Globe, BarChart3, Zap, Search, RefreshCw, AlertCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"

const DashboardContent = memo(function DashboardContent() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeTab, setActiveTab] = useState("analytics")
  const [iframeLoading, setIframeLoading] = useState(true)
  const [iframeError, setIframeError] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Simulate loading and add animation classes when content is loaded
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 300)
    
    return () => clearTimeout(timer)
  }, [])

  // Handle iframe loading/error
  const handleIframeLoad = () => {
    setIframeLoading(false)
    setIframeError(false)
  }

  const handleIframeError = () => {
    setIframeLoading(false)
    setIframeError(true)
    console.error("Failed to load IBM Analytics dashboard iframe")
  }

  const retryLoadIframe = () => {
    setIframeLoading(true)
    setIframeError(false)
    
    // Reset the iframe src to reload it
    if (iframeRef.current) {
      const currentSrc = iframeRef.current.src
      iframeRef.current.src = ''
      setTimeout(() => {
        if (iframeRef.current) {
          iframeRef.current.src = currentSrc
        }
      }, 100)
    }
  }

  return (
    <DashboardGuard>
      <div className="min-h-screen flex flex-col bg-background relative">
        {/* Premium background with particles */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <ParticlesBackground 
            theme="emerald" 
            density="low" 
            speed="slow" 
            desktopOpacity={0.2} 
            pageBackground="light"
          />
        </div>
        
        <div className="flex-1 p-4 md:p-6 lg:p-8 relative z-10">
          <div className={`transition-all duration-500 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-6 gradient-text">
              Startup Ecosystem Explorer
            </h1>
            
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">
              Access comprehensive analytics and insights on the global startup ecosystem 
              to inform your strategic decisions.
            </p>
            
            {/* Dashboard tabs */}
            <Tabs 
              defaultValue="analytics" 
              className="w-full max-w-7xl mx-auto"
              onValueChange={setActiveTab}
            >
              <div className="flex justify-center mb-8">
                <TabsList className="premium-card backdrop-blur-md bg-background/60 border border-primary/10 p-1">
                  <TabsTrigger 
                    value="analytics" 
                    className={`${activeTab === "analytics" ? "premium-button" : ""} data-[state=active]:shadow-sm transition-all duration-300`}
                  >
                    <Activity className="mr-2 h-4 w-4" />
                    Analytics
                  </TabsTrigger>
                  <TabsTrigger 
                    value="trends" 
                    className={`${activeTab === "trends" ? "premium-button" : ""} data-[state=active]:shadow-sm transition-all duration-300`}
                  >
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Trends
                  </TabsTrigger>
                  <TabsTrigger 
                    value="ecosystem" 
                    className={`${activeTab === "ecosystem" ? "premium-button" : ""} data-[state=active]:shadow-sm transition-all duration-300`}
                  >
                    <Globe className="mr-2 h-4 w-4" />
                    Ecosystem
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent 
                value="analytics" 
                className={`mt-0 fade-in ${activeTab === "analytics" ? "block" : "hidden"}`}
              >
                <Card className="premium-card bg-background/50 backdrop-blur-md shadow-xl border border-primary/10 overflow-hidden">
                  <CardContent className="p-0 h-[calc(100vh-18rem)]">
                    <div className="relative w-full h-full">
                      {/* Loading indicator */}
                      <div className={`absolute inset-0 flex items-center justify-center bg-background/30 backdrop-blur-sm z-10 ${iframeLoading ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                      </div>
                      
                      {/* Error state */}
                      {iframeError && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/95 backdrop-blur-sm z-20 p-6">
                          <AlertCircle className="h-12 w-12 text-destructive mb-4" />
                          <h3 className="text-xl font-semibold mb-2">Unable to load dashboard</h3>
                          <p className="text-muted-foreground text-center max-w-md mb-6">
                            We're having trouble connecting to the IBM Analytics dashboard. This could be due to network connectivity issues or the dashboard may be temporarily unavailable.
                          </p>
                          <Button 
                            onClick={retryLoadIframe} 
                            className="flex items-center gap-2"
                          >
                            <RefreshCw className="h-4 w-4" />
                            Retry Connection
                          </Button>
                        </div>
                      )}
                      
                      {/* Analytics dashboard iframe */}
                      <iframe 
                        ref={iframeRef}
                        title="Startup Ecosystem Analytics Dashboard"
                        src="https://us1.ca.analytics.ibm.com/bi/?perspective=dashboard&pathRef=.my_folders%2FNew%2Bdashboard%2Bfor%2Bmy%2Bbi%2Bproject%2B2&closeWindowOnLastView=true&ui_appbar=false&ui_navbar=false&shareMode=embedded&action=view&mode=dashboard&subView=model00000196be09f4ac_00000003" 
                        className="w-full h-full border-none"
                        allowFullScreen
                        onLoad={handleIframeLoad}
                        onError={handleIframeError}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent 
                value="trends" 
                className={`mt-0 fade-in ${activeTab === "trends" ? "block" : "hidden"}`}
              >
                <Card className="premium-card bg-background/50 backdrop-blur-md shadow-xl border border-primary/10">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                      <div className="premium-card p-6 slide-up delay-100">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="bg-primary/10 p-3 rounded-full">
                            <LineChart className="h-6 w-6 text-primary" />
                          </div>
                          <h3 className="font-medium">Funding Trends</h3>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4">
                          Latest data showing funding patterns across stages and regions
                        </p>
                        <div className="h-40 bg-muted/50 rounded-lg flex items-center justify-center text-muted-foreground">
                          Chart visualization placeholder
                        </div>
                      </div>
                      
                      <div className="premium-card p-6 slide-up delay-200">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="bg-secondary/10 p-3 rounded-full">
                            <BarChart className="h-6 w-6 text-secondary" />
                          </div>
                          <h3 className="font-medium">Sector Growth</h3>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4">
                          Emerging sectors with highest growth rates
                        </p>
                        <div className="h-40 bg-muted/50 rounded-lg flex items-center justify-center text-muted-foreground">
                          Chart visualization placeholder
                        </div>
                      </div>
                      
                      <div className="premium-card p-6 slide-up delay-300">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="bg-accent/10 p-3 rounded-full">
                            <PieChart className="h-6 w-6 text-accent" />
                          </div>
                          <h3 className="font-medium">Investment Distribution</h3>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4">
                          Capital allocation across regions and technologies
                        </p>
                        <div className="h-40 bg-muted/50 rounded-lg flex items-center justify-center text-muted-foreground">
                          Chart visualization placeholder
                        </div>
                      </div>
                    </div>
                    
                    <div className="premium-card p-6 slide-up delay-400">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <Zap className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-medium">Trending Technologies</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-muted/30 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">AI & Machine Learning</h4>
                          <p className="text-muted-foreground text-sm">
                            64% growth in funding with emphasis on generative AI applications
                          </p>
                        </div>
                        <div className="bg-muted/30 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Sustainable Tech</h4>
                          <p className="text-muted-foreground text-sm">
                            42% increase in cleantech investments across early-stage startups
                          </p>
                        </div>
                        <div className="bg-muted/30 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">FinTech Innovation</h4>
                          <p className="text-muted-foreground text-sm">
                            31% growth in B2B financial infrastructure and embedded finance
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent 
                value="ecosystem" 
                className={`mt-0 fade-in ${activeTab === "ecosystem" ? "block" : "hidden"}`}
              >
                <Card className="premium-card bg-background/50 backdrop-blur-md shadow-xl border border-primary/10">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="lg:w-2/3 premium-card p-6 slide-up">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="bg-primary/10 p-3 rounded-full">
                            <Globe className="h-6 w-6 text-primary" />
                          </div>
                          <h3 className="font-medium">Global Ecosystem Map</h3>
                        </div>
                        <div className="h-80 bg-muted/50 rounded-lg flex items-center justify-center text-muted-foreground">
                          Interactive ecosystem map placeholder
                        </div>
                      </div>
                      
                      <div className="lg:w-1/3 space-y-6">
                        <div className="premium-card p-6 slide-up delay-200">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="bg-secondary/10 p-3 rounded-full">
                              <BarChart3 className="h-6 w-6 text-secondary" />
                            </div>
                            <h3 className="font-medium">Top Hubs</h3>
                          </div>
                          <ul className="space-y-2 text-sm">
                            <li className="flex justify-between">
                              <span>Silicon Valley</span>
                              <span className="font-medium">94.2</span>
                            </li>
                            <li className="flex justify-between">
                              <span>New York</span>
                              <span className="font-medium">86.5</span>
                            </li>
                            <li className="flex justify-between">
                              <span>London</span>
                              <span className="font-medium">85.9</span>
                            </li>
                            <li className="flex justify-between">
                              <span>Beijing</span>
                              <span className="font-medium">83.7</span>
                            </li>
                            <li className="flex justify-between">
                              <span>Tel Aviv</span>
                              <span className="font-medium">81.2</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div className="premium-card p-6 slide-up delay-300">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="bg-accent/10 p-3 rounded-full">
                              <Users className="h-6 w-6 text-accent" />
                            </div>
                            <h3 className="font-medium">Key Players</h3>
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs">VC</div>
                              <div>
                                <p className="font-medium">Andreessen Horowitz</p>
                                <p className="text-xs text-muted-foreground">$25.6B AUM</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs">VC</div>
                              <div>
                                <p className="font-medium">Sequoia Capital</p>
                                <p className="text-xs text-muted-foreground">$85.5B AUM</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs">AC</div>
                              <div>
                                <p className="font-medium">Y Combinator</p>
                                <p className="text-xs text-muted-foreground">4,000+ companies</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="premium-card p-6 mt-6 slide-up delay-400">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <Search className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-medium">Ecosystem Explorer</h3>
                      </div>
                      <div className="premium-input p-3 flex items-center gap-2 max-w-2xl mx-auto">
                        <Search className="h-5 w-5 text-muted-foreground" />
                        <input 
                          type="text" 
                          placeholder="Search startups, investors, or technologies..." 
                          className="bg-transparent border-none flex-1 focus:outline-none text-sm"
                        />
                        <button className="premium-button text-xs px-3 py-1.5 rounded-md">
                          Search
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardGuard>
  )
})

export default DashboardContent
