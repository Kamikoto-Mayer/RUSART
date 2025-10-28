"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import styles from "./gallery.module.css"

export default function Jury() {
  const juryMembers = [
    {
      name: "Фото 1",
      image: "/gallary/gallary1.jpeg",
    },
    {
      name: "Фото 2",
      image: "/gallary/gallary2.jpeg",
	},
    {
      name: "Фото 3",
      image: "/gallary/gallary3.jpeg",
    },
	{
      name: "Фото 4",
      image: "/gallary/gallary4.jpeg",
    },
    {
	  name: "Фото 5",
	  image: "/gallary/gallary5.jpeg",
	},
	{
	  name: "Фото 6",
	  image: "/gallary/gallary6.jpeg",
	},
	{
	  name: "Фото 7",
	  image: "/gallary/gallary7.jpeg",
	},
	{
	  name: "Фото 8",
	  image: "/gallary/gallary8.jpeg",
	},
	{
	  name: "Фото 9",
	  image: "/gallary/gallary9.jpeg",
	},
	{
	  name: "Фото 10",
	  image: "/gallary/gallary10.jpeg",
	},
	{
	  name: "Фото 11",
	  image: "/gallary/gallary11.jpeg",
	},
	{
	  name: "Фото 12",
	  image: "/gallary/gallary12.jpeg",
	},
	{
	  name: "Фото 13",
	  image: "/gallary/gallary13.jpeg",
	},
	{
	  name: "Фото 14",
	  image: "/gallary/gallary14.jpeg",
	},
	{
	  name: "Фото 15",
	  image: "/gallary/gallary15.jpeg",
	},
	{
	  name: "Фото 16",
	  image: "/gallary/gallary16.jpeg",
	}
  ]

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

    // const items = containerRef.current?.querySelectorAll(`.${styles.item}`)
    // items?.forEach((item) => observer.observe(item))
	const containers = [containerRef.current]
    containers.forEach(container => {
      if (container) {
        const items = container.querySelectorAll(`.${styles.item}`)
        items?.forEach((item) => observer.observe(item))
      }
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className={styles.jury}>
      <div className={styles.container}>
        <h2 className={styles.title}>Галерея</h2>

        <div ref={containerRef} className={styles.list}>
          {juryMembers.map((member, index) => (
            <div
              key={index}
              className={`${styles.item} ${index % 2 === 0 ? styles.odd : styles.even}`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className={styles.imageWrapper}>
                <div className={styles.imageBg}></div>
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className={styles.image} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
