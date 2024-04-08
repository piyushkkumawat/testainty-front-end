/* eslint-disable no-debugger */
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { t } from 'i18next'

export const commonService = {
  withOutToken,
  getwithOutToken,
  withToken,
  getDataWithToken,
  getWithToken,
  getDataWithParams,
  deleteWithToken,
  withTokenFormData,
  withCandidateToken,
  withTokenPatch,
}

//-- It's common function for using without token
function withOutToken(apiName, data) {
  // Create a new AbortController
  const controller = new AbortController()
  const { signal } = controller

  // Set up a timeout to abort the request after a specified time (e.g., 30 seconds)
  const timeoutId = setTimeout(() => {
    controller.abort()
  }, 30000) // 30 seconds

  // Define your request configuration
  const config = {
    method: 'POST',
    url: `${process.env.REACT_APP_API_URL + apiName}`,
    data: data,
    signal, // Assign the signal to the request
  }

  // Send the request
  return axios(config)
    .then(handleResponse)
    .catch((error) => {
      if (error.name === 'AbortError') {
        console.log('Request aborted:', error)
      } else {
        console.log('Error:', error)
      }
    })
    .finally(() => {
      clearTimeout(timeoutId) // Clear the timeout
    })
}

//-- It's common function for using the token
function withToken(apiName, data) {
  // Initialize the i18n translation hook.
  let userData = JSON.parse(localStorage.getItem('userData'))
  let token = userData?.token

  // Create a new AbortController instance
  const controller = new AbortController()
  const signal = controller.signal

  // Define an abort function to cancel the request
  const abort = () => controller.abort()

  // Create a promise that resolves when the request is completed
  const requestPromise = axios({
    method: 'POST',
    url: `${process.env.REACT_APP_API_URL + apiName}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: data,
    signal: signal, // Associate the signal with the request
  })
    .then((handleResponse) => {
      if (
        handleResponse &&
        handleResponse.data &&
        handleResponse.data.status === false &&
        handleResponse.data.message ===
          'Your account is deactivated. Please contact Administrator'
      ) {
        // Auto logout use
        toast.error(handleResponse.data.message)
      }
      return handleResponse
    })
    .catch(async (error) => {
      if (
        error &&
        error.response &&
        error.response.data &&
        !error.response.data.status
      ) {
        if (error.response.status === 401) {
          localStorage.removeItem('userData')
          window.location.href = '/login'
        }
        // await logoutUser();

        toast.error(t('errorMsg'))
      }
    })

  // Attach the abort function to the promise so you can cancel the request if needed
  requestPromise.abort = abort

  return requestPromise
}

//-- It's common function for using the token
function withCandidateToken(apiName, data) {
  let token = localStorage.getItem('candidateToken')

  // Create a new AbortController instance
  const controller = new AbortController()
  const signal = controller.signal

  // Define an abort function to cancel the request
  const abort = () => controller.abort()

  // Create a promise that resolves when the request is completed
  const requestPromise = axios({
    method: 'POST',
    url: `${process.env.REACT_APP_API_URL + apiName}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: data,
    signal: signal, // Associate the signal with the request
  })
    .then((handleResponse) => {
      return handleResponse
    })
    .catch((error) => {
      if (error.response.status === 401 && error.response) {
        toast.error(error.response.data.message)
      } else {
        toast.error(t('errorMsg'))
      }

      // if (
      //   error &&
      //   error.response &&
      //   error.response.data &&
      //   !error.response.data.status
      // ) {
      //   toast.error(t('errorMsg'))
      // }
    })
  // Attach the abort function to the promise so you can cancel the request if needed
  requestPromise.abort = abort

  return requestPromise
}

//-- It's common function for using the token and multipart form data
function withTokenFormData(apiName, data) {
  let userData = JSON.parse(localStorage.getItem('userData'))
  let token = userData.token

  // Create a new AbortController instance
  const controller = new AbortController()
  const signal = controller.signal

  // Define an abort function to cancel the request
  const abort = () => controller.abort()

  // Create a promise that resolves when the request is completed
  const requestPromise = axios({
    method: 'POST',
    url: `${process.env.REACT_APP_API_URL + apiName}`,
    headers: { Authorization: `Bearer ${token}` },
    data: data,
    signal: signal, // Associate the signal with the request
  })
    .then((handleResponse) => {
      if (
        handleResponse &&
        handleResponse.data &&
        handleResponse.data.status === false &&
        handleResponse.data.message ===
          'Your account is deactivated. Please contact Administrator'
      ) {
        // Auto logout use
        toast.error(handleResponse.data.message)
      }
      return handleResponse
    })
    .catch((error) => {
      if (
        error &&
        error.response &&
        error.response.data &&
        !error.response.data.status
      ) {
        if (error.response.status === 401) {
          localStorage.removeItem('userData')
          window.location.href = '/login'
        }

        toast.error(t('errorMsg'))
      }
    })

  // Attach the abort function to the promise so you can cancel the request if needed
  requestPromise.abort = abort

  return requestPromise
}

//-- It's common function for using without token for get data
function getwithOutToken(apiName) {
  return axios({
    method: 'GET',
    url: `${process.env.REACT_APP_API_URL + apiName}`,
  })
    .then(handleResponse)
    .catch((error) => {
      if (
        error &&
        error.response &&
        error.response.data &&
        !error.response.data.status
      ) {
        if (error.response.status === 401) {
          localStorage.removeItem('userData')
          window.location.href = '/login'
        }

        toast.error(
          // error.response.data.message
          t('errorMsg')
        )
      }
    })
}

