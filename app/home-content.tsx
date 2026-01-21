"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart3, Globe, Users, LockKeyhole } from "lucide-react"
import dynamic from "next/dynamic"
import ParticlesDebug from "@/components/particles-debug"
import './home.css'

// Dynamically import the ParticlesBackground component with no SSR
const ParticlesBackground = dynamic(
  () => import('@/components/particles-background-wrapper').then(mod => mod.ParticlesBackground),
  { ssr: false }
)

export default function HomeContent() {
  return (
    <main className="relative min-h-screen">
      {/* Particles Debug */}
      <ParticlesDebug />
      
      {/* Particles Background - Enhanced with much higher visibility for home page */}
      <ParticlesBackground 
        theme="contrastEmerald" 
        density="high" 
        mobileDensity="high"
        speed="medium" 
        mobileSpeed="slow" 
        desktopOpacity={0.75}  // Significantly increased for better visibility
        mobileOpacity={0.7}    // Significantly increased for better visibility
        pageBackground="gradient"
        zIndex={5}             // Increased to ensure visibility
      />
      
      <div className="relative flex flex-col z-10">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-emerald-50 to-white">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Navigate the Global Startup Ecosystem
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Discover, analyze, and connect with innovative startups and investors around the world. Our platform
              provides comprehensive data and insights to help you make informed decisions.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/login">
                <Button size="lg" className="gap-2">
                  Log in <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/about" className="text-sm font-semibold leading-6 text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>          {/* Decorative background */}
          <div className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
            <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-emerald-400 to-emerald-600 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] hero-gradient-shape" />
          </div>
      </section>

      {/* Features Section */}
      <section className="py-24 sm:py-32 relative z-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-emerald-600">Deeper Insights</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to understand the startup landscape
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our platform provides comprehensive tools and data to help you navigate the complex world of startups,
              funding, and innovation ecosystems.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-y-10 gap-x-8 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {[
                {
                  title: "Global Coverage",
                  description: "Track startup ecosystems across 100+ countries and 1000+ cities, with detailed profiles and growth metrics.",
                  Icon: Globe
                },
                {
                  title: "Advanced Analytics",
                  description: "Powerful data visualization and trend analysis to spot emerging sectors, funding patterns, and market opportunities.",
                  Icon: BarChart3
                },
                {
                  title: "Network Mapping",
                  description: "Visualize connections between founders, investors, and companies to understand relationship dynamics and find opportunities.",
                  Icon: Users
                },
                {
                  title: "Personalized Alerts",
                  description: "Stay informed with custom notifications about funding rounds, acquisitions, and market movements in your areas of interest.",
                  Icon: LockKeyhole
                }
              ].map(({ title, description, Icon }) => (
                <div key={title} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="feature-icon">
                      <Icon className="feature-icon-svg" aria-hidden="true" />
                    </div>
                    {title}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">
                    {description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative isolate overflow-hidden bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ready to explore the startup ecosystem?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Sign up today and get access to comprehensive data, powerful analytics, and actionable insights.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/login">
                <Button size="lg" className="gap-2">
                  Get started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      </div>
    </main>
  )
}
