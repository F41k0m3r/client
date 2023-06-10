import { FC, useEffect, useState } from 'react';
import useCostsStore from '../../store/CostsStore';
import styles from './Navbar.module.sass';

interface props {
  
}

export const Navbar:FC<props> = () => {
  const {user, logout} = useCostsStore()
  const [colorChange, setColorChange] = useState(false);
  const changeNavbarColor = () => {
      if (window.scrollY >= 40) {
          setColorChange(true);
      }
      else {
          setColorChange(false);
      }
  };
  useEffect(() => {
    const handleScroll = () => {
      changeNavbarColor();
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div className={colorChange ? styles.wrapChangeColor : styles.wrap}>
        <a 
          target={'_blank'} href={'https://github.com/F41k0m3r'} 
          className={styles.logoWrap}
        >
          <img className={styles.logo} src="https://img.icons8.com/?size=512&id=AZOZNnY73haj&format=png" alt="avatar"/>
          <h2 className={styles.logoText}>Falkomer</h2>
        </a>
      <div className={styles.buttons}>
        {user._id
          ?<> 
            <a href="/">
              <button className={styles.adminPanel}>Home</button>
            </a>
            <a href="/createCost">
              <button className={styles.button}>Create</button>
            </a>
            <button className={styles.button} onClick={logout}>LogOut</button>
          </>
          :<>
            <a href="/signin">
              <button className={styles.button}>SingIn</button>
            </a>
            <a href="/signup">
              <button className={styles.button}>SignUp</button>
            </a>
          </>
        }
        {user._id === import.meta.env.VITE_ADMIN_ID 
           && <a href="/admin">
                <button className={styles.adminPanel}>Admin</button>
              </a>
        }        
      </div>
    </div>
  )
}
