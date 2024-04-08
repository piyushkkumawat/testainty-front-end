import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { usersActions } from '../Services/users.service'
import { apiConstants } from '../Constants/api.constant'
// import { toast } from 'react-toastify';
import { toast } from 'react-hot-toast'

export const login = createAsyncThunk('user/login', async (data) => {
  const response = await usersActions.loginUser(apiConstants.LOGIN_USER, data)

  // const isSmallScreen = window.innerWidth <= 600;
  if (
    response.status &&
    response.data &&
    (response.data.role.roleName === 'Owner' ||
      response.data.role.roleName === 'OwnerAdmin')
  ) {
    toast.success(
      response.message
   
    )
    if (response && response.status) {
      localStorage.setItem('userData', JSON.stringify(response.data))
    }
    return response.data
  } else {
    toast.error(response.message)
  }
})

export const createCustomer = createAsyncThunk(
  'user/createCustomer',
  async (data) => {
    const response = await usersActions.createCustomer(
      apiConstants.CREATE_CUSTOMER,
      data
    )
    toast.success(response.message)
    return response
  }
)

export const customerList = createAsyncThunk('customerList', async (data) => {
  const response = await usersActions.getAllCustomers(
    apiConstants.GET_CUSTOMER_LIST,
    data
  )
  toast.success(response.message)
  return response.data
})

export const getCustomerById = createAsyncThunk(
  'getCustomerById',
  async (data) => {
    const response = await usersActions.getCustomerById(
      apiConstants.GET_CUSTOMER_BY_ID,
      data
    )
    toast.success(response.message)
    return response.data
  }
)

export const updateCustomer = createAsyncThunk(
  'updateCustomer',
  async (data) => {
    const response = await usersActions.updateCustomer(
      apiConstants.UPDATE_CUSTOMER_BY_ID,
      data
    )
    toast.success(response.message)
    return response.data
  }
)

export const updateSuperAdmin = createAsyncThunk(
  'updateSuperAdmin',
  async (data) => {
    const response = await usersActions.updateSuperAdmin(
      apiConstants.UPDATE_SUPERADMIN,
      data
    )
    toast.success(response.message)
    return response.data
  }
)

export const forgotPassword = createAsyncThunk(
  'forgotPassword',
  async (data) => {
    const response = await usersActions.forgotPassword(
      apiConstants.FORGOT_PASSWORD,
      data
    )
    toast.success(response.message)
  }
)

export const resetPassword = createAsyncThunk('resetPassword', async (data) => {
  const response = await usersActions.resetPassword(
    apiConstants.RESET_PASSWORD,
    data
  )
  if (response && response.status) {
    toast.success(response.message)
  } else {
    toast.error(response.message)
  }
  return response
})

export const searchCustomer = createAsyncThunk(
  'searchCustomer',
  async (data) => {
    const response = await usersActions.searchCustomers(
      apiConstants.SEARCH_CUSTOMERS,
      data
    )
    return response
  }
)

export const createSuperAdmin = createAsyncThunk(
  'createSuperAdmin',
  async (data) => {
    const response = await usersActions.createSuperAdmin(
      apiConstants.CREATE_SUPER_ADMIN,
      data
    )
    toast.success(response.message)
    return response
  }
)

// Create Sub Admin
export const createSubAdmin = createAsyncThunk(
  'createSubAdmin',
  async (data) => {
    const response = await usersActions.createSubAdmin(
      apiConstants.CREATE_SUBADMIN,
      data
    )
    toast.success(response.message)
    return response
  }
)

export const getSkills = createAsyncThunk('skills', async (data) => {
  const response = await usersActions.getSkills(apiConstants.GET_SKILLS, data)
  return response
})

export const createSkills = createAsyncThunk('createSkills', async (data) => {
  const response = await usersActions.createSkill(
    apiConstants.CREATE_SKILLS,
    data
  )
  toast.success(response.message)
  return response.data
})

export const getQuestionsBank = createAsyncThunk(
  'getQuestionsBank',
  async (data) => {
    const response = await usersActions.getQuestionsBank(
      apiConstants.GET_QUESTIONBANK,
      data
    )
    return response
  }
)

