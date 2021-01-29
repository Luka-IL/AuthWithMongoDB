const ErrorMessage = {
  INCORRECTPASSWORD: `Неверный пароль, попробуйте снова`,
  USERNOTFOUND: `Пользователь не найден`,
  USERFOUND: 'Такой пользователь уже существует'
}

export const setTypeError = (error) => {
  switch (error) {
    case ErrorMessage.INCORRECTPASSWORD:
      return {message: error, type: "password"}
    case ErrorMessage.USERNOTFOUND:
      return {message: error, type: "email"}
    case ErrorMessage.USERFOUND:
      return {message: error, type: "email"}
  }
}