import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { usersActions } from '../Services/users.service';
import { apiConstants } from '../Constants/api.constant';
import { toast } from 'react-toastify';


export const getRole = createAsyncThunk('user/role', async (data) => {
  const response = await usersActions.getUserRole(apiConstants.GET_ROLES); 
  if(response && response.status){
    // toast.success(response.message, {
    //   position: toast.POSITION.TOP_RIGHT,
    // });
  }else{
    toast.error(
      response.message, {
        position: toast.POSITION.TOP_RIGHT,
      }
    )
  }
  return response; 
});

const commonSlice = createSlice({
  name: 'common',
  initialState: {
    loading: false,
    error: null,
    data:[]
  },
  reducers: {
    changeValue: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRole.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { changeValue } = commonSlice.actions;
export default commonSlice.reducer;