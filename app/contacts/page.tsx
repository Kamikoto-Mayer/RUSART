import Header from "@/components/header"
import Footer from "@/components/footer"
import Location from "@/components/location"
import FeedbackButton from "@/components/feedback-button"
import Contacts from "@/components/contacts"
// </CHANGE>

export default function ContactsPage() {
  return (
    <main>
      <Header />
	  <Contacts />
      <Location />
      {/* </CHANGE> */}
      <Footer />
	  <FeedbackButton />
    </main>
  )
}
