"use client"

import { useEffect, useRef, useState } from "react"
import styles from "./benefits.module.css"

interface Benefit {
  title: string
  description: string
}

const benefits: Benefit[] = [
  {
    title: "Новые знакомста",
    description: "Встречаешь единомышленников и расширяешь круг общения.",
  },
  {
    title: "Опыт выступлений",
    description: "Учишься выступать на сцене перед публикой и жюри.",
  },
  {
    title: "Экспертные советы",
    description: "Профессионалы дают советы для роста и совершенствования.",
  },
  {
    title: "Признание и мотивация",
    description: "Победы и достижения вдохновляют на дальнейшее развитие.",
  },
  {
    title: "Карьерные перспективы",
    description: "Открываются новые возможности для профессионального роста.",
  },
  {
    title: "Развитие навыков",
    description: "Возможность улучшить технику и выразительность танца",
  },
]

export default function Benefits() {
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(benefits.length).fill(false))
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
            setVisibleItems((prev) => {
              const newVisible = [...prev]
              newVisible[index] = true
              return newVisible
            })
          }
        })
      },
      { threshold: 0.1 },
    )

    const items = containerRef.current?.querySelectorAll("[data-index]")
    items?.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return (
    <section className={styles.benefits}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Преимущества участия</h2>
          <p className={styles.description}>
            Получите доступ к сетевым мероприятиям, мастер-классам и экспертным советам
          </p>
        </div>

        <div ref={containerRef} className={styles.grid}>
          {benefits.map((benefit, index) => (
            <div
              key={index}
              data-index={index}
              className={`${styles.card} ${visibleItems[index] ? styles.visible : ""}`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <h3 className={styles.cardTitle}>{benefit.title}</h3>
              <p className={styles.cardDescription}>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
