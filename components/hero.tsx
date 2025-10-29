"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import styles from "./hero.module.css"

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section
      className={styles.hero}
      style={{
        backgroundImage: "url(/header_bg.webp)",
      }}
    >
      <div className={styles.overlay}></div>

      <div className={styles.float1}></div>
      <div className={styles.float2}></div>

      <div className={styles.content}>
        <div className={styles.contentInner}>
          <h1 className={`${styles.title} ${isLoaded ? styles.loaded : styles.unloaded}`}>
            Всероссийский
            <br />
            фестиваль-конкурс искусств
            <br />
            <span className={styles.titleAccent}>"АRT ГРАНИ"</span>
          </h1>
          <p className={`${styles.date} ${isLoaded ? styles.loaded : styles.unloaded}`}>16 нояюря 2025 | Краснодар </p>

          <p className={`${styles.description} ${isLoaded ? styles.loaded : styles.unloaded}`}>
            Конкурс помогает раскрыть творческий потенциал и повысить мастерство танцоров. Участие даёт опыт выступлений, новые знакомства и признание профессионалов. Это отличная возможность развиваться, получать мотивацию и открывать новые пути для роста в мире хореографии
          </p>

          <Link href="/register" className={`${styles.button} ${isLoaded ? styles.loaded : styles.unloaded}`}>
            Оставить заявку
          </Link>
        </div>
      </div>
    </section>
  )
}
