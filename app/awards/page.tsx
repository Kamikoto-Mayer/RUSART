import Header from "@/components/header"
import Footer from "@/components/footer"
import Avards from "@/components/awards"
import FeedbackButton from "@/components/feedback-button"

export default function AvardsPage() {
  return (
    <main>
      <Header />
      {/* <div className="bg-[#1A1A1A] min-h-screen pt-20"> */}
        <Avards />
      {/* </div> */}
      <Footer />
	  <FeedbackButton />
    </main>
  )
}
