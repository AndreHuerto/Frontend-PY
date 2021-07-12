import React, { useEffect, useState, Children } from "react";
import { Link, useParams, useRouteMatch, useHistory } from "react-router-dom";
import concursos from "../../../assets/images/concursos.png";
import ojo from "../../../assets/icons/visible.svg";
import mercadoPago from "../../../assets/icons/MercadoPago.svg";
import { ReactComponent as Check } from "../../../assets/icons/check.svg";
import { ReactComponent as Equis } from "../../../assets/icons/equis.svg";
import { ReactComponent as Forma } from "../../../assets/icons/forma.svg";
import UserService from "../../../auth/docente/user.service";

const Concurso = ({
  doc_bases,
  doc_guia,
  doc_req,
  fecha_ini,
  fecha_fin,
  modalidad,
  participacion,
  id,
}) => {
  const history = useHistory();
  const [idlegajo, setIdlegajo] = useState(0);
  const onClick = () => {
    const data = {
      idnomina: id,
    };
    UserService.createLegajo(JSON.stringify(data))
      .then((response) => {
        console.log(response);
        if (response.idlegajos) {
          setIdlegajo(response.idlegajos);
          history.push(`/participar/${response.idlegajos}`);
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="py-5 px-5">
      <div className="inline-grid max-w-xs sm:max-w-xs lg:max-w-lg lg:flex bg-gray-100 rounded-lg border shadow-lg pb-6 lg:pb-0">
        <div className="w-full lg:w-1/3 lg:p-4">
          <img
            src={concursos}
            alt="concursos upeu docente"
            className="h-64 lg:h-full object-cover object-center w-full"
          />
        </div>

        <div className="w-full lg:w-2/3 p-4">
          <div className="inline-grid">
            <p className="work-sans font-semibold text-xl text-black">
              Modalidad: {modalidad}
              <br /> Participacion: {participacion}
            </p>
            <p className="raleway text-sm my-1 text-black opacity-75">
              Inicio: {fecha_ini} Fin: {fecha_fin}
            </p>
            Documentos:
            <div className="flex">
              <div className="flex flex-col border border-upeu-3 rounded-sm p-2 items-center">
                <span>bases</span>
                <a href={doc_bases} target="_blank" rel="noreferrer">
                  <img src={ojo} alt="" className="w-14" />
                </a>
              </div>
              <div className="flex flex-col border border-upeu-3 rounded-sm p-2 items-center">
                <span> guia</span>
                <a href={doc_guia} target="_blank" rel="noreferrer">
                  <img src={ojo} alt="" className="w-14" />
                </a>
              </div>
              <div className="flex flex-col border border-upeu-3 rounded-sm p-2 items-center">
                <span>requirimentos</span>

                <a href={doc_req} target="_blank" rel="noreferrer">
                  <img src={ojo} alt="" className="w-14" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center -mt-8 rounded-b-lg max-w-xs lg:max-w-lg lg:-mt-8 lg:justify-end lg:pr-8 py-1">
        <button
          type="button"
          className="py-3 px-4 bg-upeu-3 rounded-lg ml-3 text-white"
          onClick={onClick}
        >
          <p className="work-sans font-semibold text-sm tracking-wide">
            Participar
          </p>
        </button>
      </div>
    </div>
  );
};

const Preins = ({ confirm, dni, setDni, createPreins, goStep2, datos }) => {
  return (
    <div className="flex flex-col flex-wrap w-3/5 mx-auto p-5 border border-gray-400 rounded-lg shadow-2xl">
      <form action="" className="flex flex-col ">
        <h1 className="text-center">Requisitios de preinscripción:</h1>

        <div className="flex flex-row flex-wrap px-10 py-3 justify-center">
          <label htmlFor="" className="flex flex-col my-5 mr-7">
            <span className="text-center">DNI</span>
            <div className="flex items-center">
              <div className={`${confirm === true ? "absolute" : "hidden"}`}>
                <Check />
              </div>
              <div className={`${confirm === false ? "absolute" : "hidden"}`}>
                <Equis />
              </div>
            </div>
            <input
              type="text"
              className="border rounded-xl py-1 text-center "
              name="dni"
              maxLength="8"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
            />
          </label>

          <label htmlFor="" className="flex flex-col my-5 mr-7">
            <span className="text-center">Tu Categoria</span>
            <input
              type="text"
              name="categoria"
              id=""
              className="border rounded-xl py-1 text-center disabled:opacity-50"
              disabled
              value={datos === undefined ? "" : datos.categoria}
            />
          </label>

          <label htmlFor="" className="flex flex-col my-5 mr-7">
            <span className="text-center">Tu categoría esperada</span>
            <input
              type="text"
              name="esperada"
              id=""
              className="border rounded-xl py-1 text-center disabled:opacity-50"
              disabled
              value={
                datos === undefined
                  ? ""
                  : datos.categoria === "Auxiliar"
                  ? "Asociado"
                  : datos.categoria === "Asociado"
                  ? "Principal"
                  : datos.categoria === "Principal"
                  ? "Principal"
                  : "Principal"
              }
            />
          </label>

          <label htmlFor="" className="flex flex-col my-5 mr-7">
            <span className="text-center">Sede</span>
            <input
              type="text"
              name="sede"
              id=""
              className="border rounded-xl py-1 text-center disabled:opacity-50"
              disabled
              value={datos === undefined ? "" : datos.sede}
            />
          </label>

          <label htmlFor="" className="flex flex-col my-5 mr-7">
            <span className="text-center">Facultad</span>
            <input
              type="text"
              name="facultad"
              id=""
              className="border rounded-xl py-1 text-center disabled:opacity-50"
              disabled
              value={datos === undefined ? "" : datos.facultad}
            />
          </label>

          <label htmlFor="" className="flex flex-col my-5 mr-7">
            <span className="text-center">Escuela Profesional</span>
            <input
              type="text"
              name="ep"
              id=""
              className="border rounded-xl py-1 text-center disabled:opacity-50"
              disabled
              value={datos === undefined ? "" : datos.escuela}
            />
          </label>
        </div>
        <div className="flex flex-col w-11/12 px-10 py-5">
          <button
            className="border bg-upeu-3 text-white rounded-3xl py-1 px-16 w-max ml-auto disabled:opacity-50"
            onClick={goStep2}
            disabled={datos === undefined}
          >
            Siguiente
          </button>
        </div>
      </form>

      <button
        className="max-w-max flex mx-auto justify-center"
        onClick={createPreins}
      >
        <img src={mercadoPago} alt="mercado pago" className="w-60" />
      </button>
    </div>
  );
};

const ReqConcurso = ({ label, image, id }) => {
  let { path, url } = useRouteMatch();
  const history = useHistory();

  const onClick = () => {
    // history.push(`${url}/${label.replace(/\s+/g, '-').toLowerCase()}`)
    history.push(`${url}/${id}`);
  };

  return (
    <section className="flex flex-col flex-wrap mx-auto content-center justify-center items-center ">
      <button onClick={onClick}>
        <div className="cursor-pointer border-2 border-white shadow-md bg-blue-1 rounded-2xl p-3 flex flex-row justify-center items-center m-2 h-14- w-96">
          <span className="text-sm mr-auto">{label}</span>
          <div className="w-10 self-start ml-auto ">
            <img
              src={image}
              alt="www"
              className="flex  justify-self-start content-start justify-items-start"
            />
          </div>
        </div>
      </button>
    </section>
  );
};
const ListaSubModulos = ({ label, image, onClick }) => {
  return (
    <section className="flex flex-col flex-wrap mx-auto content-center justify-center items-center ">
      <button onClick={onClick} className="cursor-pointer">
        <div className="cursor-pointer border-2 border-white shadow-md bg-blue-1 rounded-2xl p-3 flex flex-row justify-center items-center m-2 h-14- w-96">
          <span className="text-sm mr-auto">{label}</span>
          <div className="w-10 self-start ml-auto ">
            <img
              src={image}
              alt="www"
              className="flex  justify-self-start content-start justify-items-start"
            />
          </div>
        </div>
      </button>
    </section>
  );
};

export { Concurso, Preins, ReqConcurso, ListaSubModulos };
