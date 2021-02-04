import React, { useState } from "react";
import { useHttp } from "../../hooks/http.hook";
import { OpenWindows } from "../../const"
import { setTypeError, checkForValidationEmail } from "../../utlis"



const Authorization = (props) => {
  const { openWindow, setOpenWindow, setUserNameOnLoading } = props;
  const { loading, request } = useHttp()
  const [form, setForm] = useState({
    email: '', password: ''
  })
  const [error, setError] = useState({})
  const [validEmail, setValidEmail] = useState(true)
  const [validPassword, setValidPassword] = useState(true)
  const [focusStyleEmail, setFocusStyleEmail] = useState(false)
  const [focusStylePassword, setFocusStylePassword] = useState(false)
  const [checkMarkEmail, setCheckMarkEmail] = useState(false)
  const [checkMarkPassword, setCheckMarkPassword] = useState(false)

  const changeHandler = (evt) => {
    setForm({ ...form, [evt.target.name]: evt.target.value })
  }

  /*const registerHandler = async () => {

    try {
      const data = await request('/api/auth/register', 'POST', { ...form })
      console.log('Data', data)
    } catch (e) {
      setError(setTypeError(e.message))
    }
  }*/

  const recoveryHandler = (evt) => {
    evt.preventDefault()
    setOpenWindow(OpenWindows.RECOVERY)
  }

  const loginHandler = async (evt) => {
    evt.preventDefault()

    if (!error.message && validEmail && validPassword) {
      try {
        const data = await request('/api/auth/login', 'POST', { ...form })
        console.log('Data', data)

        setUserNameOnLoading(form.email)
        setOpenWindow(OpenWindows.LOADING)

      } catch (e) {
        setError(setTypeError(e.message))
      }
    }
  }

  const onBlurEmailHandler = (evt) => {
    if (!evt.target.value) {
      setFocusStyleEmail(false)
      setValidEmail(true)
      setCheckMarkEmail(false)
      setError({})
      return
    }

    const emailValid = checkForValidationEmail(evt.target.value)
    setValidEmail(emailValid)
    
    if (emailValid) {
      setError({}) 
      setCheckMarkEmail(true)
    } else {
      setError({ type: "email", message: "Введите корректный Email" })
      setCheckMarkEmail(false)
    }
  }

  const onBlurPasswordHandler = (evt) => {
    if (!evt.target.value) {
      setFocusStylePassword(false)
      setValidPassword(true)
      setCheckMarkPassword(false)
      setError({})
      return
    }
    if (evt.target.value.length < 6) {
      setValidPassword(false)
      setCheckMarkPassword(false)
      setError({ type: "password", message: "Минимальная длина пароля 6 символов" })
    } else {
      setValidPassword(true)
      setCheckMarkPassword(true)
      setError({})
    }
  }

  const changeStyleOnFocusEmail = () => {
    setFocusStyleEmail(true)
  }

  const changeStyleOnFocusPassword = () => {
    setFocusStylePassword(true)
  }

  const keyDownHandler = (evt) => {
    if (evt.keyCode === 13) {
      evt.target.blur(); 
    }
  }

  return (
    <div className={"login-details " + ((openWindow === "Auth") && "login-details--open")}>
      <h3 className="login-details__title login__form-title">Данные для входа</h3>
      <form action="#">
        <div className="login__input-form input-form__login">
          <input className={((!validEmail || (error.type === "email")) && "error-validation__input") + " login__input " + (focusStyleEmail && "login__input--focus")}
            id="input-login"
            placeholder="e-mail@mail.ru"
            type="text"
            name="email"
            onChange={changeHandler}
            onFocus={changeStyleOnFocusEmail}
            onBlur={onBlurEmailHandler}
            onKeyDown={keyDownHandler}

          />
          <label className="login__label" htmlFor="input-login">Логин*</label>
          <div className={checkMarkEmail && "check-mark"}></div>
          {error.type === "email" && <span className="error-validation__message">{error.message}</span>}
        </div>
        <div className="login__input-form input-form__password">
          <input className={((!validPassword || (error.type === "password")) ? "error-validation__input " : "") + "login__input input-password " + (focusStylePassword && "login__input--focus")}
            id="input-password"
            placeholder="Введите пароль"
            type="password"
            name="password"
            onChange={changeHandler}
            onFocus={changeStyleOnFocusPassword}
            onBlur={onBlurPasswordHandler}
            onKeyDown={keyDownHandler}


          />
          <label className="login__label" htmlFor="input-password">Пароль*</label>
          <div className={checkMarkPassword ? "check-mark" : ""}></div>
          {error.type === "password" && <span className="error-validation__message">{error.message}</span>}
        </div>
        <div className="line"></div>
        <div className="login__choice">
          <button className="choice__dont-remember choice__btn choice__btn-first"
            onClick={recoveryHandler}
          >Не помню пароль</button>
          <button className="choice__entry choice__btn choice__btn-second"
            type="submit"
            onClick={loginHandler}
            disabled={!checkMarkEmail || !checkMarkPassword || loading}
          >
            <div>
              Войти в систему
            </div>
            <div className="arrow"></div>
          </button>
          {/*<button className="choice__recovery choice__btn choice__btn-second"
            type="submit"
            onClick={registerHandler}
            disabled={loading}
          >
            Регистрация
          </button>*/}
        </div>
      </form>
    </div>
  )
}

export { Authorization };
