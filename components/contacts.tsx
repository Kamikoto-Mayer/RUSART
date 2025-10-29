import styles from "./contacts.module.css"

export default function Contacts() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Контакты</h1>
        <div className={styles.contactCard}>
          <div className={styles.contactList}>
            <div className={styles.contactGroup}>
              <h3>Елена Георгиевна</h3>
              <p className={styles.contactText}><a href="tel:+79882456809">+7 (988) 240-68-09</a></p>
			  <br />
			  <h3>Ирина Владимировна</h3>
			  <p className={styles.contactText}><a href="tel:+79183306852">+7 (918) 330-68-52</a></p>
            </div>
            <div className={styles.contactGroup}>
				<h3>e-mail</h3>
            	<p className={styles.contactText}><a href="mailto:rusart25@list.ru">rusart25@list.ru</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}