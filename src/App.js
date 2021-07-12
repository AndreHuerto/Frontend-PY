import "./styles/index.css";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Prueba from "./pages/Prueba";
import React, { useState, useEffect } from "react";
import ProtectedRoute from "./routes/PrivateRoute";
import Participar from "./pages/dashboard/docente/Participar";
import Layout from "./components/Layout";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  const [isAuthenticated, setisAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setisAuthenticated(boolean);
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>

        <Route path="/login">
          <Login setAuth={setAuth} />
        </Route>
        <Route path="/prueba">
          <Prueba />
        </Route>

        <Layout>
          <ProtectedRoute path="/dashboard" isAuth={isAuthenticated}>
            <Dashboard />
          </ProtectedRoute>

          <ProtectedRoute path="/participar/:id" isAuth={isAuthenticated}>
            <Participar />
          </ProtectedRoute>
        </Layout>
      </Switch>
    </Router>
  );
}

export default App;
