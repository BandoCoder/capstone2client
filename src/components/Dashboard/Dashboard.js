import React, { Component } from "react";
import LangApiService from "../../services/lang-api-service";
import { Link } from "react-router-dom";
import "./Dashboard.css";

export default class Dashboard extends Component {
  state = {
    language: "",
    wordObjs: [],
    totalScore: 0,
  };

  componentDidMount() {
    LangApiService.getUsersLang().then((res) =>
      this.setState({
        language: res.language.name,
        wordObjs: res.words,
        totalScore: res.language.total_score,
      })
    );
  }

  render() {
    const { language, wordObjs, totalScore } = this.state;

    return (
      <section className="langDash">
        <div className="dashHead">
          <h2 className="langText">{language}</h2>
          <h2 className="total">Total correct answers: {totalScore}</h2>
        </div>
        <div className="wordBox">
          <ul className="wordList">
            <h3 className="wordHead">Words to practice</h3>
            {wordObjs.map((word, idx) => (
              <li key={idx}>
                <h4 className="word">{word.original}</h4>
                <p className="wordInfo">
                  correct answer count: {word.correct_count}
                </p>
                <p className="wordInfo">
                  incorrect answer count: {word.incorrect_count}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <button>
          <Link className="startLink" to="/learn">
            Start practicing
          </Link>
        </button>
      </section>
    );
  }
}
