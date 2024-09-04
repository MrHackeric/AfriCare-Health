import Header from "./partials/Header"
import Hero from "./partials/Hero"
import Services from "./partials/Services"
import Footer from "./partials/Footer"
import ContactUs from "./partials/ContactUs"
import FAQ from "./partials/FAQ"

function Landing() {
  return (
    <div>
        <Header/>
        <Hero/>
        <Services/>
        <FAQ/>
        <ContactUs />
        <Footer/>      
    </div>
  )
}

export default Landing
