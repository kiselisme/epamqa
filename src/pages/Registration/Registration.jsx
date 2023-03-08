import React, { useContext, useState } from "react";
import user from "../../assets/user.png";
import email from "../../assets/email.png";
import password from "../../assets/password.png";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import MyInput from "../../components/MUI/MyInput/MyInput";
import MyButton from "../../components/MUI/Buttons/MyButton/MyButton";
import Loading from "../../components/Loading/Loading";
import { AddContext } from "../AddContext/AddContext";
import { useNavigate } from "react-router-dom";
import eye from "../../assets/eye.png";
import s from "./Registration.module.scss";

const Registration = () => {

  const [message, setMessage] = useState("");


  const { isLoading, setIsLoading } = useContext(AddContext);


  const { type, passwordHide } = useContext(AddContext);


  const [userData, setUserData] = useState({
    id: 1,
    username: "test",
    email: "test@gmail.com",
    password: "123456",
    avatar: `https://picsum.photos/id/1/200/200`,
    about:
      "Я тестовый пользователь номер один. Я никогда не пропадаю между запусками api!",
  });

  const navigate = useNavigate();


  const createUser = async () => {
    setIsLoading(false);
    try {
      await axios
        .post("http://localhost:8080/register", userData)
        .then((res) =>
          localStorage.setItem("token", JSON.stringify(res.data.token))
        );
      const token = JSON.parse(localStorage.getItem("token"));
      const registerOpen = () => {
        if (!!token) {
          navigate("/");
        }
      };
      registerOpen();
      setMessage("");
    } catch (error) {
      setMessage(error.response.data.error);
    }
    setIsLoading(true);
  };

  return (
    <Layout>
      <div className={s.signUp_main}>
        {isLoading ? (
          <>
            <h1>Регистрация</h1>
            <form className={s.inputs_btn}>
              <MyInput
                value={userData.username}
                onChange={(e) => {
                  setUserData({ ...userData, username: e.target.value });
                }}
                type="text"
                placeholder="Имя"
              >
                <span className={s.input_icon}>
                  <img src={user} alt={"user"} />
                </span>
              </MyInput>

              <MyInput
                value={userData.email}
                onChange={(e) => {
                  setUserData({ ...userData, email: e.target.value });
                }}
                type="email"
                placeholder="E-mail"
              >
                <span className={s.input_icon}>
                  <img src={email} alt={"email"} />
                </span>
              </MyInput>

              <MyInput
                value={userData.password}
                onChange={(e) => {
                  setUserData({ ...userData, password: e.target.value });
                }}
                type={type}
                placeholder="Пароль"
              >
                <span className={s.input_icon}>
                  <img src={password} alt={"password"} />
                </span>
                <span className={s.hide_password} onClick={passwordHide}>
                  <img src={eye} alt="eye" />
                </span>
              </MyInput>

              {!!message.length && <span className={s.message}>{message}</span>}
              {!!userData.username.length &&
              !!userData.email.length &&
              !!userData.password.length ? (
                <MyButton
                  onClick={createUser}
                  style={{
                    height: 50,
                    background: "#000000",
                    color: "#FFFFFF",
                  }}
                >
                  Создать аккаунт
                </MyButton>
              ) : (
                <MyButton
                  onClick={createUser}
                  disabled
                  style={{
                    height: 50,
                    background: "#000000",
                    color: "#FFFFFF",
                  }}
                >
                  Создать аккаунт
                </MyButton>
              )}
            </form>
          </>
        ) : (
          <Loading />
        )}
      </div>
    </Layout>
  );
};

export default Registration;
