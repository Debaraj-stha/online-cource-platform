import Hero from '../components/Hero'

import Testimonials from '../components/Testimonials'
import CTASection from '../components/CTASection'
import FAQ from '../components/FAQ'
import Features from '../components/Features'
import HomePopularCourses from '../components/HomePapularCourses'

const Home = () => {
  return (
    <div>
      <Hero />
      <Features />
      <HomePopularCourses />
      <Testimonials />
      <CTASection />
      <FAQ />
    </div>
  )
}

export default Home
