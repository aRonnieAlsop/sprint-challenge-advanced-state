// In Quiz.js
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchQuiz, setSelectedAnswer } from '../state/action-creators';

function Quiz(props) {
  useEffect(() => {
    // Fetch the quiz when the component mounts
    props.fetchQuiz()
  }, []) // Empty dependency array ensures the effect runs once after the initial render
 

  if (!props.quiz) {
    return <div>Loading next quiz...</div>
  }

  return (
    <div id="wrapper">
      <h2>{props.quiz.question}</h2>
      <div id="quizAnswers">
        {props.quiz.answers.map((answer, index) => (
          <div 
          className={`answer ${props.selectedAnswer === index ? 'selected' : ''}`} 
          key={index}
          onClick={() => props.setSelectedAnswer(index)}
            >
           {answer.text}
            <button>SELECTED</button>
          </div>
        ))}
      </div>
      <button id="submitAnswerBtn" disabled={props.selectedAnswer === null || props.selectedAnswer === undefined}>Submit answer</button>
    </div>
  )
}

const mapStateToProps = state => {
  console.log(state); // Log the entire state to see its structure
  return {
    quiz: state.quiz,
    selectedAnswer: state.selectedAnswer,
  }
}

export default connect(mapStateToProps, { fetchQuiz, setSelectedAnswer })(Quiz);

