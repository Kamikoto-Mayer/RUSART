"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import RegistrationForm from "@/components/registration-form"
import FeedbackButton from "@/components/feedback-button"

export default function RegisterPage() {
  return (
    <main>
      <Header />
      <RegistrationForm />
      <Footer />
	  <FeedbackButton />
    </main>
  )
}
