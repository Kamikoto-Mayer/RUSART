import Header from "@/components/header"
import Hero from "@/components/hero"
import Benefits from "@/components/benefits"
import Schedule from "@/components/schedule"
import Pricing from "@/components/pricing"
import Awards from "@/components/awards"
import Jury from "@/components/jury"
import Location from "@/components/location"
// </CHANGE>
import Footer from "@/components/footer"
import FeedbackButton from "@/components/feedback-button"

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
	  <Schedule />
	  <Jury />
      <Benefits />
      {/* <Pricing /> */}
      {/*<Awards />*/}
      <Location />
      {/* </CHANGE> */}
      <Footer />
      <FeedbackButton />
    </main>
  )
}
