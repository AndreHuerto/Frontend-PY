import React from "react";
import concurso from "../../../assets/images/concursos.png";
import Skeleton from "react-loading-skeleton";

const Concursos = (props) => {
  
    return (
      <div className="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20 mx-auto">
        <div className="flex justify-center md:justify-end -mt-16">
          <img
            className="w-20 h-20 object-cover rounded-full border-2 border-upeu-3"
            alt="upeu"
            src={concurso}
          />
        </div>
        <div>
          <h2 className="text-gray-800 text-3xl font-semibold">
            Categorización Docente 2021 {props.tipo}
          </h2>
          <p className="mt-2 text-gray-600">
            Modalidad: {props.modalidad}, Participacion : {props.participacion}
          </p>
          <span>Desde : {props.fecha_ini}</span>
          <span> -- Hasta: {props.fecha_fin}</span>
        </div>
        <div className="flex justify-end mt-4"></div>
      </div>
    );
};
const LoadginConcurso = () => {
  return (
    <div className="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20 mx-auto">
      <div className="flex justify-center md:justify-end -mt-16">
        <img
          className="w-20 h-20 object-cover rounded-full border-2 border-upeu-3"
          alt="upeu"
          src={concurso}
        />
      </div>
      <div>
        <h2 className="text-gray-800 text-3xl font-semibold">
          <Skeleton />
        </h2>
        <p className="mt-2 text-gray-600">
          <Skeleton />
        </p>
        <span>
          <Skeleton />
        </span>
        <span>
          <Skeleton />
        </span>
      </div>
      <div className="flex justify-end mt-4"></div>
    </div>
  )
}

export {Concursos,LoadginConcurso};
