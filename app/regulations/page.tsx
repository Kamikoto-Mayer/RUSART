import Header from "@/components/header"
import Footer from "@/components/footer"
import FeedbackButton from "@/components/feedback-button"
import styles from "./regulations.module.css"

export default function RegulationsPage() {
  return (
    <main>
      <Header />
      <section className={styles.regulations}>
        <div className={styles.container}>
          <h1 className={styles.title}>Положение о фестивале</h1>

          <div className={styles.content}>
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>1. Общие положения</h2>
              <p className={styles.text}>
                Фестиваль «АРТПРОСТРАНСТВО» проводится с целью поддержки и развития творческих способностей участников,
                создания условий для самореализации и профессионального роста в области искусства.
              </p>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>2. Цели и задачи</h2>
              <ul className={styles.list}>
                <li>Выявление и поддержка талантливых исполнителей</li>
                <li>Создание условий для творческого обмена опытом</li>
                <li>Популяризация различных видов искусства</li>
                <li>Развитие культурных связей между регионами</li>
              </ul>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>3. Участники фестиваля</h2>
              <p className={styles.text}>
                К участию в фестивале приглашаются творческие коллективы и индивидуальные исполнители различных
                возрастных категорий и направлений искусства.
              </p>
              <ul className={styles.list}>
                <li>Младшая группа: до 12 лет</li>
                <li>Средняя группа: 13-17 лет</li>
                <li>Старшая группа: 18-25 лет</li>
                <li>Взрослая группа: 26+ лет</li>
              </ul>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>4. Номинации</h2>
              <ul className={styles.list}>
                <li>Хореография (классический танец, современный танец, народный танец)</li>
                <li>Вокал (академический, эстрадный, народный)</li>
                <li>Инструментальное исполнительство</li>
                <li>Театральное искусство</li>
                <li>Изобразительное искусство</li>
              </ul>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>5. Условия участия</h2>
              <ul className={styles.list}>
                <li>Заполнение регистрационной формы на официальном сайте</li>
                <li>Оплата организационного взноса</li>
                <li>Предоставление фонограммы (для вокалистов и танцоров)</li>
                <li>Соблюдение временных рамок выступления (до 5 минут)</li>
              </ul>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>6. Критерии оценки</h2>
              <ul className={styles.list}>
                <li>Техническое мастерство</li>
                <li>Художественная выразительность</li>
                <li>Оригинальность и творческий подход</li>
                <li>Сценическая культура</li>
                <li>Соответствие возрастной категории</li>
              </ul>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>7. Награждение</h2>
              <p className={styles.text}>
                Победители и призеры фестиваля награждаются дипломами, кубками и ценными призами. Все участники получают
                сертификаты участника фестиваля.
              </p>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>8. Контактная информация</h2>
              <p className={styles.text}>По всем вопросам, связанным с участием в фестивале, обращайтесь:</p>
              <ul className={styles.list}>
                <li>Email: info@artprostranstvo.ru</li>
                <li>Телефон: +7 (XXX) XXX-XX-XX</li>
                <li>Адрес: г. Москва, ул. Примерная, д. 1</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <FeedbackButton />
    </main>
  )
}
