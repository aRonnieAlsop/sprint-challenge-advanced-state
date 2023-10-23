// ❗ You don't need to add extra action creators to achieve MVP

import { MOVE_CLOCKWISE, 
  MOVE_COUNTERCLOCKWISE,
  SET_ACTIVE_COG_INDEX,
  SET_QUIZ_INTO_STATE,
  SET_ANSWER,
  SET_QUIZ,
  } from './action-types'

export function moveClockwise() { 
  return {
    type: MOVE_CLOCKWISE,
  }
}

export function moveCounterClockwise() { 
  return {
    type: MOVE_COUNTERCLOCKWISE,
  }
}

export function setActiveCogIndex(index) {
  return {
    type: SET_ACTIVE_COG_INDEX,
    payload: index,
  }
}

export function setSelectedAnswer() {
}

export function selectAnswer() { }

export function setInfoMessage() { 
 
}

export function setQuiz(quizData) { 
  return {
    type: SET_QUIZ_INTO_STATE,
    payload: quizData,
  }
 }

 export function setAnswer(index) {
  return {
    type: SET_ANSWER,
    payload: index,
  }
 }


export function setQuizToState(quizData) {
  return {
    type: SET_QUIZ,
    payload: quizData,
  }
}

export function inputChange() { }

export function resetForm() { }

// ❗ Async action creators
export function fetchNextQuiz() {
  return function(dispatch) {
    return fetch('http://localhost:9000/api/quiz/next')
    .then(response => response.json())
    .then(data => {
      dispatch(setQuiz(data))
    })
    .catch(error => {
      console.error('Error fetching next quiz:', error)
    })
  }

}
export function postAnswer(payload) {
 return function(dispatch) {
  return fetch('http://localhost:9000/api/quiz/answer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(response => response.json())
    .then(data => {
      dispatch(setAnswer(-1))
      dispatch(setInfoMessage(data.message))
      return data
    })
    .catch(error => {
      console.error('Error posting answer:', error)
      throw error
    })
 }
 
}
export function postQuiz() {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
