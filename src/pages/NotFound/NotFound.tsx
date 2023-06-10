import { FC, useEffect } from "react"
import styles from './NotFound.module.sass'

interface props {

}

const NotFound:FC<props> = () => {
  useEffect(()=>{
    document.title = '404 Error'
  },[])
  return (
    <div className={styles.screen}>
      <div className={styles.wrap}>
        <img src="https://img.icons8.com/?size=512&id=qQWQRIpWFzjf&format=png" alt="not founded" className={styles.img} />
        <h1 className={styles.error}>ERROR(404)</h1>
        <h1 className={styles.text}>Oops! Sorry, page does not found</h1>
        <a href="/">
          <button className={styles.button}>GO HOME</button>
        </a>
      </div>
    </div>
  )
}

export default NotFound;