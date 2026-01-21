"use client"

import { memo, useState, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { Alert, AlertDescription } from "@/components/ui/alert"

const DASHBOARD_URL = "https://us1.ca.analytics.ibm.com/bi/?perspective=dashboard&pathRef=.my_folders%2FNew%2Bdashboard%2Bfor%2Bmy%2Bbi%2Bproject%2B2&closeWindowOnLastView=true&ui_appbar=false&ui_navbar=false&shareMode=embedded&action=view&mode=dashboard&subView=model00000196be09f4ac_00000003"

const Dashboard = memo(function Dashboard() {
  const [iframeLoading, setIframeLoading] = useState(true)
  const [iframeError, setIframeError] = useState<string | null>(null)
  const [iframeVisible, setIframeVisible] = useState(false)

  const handleIframeLoad = useCallback(() => {
    setIframeLoading(false)
    setIframeError(null)
    setIframeVisible(true)
  }, [])

  const handleIframeError = useCallback(() => {
    setIframeLoading(false)
    setIframeError("Failed to load the dashboard. Please check your connection and try again.")
    setIframeVisible(false)
  }, [])

  const retryLoading = useCallback(() => {
    setIframeLoading(true)
    setIframeError(null)
    setIframeVisible(false)
    // Force iframe reload by updating the key
    const iframe = document.querySelector('iframe')
    if (iframe) {
      iframe.src = iframe.src
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background/98 to-background/95">
      <div className="flex-1 p-2 md:p-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-7xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent blur-3xl -z-10" />
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-4 md:mb-6">
              <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent animate-pulse-slow">
                Startup Ecosystem Explorer
              </span>
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Card className="h-[calc(100vh-8rem)] shadow-2xl border-primary/20 backdrop-blur-md bg-card/90 relative overflow-hidden">
              <CardContent className="p-0 h-full">
                <div className="w-full h-full relative" role="region" aria-label="Analytics Dashboard">
                  <AnimatePresence mode="wait">
                    {iframeLoading && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm"
                      >
                        <div className="dashboard-loading-spinner" 
                             role="progressbar" 
                             aria-label="Loading dashboard"
                        />
                      </motion.div>
                    )}
                    
                    {iframeError && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute inset-0 flex items-center justify-center bg-background/50"
                      >
                        <Alert variant="destructive" className="max-w-md mx-4">
                          <AlertDescription>
                            {iframeError}
                            <button 
                              onClick={retryLoading}
                              className="block w-full mt-2 text-sm text-primary hover:text-primary/80 underline"
                              aria-label="Retry loading dashboard"
                            >
                              Click to try again
                            </button>
                          </AlertDescription>
                        </Alert>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className={`w-full h-full ${iframeVisible ? '' : 'hidden'}`}>
                    <iframe 
                      title="Startup Ecosystem Analytics Dashboard"
                      src={DASHBOARD_URL}
                      className={`dashboard-iframe w-full h-full rounded-xl ${iframeVisible ? 'loaded' : ''}`}
                      sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                      referrerPolicy="strict-origin"
                      onLoad={handleIframeLoad}
                      onError={handleIframeError}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
})

export default Dashboard
