import React, { Component } from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import "./DashboardRoute.css";

class DashboardRoute extends Component {
  render() {
    return (
      <section className="dash">
        <Dashboard />
      </section>
    );
  }
}

export default DashboardRoute;
