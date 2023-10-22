// In Quiz.js
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchQuiz, setSelectedAnswer, postAnswer } from '../state/action-creators';

function Quiz(props) {
  useEffect(() => {
    // Fetch the quiz when the component mounts
    props.fetchQuiz()
  }, []) // Empty dependency array ensures the effect runs once after the initial render
 
  const handleAnswerSubmit = () => {
    if (props.selectedAnswer !== null && props.selectedAnswer !== undefined) {
      props.postAnswer(props.quiz.quiz_id, props.quiz.answers[props.selectedAnswer].answer_id)
    }
  }
  if (!props.quiz) {
    return <div>Loading next quiz...</div>
  }

  const handleAnswerClick = (index) => {
    console.log("Selected answer index:", index);
    props.setSelectedAnswer(index);
  }; 

  return (
    <div id="wrapper">
      <h2>{props.quiz.question}</h2>
      <div id="quizAnswers">
        {props.quiz.answers.map((answer, index) => (
           <div
           className={`answer ${props.selectedAnswer === index ? 'selected' : ''}`}
           key={index}
           onClick={() => handleAnswerClick(index)}
         >
           {answer.text}
           <button onClick={() => props.setSelectedAnswer(index)}>SELECTED</button>
         </div>
        ))}
      </div>
      <button id="submitAnswerBtn" disabled={props.selectedAnswer === null || props.selectedAnswer === undefined} onClick={handleAnswerSubmit}>Submit answer</button>
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

export default connect(mapStateToProps, { fetchQuiz, setSelectedAnswer, postAnswer })(Quiz);

