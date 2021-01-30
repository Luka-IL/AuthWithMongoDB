import React, { useState } from "react";
import { Authorization } from "../authorization/authorization";
import { PasswordRecovery } from "../password-recovery/password-recovery";
import { OpenWindows } from "../../const";
import "materialize-css";

export function Login() {
  const [openWindow, setOpenWindow] = useState(OpenWindows.AUTH)
  const [userNameOnLoading, setUserNameOnLoading] = useState("")
  return (
    <div className="login">
      <div className={"logo "  + ((openWindow === OpenWindows.LOADING) && "login--loading")}>
        <div className="logo__image"></div>
        <h2 className="logo__title">Корпоративная информационная система</h2>
        <div className={"app-loading "   + ((openWindow === OpenWindows.LOADING) && "app-loading--loading")}>
          <p className="app-loading__text">Добро пожаловать {userNameOnLoading}</p>
          <div className="loader loader-4"></div>
      </div>
      </div>
      <div className={"place-for-form " + ((openWindow === OpenWindows.LOADING) && "place-for-form--close")}>
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