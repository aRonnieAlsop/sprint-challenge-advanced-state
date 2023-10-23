import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setQuiz, setAnswer } from '../state/action-creators'

export default function Quiz() {
  const dispatch = useDispatch()
  const quizData = useSelector(state => state.quiz)
  const selectedAnswerIndex = useSelector((state) => state.quizReducer.selectedAnswerIndex)

  useEffect(() => {
    if (!quizData) {
    fetch('http://localhost:9000/api/quiz/next')
      .then(response => response.json())
      .then(data => {
        dispatch(setQuiz(data))
      })
      .catch(error => {
        console.error('Error fetching quiz data:', error)
      })
    }
  }, [dispatch, quizData])

  const handleAnswerClick = (index) => {
    dispatch(setAnswer(index))
  }
 
  const handleAnswerSubmit = () => {
  if (selectedAnswerIndex !== -1) {
    const payload = {
      quiz_id: quizData.quiz_id,
      answer_id: quizData.answer[selectedAnswerIndex]
    }

    dispatch(postAnswer(payload)) 
      .then(response => {
        console.log('Answer submitted successfully:', response)
        dispatch(fetchNextQuiz())
      })
      .catch(error => {
        console.error('Error submitting answer:', error)
      })
  }
  }

  if (!quizData) {
    return <div>Loading next quiz...</div>;
  } 

  
  return (
    <div id="wrapper">
    <h2>{quizData.question}</h2>
    <div id="quizAnswers">
      {quizData.answers.map((answer, index) => (
        <div 
        className={`answer ${index === selectedAnswerIndex ? 'selected' : ''}`} 
        key={answer.answer_id}
        onClick={()=> handleAnswerClick(index)}
        >
          {answer.text}
          <button>
            {index === selectedAnswerIndex ? 'SELECTED' : 'Select'}</button>
        </div>
      ))}
    </div>
    <button 
    id="submitAnswerBtn"
    disabled={selectedAnswerIndex === -1}
    onClick={handleAnswerSubmit}
    >Submit answer</button>
  </div>

  )
}

