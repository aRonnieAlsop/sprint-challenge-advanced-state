import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setQuiz } from '../state/action-creators'

export default function Quiz() {
  const dispatch = useDispatch()
  const quizData = useSelector(state => state.quiz)

  useEffect(() => {
    fetch('http://localhost:9000/api/quiz/next')
      .then(response => response.json())
      .then(data => {
        dispatch(setQuiz(data))
      })
      .catch(error => {
        console.error('Error fetching quiz data:', error)
      })
  }, [dispatch])

  if (!quizData) {
    return <div>Loading next quiz...</div>;
  } 

  console.log(quizData)
  return (
    <div id="wrapper">
    <h2>{quizData.question}</h2>
    <div id="quizAnswers">
      {quizData.answers.map((answer, index) => (
        <div className={`answer ${index === 0 ? 'selected' : ''}`} key={answer.answer_id}>
          {answer.text}
          <button>{index === 0 ? 'SELECTED' : 'Select'}</button>
        </div>
      ))}
    </div>
    <button id="submitAnswerBtn">Submit answer</button>
  </div>

  )
}

