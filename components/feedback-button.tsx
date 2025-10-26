"use client"

import type React from "react"
import { useState } from "react"
import { Mail } from "lucide-react"
import styles from "./feedback-button.module.css"

export default function FeedbackButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setIsOpen(false)
      setSubmitted(false)
      setFormData({ name: "", email: "", message: "" })
    }, 2000)
  }

  return (
    <>
      <button onClick={() => setIsOpen(true)} className={styles.button} aria-label="Обратная связь">
        <Mail size={24} />
      </button>

      {isOpen && <div className={styles.backdrop} onClick={() => setIsOpen(false)} />}

      {isOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>Обратная связь</h3>

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
                  />
                </div>
                <button type="submit" className={styles.submitBtn}>
                  Отправить
                </button>
              </form>
            )}

            <button onClick={() => setIsOpen(false)} className={styles.closeBtn}>
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  )
}
