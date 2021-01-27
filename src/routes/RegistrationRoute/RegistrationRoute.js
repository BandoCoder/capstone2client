import React, { Component } from "react";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import "./Registration.css";
class RegistrationRoute extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  };

  handleRegistrationSuccess = () => {
    const { history } = this.props;
    history.push("/login");
  };

  render() {
    return (
      <div className="centerDiv">
        <section className="regSection">
          <p>
            Practice learning a language with the spaced reptition revision
            technique.
          </p>
          <h2>Sign up</h2>
          <RegistrationForm
            onRegistrationSuccess={this.handleRegistrationSuccess}
          />
        </section>
      </div>
    );
  }
}

export default RegistrationRoute;
