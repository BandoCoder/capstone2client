import React, { Component } from "react";
import { Link } from "react-router-dom";
import TokenService from "../../services/token-service";
import UserContext from "../../contexts/UserContext";
import "./Header.css";

class Header extends Component {
  static contextType = UserContext;

  handleLogoutClick = () => {
    this.context.processLogout();
  };

  renderLogoutLink() {
    return (
      <div>
        <nav>
          <span className="userSpan">{this.context.user.name}</span>
          <Link
            className="navLink"
            onClick={this.handleLogoutClick}
            to="/login"
          >
            Logout
          </Link>
        </nav>
      </div>
    );
  }

  renderLoginLink() {
    return (
      <nav>
        <Link className="navLink" to="/login">
          Login
        </Link>{" "}
        <Link className="navLink" to="/register">
          Sign up
        </Link>
      </nav>
    );
  }

  render() {
    return (
      <header>
        <h1>
          <Link className="headLink" to="/">
            Langellium
          </Link>
        </h1>
        <div className="navBar">
          {TokenService.hasAuthToken()
            ? this.renderLogoutLink()
            : this.renderLoginLink()}
        </div>
        <hr />
      </header>
    );
  }
}

export default Header;