export const getSubAdmins = createAsyncThunk('getSubAdmins', async (data) => {
  const response = await usersActions.getSubAdmins(
    apiConstants.GET_SUBADMINS,
    data
  )
  return response
})

export const addQuestionsBank = createAsyncThunk(
  'addQuestionsBank',
  async (data) => {
    const response = await usersActions.addQuestionsBank(
      apiConstants.CREATE_QUESTION_BANK,
      data
    )
    toast.success(response.message)
    return response
  }
)

export const addQuestion = createAsyncThunk('addQuestion', async (data) => {
  const response = await usersActions.addQuestion(
    apiConstants.CREATE_QUESTION,
    data
  )
  toast.success(response.message)
  return response
})

export const getQuestionsByQuestionBankId = createAsyncThunk(
  'getQuestionsByQuestionBankId',
  async (data) => {
    const response = await usersActions.getQuestionsByQuestionBankId(
      apiConstants.GET_QUESTIONS_BANK_ID,
      data
    )
    return response
  }
)

export const deleteQuestionBankById = createAsyncThunk(
  'deleteQuestionBankById',
  async (data) => {
    const response = await usersActions.deleteQuestionBankById(
      apiConstants.DELETE_QUESTION_BANK,
      data
    )
    return response
  }
)

export const updateQuestionBankById = createAsyncThunk(
  'updateQuestionBankById',
  async (data) => {
    const response = await usersActions.updateQuestionBankById(
      apiConstants.DELETE_QUESTION_BANK_BY_ID,
      data
    )
    return response
  }
)

export const deleteQuestionById = createAsyncThunk(
  'deleteQuestionById',
  async (data) => {
    const response = await usersActions.deleteQuestionById(
      apiConstants.DELETE_QUESTION,
      data
    )
    return response
  }
)

export const deleteInquiryById = createAsyncThunk(
  'deleteInquiryById',
  async (data) => {
    const response = await usersActions.deleteInquiryById(
      apiConstants.DELETE_INQUIRY,
      data
    )
    return response
  }
)

export const deleteSubAdmin = createAsyncThunk(
  'deleteSubAdmin',
  async (data) => {
    const response = await usersActions.deleteSubAdmin(
      apiConstants.DELETE_SUBADMIN,
      data
    )
    return response
  }
)

export const deleteSkill = createAsyncThunk('deleteSkill', async (data) => {
  const response = await usersActions.deleteSkill(
    apiConstants.DELETE_SKILL,
    data
  )
  return response
})

export const imageUpload = createAsyncThunk('imageUpload', async (data) => {
  const response = await usersActions.imageUpload(
    apiConstants.UPLOAD_PICTURE,
    data
  )
  return response.data
})

export const customerInquiries = createAsyncThunk(
  'customerInquiries',
  async (data) => {
    const response = await usersActions.customerInquiries(
      apiConstants.CUSTOMER_INQUIRIES,
      data
    )
    return response
  }
)

export const customerInquiriesDetails = createAsyncThunk(
  'customerInquiriesDetails',
  async (data) => {
    const response = await usersActions.customerInquiriesDetails(
      apiConstants.CUSTOMER_INQUIRIES_DETAILS,
      data
    )
    return response
  }
)

export const getLanguages = createAsyncThunk('getLanguages', async (data) => {
  const response = await usersActions.getLanguages(
    apiConstants.GET_LANGUAGES,
    data
  )
  return response
})

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

