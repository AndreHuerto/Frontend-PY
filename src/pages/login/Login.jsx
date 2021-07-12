import React, { useState, useEffect } from "react";
import upeuj from "../../assets/images/upeuj.jpg";
import upeul from "../../assets/images/upeul.jpg";
import upeut from "../../assets/images/upeut.jpg";
import "../../styles/login.css";
import AuthService from "../../auth/auth.service";
import Loader from "react-loader-spinner";

import { Link, useLocation, useHistory, Redirect } from "react-router-dom";

function Login(props) {
  const history = useHistory();
  const [loading, setLoading] = useState();

  const [user, setUser] = useState({ username: "", password: "" });
  const [redirectToRef, setRedirectToRef] = useState(false);

  const { state } = useLocation();

  const onChange = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (localStorage.user) {
      setLoading(true);
      AuthService.verify(AuthService.getCurrentUser().accessToken).then(
        (response) => {
          console.log(response);
          if (response === true) {
            props.setAuth(true);
            setRedirectToRef(true);
            setLoading(false);
          } else {
            props.setAuth(false);
            setRedirectToRef(false);
          }
        },
        (error) => {
          console.error(error);
          setRedirectToRef(false);
        }
      );
    }
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const { username, password } = user;
    setLoading(true);
    AuthService.login(username, password).then(
      (response) => {
        if (response.accessToken) {
          localStorage.setItem("user", JSON.stringify(response));
          props.setAuth(true);
          history.push("/dashboard");
          setRedirectToRef(true);
        }
      },
      (error) => {
        console.error(error);
        setRedirectToRef(false);
      }
    );
  };
  if (loading === true) {
    return (
      <div className="login__loader">
        <Loader type="MutatingDots" color="#be0940" height={100} width={100} />
      </div>
    );
  }

  if (redirectToRef === true) {
    return <Redirect to={state?.from || "/dashboard"} />;
  } else {
    return (
      <section className="h-screen">
        <div>
          <img
            src={upeul}
            alt=""
            className="upeul absolute h-screen right-0 "
          />
          <img src={upeuj} alt="" className="upeuj absolute h-screen " />
          <img src={upeut} alt="" className="upeut absolute h-screen w-full" />
          <div className="linea1 absolute w-full h-screen bg-indigo-400 opacity-80"></div>
          <div className="linea2 absolute w-full h-screen bg-linea-rojo opacity-80"></div>
        </div>

        <div className="w-3/4 h-80 sm:w-96 sm:h-3/6 absolute inset-x-0 shadow-xl bg-white mx-auto -mt-1 rounded-2xl transform translate-y-1/2 ">
          <h2 className="p-4 text-center font__proyecto text-xl md:text-2xl md:pt-4">
            INICIAR SESIÓN
          </h2>

          <form onSubmit={onSubmitHandler} className="mx-9 sm:mx-20 sm:my-7">
            <label htmlFor="username" className="block md:my-4">
              <span className="font__proyecto">Usuario</span>
              <input
                placeholder="Introduzca su Usuario..."
                type="text"
                onChange={onChange}
                name="username"
                className="my-2 lg:my-3 2xl:my-4  border block border-gray-500 rounded-md focus:border-linea-rojo w-full px-2 py-1 focus:outline-none  focus:ring focus:ring-red-500 focus:ring-opacity-50 "
              />
            </label>
            <label htmlFor="password" className="block my-4  ">
              <span className="font__proyecto ">Contraseña</span>
              <input
                placeholder="Introduzca su Contraseña..."
                type="password"
                onChange={onChange}
                name="password"
                className="my-2 lg:my-3 2xl:my-4 border block border-gray-500 rounded-md focus:border-linea-rojo w-full px-2 py-1 focus:outline-none  focus:ring focus:ring-red-500 focus:ring-opacity-50 "
              />
            </label>
            <button
              type="submit"
              className="w-full border p-2 my-4 bg-upeu-2 text-white rounded-md font__login transition duration-500 ease select-none hover:bg-upeu-1 focus:outline-none focus:shadow-outline"
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </section>
    );
  }
}
export default Login;
