import Header from "@/components/header"
import Footer from "@/components/footer"
import Jury from "@/components/jury"
import FeedbackButton from "@/components/feedback-button"

export default function JuryPage() {
  return (
    <main>
      <Header />
      {/* <div className="bg-[#1A1A1A] min-h-screen pt-20"> */}
        <Jury />
      {/* </div> */}
      <Footer />
	  <FeedbackButton />
    </main>
  )
}
