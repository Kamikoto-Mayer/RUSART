"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import styles from "./jury.module.css"

export default function Jury() {
  const juryMembers = [
    {
      name: "Круглый Анатолий Федерович",
      image: "/jury-1.png",
      bio: "Заслуженный работник культуры Краснодарского края, художественный руководитель и балетмейстер Заслуженного коллектива народного творчества Российской Федерации Народного ансамбля танца «Станица», доцент кафедры хореографии Краснодарского государственного института культуры (2003-2016), лауреат губернаторской премии за сохранение традиционной культуры Кубани. Г. КРАСНОДАР",
    },
    {
      name: "Анатолий Сергеев",
      image: "/jury-2.png",
      bio: 'Балетмейстер-постановщик. Педагог современных направлений. Лауреат и Гранд-призер Международных конкурсов и фестивалей. Награждена спец. призами за лучшую балетмейстерскую работу. Участник Семинара по современным направлениям в Centre international de dance jazz Франция Париж. Участник шоу "Танцы" на ТНТ. Руководитель танцевального пространства "KOLIBRI" г. Ростов-на-Дону. Создатель танцевального лагеря SLIяние',
	},
    {
      name: "Елена Иванова",
      image: "/jury-3.png",
      bio: "Заслуженный работник культуры Чеченской Республики, заведующий кафедрой хореографии Краснодарского государственного института культуры, кандидат педагогических наук, профессор",
    },
	{
      name: "Валерия Григорян",
      image: "/jury-6.jpeg",
      bio: "Экс артистка DanceCode company. Артистка Всемирного Фестиваля Молодёжи в Сочи 2024. Судья танцевального чемпионата South Side от МАРКС Краснодар 2024. Член жюри Международной Конкурсной Организации  DarFest. Основатель и руководитель школы танцевального искусства DiD company Краснодар. Презентёр-хореограф гос проекта «Танцы Крд»",
    },
  ]

  const juryMembers2 = [
    {
      name: "Дмитрий Александрович Гаврилов",
      image: "/jury-4.png",
      bio: "Старший преподаватель кафедры театрального искусства Краснодарского государственного института культуры;\nрежиссер событийных проектов Краснодарского академического театра драмы;\nлауреат эксперт Всероссийской премии в области организации массовых событий «Золотая легенда»",
    },
    {
      name: "Лукинская Ирина Владимировна",
      image: "/jury-5.png",
      bio: `Заслуженный работник культуры Краснодарского края
	  Член союза театральных деятелей России, 
	- дважды лауреат всероссийской профессиональной премии в области режиссуры "Грани Театра масс" (СТД);
	- лауреат национальной профессиональной премии в области режиссуры "Театр Масс";
	- сценарист, режиссёр, педагог театральных дисциплин;
	- эксперт Всероссийской профессиональной премии в области режиссуры театрализованных и массовых представлений «Золотая легенда»`,
	},
  ]

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
	const containers = [containerRef.current, containerRef2.current]
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
        <h2 className={styles.title}>Жюри<br/>Хореографическое направление</h2>

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

              <div className={styles.content}>
                <h3 className={styles.name}>{member.name}</h3>
                <p className={styles.bio}>{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
		<br />
		<br />
		<br />
		<h2 className={styles.title}>Театральное направление</h2>
        <div ref={containerRef2} className={styles.list}>
          {juryMembers2.map((member, index) => (
            <div
              key={index}
              className={`${styles.item} ${index % 2 === 0 ? styles.odd : styles.even}`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className={styles.imageWrapper}>
                <div className={styles.imageBg}></div>
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className={styles.image} />
              </div>

              <div className={styles.content}>
                <h3 className={styles.name}>{member.name}</h3>
                <p className={styles.bio}>{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
