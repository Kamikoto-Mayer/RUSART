import Link from "next/link"
import styles from "./footer.module.css"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div>
			<Link href="/" className={styles.logoLink}>
				<img src="/logo.png" alt="logo" className={styles.logo} />
			</Link>
          </div>

          <div>
            <h3 className={styles.sectionTitle}>Ссылки</h3>
            <ul className={styles.list}>
              <li>
                <Link href="/" className={styles.link}>
                  Главная
                </Link>
              </li>
              <li>
                <Link href="/regulations" className={styles.link}>
                  Положение
                </Link>
              </li>
              <li>
                <Link href="/awards" className={styles.link}>
                  Награды
                </Link>
              </li>
              <li>
                <Link href="/jury" className={styles.link}>
                  Жюри
                </Link>
              </li>
              <li>
                <Link href="/pricing" className={styles.link}>
                  Цены
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className={styles.sectionTitle}>Контакты</h3>
            <p className={styles.contactItem}>Елена Георгиевна</p>
            <p className={styles.contactItem}><a href="tel:+79882456809">+7 (988) 245-68-09</a></p>
            <p className={styles.contactItem}>Ирина Владимировна</p>
			<p className={styles.contactItem}><a href="tel:+79183306852">+7 (918) 330-68-52</a></p>
          </div>
        </div>

        <div className={styles.divider}>
          <p>© 2025 RUSART. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}
