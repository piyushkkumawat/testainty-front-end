import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiConstants } from '../Constants/api.constant.js'
// import { toast } from 'react-toastify'
import { toast } from 'react-hot-toast'
import { testActions } from '../Services/test.service.js'

export const signupCandidate = createAsyncThunk(
  'signupCandidate',
  async (data) => {
    const response = await testActions.signupCandidate(
      apiConstants.SIGNUP_CANDIDATE,
      data
    )
    if (response && response.status) {
      toast.success(response.message)
    } else {
      toast.error(response.message)
    }
    return response
  }
)

export const loginCandidate = createAsyncThunk(
  'test/loginCandidate',
  async (data) => {
    const response = await testActions.loginCandidate(
      apiConstants.LOGIN_CANDIDATE,
      data
    )
    if (response && response.status) {
      toast.success(response.message)
    } else {
      toast.error(response.message)
    }
    return response
  }
)

export const getTestInfo = createAsyncThunk('getTestInfo', async (data) => {
  const response = await testActions.getTestInfo(
    apiConstants.GET_TEST_INFO,
    data
  )
  return response
})

export const startTest = createAsyncThunk('startTest', async (data) => {
  const response = await testActions.startTest(apiConstants.START_TEST, data)
  if (response && response.status) {
    toast.success(response.message)
  } else {
    toast.error(response.message)
  }
  return response
})

export const submitTest = createAsyncThunk('submitTest', async (data) => {
  const response = await testActions.submitTest(apiConstants.TEST_SUBMIT, data)
  return response
})

const testSlice = createSlice({
  name: 'test',
  initialState: {
    loading: false,
    error: null,
    signupCandidate: null,
    loginCandidate: null,
    getTestInfo: null,
    startTest: null,
    submitTest: null,
  },
  reducers: {
    candidateTestValue: (state, action) => {
      Object.assign(state, action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupCandidate.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(signupCandidate.fulfilled, (state, action) => {
        state.loading = false
        state.signupCandidate = action.payload
      })
      .addCase(signupCandidate.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(loginCandidate.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginCandidate.fulfilled, (state, action) => {
        state.loading = false
        state.loginCandidate = action.payload
      })
      .addCase(loginCandidate.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(getTestInfo.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getTestInfo.fulfilled, (state, action) => {
        state.loading = false
        state.getTestInfo = action.payload
      })
      .addCase(getTestInfo.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(startTest.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(startTest.fulfilled, (state, action) => {
        state.loading = false
        state.startTest = action.payload
      })
      .addCase(startTest.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(submitTest.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(submitTest.fulfilled, (state, action) => {
        state.loading = false
        state.submitTest = action.payload
      })
      .addCase(submitTest.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export const { candidateTestValue } = testSlice.actions
export default testSlice.reducer
