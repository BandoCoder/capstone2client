import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Input, Required, Label } from "../Form/Form";
import AuthApiService from "../../services/auth-api-service";
import Button from "../Button/Button";
import "./RegistrationForm.css";

class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {},
  };

  state = { error: null };

  firstInput = React.createRef();

  handleSubmit = (ev) => {
    ev.preventDefault();
    const { name, username, password } = ev.target;
    AuthApiService.postUser({
      name: name.value,
      username: username.value,
      password: password.value,
    })
      .then((user) => {
        name.value = "";
        username.value = "";
        password.value = "";
        this.props.onRegistrationSuccess();
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  componentDidMount() {
    this.firstInput.current.focus();
  }

  render() {
    const { error } = this.state;
    return (
      <form className="signupForm" onSubmit={this.handleSubmit}>
        <div role="alert">{error && <p>{error}</p>}</div>
        <div>
          <Input
            className="regField"
            ref={this.firstInput}
            id="registration-name-input"
            name="name"
            placeholder="Enter Name"
            required
          />
        </div>
        <div>
          <Input
            className="regField"
            id="registration-username-input"
            name="username"
            placeholder="Choose Username"
            required
          />
        </div>
        <div>
          <Input
            className="regField"
            id="registration-password-input"
            name="password"
            type="password"
            placeholder="Choose Password"
            required
          />
        </div>
        <footer className="footer">
          <Button className="submit" type="submit">
            Sign up
          </Button>{" "}
          <Link className="loginLink" to="/login">
            Already have an account?
          </Link>
        </footer>
      </form>
    );
  }
}

export default RegistrationForm;
