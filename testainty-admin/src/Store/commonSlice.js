import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { usersActions } from '../Services/users.service';
import { apiConstants } from '../Constants/api.constant';

export const getRole = createAsyncThunk('roles', async () => {
  const response = await usersActions.getUserRole(apiConstants.GET_ROLES); 
  return response; 
});

const commonSlice = createSlice({
  name: 'common',
  initialState: {
    loading: false,
    error: null,
    data: [],
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