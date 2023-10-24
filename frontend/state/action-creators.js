// ❗ You don't need to add extra action creators to achieve MVP

import { MOVE_CLOCKWISE, 
  MOVE_COUNTERCLOCKWISE,
  SET_ACTIVE_COG_INDEX,
  SET_QUIZ_INTO_STATE,
  SET_ANSWER,
  SET_QUIZ,
  POST_ANSWER_REQUEST,
  POST_ANSWER_SUCCESS,
  POST_ANSWER_FAILURE,
  SET_INFO_MESSAGE,
  INPUT_CHANGE,
  POST_QUIZ_REQUEST,
  POST_QUIZ_SUCCESS,
  POST_QUIZ_FAILURE,

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

export function postAnswerRequest() {
  return {
    type: POST_ANSWER_REQUEST,
  }
}

export function postAnswerSuccess() {
  return {
    type: POST_ANSWER_SUCCESS,
  }
}

export function postAnswerFailure(error) {
  return {
    type: POST_ANSWER_FAILURE,
    payload: error,
  }
}


export function setInfoMessage(message) { 
 return {
  type: SET_INFO_MESSAGE,
  payload: message,
 }
}

export function setQuiz(quizData) { 
  return function(dispatch) {
    // Reset selected answer index to -1 when a new question loads
    dispatch(setAnswer(-1))

    dispatch({
      type: SET_QUIZ_INTO_STATE,
      payload: quizData,
    })
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

export function inputChange(payload) {
  return {
    type: INPUT_CHANGE,
    payload,
  }
 }

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
export function postAnswer(quizId, answerId) {
  return function(dispatch) {
    dispatch(postAnswerRequest());

    return fetch('http://localhost:9000/api/quiz/answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quiz_id: quizId,
        answer_id: answerId,
      }),
    })
      .then(response => {
        if (response.ok) {
          dispatch(postAnswerSuccess())
          return response.json()
        } else {
          throw new Error('Failed to post answer');
        }
      })
      .then(data => {
        dispatch(setInfoMessage(data.message))
        dispatch(fetchNextQuiz())
      })
      .catch(error => {
        dispatch(postAnswerFailure(error.message));
      });
  };
 
}
export function postQuiz(payload) {
  return function(dispatch) {
    dispatch({ type: POST_QUIZ_REQUEST })

    return fetch('http://localhost:9000/api/quiz/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Failed to post quiz')
        }
      })
      .then(data => {
        dispatch({ type: POST_QUIZ_SUCCESS })
        console.log('I think this may work')
      })
      .catch(error => {
        dispatch({ type: POST_QUIZ_FAILURE, payload: error.message })
        console.log('I am broken')
      })
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
