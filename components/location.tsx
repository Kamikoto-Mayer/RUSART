"use client"

import { useEffect, useRef } from "react"
import styles from "./location.module.css"

export default function Location() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.animateIn)
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = containerRef.current?.querySelectorAll(`.${styles.card}, .${styles.map}`)
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section className={styles.location}>
      <div className={styles.container} ref={containerRef}>
        <h2 className={styles.title}>Местонахождение</h2>
        <p className={styles.subtitle}>Фестиваль проходит в самом сердце города</p>

        <div className={styles.content}>
          <div className={styles.card}>
            <div className={styles.icon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <h3 className={styles.venue}>Концертный зал "АРТ Грани"</h3>
            <p className={styles.address}><a href="https://yandex.ru/maps/35/krasnodar/house/pashkovskaya_ulitsa_149/Z0EYfw9mTkEHQFpvfXxycXtrbQ==/?ll=38.986740%2C45.030789&z=17.12" target="_blank" rel="noopener noreferrer">
					ул. Пашковская, 149
					<br />
					Краснодар, Россия
				</a>
            </p>
            <div className={styles.details}>
              <div className={styles.detail}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span><a href="tel:+79882456809">+7 (988) 245-68-09</a></span>
              </div>
              <div className={styles.detail}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>Пн-Вс: 10:00 - 20:00</span>
              </div>
            </div>
          </div>

          <div className={styles.map}>
            <iframe
            //   src="https://yandex.ru/map-widget/v1/?um=constructor%3Ab65130e20691908ff340c4b69f895c593c615762064c4d66ef160f7796db9ccd&amp;source=constructor"
			  src="https://yandex.ru/map-widget/v1/?ll=38.986740%2C45.030789&mode=whatshere&whatshere%5Bpoint%5D=38.986740%2C45.030789&whatshere%5Bzoom%5D=17&z=17"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: "1rem" }}
              allowFullScreen
              loading="lazy"
              title="Карта: Пашковская улица 149"
            />
          </div>
        </div>
      </div>
    </section>
  )
}