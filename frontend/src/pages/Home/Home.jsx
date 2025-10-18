import React from 'react'
import Banner from '../../components/Banner'
import Features from '../../components/Features'
import AlumniSection from '../../components/AlumniSection'
import WhyChooseAlgovik from '../../components/WhyChooseAlgovik'
import HowAlgoVikWorks from '../../components/HowAlgoVikWorks'

const Home = () => {
  return (
    <div>
      <Banner/>
      <Features/>
      <WhyChooseAlgovik/>
      <HowAlgoVikWorks/>
      <AlumniSection/>
      </div>
  )
}

export default Home