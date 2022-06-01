import React from "react";
import logo from "../images/Logo.svg";
import { Link } from "react-router-dom";
import { Route } from "react-router-dom";

function Header({ loggedIn, userEmail, onSignOut }) {
  return (
    <header className="header">
      <img src={logo} alt="Логотип" className="header__logo" />
      {loggedIn ? (
        <ul className="header__navBar">
          <li className="header__nav">{userEmail}</li>
          <li className="header__nav">
            <button className="header__exit-button" onClick={onSignOut}>
              Выйти
            </button>
          </li>
        </ul>
      ) : (
        <>
          <Route path="/login">
            <Link to="/register" className="header__nav-link">
              Регистрация
            </Link>
          </Route>
          <Route path="/register">
            <Link to="/login" className="header__nav-link">
              Войти
            </Link>
          </Route>
        </>
      )}
    </header>
  );
}

export default Header;
