import React, { Component } from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="row">
        <div className="col-18 col-sm-12 col-lg-12 text-right">
          <a href="#">Back to top</a>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3 col-sm-6">
          <div className="footer-pad">
            <h4>Address</h4>
            <address>
              <ul className="list-unstyled">
                <li>
                  <a href="mailto:mapoart@gmail.com">mapoart@gmail.com</a>
                  <br />
                </li>
                <li>-</li>
              </ul>
            </address>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="footer-pad">
            <h4>Technologies</h4>
            <ul className="list-unstyled">
              <li>
                <a target="_blank" href="https://nodejs.org/en/">
                  NodeJS
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://reactjs.org/blog/2017/09/26/react-v16.0.html"
                >
                  React v16
                </a>
              </li>
              <li>
                <a target="_blank" href="http://redux.js.org/">
                  Redux
                </a>
              </li>
              <li>
                <a target="_blank" href="https://redux-form.com/">
                  Redux-Form
                </a>
              </li>
              <li>
                <a target="_blank" href="https://redux-saga.js.org/">
                  Redux-Saga
                </a>
              </li>
              <li>
                <a target="_blank" href="http://getbootstrap.com/">
                  Bootstrap 4
                </a>
              </li>
              <li>
                <a target="_blank" href="https://jwt.io/">
                  JWT
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="footer-pad">
            <h4>Languages</h4>
            <ul className="list-unstyled">
              <li>
                <a
                  target="_blank"
                  href="https://pl.wikipedia.org/wiki/JavaScript"
                >
                  JavaScript
                </a>
              </li>
              <li>
                <a target="_blank" href="http://es6-features.org">
                  ES6
                </a>
              </li>
              <li>
                <a target="_blank" href="https://pl.wikipedia.org/wiki/HTML5">
                  HTML 5
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://en.wikipedia.org/wiki/Cascading_Style_Sheets"
                >
                  CSS 3
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="footer-pad">
            <h4>Tools</h4>
            <ul className="list-unstyled">
              <li>
                <a target="_blank" href="https://babeljs.io/">
                  Babel Online
                </a>
              </li>
              <li>
                <a target="_blank" href="https://codesandbox.io/s/new">
                  React Online / Codesandbox
                </a>
              </li>
              <li>
                <a target="_blank" href="https://jwt.io/">
                  Decode JWT Online
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://forbeslindesay.github.io/express-route-tester/"
                >
                  Express Route Tester
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-18 col-sm-12 col-lg-12 text-center">
          nexss.com <a href="mailto:contact@nexss.com">contact@nexss.com</a>
        </div>
      </div>
    </footer>
  );
}
