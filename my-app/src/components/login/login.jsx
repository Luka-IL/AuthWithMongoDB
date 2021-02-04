import React, { useState } from "react";
import { Authorization } from "../authorization/authorization";
import { PasswordRecovery } from "../password-recovery/password-recovery";
import { OpenWindows } from "../../const";
import "materialize-css";
import { setClassNameOnLogin } from "../../utlis";

export function Login() {
  const [openWindow, setOpenWindow] = useState(OpenWindows.AUTH)
  const [userNameOnLoading, setUserNameOnLoading] = useState("")
  return (
    <div className={"login "  + (setClassNameOnLogin(openWindow))}>
      <div className={"logo"}>
        <div className="logo__image"></div>
        <h2 className="logo__title">Корпоративная информационная система</h2>
        <div className="app-loading">
          <p className="app-loading__text">Добрый день, {userNameOnLoading}</p>
          <div className="loader loader-4"></div>
      </div>
      </div>
      <div className="place-for-form">
        <Authorization
          openWindow={openWindow}
          setOpenWindow={setOpenWindow}
          setUserNameOnLoading={setUserNameOnLoading}
        />

        <PasswordRecovery
          openWindow={openWindow}
          setOpenWindow={setOpenWindow}
        />
      </div>
    </div>
  )
}