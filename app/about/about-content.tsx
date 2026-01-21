"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Globe, BarChart3, Users, Shield, Sparkles } from "lucide-react"
import dynamic from "next/dynamic"

// Dynamically import the AnimatedPattern component with no SSR
const AnimatedPattern = dynamic(
  () => import('@/components/animated-pattern'),
  { ssr: false }
)

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function AboutContent() {
  return (
    <div className="bg-gradient-to-b from-background via-background/98 to-background/95 relative">
      {/* Hero section */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <AnimatedPattern 
            patternType="circuit"
            patternColor="hsl(var(--primary))"
            patternOpacity={0.15}
            animationSpeed="medium"
            zIndex={1}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-background/95" />
        </div>
        
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <motion.div 
            className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center rounded-full px-4 py-1 text-sm font-medium bg-primary/10 text-primary ring-1 ring-inset ring-primary/20 mb-4">
              About Us
            </div>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Our Mission & Vision
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              We're building the most comprehensive platform for navigating and understanding the global startup
              ecosystem. Our goal is to democratize access to startup data and insights, enabling founders, investors,
              and ecosystem builders to make better decisions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 sm:py-32 relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div 
            className="mx-auto max-w-2xl lg:text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-base font-semibold leading-7 text-primary">Our Values</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              What Drives Us Forward
            </p>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Our core values shape everything we do, from product development to how we serve our community.
            </p>
          </motion.div>

          <motion.div 
            className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <motion.div variants={fadeInUp} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Globe className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  Global Impact
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">We believe in the power of global innovation and work to connect startup ecosystems worldwide, fostering cross-border collaboration and knowledge sharing.</p>
                </dd>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Shield className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  Data Integrity
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">We maintain the highest standards of data accuracy and reliability, ensuring our users can make confident decisions based on comprehensive and verified information.</p>
                </dd>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Sparkles className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  Innovation
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">We continuously push boundaries to deliver cutting-edge solutions, leveraging advanced technologies to provide deeper insights into the startup ecosystem.</p>
                </dd>
              </motion.div>
            </dl>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 sm:py-32 relative">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-primary/5 to-background/95" />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div 
            className="mx-auto max-w-2xl lg:text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-base font-semibold leading-7 text-primary">Our Platform</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Comprehensive Startup Analytics
            </p>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Discover how our platform empowers you with data-driven insights and powerful analytics tools.
            </p>
          </motion.div>

          <motion.div 
            className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
              <motion.div variants={fadeInUp} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <BarChart3 className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  Advanced Analytics
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">Powerful data visualization and trend analysis tools that help you identify emerging sectors, track funding patterns, and discover market opportunities with precision.</p>
                </dd>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Users className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  Network Mapping
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">Interactive visualization of connections between founders, investors, and companies, helping you understand relationship dynamics and identify strategic opportunities.</p>
                </dd>
              </motion.div>
            </dl>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32 relative">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-primary/5 to-background/95" />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div 
            className="mx-auto max-w-2xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Ready to explore the startup ecosystem?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              Join thousands of founders, investors, and ecosystem builders who are already using our platform.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/login">
                <Button size="lg" className="gap-2">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/team" className="text-sm font-semibold leading-6 text-foreground">
                Meet our team <span aria-hidden="true">→</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
