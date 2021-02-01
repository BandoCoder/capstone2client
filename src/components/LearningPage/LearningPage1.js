import React, { Component } from "react";
import LangApiService from "../../services/lang-api-service";
import { Input, Label } from "../Form/Form";
import "./LearningPage1.css";

export default class LearningPage1 extends Component {
  state = {
    totalScore: 0,
    nextWord: "",
    wordCorrectCount: 0,
    wordIncorrectCount: 0,
    feedBack: "",
    answer: "",
  };

  componentDidMount() {
    LangApiService.getNextWord().then((res) =>
      this.setState({
        totalScore: res.totalScore,
        nextWord: res.nextWord,
        wordCorrectCount: res.wordCorrectCount,
        wordIncorrectCount: res.wordIncorrectCount,
      })
    );
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const answer = {
      guess: e.target["learn-guess-input"].value,
    };
    LangApiService.postAnswer(answer).then((res) => {
      if (res.isCorrect === true) {
        return this.setState({
          totalScore: res.totalScore,
          wordCorrectCount: res.wordCorrectCount,
          wordIncorrectCount: res.wordIncorrectCount,
          feedBack: "You were correct! :D",
        });
      } else {
        return this.setState({
          totalScore: res.totalScore,
          wordCorrectCount: res.wordCorrectCount,
          wordIncorrectCount: res.wordIncorrectCount,
          feedBack: "Good try, but not quite right :(",
          answer: res.answer,
        });
      }
    });
  };

  handleNext = (e) => {
    e.preventDefault();
    LangApiService.getNextWord().then((res) =>
      this.setState({
        nextWord: res.nextWord,
        totalScore: res.totalScore,
        wordCorrectCount: res.wordCorrectCount,
        wordIncorrectCount: res.wordIncorrectCount,
        feedBack: "",
        answer: "",
      })
    );
  };
  render() {
    const {
      totalScore,
      nextWord,
      feedBack,
      answer,
      wordCorrectCount,
      wordIncorrectCount,
    } = this.state;
    return (
      <main className="learn">
        <h2>{feedBack}</h2>
        {feedBack !== "" ? (
          <>
            <div className="DisplayFeedback">
              {answer === "" ? (
                <></>
              ) : (
                <p>
                  The correct translation for {nextWord} was {answer}.
                </p>
              )}
              <button onClick={this.handleNext}>Try another word!</button>
            </div>
            <div className="DisplayScore">
              <p>Your total score is: {totalScore}</p>
            </div>
          </>
        ) : (
          <>
            <h2>Translate the word:</h2>
            <span>{nextWord}</span>
            <form className="main form" onSubmit={this.handleSubmit}>
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
            <div className="DisplayScore">
              <p>Your total score is: {totalScore}</p>
              <p>
                You have answered this word correctly {wordCorrectCount} times.
              </p>
              <p>
                You have answered this word incorrectly {wordIncorrectCount}{" "}
                times.
              </p>
            </div>
          </>
        )}
      </main>
    );
  }
}