//-- get data
function getDataWithToken(apiName, data) {
  let userData = JSON.parse(localStorage.getItem('userData'))
  let token = userData.token
  return axios({
    method: 'GET',
    url: `${process.env.REACT_APP_API_URL + apiName}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: data,
  })
    .then((handleResponse) => {
      if (
        handleResponse &&
        handleResponse.data &&
        handleResponse.data.status === false &&
        handleResponse.data.message ===
          'Your account is deactivated. Please contact Administrator'
      ) {
        // Auto logout use
        toast.error(handleResponse.data.message)
      }
      return handleResponse
    })
    .catch((error) => {
      if (
        error &&
        error.response &&
        error.response.data &&
        !error.response.data.status
      ) {
        if (error.response.status === 401) {
          localStorage.removeItem('userData')
          window.location.href = '/login'
        }

        toast.error(t('errorMsg'))
      }
    })
}

//-- get data
function getDataWithParams(apiName) {
  let userData = JSON.parse(localStorage.getItem('userData'))
  let token = userData.token
  return axios({
    method: 'GET',
    url: `${process.env.REACT_APP_API_URL + apiName}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((handleResponse) => {
      if (
        handleResponse &&
        handleResponse.data &&
        handleResponse.data.status === false &&
        handleResponse.data.message ===
          'Your account is deactivated. Please contact Administrator'
      ) {
        // Auto logout use
        toast.error(handleResponse.data.message)
      }
      return handleResponse
    })
    .catch((error) => {
      if (
        error &&
        error.response &&
        error.response.data &&
        !error.response.data.status
      ) {
        if (error.response.status === 401) {
          localStorage.removeItem('userData')
          window.location.href = '/login'
        }

        toast.error(t('errorMsg'))
      }
    })
}

function getWithToken(apiName) {
  let userData = JSON.parse(localStorage.getItem('userData'))
  let token = userData.token
  return axios({
    method: 'GET',
    url: `${process.env.REACT_APP_API_URL + apiName}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((handleResponse) => {
      if (
        handleResponse &&
        handleResponse.data &&
        handleResponse.data.status === false &&
        handleResponse.data.message ===
          'Your account is deactivated. Please contact Administrator'
      ) {
        // Auto logout use
        toast.error(handleResponse.data.message)
      }
      return handleResponse
    })
    .catch((error) => {
      if (
        error &&
        error.response &&
        error.response.data &&
        !error.response.data.status
      ) {
        if (error.response.status === 401) {
          localStorage.removeItem('userData')
          window.location.href = '/login'
        }

        toast.error(t('errorMsg'))
      }
    })
}

//-- It's common function for delete using the token
function deleteWithToken(apiName, data) {
  let userData = JSON.parse(localStorage.getItem('userData'))
  let token = userData.token
  return axios({
    method: 'DELETE',
    url: `${process.env.REACT_APP_API_URL + apiName}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: data,
  })
    .then((handleResponse) => {
      if (
        handleResponse &&
        handleResponse.data &&
        handleResponse.data.status === false &&
        handleResponse.data.message ===
          'Your account is deactivated. Please contact Administrator'
      ) {
        // Auto logout use
        toast.error(handleResponse.data.message)
      }
      return handleResponse
    })
    .catch((error) => {
      if (
        error &&
        error.response &&
        error.response.data &&
        !error.response.data.status
      ) {
        if (error.response.status === 401) {
          localStorage.removeItem('userData')
          window.location.href = '/login'
        }
        toast.error(t('errorMsg'))
      }
    })
}

//-- It's common function for using the token
async function withTokenPatch(apiName, data) {
  try {
    // Initialize the i18n translation hook.
    let userData = JSON.parse(localStorage.getItem('userData'))
    let token = userData?.token

    // Create a new AbortController instance
    const controller = new AbortController()
    const signal = controller.signal

    const config = {
      method: 'PATCH',
      url: `${process.env.REACT_APP_API_URL + apiName}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: data,
      signal: signal,
    }
    // Create a promise that resolves when the request is completed
    const response = await axios(config)

    const responseData = handleResponse(response)
    if (
      responseData &&
      responseData.data &&
      responseData.data.status === false &&
      responseData.data.message ===
        'Your account is deactivated. Please contact Administrator'
    ) {
      // Auto logout use
      toast.error(responseData.data.message)
    }
    return responseData
  } catch (error) {
    if (error.response.status === 401) {
      localStorage.removeItem('userData')
      window.location.href = '/login'
    }

    // handleError(error)
    return Promise.reject(error) // Propagate the error
  }
}

function handleError(error) {
  if (error && error.response) {
    if (error.response.status === 400) {
      toast.error(error.response.data.message)
    }
    if (
      error.response.status === 500 &&
      error.response.data &&
      !error.response.data.status
    ) {
      console.log(error.response, error.response)
      toast.error('Something went wrong!')
    }
  } else {
    console.error('Error in function:', error)
  }

  return Promise.reject(error) // Propagate the error
}

function handleResponse(response) {
  if (response.status === 200 || response.status === 201) {
    return response
  } else {
    const error = response
    return Promise.reject(error)
  }
}

// function logoutUser() {
//   console.log('====remove')
//   // Perform logout actions here, such as clearing user data and redirecting to login page
//   localStorage.removeItem('userData');

// }
