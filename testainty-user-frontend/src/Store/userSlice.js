import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { usersActions } from '../Services/users.service.js'
import { apiConstants } from '../Constants/api.constant.js'
// import { toast } from 'react-toastify'
import { toast } from 'react-hot-toast'

export const login = createAsyncThunk('user/login', async (data) => {
  const response = await usersActions.loginUser(apiConstants.LOGIN_USER, data)
  // const isSmallScreen = window.innerWidth <= 600;
  if (response && response.status) {
    toast.success(
      response.message
      //    {
      //   position: toast.POSITION.TOP_RIGHT,
      //   autoClose: 2000, // Adjust the autoClose time if needed
      //   style: {
      //     width: isSmallScreen ? '200px' : '300px', // Set the width based on screen size
      //     fontSize: isSmallScreen? '12px' : '16px', // Set the desired font size
      //     // Add any other custom styles as needed
      //   },
      // }
    )
    localStorage.setItem('userData', JSON.stringify(response.data))
    localStorage.setItem('orgId', response.data.orgId)
  } else {
    toast.error(response.message)
  }

  return response
})

export const forgotPassword = createAsyncThunk(
  'forgotPassword',
  async (data) => {
    const response = await usersActions.forgotPassword(
      apiConstants.FORGOT_PASSWORD,
      data
    )
    if (response && response.status) {
      toast.success(response.message)
    } else {
      toast.error(response.message)
    }
    return response.data
  }
)

export const resetPassword = createAsyncThunk('resetPassword', async (data) => {
  const response = await usersActions.resetPassword(
    apiConstants.RESET_PASSWORD,
    data
  )
  if (response && response.status) {
    toast.success(response.message)
    // window.location.href = '/login'
  } else {
    toast.error(response.message)
  }

  return response
})

export const changePassword = createAsyncThunk('changePassword', async (data) => {
  const response = await usersActions.changePassword(
    apiConstants.CHANGE_PASSWORD,
    data
  )
  if (response && response.status) {
    toast.success(response.message)
    // localStorage.removeItem('userData')
    // window.location.href = '/login'
  } else {
    toast.error(response.message)
  }

  return response
})

export const createCustomer = createAsyncThunk(
  'user/createCustomer',
  async (data) => {
    const response = await usersActions.createCustomer(
      apiConstants.CREATE_CUSTOMER,
      data
    )
    if (response && response.status) {
      toast.success(response.message)
      window.location.href = '/dashboard'
    } else {
      toast.error(response.message, {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
    return response
  }
)

export const customerList = createAsyncThunk('customerList', async (data) => {
  const response = await usersActions.getAllCustomers(
    apiConstants.GET_CUSTOMER_LIST,
    data
  )
  if (response && response.status) {
    // toast.success(response.message, {
    //   position: toast.POSITION.TOP_RIGHT,
    // });
  } else {
    toast.error(response.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
  return response.data
})

export const getProfile = createAsyncThunk('getProfile', async (data) => {
  const response = await usersActions.getProfile(apiConstants.GET_PROFILE, data)
  return response.data
})

export const imageUpload = createAsyncThunk('imageUpload', async (data) => {
  const response = await usersActions.imageUpload(
    apiConstants.IMAGE_UPLOAD,
    data
  )
  if (response && response.status) {
    toast.success(response.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  } else {
    toast.error(response.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
  return response.data
})

export const uploadPicture = createAsyncThunk('uploadPicture', async (data) => {
  const response = await usersActions.uploadPicture(
    apiConstants.UPLOAD_PICTURE,
    data
  )
  if (response && response.status) {
    toast.success(response.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  } else {
    toast.error(response.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
  return response.data
})

// Create users from home page site
export const createSiteUser = createAsyncThunk(
  'createSiteUser',
  async (data) => {
    const response = await usersActions.createSiteUser(
      apiConstants.CREATE_SITE_USER,
      data
    )
    // if(response && response.status){
    //   toast.success(response.message, {
    //     position: toast.POSITION.TOP_RIGHT,
    //   });
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

// Verify users from home page site
export const verifySiteUser = createAsyncThunk(
  'verifySiteUser',
  async (data) => {
    const response = await usersActions.createSiteUser(
      apiConstants.VERIFY_SITE_USER,
      data
    )
    // if(response && response.status){
    //   toast.success(response.message, {
    //     position: toast.POSITION.TOP_RIGHT,
    //   });
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

export const getNotifications = createAsyncThunk(
  'getNotifications',
  async (data) => {
    const response = await usersActions.getNotifications(
      apiConstants.GET_NOTIFICATIONS,
      data
    )
    return response
  }
)

export const getAllNotifications = createAsyncThunk(
  'getAllNotifications',
  async (data) => {
    const response = await usersActions.getAllNotifications(
      apiConstants.GET_ALL_NOTIFICATIONS,
      data
    )
    return response
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    error: null,
    loggedInUser: null,
    forgotPassword: null,
    resetPassword: null,
    data: null,
    customerListData: null,
    getProfile: null,
    imageUpload: null,
    uploadPicture: null,
    getInTouchData: null,
    verifySiteUserData: null,
    NotificationList: null,
    allNotifications: null,
    candidateTestLogsData: null,
    changePassword: null
  },
  reducers: {
    changeValue: (state, action) => {
      Object.assign(state, action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.loggedInUser = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false
        state.forgotPassword = action.payload
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false
        state.resetPassword = action.payload
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(createCustomer.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(createCustomer.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(customerList.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(customerList.fulfilled, (state, action) => {
        state.loading = false
        state.customerListData = action.payload
      })
      .addCase(customerList.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(getProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false
        state.getProfile = action.payload
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(imageUpload.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(imageUpload.fulfilled, (state, action) => {
        state.loading = false
        state.imageUpload = action.payload
      })
      .addCase(imageUpload.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(uploadPicture.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(uploadPicture.fulfilled, (state, action) => {
        state.loading = false
        state.uploadPicture = action.payload
      })
      .addCase(uploadPicture.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(createSiteUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createSiteUser.fulfilled, (state, action) => {
        state.loading = false
        state.getInTouchData = action.payload
      })
      .addCase(createSiteUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(verifySiteUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(verifySiteUser.fulfilled, (state, action) => {
        state.loading = false
        state.verifySiteUserData = action.payload
      })
      .addCase(verifySiteUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(getNotifications.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.loading = false
        state.NotificationList = action.payload
      })
      .addCase(getNotifications.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(getAllNotifications.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getAllNotifications.fulfilled, (state, action) => {
        state.loading = false
        state.allNotifications = action.payload
      })
      .addCase(getAllNotifications.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(changePassword.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false
        state.changePassword = action.payload
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export const { changeValue } = userSlice.actions
// export const { userValue } = userListSlice.actions;

export default userSlice.reducer
