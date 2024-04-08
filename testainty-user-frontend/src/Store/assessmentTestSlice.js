import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiConstants } from '../Constants/api.constant.js';
import { runCodeActions } from '../Services/assessmentTest.service.js';


export const runCode = createAsyncThunk('candiadte/runCode', async (data) => {
  const response = await runCodeActions.runCode(apiConstants.RUN_CODE, data);
  if(response && response.status){
    console.log(response)
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

const runCodeSlice = createSlice({
  name: 'runCode',
  initialState: {
    loading: false,
    error: null,
    testCodeResult: null
  },
  reducers: {
    changeValue: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(runCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(runCode.fulfilled, (state, action) => {
        state.loading = false;
        state.testCodeResult = action.payload;
      })
      .addCase(runCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
    
  
  },
});


export const { changeValue } = runCodeSlice.actions;
export default runCodeSlice.reducer 