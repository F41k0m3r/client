import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cost } from '../../components/Cost/Cost';
import Loader from '../../components/Loader/Loader';
import { Navbar } from '../../components/Navbar/Navbar';
import Unauthorized from '../../components/Unauthorized/Unauthorized';
import useCostsStore from '../../store/CostsStore';
import styles from './Default.module.sass';

interface props {
  type?: string
}

const Default:FC<props> = ({type = 'user'}) => {
  const navigate = useNavigate()
  const {getCosts, getAllCosts, costs, checkAuth, isAuth, isLoading} = useCostsStore()
  useEffect(() => {
    checkAuth()
    if (type === 'user') {
      getCosts()
    }else if(type === 'admin') {
      getAllCosts()
    }
  },[])
  return (
      <div className={styles.app}>
        <Navbar/>
        {isLoading ? <Loader/>
          : (isAuth 
                ?  <ul className={styles.costs}>
                      {costs?.map((cost) => {
                        return <li key={cost._id} className={styles.costWrap}><Cost cost={cost}/></li>
                      })}
                    </ul>
                :  <Unauthorized/> 
            )
        }
      </div>
  )
}

export default Default;
