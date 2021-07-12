import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Nav from "../../components/navbar/Nav";
import Comision from "./comision/Comision";
import Docente from "./docente/Docente";
import Participar from "./docente/Participar";

import { Switch, Route, useRouteMatch, withRouter } from "react-router-dom";

import AuthService from "../../auth/auth.service";

function Dashboard() {
  const [user, setUser] = useState(AuthService.getCurrentUser().user[0]);

  const { path, url } = useRouteMatch();

  useEffect(() => {
    setUser(AuthService.getCurrentUser().user[0]);
    console.log(path);
  }, []);

  const rol = AuthService.getCurrentUser().user[0].rol;

  const redirecto_to = {
    Comision: () => (
      <Fragment>
        <Nav>
          <div label="Concurso">
            <Comision user={user} />
          </div>

          <div label="Revisión de legajos">HISTORIAL</div>
        </Nav>
      </Fragment>
    ),
    Docente: () => (
      <>
        <Nav>
          <div label="Inicio" to="/dashboard"></div>

          <div label="Categorización" to={`${url}/concurso`}></div>
        </Nav>

        <Switch>
          <Route exact path={`${path}`}>
            El inyeniero cripton ta chambeando
          </Route>

          <Route path={`${path}/concurso`}>
            <Docente />
          </Route>


          {/* <Route path='/participar/:id'>
            <Participar />
          </Route> */}

        </Switch>
      </>
    ),
  };

  const page = redirecto_to[rol]();

  return page;
}
export default withRouter(Dashboard);
