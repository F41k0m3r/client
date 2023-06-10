import { FC, useEffect } from "react";
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import useCostsStore from "../../store/CostsStore";
import styles from './Auth.module.sass';

interface props {
  authTypeText: string,
}

interface Inputs {
  username: string,
  password: string
}

const Auth:FC<props> = ({authTypeText}) => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const {signIn, signUp, user} = useCostsStore()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (authTypeText === 'SignIn') {
      await signIn(data.username, data.password)
    } 
    if (authTypeText === 'SignUp') {
      await signUp(data.username, data.password)
    } 
    navigate('/')
  }

  useEffect(() => {
    if (user._id) {
      navigate('/')
    }
  }, [])
  return (
    <div className={styles.wrap}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.formName}>{authTypeText}</h1>
        <div className={styles.inputWrap}>
          <label className={styles.inputDescription}>username</label>
          <input 
            {...register("username", {
                required: "This field is required",
                maxLength: {value: 30, message:"Max length - 14 characters"},
            })}
            type="text" 
            placeholder="username"
            className={styles.input}
          />
          {errors.username &&
            <h4 className={styles.error}>{errors.username?.message}</h4>
          }
        </div>
          <div className={styles.inputWrap}>
            <label className={styles.inputDescription}>password</label>
            <input 
              {...register("password", {
                required: "This field is required",
                maxLength: {value: 12, message:"Max length - 12 characters"},
              })}
              type="password" 
              placeholder="password"
              className={styles.input}
            />
          {errors.password &&
            <h4 className={styles.error}>{errors.username?.message}</h4>
          }
          </div>
          <button className={styles.submit}>Submit</button>
          {authTypeText === 'SignUp'
            ? <h4 className={styles.already}>Already registered? <a className={styles.alreadyLink} href="/signin">SignIn</a></h4>
            : <h4 className={styles.already}>Not registered yet? <a className={styles.alreadyLink} href="/signup">SignUp</a></h4>
          }
      </form>
    </div>
  )
}

export default Auth;