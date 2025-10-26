"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { Trophy, Award, Medal, Star } from "lucide-react"
import styles from "./awards.module.css"

interface AwardCategory {
  icon: React.ReactNode
  title: string
  prize: string
  description: string
}

const awardCategories: AwardCategory[] = [
  {
    icon: <Trophy className="w-12 h-12" />,
    title: "Гран-при",
    prize: "100 000 ₽",
    description: "Главная награда фестиваля за выдающееся выступление",
  },
  {
    icon: <Award className="w-12 h-12" />,
    title: "Лучшая хореография",
    prize: "50 000 ₽",
    description: "За инновационную и впечатляющую постановку",
  },
  {
    icon: <Medal className="w-12 h-12" />,
    title: "Приз зрительских симпатий",
    prize: "30 000 ₽",
    description: "Выбор публики и онлайн-голосования",
  },
  {
    icon: <Star className="w-12 h-12" />,
    title: "Лучший сольный номер",
    prize: "25 000 ₽",
    description: "За выдающееся индивидуальное мастерство",
  },
]

export default function Awards() {
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
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <div className={styles.hero}>
          <h2 className={styles.mainTitle}>Награды и призы</h2>
          <p className={styles.mainDescription}>Общий призовой фонд фестиваля составляет более 200 000 рублей</p>
        </div>

        <div ref={containerRef} className={styles.showcase}>
          {awardCategories.map((award, index) => (
            <div key={index} className={styles.item} style={{ transitionDelay: `${index * 150}ms` }}>
              <div className={styles.iconWrapper}>{award.icon}</div>
              <div className={styles.content}>
                <h3 className={styles.categoryTitle}>{award.title}</h3>
                <div className={styles.prize}>{award.prize}</div>
                <p className={styles.categoryDescription}>{award.description}</p>
              </div>
              <div className={styles.shine}></div>
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <p className={styles.footerText}>
            Все победители получают дипломы, кубки и возможность выступить на гала-концерте
          </p>
        </div>
      </div>
    </section>
  )
}
