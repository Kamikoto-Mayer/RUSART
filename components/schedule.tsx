"use client"

import { useEffect, useRef } from "react"
import styles from "./schedule.module.css"

interface ScheduleItem {
  date: string
  time: string
  description: string
}

const scheduleData: ScheduleItem[] = [
  {
    date: "1 янв",
    time: "12:00 — 14:00",
    description: "Открытие конференции. Регистрация участников и зрителей.",
  },
  {
    date: "2 янв",
    time: "14:00 — 16:00",
    description: "Михаил Двойняков. Хитрости ценообразования и безопасный торг.",
  },
  {
    date: "3 января",
    time: "14:00 — 16:00",
    description: "Роман Павличук. Как купить цветной принтер и стать миллионером.",
  },
  {
    date: "4 января",
    time: "12:00 — 20:00",
    description: "Евгений Наумов. Как заработать на организации бизнес-семинаров и курсов.",
  },
]

export default function Schedule() {
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

    const items = containerRef.current?.querySelectorAll(`.${styles.item}`)
    items?.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return (
    <section className={styles.schedule}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Расписание</h2>
          <p className={styles.subtitle}>Фестиваль-конкурс 2025</p>
          <div className={styles.divider}></div>
        </div>

        <div className={styles.list} ref={containerRef}>
          {scheduleData.map((item, index) => (
            <div key={index} className={styles.item} style={{ transitionDelay: `${index * 100}ms` }}>
              <div className={styles.itemContent}>
                <div className={styles.date}>{item.date}</div>

                <div className={styles.details}>
                  <div className={styles.time}>{item.time}</div>
                  <p className={styles.description}>{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
