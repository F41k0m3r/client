import styles from './Loader.module.sass';

const Loader = () => {
  return (
    <div className={styles.wrap}>
      <span className={styles.loader}/>
    </div>
  )
}

export default Loader;