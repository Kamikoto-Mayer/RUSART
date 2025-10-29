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
            <h3 className={styles.venue}>Концертный зал "ART Грани"</h3>
            <p className={styles.address}><a href="https://yandex.ru/maps/-/CLfLMU~7" target="_blank" rel="noopener noreferrer">
					ул. Пашковская, 146
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
                <span><a href="tel:+79882456809">+7 (988) 240-68-09</a></span>
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
			  src="https://yandex.ru/map-widget/v1/?ll=38.985491%2C45.030458&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgg1NjM3NjIyNBJG0KDQvtGB0YHQuNGPLCDQmtGA0LDRgdC90L7QtNCw0YAsINCf0LDRiNC60L7QstGB0LrQsNGPINGD0LvQuNGG0LAsIDE0NiIKDSXxG0IVMR80Qg%2C%2C&z=17.12"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: "1rem" }}
              allowFullScreen
              loading="lazy"
              title="Карта: Пашковская улица 146"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

{/* <div style="position:relative;overflow:hidden;"><a href="https://yandex.ru/maps/35/krasnodar/?utm_medium=mapframe&utm_source=maps" style="color:#eee;font-size:12px;position:absolute;top:0px;">Краснодар</a><a href="https://yandex.ru/maps/35/krasnodar/house/pashkovskaya_ulitsa_146/Z0EYfw9lTUwGQFpvfXxycXhmYw==/?ll=38.985491%2C45.030458&utm_medium=mapframe&utm_source=maps&z=17.12" style="color:#eee;font-size:12px;position:absolute;top:14px;">Пашковская улица, 146 — Яндекс Карты</a><iframe src="https://yandex.ru/map-widget/v1/?ll=38.985491%2C45.030458&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgg1NjM3NjIyNBJG0KDQvtGB0YHQuNGPLCDQmtGA0LDRgdC90L7QtNCw0YAsINCf0LDRiNC60L7QstGB0LrQsNGPINGD0LvQuNGG0LAsIDE0NiIKDSXxG0IVMR80Qg%2C%2C&z=17.12" width="560" height="400" frameborder="1" allowfullscreen="true" style="position:relative;"></iframe></div> */}