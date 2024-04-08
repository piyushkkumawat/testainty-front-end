import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiConstants } from '../Constants/api.constant.js';
import { candidatesActions } from '../Services/candidates.service.js';


export const searchAllCandidates = createAsyncThunk('candiadte/getAllCandidate', async (data) => {
  const response = await candidatesActions.searchAllCandidates(apiConstants.SEARCH_ALL_CANDIDATE, data);
  if(response && response.status){
    // toast.success(response.message, {
    //   position: toast.POSITION.TOP_RIGHT,
    // });
  }else{
    // toast.error(
    //   response.message, {
    //     position: toast.POSITION.TOP_RIGHT,
    //   }
    // )
  }
  return response;
});

export const getCandidateById = createAsyncThunk('candidate/getCandidateById', async (data) => {
    const response = await candidatesActions.getCandidateById(apiConstants.GET_CANDIDATE_BY_ID, data);
    if(response && response.status){
      // toast.success(response.message, {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
    }else{
      // toast.error(
      //   response.message, {
      //     position: toast.POSITION.TOP_RIGHT,
      //   }
      // )
    }
    return response;
});

export const candidateTestLogs = createAsyncThunk('candidateTestLogs', async (data) => {
  const response = await candidatesActions.candidateTestLogs(apiConstants.CANDIDATE_TEST_LOGS,data); 
  return response; 
});

const candidatesSlice = createSlice({
  name: 'candidates',
  initialState: {
    loading: false,
    error: null,
    getAllCandidates: null,
    getCandidateById: null,
    candidateTestLogsData: null
  },
  reducers: {
    candidatesValue: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchAllCandidates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchAllCandidates.fulfilled, (state, action) => {
        state.loading = false;
        state.getAllCandidates = action.payload;
      })
      .addCase(searchAllCandidates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getCandidateById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.getCandidateById = null;
      })
      .addCase(getCandidateById.fulfilled, (state, action) => {
        state.loading = false;
        state.getCandidateById = action.payload;
      })
      .addCase(getCandidateById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(candidateTestLogs.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.candidateTestLogsData = null;
      })
      .addCase(candidateTestLogs.fulfilled, (state, action) => {
        state.loading = false;
        state.candidateTestLogsData = action.payload;
      })
      .addCase(candidateTestLogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  
  },
});


export const { candidatesValue } = candidatesSlice.actions;
export default candidatesSlice.reducer 