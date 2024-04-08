import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { usersActions } from '../Services/users.service';
import { apiConstants } from '../Constants/api.constant';
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

export const createCustomer = createAsyncThunk('user/createCustomer', async (data) => {
    const navigate = useNavigate();
    const response = await usersActions.createCustomer(apiConstants.CREATE_CUSTOMER, data);
    toast.success(response.message);
    if (response.data.status) {
        navigate('/dashboard')
    }
    return response.data;
});



const createCustomerSlice = createSlice({
  name: 'createCustomer',
  initialState: {
    loading: false,
    error: null,
    createCustomer: null
  },
  reducers: {
    createCustomerValue: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.createCustomer = action.payload;
      })
      .addCase(createCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});


export const { createCustomerValue } = createCustomerSlice.actions;
export default createCustomerSlice.reducer
