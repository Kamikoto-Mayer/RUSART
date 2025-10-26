import Header from "@/components/header"
import Footer from "@/components/footer"
import Schedule from "@/components/schedule"
import FeedbackButton from "@/components/feedback-button"


export default function SchedulePage() {
  return (
    <main>
      <Header />
      {/* <div className="bg-[#1A1A1A] min-h-screen pt-20"> */}
        <Schedule />
      {/* </div> */}
      <Footer />
	  <FeedbackButton />
    </main>
  )
}
