import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { usersActions } from '../Services/users.service';
import { apiConstants } from '../Constants/api.constant';
import { toast } from 'react-hot-toast'

export const registration = createAsyncThunk('user/signup', async (data) => {
  const response = await usersActions.signupUser(apiConstants.SIGNUP,data); 
  toast.success(response.message);
  return response.data; 
});



const signupSlice = createSlice({
  name: 'signup',
  initialState: {
    loading: false,
    error: null,
    signupData: null
  },
  reducers: {
    signupValue: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registration.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registration.fulfilled, (state, action) => {
        state.loading = false;
        state.signupData = action.payload;
      })
      .addCase(registration.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});


export const { signupValue } = signupSlice.actions;
export default signupSlice.reducer
