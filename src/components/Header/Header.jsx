import React from "react";
import s from "./Header.module.scss";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import MyButton from "../MUI/Buttons/MyButton/MyButton";

const Header = ({ userData }) => {
  const navigate = useNavigate();


  const token = JSON.parse(localStorage.getItem("token"));
  return (
    <div className={s.header_content}>
      <header>
        <div className={s.logo_text}>
          {!!token ? (
            <Link to={"/"}>
              <img src={logo} alt="logo" />
            </Link>
          ) : (
            <img src={logo} alt="logo" />
          )}
          <span>
            Разрабатываем и запускаем <br />
            сложные веб проекты
          </span>
        </div>

      
        {!!token ? (
          <div className={s.user_avatar}>
            <span className={s.userName}>{userData.username}</span>
            <img className={s.avatar} src={userData.avatar} alt="avatar" />
          </div>
        ) : (
          <MyButton
            onClick={() => navigate("/login")}
            style={{
              maxWidth: 114,
              height: 40,
              color: "#000000",
              border: "1px solid #D5D5D5",
            }}
          >
            Войти
          </MyButton>
        )}
      </header>
    </div>
  );
};

export default Header;
