import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { usersActions } from '../Services/users.service';
import { apiConstants } from '../Constants/api.constant';
import { toast } from 'react-hot-toast'

export const userList = createAsyncThunk('users', async (data) => {
  const response = await usersActions.getAllUsers(apiConstants.USERLIST,data); 
  toast.success(response.message);
  return response.data; 
});

const userListSlice = createSlice({
  name: 'userList',
  initialState: {
    loading: false,
    error: null,
    data: null,
  },
  reducers: {
    userValue: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(userList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});



export const { userValue } = userListSlice.actions;

export default userListSlice.reducer 