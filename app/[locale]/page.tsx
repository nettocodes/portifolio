import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ParticleBackground from '@/components/ui/ParticleBackground'
import TechMarquee from '@/components/ui/TechMarquee'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Experience from '@/components/sections/Experience'
import Projects from '@/components/sections/Projects'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <ParticleBackground />
      <Header />
      <main>
        <Hero />
        <TechMarquee />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
