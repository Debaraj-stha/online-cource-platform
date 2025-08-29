import Hero from '../components/Hero'

import Testimonials from '../components/Testimonials'
import CTASection from '../components/CTASection'
import FAQ from '../components/FAQ'
import Features from '../components/Features'
import HomePopularCourses from '../components/HomePapularCourses'
import image from "../assets/images/library1.jpg"
import ParallexSection from '../components/ParallcxSection'
import ParallaxStats from '../components/ParallalStats'
const Home = () => {
  return (
    <div>
      <Hero />
      <ParallexSection image={image}>
        <div className="h-full flex items-center justify-center bg-black/40">
          <h2 className="text-white text-4xl font-bold">Learn Without Limits</h2>
        </div>
      </ParallexSection>

      <Features />

      <HomePopularCourses />
      <ParallaxStats/>
      <Testimonials />
      <CTASection />
      <FAQ />
    </div>
  )
}

export default Home
