import { FC, Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useCostsStore from '../../store/CostsStore';
import { ICost } from '../../types/Cost';
import styles from './Cost.module.sass';

interface props {
  cost: ICost
}

interface Inputs {
  text: string,
  price: string
}

export const Cost:FC<props> = ({cost}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const {updateCost, deleteCost } = useCostsStore()
  const navigate = useNavigate()

  const handleApply = (data) => {
    setIsEditing(false)
    console.log(data.text)
    console.log(data.price)
    updateCost(cost._id, data.text, data.price)
    navigate(0)
  }

  const handleDelete = () => {
    setIsEditing(false)
    deleteCost(cost._id)
    navigate(0)
  }
  return (
    <Fragment >
      {!isEditing
        ? <Fragment>
            <h1 className={styles.text}>{cost.text}</h1>
            <h1 className={styles.price}>{cost.price}</h1>
            <div className={styles.buttons}>
              <button className={styles.updateButton}
                onClick={() => setIsEditing(true)}>
                <img className={styles.svg} src="https://img.icons8.com/?size=512&id=11737&format=svg" alt="🔄️" />
              </button>
              <button 
                className={styles.deleteButton}
                onClick= {() => handleDelete()}
              >
                <img className={styles.svg} src="https://img.icons8.com/?size=512&id=67884&format=svg" alt="❌" />
              </button>
            </div>
          </Fragment>
        : <form className={styles.form} onSubmit={handleSubmit(handleApply)}>
            <input 
              {...register("text", {
                required: "This field is required",
                maxLength: {value: 20, message:"Max length - 20 characters"},
              })}
              type="text" 
              placeholder={'text'}
              className={styles.input}
            />
            {errors.text &&
              <h4 className={styles.error}>{errors.price?.message}</h4>
            }
            <input 
              {...register("price", {
                required: "This field is required",
                maxLength: {value: 10, message:"Max length - 20 characters"},
              })}
              type="number" 
              placeholder={'price'}
              className={styles.input}
            />
            {errors.text &&
              <h4 className={styles.error}>{errors.price?.message}</h4>
            }
          <div className={styles.buttons}>
            <button className={styles.cancelButton}
              onClick={() => setIsEditing(false)}  
            >
              <img className={styles.svg} src="https://img.icons8.com/?size=512&id=79023&format=svg" alt="❌" />
            </button>
            <button className={styles.applyButton}
              type="submit"
            >
              <img className={styles.svg} src="https://img.icons8.com/?size=512&id=7690&format=svg" alt="✔️" />
            </button>
          </div>
        </form>
      }
    </Fragment>
  )
}
