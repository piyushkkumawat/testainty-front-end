import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { assessmentActions } from '../Services/assessment.service.js'
import { apiConstants } from '../Constants/api.constant.js'
// import { toast } from 'react-toastify';
import { toast } from 'react-hot-toast'

export const createAssessment = createAsyncThunk(
  'assessment/createAssessment',
  async (data) => {
    const response = await assessmentActions.createAssessment(
      apiConstants.CREATE_ASSESSMENT,
      data
    )
    if(response){
      toast.success(response.message)
    }else{
      toast.error(response.message)
    }

    return response
  }
)

export const getQuestionBank = createAsyncThunk(
  'assessment/getQuestionBank',
  async (data) => {
    const response = await assessmentActions.getQuestionBank(
      apiConstants.GET_QUESTION_BANKS,
      data
    )
    if (response && response.status) {
      // toast.success(response.message, {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
    } else {
      // toast.error(
      //   response.message, {
      //   position: toast.POSITION.TOP_RIGHT,
      // })
    }
    return response
  }
)

export const inviteCandidates = createAsyncThunk(
  'assessment/inviteCandidates',
  async (data) => {
    const response = await assessmentActions.inviteCandidates(
      apiConstants.INVITE_CANDIDATES,
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

export const getAllAssessments = createAsyncThunk(
  'assessment/getAllAssessments',
  async (data) => {
    const response = await assessmentActions.getAllAssessments(
      apiConstants.GET_ALL_ASSESSMENTS,
      data
    )
    // if(response && response.status){
    //   // toast.success(response.message, {
    //   //   position: toast.POSITION.TOP_RIGHT,
    //   // });
    // }else{
    //   toast.error(
    //     response.message, {
    //       position: toast.POSITION.TOP_RIGHT,
    //     }
    //   )
    // }
    return response
  }
)

export const deleteAssessment = createAsyncThunk(
  'assessment/deleteAssessment',
  async (data) => {
    const response = await assessmentActions.deleteAssessment(
      apiConstants.DELETE_ASSESSMENT,
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

export const getCandidate = createAsyncThunk(
  'assessment/getCandidate',
  async (data) => {
    const response = await assessmentActions.getCandidate(
      apiConstants.GET_CANDIDATES,
      data
    )
    if (response && response.status) {
      // toast.success(response.message, {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
    } else {
      // toast.error(
      //   response.message, {
      //     position: toast.POSITION.TOP_RIGHT,
      //   }
      // )
    }
    return response
  }
)

export const updateAssessment = createAsyncThunk(
  'assessment/updateAssessment',
  async (data) => {
    const response = await assessmentActions.updateAssessment(
      apiConstants.UPDATE_ASSESSMENT,
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


export const updateAssessmentById = createAsyncThunk(
  'updateAssessmentById',
  async (data) => {
    const response = await assessmentActions.updateAssessmentById(
      apiConstants.UPDATE_ASSESSMENT_BY_ID,
      data
    )
    toast.success(
      response.message
    )
    return response
  }
)

export const deleteCandidate = createAsyncThunk(
  'assessment/deleteCandidate',
  async (data) => {
    const response = await assessmentActions.deleteCandidate(
      apiConstants.DELETE_CANDIDATE,
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

const assessmentSlice = createSlice({
  name: 'assessment',
  initialState: {
    loading: false,
    error: null,
    assessment: null,
    getQuestionBanks: null,
    inviteCandidates: null,
    getAllAssessments: null,
    deleteAssessment: null,
    getCandidates: null,
    deleteCandidate: null,
    updateAssessment: null,
    updateAssessmentById: null
  },
  reducers: {
    createAssessmentValue: (state, action) => {
      Object.assign(state, action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAssessment.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createAssessment.fulfilled, (state, action) => {
        state.loading = false
        state.assessment = action.payload
      })
      .addCase(createAssessment.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(getQuestionBank.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getQuestionBank.fulfilled, (state, action) => {
        state.loading = false
        state.getQuestionBanks = action.payload
      })
      .addCase(getQuestionBank.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(inviteCandidates.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(inviteCandidates.fulfilled, (state, action) => {
        state.loading = false
        state.inviteCandidates = action.payload
      })
      .addCase(inviteCandidates.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(getAllAssessments.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getAllAssessments.fulfilled, (state, action) => {
        state.loading = false
        state.getAllAssessments = action.payload
      })
      .addCase(getAllAssessments.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(deleteAssessment.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteAssessment.fulfilled, (state, action) => {
        state.loading = false
        state.deleteAssessment = action.payload
      })
      .addCase(deleteAssessment.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(getCandidate.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getCandidate.fulfilled, (state, action) => {
        state.loading = false
        state.getCandidates = action.payload
      })
      .addCase(getCandidate.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(deleteCandidate.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteCandidate.fulfilled, (state, action) => {
        state.loading = false
        state.deleteCandidate = action.payload
      })
      .addCase(deleteCandidate.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(updateAssessment.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateAssessment.fulfilled, (state, action) => {
        state.loading = false
        state.updateAssessment = action.payload
      })
      .addCase(updateAssessment.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      .addCase(updateAssessmentById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateAssessmentById.fulfilled, (state, action) => {
        state.loading = false
        state.updateAssessmentById = action.payload
      })
      .addCase(updateAssessmentById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export const { createAssessmentValue } = assessmentSlice.actions
export default assessmentSlice.reducer
