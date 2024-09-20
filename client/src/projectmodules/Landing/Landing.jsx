import Header from "./partials/Header"
import Hero from "./partials/Hero"
import Services from "./partials/Services"
import Footer from "./partials/Footer"
import ContactUs from "./partials/ContactUs"
import FAQ from "./partials/FAQ"
import Statistics from "./partials/Statistics"
import Testimonials from "./partials/Testimonials"
import CallToAction from "./partials/CallToAction"
import NewsUpdates from "./partials/NewsUpdates"
import PartnerLogos from "./partials/PartnerLogos"

function Landing() {
  return (
    <div>
        <Header/>
        <Hero/>
        <Services/>
        <Statistics />
        <Testimonials />
        <CallToAction />
        <NewsUpdates />
        <PartnerLogos />
        <FAQ/>
        <ContactUs />
        <Footer/>      
    </div>
  )
}

export default Landing
