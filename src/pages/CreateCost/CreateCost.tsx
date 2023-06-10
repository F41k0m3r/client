import { FC } from "react";
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import useCostsStore from "../../store/CostsStore";
import styles from './CreateCost.module.sass';

interface props {

} 

interface Inputs {
  text: string,
  price: string
}

const CreateCost:FC<props> = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const {createCost} = useCostsStore()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    createCost(data.text, data.price)
    navigate('/')
  }

  return (
    <div className={styles.wrap}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.formName}>Create Cost</h1>
        <div className={styles.inputWrap}>
          <label className={styles.inputDescription}>text</label>
          <input 
            {...register("text", {
                required: "This field is required",
                maxLength: {value: 20, message:"Max length - 20 characters"},
            })}
            type="text" 
            placeholder="Walmart"
            className={styles.input}
          />
          {errors.text &&
            <h4 className={styles.error}>{errors.text?.message}</h4>
          }
        </div>
          <div className={styles.inputWrap}>
            <label className={styles.inputDescription}>price</label>
            <input 
              {...register("price", {
                required: "This field is required",
                maxLength: {value: 10, message:"Max length - 10 characters"},
              })}
              type="number" 
              placeholder="2400"
              className={styles.input}
            />
          {errors.price &&
            <h4 className={styles.error}>{errors.price?.message}</h4>
          }
          </div>
          <button className={styles.submit}>Submit</button>
      </form>
    </div>
  )
}

export default CreateCost