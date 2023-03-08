import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Footer.module.scss";

const Footer = () => {
  const location = useLocation();

  return (
    <footer>
   
      {location.pathname === "/login" ? (
        <>
          <Link to={"/register"}>
            <p>Еще нет аккаунта? </p>Зарегистрироваться
          </Link>
        </>
      ) : (
        <>
          <Link to={"/login"}>
            <p>Уже есть аккаунт? </p>Войти
          </Link>
        </>
      )}
    </footer>
  );
};

export default Footer;
