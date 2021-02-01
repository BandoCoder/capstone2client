import React, { Component } from "react";
import LearningPage1 from "../../components/LearningPage/LearningPage1";
import "./LearningRoute.css";

class LearningRoute extends Component {
  render() {
    return (
      <section className="learnPage">
        <LearningPage1 />
      </section>
    );
  }
}

export default LearningRoute;
