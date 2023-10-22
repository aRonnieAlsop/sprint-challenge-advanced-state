// ❗ You don't need to add extra action creators to achieve MVP

import { MOVE_CLOCKWISE, 
  MOVE_COUNTERCLOCKWISE,
  SET_ACTIVE_COG_INDEX,
  SET_QUIZ_INTO_STATE,
  SET_INFO_MESSAGE,
  SET_SELECTED_ANSWER, } from './action-types'

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

export function setSelectedAnswer(answerIndex) {
  return {
    type: SET_SELECTED_ANSWER,
    payload: answerIndex,
  }
}

export function selectAnswer() { }

export function setInfoMessage(message) { 
  return {
    type: SET_INFO_MESSAGE,
    payload: message,
  }
}

export function setQuiz() { }

export function inputChange() { }

export function resetForm() { }

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    dispatch({ type: SET_QUIZ_INTO_STATE, payload: null })
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
    fetch('http://localhost:9000/api/quiz/next')
      .then(response => response.json())
      .then(quiz => {
        dispatch({ type: SET_QUIZ_INTO_STATE, payload: quiz})
      })
      .catch(error => {
        console.error('Error fetching quiz:', error)
      })
  }
}
export function postAnswer(quizId, answerId) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
    fetch('http://localhost:9000/api/quiz/answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quiz_id: quizId,
        answer_id: answerId,
      })
    })
    .then((response) => response.json())
    .then((data) => {
      dispatch(setInfoMessage(data.message))

      dispatch(setSelectedAnswer(null))

      dispatch(fetchQuiz())
    })
    .catch((error) => {
      console.error('Error posting answer:', error)
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
