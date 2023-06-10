import React from 'react'
import styles from './Unauthorized.module.sass'

const Unauthorized:FC = () => {
  return (
    <div className={styles.screen}>
        <div className={styles.wrap}>
        <img src="https://img.icons8.com/?size=512&id=qQWQRIpWFzjf&format=png" alt="not founded" className={styles.img} />
        <h1 className={styles.error}>ERROR(401)</h1>
        <h1 className={styles.text}>Oops! You are not logged in</h1>
        <div className={styles.buttons}>
          <a href="/signin">
            <button className={styles.button}>SingIn</button>
          </a>
          <a href="/signup">
            <button className={styles.button}>SignUp</button>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Unauthorized