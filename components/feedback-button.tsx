"use client"

import React from "react"
import { useState } from "react"
import { Mail } from "lucide-react"
import styles from "./feedback-button.module.css"

export default function FeedbackButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "Ошибка отправки")

      setSubmitted(true)
      // очищаем форму через 1.5s и закрываем модалку
      setTimeout(() => {
        setIsOpen(false)
        setSubmitted(false)
        setFormData({ name: "", email: "", message: "" })
      }, 1500)
    } catch (err: any) {
      setError(err?.message || "Не удалось отправить сообщение")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <button onClick={() => setIsOpen(true)} className={styles.button} aria-label="Обратная связь">
        <Mail size={24} />
      </button>

      {isOpen && <div className={styles.backdrop} onClick={() => setIsOpen(false)} />}

      {isOpen && (
        <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="feedback-title">
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 id="feedback-title" className={styles.modalTitle}>Обратная связь</h3>

            {submitted ? (
              <div className={styles.success}>
                <div className={styles.successIcon}>✓</div>
                <p className={styles.successTitle}>Спасибо за ваше сообщение!</p>
                <p className={styles.successMessage}>Мы свяжемся с вами в ближайшее время</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Имя</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={styles.formInput}
                    placeholder="Ваше имя"
                    disabled={isSubmitting}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={styles.formInput}
                    placeholder="your@email.com"
                    disabled={isSubmitting}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Сообщение</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={styles.formTextarea}
                    rows={4}
                    placeholder="Ваше сообщение..."
                    disabled={isSubmitting}
                  />
                </div>

                {error && <p className={styles.error}>{error}</p>}

                <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                  {isSubmitting ? "Отправка..." : "Отправить"}
                </button>
              </form>
            )}

            <button onClick={() => setIsOpen(false)} className={styles.closeBtn} aria-label="Закрыть">
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  )
}
