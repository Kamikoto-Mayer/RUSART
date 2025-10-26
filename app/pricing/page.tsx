import Header from "@/components/header"
import Footer from "@/components/footer"
import Pricing from "@/components/pricing"
import FeedbackButton from "@/components/feedback-button"

export default function PricingPage() {
  return (
    <main>
      <Header />
      {/* <div className="bg-[#1A1A1A] min-h-screen pt-20"> */}
        <Pricing />
      {/* </div> */}
      <Footer />
	  <FeedbackButton />
    </main>
  )
}
