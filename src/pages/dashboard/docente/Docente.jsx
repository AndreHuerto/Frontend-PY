import React, { useState, useEffect } from "react";

import { Route, useRouteMatch, withRouter } from "react-router-dom";
import UserService from "../../../auth/docente/user.service";
import AuthService from "../../../auth/auth.service";
import {Concurso} from '../../../components/utils/docente/Utils';

const Docente = () => {
  const [concursos, setConcursos] = useState([]);

  useEffect(() => {
    UserService.getConcurso(AuthService.getCurrentUser().user[0].id)
      .then((response) => {
        const { concursos } = response;
        console.log(concursos);
        if (concursos) setConcursos(concursos);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <h1 className="ml-10 pt-4 text-2xl">Concursar</h1>

      <section className="flex flex-row flex-wrap mx-auto w-9/12">
        {concursos.map((value, key) => (
          <Concurso
            key={key}
            modalidad={value.modalidad}
            participacion={value.participacion}
            fecha_ini={value.fecha_ini}
            fecha_fin={value.fecha_fin}
            doc_bases={value.doc_bases}
            doc_guia={value.doc_guia}
            doc_req={value.doc_req}
            id={value.id}

          />
        ))}
      </section>
    </>
  );
};

export default withRouter(Docente);
