import {OpenWindows} from "./const"

const ErrorMessage = {
  INCORRECTPASSWORD: `Неверный пароль, попробуйте снова`,
  USERNOTFOUND: `Пользователь не найден`,
  USERFOUND: 'Такой пользователь уже существует'
}

export const setTypeError = (error) => {
  switch (error) {
    case ErrorMessage.INCORRECTPASSWORD:
      return {message: error, type: "password"}
    case (ErrorMessage.USERNOTFOUND || ErrorMessage.USERFOUND):
      return {message: error, type: "email"}
    default:
      return {message:error, type: "other"}
  }
}

export const setClassNameOnLogin = (openWindow) => {
  switch(openWindow) {
    case OpenWindows.AUTH: 
      return "login--auth"
    case OpenWindows.RECOVERY: 
      return "login--recovery"
    case OpenWindows.LOADING: 
      return "login--loading"
    default:
      return "";
  }
}

export const checkForValidationEmail = (email) => {
  let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  return reg.test(email)
}