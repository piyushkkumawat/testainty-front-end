import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiConstants } from '../Constants/api.constant.js'
// import { toast } from 'react-toastify';
import { toast } from 'react-hot-toast'
import { teamsActions } from '../Services/teams.service.js'

export const getAllTeams = createAsyncThunk(
  'teams/getAllTeams',
  async (data) => {
    const response = await teamsActions.getAllTeams(
      apiConstants.GET_All_TEAMS,
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

export const inviteAdmins = createAsyncThunk(
  'teams/inviteAdmins',
  async (data) => {
    const response = await teamsActions.inviteAdmin(
      apiConstants.INVITE_ADMIN,
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

export const deleteAdmin = createAsyncThunk(
  'teams/deleteAdmin',
  async (data) => {
    const response = await teamsActions.deleteAdmin(
      apiConstants.DELETE_ADMIN,
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

const teamsSlice = createSlice({
  name: 'teams',
  initialState: {
    loading: false,
    error: null,
    getAllTeams: null,
    inviteAdmin: null,
    deleteAdmin: null,
  },
  reducers: {
    teamsValue: (state, action) => {
      Object.assign(state, action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTeams.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getAllTeams.fulfilled, (state, action) => {
        state.loading = false
        state.getAllTeams = action.payload
      })
      .addCase(getAllTeams.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(inviteAdmins.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(inviteAdmins.fulfilled, (state, action) => {
        state.loading = false
        state.inviteAdmin = action.payload
      })
      .addCase(inviteAdmins.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(deleteAdmin.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteAdmin.fulfilled, (state, action) => {
        state.loading = false
        state.deleteAdmin = action.payload
      })
      .addCase(deleteAdmin.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export const { teamsValue } = teamsSlice.actions
export default teamsSlice.reducer
