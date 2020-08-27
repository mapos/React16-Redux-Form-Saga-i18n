import React from "react";
import { Link, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import classNames from "classnames";
import PropTypes from "prop-types";

import { useRoutes, A } from "hookrouter";
import {
  isAuthenticated,
  getDecodedToken,
} from "../modules/auth/auth.store.selector";
import { unsetAuth } from "../modules/auth/auth.actions";

const Header = (props) => {
  const { authenticated, name } = props;
  return (
    // Later to cleanup below with <li's>
    <div className="masthead">
      <nav className="navbar navbar-toggleable-md navbar-inverse fixed-top bg-inverse">
        <button
          className="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          data-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className=""
          id="navbarColldapse"
          style={{ backgroundColor: "#eee", padding: "10px" }}
        >
          <a className="navbar-brand" href="#">
            React Demo Setup
          </a>
          <ul className="navbar-nav mr-auto">
            {!authenticated && (
              <li
                className={classNames("nav-item", {
                  active: props.url === "/register",
                })}
              >
                <A href="/register">Register</A>
              </li>
            )}
            {!authenticated && (
              <li
                className={classNames("nav-item", {
                  active: props.url === "/login",
                })}
              >
                <A href="/login">Login</A>
              </li>
            )}
            {authenticated && (
              <li
                className={classNames("nav-item", {
                  active: props.url === "/dashboard",
                })}
              >
                <A href="/dashboard">Dashboard</A>
              </li>
            )}
            <li
              className={classNames("nav-item", {
                active: props.url === "/healthcheck",
              })}
            >
              <A href="/healthcheck"> System Check</A>
            </li>
          </ul>
          {authenticated && (
            <ul className="nav navbar-nav navbar-right">
              <li className="float-right">
                <A href="/dashboard"> LoggedIn: {name}</A>
              </li>
              <li className="float-right">
                <A onClick={props.unsetAuth} href="/dashboard">
                  Logout
                </A>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
};

Header.propTypes = {
  url: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired,
  name: PropTypes.string,
};

const mapStateToProps = (state) => {
  // console.log(state)
  let decodedToken = getDecodedToken(state);

  return {
    url: state.routing.location ? state.routing.location.pathname : "/",
    authenticated: isAuthenticated(state),
    // When registering there is an empty name so we use email instead
    name: decodedToken
      ? decodedToken.name
        ? decodedToken.name
        : decodedToken.email
      : undefined,
  };
};

export default connect(mapStateToProps, { unsetAuth })(Header);