export const updateQuestionById = createAsyncThunk(
  'updateQuestionById',
  async (data) => {
    const response = await usersActions.updateQuestionById(
      apiConstants.UPDATE_QUESTION_BY_ID,
      data
    )
    toast.success(
      response.message
   
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
    data: null,
    customerListData: null,
    customerDataById: null,
    skills: null,
    createSuperAdmin: null,
    questionsBankData: null,
    createQuestionBank: null,
    createQuestion: null,
    getQuestionsdata: null,
    deleteQuestion: null,
    deleteQuestionBank: null,
    deleteSkill: null,
    imageUpload: null,
    createSubAdmin: null,
    subAdminsData: null,
    deleteSubAdmin: null,
    customerInquiryData: null,
    customerInquiryDetailsData: null,
    deleteInquiry: null,
    languages: null,
    NotificationList: null,
    allNotifications: null,
    updateQuestionData: null
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
      .addCase(getSubAdmins.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getSubAdmins.fulfilled, (state, action) => {
        state.loading = false
        state.subAdminsData = action.payload
      })
      .addCase(getSubAdmins.rejected, (state, action) => {
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
      .addCase(createSuperAdmin.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createSuperAdmin.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(createSuperAdmin.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(createSubAdmin.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createSubAdmin.fulfilled, (state, action) => {
        state.loading = false
        state.createSubAdmin = action.payload
      })
      .addCase(createSubAdmin.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(searchCustomer.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(searchCustomer.fulfilled, (state, action) => {
        state.loading = false
        state.customerListData = action.payload
      })
      .addCase(searchCustomer.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(getCustomerById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getCustomerById.fulfilled, (state, action) => {
        state.loading = false
        state.customerDataById = action.payload
      })
      .addCase(getCustomerById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false
        state.customerDataById = action.payload
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
        state.customerDataById = action.payload
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      .addCase(getSkills.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getSkills.fulfilled, (state, action) => {
        state.loading = false
        state.skills = action.payload
      })
      .addCase(getSkills.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(createSkills.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createSkills.fulfilled, (state, action) => {
        state.loading = false
        state.skills = action.payload
      })
      .addCase(createSkills.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(addQuestionsBank.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addQuestionsBank.fulfilled, (state, action) => {
        state.loading = false
        state.createQuestionBank = action.payload
      })
      .addCase(addQuestionsBank.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(getQuestionsBank.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getQuestionsBank.fulfilled, (state, action) => {
        state.loading = false
        state.questionsBankData = action.payload
      })
      .addCase(getQuestionsBank.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(addQuestion.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addQuestion.fulfilled, (state, action) => {
        state.loading = false
        state.createQuestion = action.payload
      })
      .addCase(addQuestion.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(updateQuestionById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateQuestionById.fulfilled, (state, action) => {
        state.loading = false
        state.updateQuestionData = action.payload
      })
      .addCase(updateQuestionById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(getQuestionsByQuestionBankId.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getQuestionsByQuestionBankId.fulfilled, (state, action) => {
        state.loading = false
        state.getQuestionsdata = action.payload
      })
      .addCase(getQuestionsByQuestionBankId.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(deleteQuestionById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteQuestionById.fulfilled, (state, action) => {
        state.loading = false
        state.deleteQuestion = action.payload
      })
      .addCase(deleteQuestionById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(deleteInquiryById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteInquiryById.fulfilled, (state, action) => {
        state.loading = false
        state.deleteInquiry = action.payload
      })
      .addCase(deleteInquiryById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(deleteQuestionBankById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteQuestionBankById.fulfilled, (state, action) => {
        state.loading = false
        state.deleteQuestionBank = action.payload
      })
      .addCase(deleteQuestionBankById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(deleteSubAdmin.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteSubAdmin.fulfilled, (state, action) => {
        state.loading = false
        state.deleteSubAdmin = action.payload
      })
      .addCase(deleteSubAdmin.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(deleteSkill.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteSkill.fulfilled, (state, action) => {
        state.loading = false
        state.deleteSkill = action.payload
      })
      .addCase(deleteSkill.rejected, (state, action) => {
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
      .addCase(customerInquiries.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(customerInquiries.fulfilled, (state, action) => {
        state.loading = false
        state.customerInquiryData = action.payload
      })
      .addCase(customerInquiries.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      .addCase(customerInquiriesDetails.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(customerInquiriesDetails.fulfilled, (state, action) => {
        state.loading = false
        state.customerInquiryDetailsData = action.payload
      })
      .addCase(customerInquiriesDetails.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      .addCase(getLanguages.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getLanguages.fulfilled, (state, action) => {
        state.loading = false
        state.languages = action.payload
      })
      .addCase(getLanguages.rejected, (state, action) => {
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
  },
})

export const { changeValue } = userSlice.actions

export default userSlice.reducer
