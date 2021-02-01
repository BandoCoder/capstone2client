import React, { Component } from "react";
import LangApiService from "../../services/lang-api-service";
import { Link } from "react-router-dom";
import { Input, Label } from "../Form/Form";
import "./LearningPage1.css";

export default class LearningPage1 extends Component {
  state = {
    totalScore: 0,
    nextWord: "",
    wordCorrectCount: 0,
    wordIncorrectCount: 0,
  };

  componentDidMount() {
    LangApiService.getFirstWord()
      .then((res) =>
        this.setState({
          totalScore: res.totalScore,
          nextWord: res.nextWord,
          wordCorrectCount: res.wordCorrectCount,
          wordIncorrectCount: res.wordIncorrectCount,
        })
      )
      .then(() => console.log(this.state));
  }
  render() {
    const {
      totalScore,
      nextWord,
      wordCorrectCount,
      wordIncorrectCount,
    } = this.state;
    return (
      <main className="learn">
        <h2>Translate the word:</h2>
        <span>{nextWord}</span>

        <p>Your total score is: {totalScore}</p>
        <form className="main form">
          <Label className="guessLabel" htmlFor="learn-guess-input">
            What's the translation for this word?
          </Label>
          <Input
            className="learn-guess-input"
            id="learn-guess-input"
            name="learn-guess-input"
            type="text"
            placeholder="Guess the word!"
            required
          />
          <button type="submit" className="submitAnswer">
            Submit your answer
          </button>
        </form>
        <div className="learnFoot">
          <p>You have answered this word correctly {wordCorrectCount} times.</p>
          <p>
            You have answered this word incorrectly {wordIncorrectCount} times.
          </p>
        </div>
      </main>
    );
  }
}
