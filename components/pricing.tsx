"use client"

import { useEffect, useRef } from "react"
import styles from "./pricing.module.css"

interface PricingItem {
  title: string
  price: string
}

const pricingData: PricingItem[] = [
  {
    title: "Соло",
    price: "2 000 ₽",
  },
  {
    title: "Дуэт, Трио",
    price: "1 500 ₽",
  },
  {
    title: "Коллектив от 4 до 5 человек",
    price: "1 200 ₽",
  },
  {
    title: "Коллектив от 6 до 8 человек",
    price: "1 000 ₽",
  },
  {
    title: "Коллектив от 9 до 12 человек",
    price: "900 ₽",
  },
  {
    title: "Коллектив от 13 до 16 человек",
    price: "800 ₽",
  },
  {
    title: "Коллектив от 17 и более человек",
    price: "700 ₽",
  }
]

const pricingData2: PricingItem[] = [
  {
    title: "Художественное слово",
    price: "2 000 ₽",
  },
  {
	title: "Оригинальный жанр",
	price: "2 000 ₽",
  },
  {
	title: "Номинации коллективного творчества",
	price: "10 000 ₽",
  },
]

export default function Pricing() {
  const containerRef = useRef<HTMLDivElement>(null)
  const containerRef2 = useRef<HTMLDivElement>(null)

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

    // const items = containerRef.current?.querySelectorAll(`.${styles.item}`)
    // items?.forEach((item) => observer.observe(item))

	const items = [containerRef.current, containerRef2.current]
    items.forEach(container => {
      if (container) {
        const items = container.querySelectorAll(`.${styles.item}`)
        items?.forEach((item) => observer.observe(item))
      }
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className={styles.pricing}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Цены</h2>
          {/* <div className={styles.divider}></div> */}
        </div>
		<div className={styles.header}>
          <h2 className={styles.title}>Хореографическое направление</h2>
          <div className={styles.divider}></div>
        </div>
        <div className={styles.list} ref={containerRef}>
          {pricingData.map((item, index) => (
            <div key={index} className={styles.item} style={{ transitionDelay: `${index * 80}ms` }}>
              <div className={styles.itemContent}>
                <div className={styles.itemInfo}>
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                </div>
                <div className={styles.itemPrice}>{item.price}</div>
              </div>
            </div>
          ))}
        </div>
		<br />
		<br />
		<div className={styles.header}>
          <h2 className={styles.title}>Театральное направление</h2>
          <div className={styles.divider}></div>
        </div>
        <div className={styles.list} ref={containerRef2}>
          {pricingData2.map((item, index) => (
            <div key={index} className={styles.item} style={{ transitionDelay: `${index * 80}ms` }}>
              <div className={styles.itemContent}>
                <div className={styles.itemInfo}>
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                </div>
                <div className={styles.itemPrice}>{item.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
