import styles from "./gallery.module.css"

export default function gallery() {
  return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>Галерея</h1>
          <div className={styles.grid}>
            <div className={styles.gridItem}>
              <p className={styles.gridText}>Фото 1</p>
            </div>
            <div className={styles.gridItem}>
              <p className={styles.gridText}>Фото 2</p>
            </div>
            <div className={styles.gridItem}>
              <p className={styles.gridText}>Фото 3</p>
            </div>
          </div>
        </div>
      </div>
  )
}