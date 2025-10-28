"use client"

import { useEffect, useRef, useState } from "react"
import styles from "./awards.module.css"

interface Award {
  description: string
}

const awards: Award[] = [
  {
    description: "Специальный приз «Абсолютный победитель» (определяется членами жюри в суммарном значении награжденных танцевальных номеров дипломами «Гран-При» и «Лауреат 1 степени»)",
  },
  {
    description: "Специальный приз «Национальное достояние» за сохранение национальных и культурных традиций (диплом, кубок и денежное вознаграждение в размере 10.000 руб)",
  },
  {
    description: "Специальный диплом за: «Лучшее воплощение сценического образа»; «Сценическое оформление хореографического произведения»; «Исполнительское мастерство и артистизм»!",
  },
  {
    description: "Гран-При в каждой номинации одной возрастной категории (диплом, кубок);",
  },
  {
    description: "Кубок каждому коллективу и участникам в номинации соло, дуэт, трио (за номер)",
  },
  {
    description: "Благодарственные письма «За личный вклад в развитие и популяризацию (хореографического, театрального) искусства среди детей и молодежи» всем руководителям коллективов.",
  },
  {
    description: "Вручение экспертами специальных дипломов «Призвание» за лучшие балетмейстерские и режиссерские работы!",
  },
  {
    description: "Дипломы ЛАУРЕАТА 1, 2, 3, степени (диплом, кубок)",
  },
  {
    description: "Дипломы Дипломанта 1, 2, 3, степени (диплом)",
  },
  {
    description: "Дипломы Участника (диплом)",
  },
  {
    description: "Значок/медаль каждому участнику",
  },
  {
    description: "Сертификаты участникам мастер-классов",
  },
]

export default function Awards() {
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(awards.length).fill(false))
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
    <section className={styles.awards}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Преимущества участия</h2>
          <p className={styles.description}>
            Получите доступ к мероприятиям, мастер-классам и экспертным советам
          </p>
        </div>

        <div ref={containerRef} className={styles.grid}>
          {awards.map((award, index) => (
            <div
              key={index}
              data-index={index}
              className={`${styles.card} ${visibleItems[index] ? styles.visible : ""}`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <p className={styles.cardDescription}>{award.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
