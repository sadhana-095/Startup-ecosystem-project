"use client"

const people = [
  {
    name: "Emma Rodriguez",
    role: "Co-Founder / CEO",
    bio: "Emma has over 15 years of experience in the startup ecosystem, having founded two successful companies and worked as a venture partner at a leading VC firm. She leads our strategic vision and partnerships.",
  },
  {
    name: "Michael Chen",
    role: "Co-Founder / CTO",
    bio: "Michael is a seasoned technologist with expertise in data science and machine learning. Previously, he led engineering teams at Google and Palantir, focusing on data analytics platforms.",
  },
  {
    name: "Sarah Johnson",
    role: "Head of Research",
    bio: "Sarah brings deep expertise in startup ecosystem research, having previously worked at Startup Genome and Techstars. She leads our data collection and analysis methodologies.",
  },
]

export default function Team() {
  return (
    <div className="bg-gradient-to-b from-white to-emerald-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-block bg-emerald-100 px-4 py-2 rounded-full mb-4">
            <h2 className="text-sm md:text-base font-semibold text-emerald-700 uppercase tracking-wider">Our Leadership</h2>
          </div>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Meet the Team Behind Startup Ecosystem Explorer
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We're a diverse team of entrepreneurs, technologists, and ecosystem builders passionate about empowering
            startups worldwide.
          </p>
        </div>
        
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {people.map((person) => (
            <div 
              key={person.name}
              className="group flex flex-col bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-emerald-100 overflow-hidden"
            >
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400 flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-white">
                  {person.name.split(' ').map(name => name[0]).join('')}
                </span>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors duration-300">
                {person.name}
              </h3>
              
              <p className="mt-1 text-md font-medium text-emerald-600">
                {person.role}
              </p>
              
              <div className="mt-4 flex-grow">
                <p className="text-gray-600 leading-relaxed">
                  {person.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
