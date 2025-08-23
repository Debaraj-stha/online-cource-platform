import Hero from '../components/Hero'

import PopularCourses from '../components/PopularCourses'
import Testimonials from '../components/Testimonials'
import CTASection from '../components/CTASection'
import FAQ from '../components/FAQ'
import Features from '../components/Features'

const Home = () => {
  return (
    <div>
      <Hero />
      <Features />
      <PopularCourses />
      <Testimonials />
      <CTASection />
      <FAQ />
    </div>
  )
}

export default Home
