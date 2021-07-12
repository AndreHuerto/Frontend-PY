import React, { useState, useEffect } from "react";
import TabIco from "../../../components/tab/TabIco";
import SubModulos from "./Submodulos";
import { ReactComponent as Preinsc } from "../../../assets/icons/preinscripcion.svg";
import { ReactComponent as Req } from "../../../assets/icons/req_concurso.svg";
import { ReactComponent as Res } from "../../../assets/icons/resumen.svg";
import mercadoPago from "../../../assets/icons/MercadoPago.svg";
import { ReactComponent as Check } from "../../../assets/icons/check.svg";
import { ReactComponent as Equis } from "../../../assets/icons/equis.svg";

import {
  Preins,
  ReqConcurso,
  SubModulContent,
} from "../../../components/utils/docente/Utils";
import Stepper from "../../../components/stepper/Stepper";
import "../../../styles/participar.css";

import {
  Switch,
  Route,
  useParams,
  withRouter,
  useRouteMatch,
  Link,
} from "react-router-dom";
import swal from "sweetalert";

import UserService from "../../../auth/docente/user.service";
import AuthService from "../../../auth/auth.service";

const Participar = () => {
  const { id } = useParams();
  let { path, url } = useRouteMatch();

  const [dni, setDni] = useState("");
  const [activeStep, setactiveStep] = useState(1);
  const [confirm, setConfirm] = useState();
  const [datos, setDatos] = useState(undefined);
  const [modulos, setModulos] = useState([]);

  const [steps, setSteps] = useState([
    { title: "Pre-inscripcion", component: <Preinsc />, valid: true },
    {
      title: "Requerimientos de concurso",
      component: <Req />,
      valid: false,
      center: "center",
    },
    { title: "Resumen", component: <Res />, valid: false, end: "end" },
  ]);

  const createPreins = () => {
    const data = {
      title: "Pagar participación",
      price: 12,
    };

    UserService.createPreins(JSON.stringify(data)).then(
      (response) => {
        const { init_point } = response;

        if (init_point) {
          console.log(init_point);
          window.open(init_point, "_blank");
        }
      },
      (error) => {
        console.error(error);
      }
    );
  };

  const onChange = (e) => {
    if (dni.length === 8) {
      UserService.findByDni(dni)
        .then((response) => {
          console.log(response);
          if (
            response.nombres.toUpperCase() ===
            AuthService.getCurrentUser().user[0].nombre.toUpperCase()
          ) {
            setConfirm(true);
            setDatos(AuthService.getCurrentUser().user[0]);
          } else {
            setConfirm(false);
            setDatos(undefined);
          }
        })
        .catch((error) => console.log(error));
    } else {
      setDatos(undefined);
    }
  };
  const goStep2 = (e) => {
    e.preventDefault();

    const data = {
      price: 12,
      iddocente: AuthService.getCurrentUser().user[0].id,
    };
    UserService.verifyCheckout(JSON.stringify(data))
      .then((response) => {
        console.log(response);
        if (response) {
          swal(
            "Se guardo correctamente!",
            "Ahora puedes hacer el siguiente paso!",
            "success"
          );

          // let array = [...tabs];
          // array[1] = (prevStates) => ({ ...prevStates, status: true });

          setSteps(
            steps.map((val, index) =>
              index === 1 ? { ...val, valid: true } : val
            )
          );
          let nextStep = activeStep + 1;
          setactiveStep(nextStep);
          UserService.getModulos()
            .then((response) => {
              const { modulos } = response;
              console.log(modulos);
              if (modulos) setModulos(modulos);
            })
            .catch((e) => console.log(e));
        }
      })
      .catch((error) => console.error(error));
  };
  const goStep3 = (e) => {
    e.preventDefault();
    console.log(id);
    setSteps(
      steps.map((val, index) => (index === 2 ? { ...val, valid: true } : val))
    );
    let nextStep = activeStep + 1;
    setactiveStep(nextStep);
  };

  const handleOnClickStepper = (step) => {
    setactiveStep(step);
  };

  const handleOnNextClick = () => {
    let nextStep = activeStep + 1;
    setactiveStep(nextStep);
  };

  const handleOnClickBack = () => {
    let prevStep = activeStep - 1;
    setactiveStep(prevStep);
  };

  useEffect(() => {
    onChange();
  }, [dni]);

  return (
    <>
      <Stepper
        steps={steps}
        activeStep={activeStep}
        onSelect={handleOnClickStepper}
        showNumber={false}
      />
      <Switch>
        <Route exact path={`${path}`}>
          <div>
            <div>
              {activeStep === 1 ? (
                <Preins
                  confirm={confirm}
                  dni={dni}
                  setDni={setDni}
                  createPreins={createPreins}
                  goStep2={goStep2}
                  datos={datos}
                />
              ) : activeStep === 2 ? (
                <div className="w-3/5 mx-auto p-3 border border-gray-400 rounded-lg shadow-2xl items-center">
                  <span className="text-2xl m-9">Requisitos</span>

                  <section className="flex flex-row flex-wrap my-4">
                    {modulos.map((value, key) => (
                      <ReqConcurso
                        key={key}
                        label={value.nombre}
                        image={value.image}
                        id={value.idmodulos}
                      />
                    ))}
                  </section>
                  <button
                    onClick={goStep3}
                    className="border bg-upeu-3 mx-10 rounded-2xl p-2 text-white"
                  >
                    Resumen
                  </button>
                </div>
              ) : (
                <div className="w-3/5 mx-auto p-3 border border-gray-400 rounded-lg shadow-2xl items-center">
                  <span className="text-2xl m-9">Resumen</span>
                  

                </div>
              )}
            </div>

            {/* <div style={{ marginTop: "40px" }}>
        <input
          type="button"
          value={activeStep === steps.length ? "Finish" : "Next"}
          onClick={activeStep === steps.length ? null : handleOnNextClick}
        />
        {activeStep === 1 ? (
          ""
        ) : (
          <input type="button" value="Back" onClick={handleOnClickBack} />
        )}
      </div> */}
          </div>
        </Route>

        <Route path={`${path}/:idmodulo`}>
          <SubModulos />
        </Route>
      </Switch>
    </>
  );
};
export default withRouter(Participar);
