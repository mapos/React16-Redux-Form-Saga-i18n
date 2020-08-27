import React, { useState } from "react";
import { useRoutes, A } from "hookrouter";

import "./app.css";
import Header from "./header";
import Footer from "./footer";
import Page from "./page.container";
import PageNotFound from "./pages/404";
import HomePage from "./pages/home";
import Register from "./pages/register";
import Login from "./pages/login";
import HealthCheck from "./pages/healthcheck";
import Dashboard from "./pages/dashboard";

const routes = {
  "/": () => <HomePage />,
  "/register": () => <Register />,
  "/login": () => <Login />,
  "/dashboard": () => <Dashboard />,
  "/healthcheck": () => <HealthCheck />,
  "/404": () => <PageNotFound />,
};

export default function App(props) {
  const routeResult = useRoutes(routes);

  return (
    <Page>
      <Header />
      <div>{routeResult}</div>
      <Footer />
    </Page>
  );
}
