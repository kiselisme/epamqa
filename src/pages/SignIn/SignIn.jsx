import React, { useContext, useState } from "react";
import s from "./SignIn.module.scss";
import email from "../../assets/email.png";
import password from "../../assets/password.png";
import Layout from "../../components/Layout/Layout";
import MyInput from "../../components/MUI/MyInput/MyInput";
import MyButton from "../../components/MUI/Buttons/MyButton/MyButton";
import axios from "axios";
import { AddContext } from "../AddContext/AddContext";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import eye from "../../assets/eye.png";

const SignIn = () => {

  const { isLoading, setIsLoading } = useContext(AddContext);
  const [message, setMessage] = useState("");
  const { type, passwordHide } = useContext(AddContext);

  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const verifyUser = async () => {
    setIsLoading(false);
    try {
      const { data } = await axios.post(
        "http://localhost:8080/login",
        userLogin
      );
      localStorage.setItem("token", JSON.stringify(data.token));
      const token = JSON.parse(localStorage.getItem("token"));
      const loginOpen = () => {
        if (!!token) {
          navigate("/");
        }
      };
      loginOpen();
      setIsLoading(true);
    } catch (error) {
      setMessage(error.response.data.error);
    }
    setIsLoading(true);
  };

  return (
    <Layout>
      <section className={s.signIn}>
        {isLoading ? (
          <>
            <h1>Вход</h1>
            <div className={s.inputs_btn}>
              <MyInput
                value={userLogin.email}
                onChange={(e) =>
                  setUserLogin({ ...userLogin, email: e.target.value })
                }
                type="email"
                placeholder="E-mail"
              >
                <span className={s.input_icon}>
                  <img src={email} alt={"email"} />
                </span>
              </MyInput>

              <MyInput
                value={userLogin.password}
                onChange={(e) =>
                  setUserLogin({ ...userLogin, password: e.target.value })
                }
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

             
              {!!userLogin.email.length && !!userLogin.password.length ? (
                <MyButton
                  onClick={verifyUser}
                  style={{
                    height: 50,
                    background: "#000000",
                    color: "#FFFFFF",}}
                >
                  Войти
                </MyButton>
              ) : (
                <MyButton
                  disabled
                  style={{
                    height: 50,
                    background: "#000000",
                    color: "#FFFFFF",
                  }}
                >
                  Войти
                </MyButton>
              )}
            </div>
          </>
        ) : (
          <Loading />
        )}
      </section>
    </Layout>
  );
};

export default SignIn;
