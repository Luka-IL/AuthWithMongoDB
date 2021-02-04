import React, {useState} from "react"
import { OpenWindows } from "../../const";
import { useHttp } from "../../hooks/http.hook";
import { setTypeError, checkForValidationEmail } from "../../utlis";


export function PasswordRecovery(props) {
  const {openWindow, setOpenWindow} = props

  const {request } = useHttp()
  const [form, setForm] = useState({
    email: ''
  })
  const [validEmail, setValidEmail] = useState(true)
  const [focusStyleEmail, setFocusStyleEmail] = useState(false)
  const [error, setError] = useState({})

  const changeHandler = (evt) => {
    setForm({ ...form, [evt.target.name]: evt.target.value })
  }

  const clickBackHandler = () =>{
    setOpenWindow(OpenWindows.AUTH)
  }

  const recoveryClickHandler = async (evt) => {
    evt.preventDefault()
    try {
      const data = await request('/api/auth/recovery', 'POST', { ...form })
      console.log(`"Новый пароль отправлен на почту " ${data}`)
    } catch (e) {
      setError(setTypeError(e.message))
    }
  }

  const onBlurEmailHandler = (evt) => {
    if(!evt.target.value) {
      setFocusStyleEmail(false)
      setValidEmail(true)
      setError({})
      return
    }
    const emailValid = checkForValidationEmail(evt.target.value)
    setValidEmail(emailValid)
    
    emailValid ? setError({}) : setError({type:"email", message:"Введите корректный Email"})
  }

  const changeStyleOnFocusEmail = () => {
    setFocusStyleEmail(true)
  }

  const keyDownHandler = (evt) => {
    if (evt.keyCode === 13) {
      evt.target.blur(); 
    }
  }

  return (
    <div className={"password-recovery " + ((openWindow==="Recovery") && "password-recovery--open")}>
      <h3 className="password-recovery__title login__form-title">Восстановление пароля</h3>
      <div className="login__input-form input-form__recovery">
      <input className={((!validEmail || (error.type === "email")) ? "error-validation__input " : "") + "login__input " + (focusStyleEmail && "login__input--focus")}
            id="input-login"
            placeholder="e-mail@mail.ru"
            type="text"
            name="email"
            onChange={changeHandler}
            onFocus={changeStyleOnFocusEmail}
            onBlur={onBlurEmailHandler}
            onKeyDown={keyDownHandler}

          />
        <label className="login__label" htmlFor="input-login">E-mail*</label>
        {error.type === "email" && <span className="error-validation__message recovery-message">{error.message}</span>}

      </div>
      <div className="warning">
        <div className="exclamation-mark"></div>
        <p className="warning__text">Пароль будет отправлено на электронную почту, к которой привязана учетная запись.</p>
      </div>
      <div className="line"></div>
      <div className="login__choice">
        <button className="choice__back choice__btn choice__btn-first"
          onClick={clickBackHandler}
        >Назад</button>
        <button className="choice__recovery choice__btn choice__btn-second"
        type="submit"
        onClick={recoveryClickHandler}
        disabled={!validEmail || !form.email}
        >Восстановить</button>
      </div>
    </div>
  )
}