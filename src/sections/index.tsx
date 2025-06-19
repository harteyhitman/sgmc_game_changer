import React from 'react'
import HeroSection from './hero-section'
import AboutSection from './about-us'
import WhyUsSection from './why-us'
import ServicesSection from './services'
import RoadmapSection from './road-map'
import TokenSalesSection from './token-sales'
import FaqSection from './faqs'

const Landingpage = () => {
  return (
    <div>
        <HeroSection />
        <AboutSection />
        <WhyUsSection />
        <ServicesSection />
        <RoadmapSection />
        <TokenSalesSection />
        <FaqSection />
    </div>
  )
}

export default Landingpage