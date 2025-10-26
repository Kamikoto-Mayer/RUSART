"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import styles from "./header.module.css"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>
            <img src="/logo.png" alt="" />
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`${styles.hamburger} ${isOpen ? styles.open : ""}`}
            aria-label="Toggle menu"
          >
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
          </button>

          {/* Desktop Navigation */}
          <nav className={styles.navDesktop}>
            <Link href="/" className={styles.navLink}>
              Главная
            </Link>
            <Link href="/schedule" className={styles.navLink}>
              Расписание
            </Link>
            <Link href="/pricing" className={styles.navLink}>
              Цены
            </Link>
            <Link href="/jury" className={styles.navLink}>
              Жюри
            </Link>
            <Link href="/gallery" className={styles.navLink}>
              Галерея
            </Link>
            <Link href="/contacts" className={styles.navLink}>
              Контакты
            </Link>
			<Link href="/regulations" className={styles.navLink}>
              Положение
            </Link>
          </nav>

          <Link href="/register" className={styles.registerBtnDesktop}>
            Регистрация
          </Link>
        </div>

        {isOpen && (
          <>
            <div
              className={`${styles.mobileMenuBackdrop} ${isOpen ? styles.open : ""}`}
              onClick={() => setIsOpen(false)}
            />

            <nav className={`${styles.mobileMenu} ${isOpen ? styles.open : ""}`}>
              <Link href="/" className={styles.mobileMenuLink} onClick={() => setIsOpen(false)}>
                Главная
              </Link>
              <Link href="/schedule" className={styles.mobileMenuLink} onClick={() => setIsOpen(false)}>
                Расписание
              </Link>
              <Link href="/pricing" className={styles.mobileMenuLink} onClick={() => setIsOpen(false)}>
                Цены
              </Link>
              <Link href="/jury" className={styles.mobileMenuLink} onClick={() => setIsOpen(false)}>
                Жюри
              </Link>
              <Link href="/gallery" className={styles.mobileMenuLink} onClick={() => setIsOpen(false)}>
                Галерея
              </Link>
              <Link href="/contacts" className={styles.mobileMenuLink} onClick={() => setIsOpen(false)}>
                Контакты
              </Link>
			  <Link href="/regulations" className={styles.mobileMenuLink} onClick={() => setIsOpen(false)}>
                Положение
              </Link>
              <Link href="/register" className={styles.mobileMenuRegister} onClick={() => setIsOpen(false)}>
                Регистрация
              </Link>
            </nav>
          </>
        )}
      </header>
    </>
  )
}
