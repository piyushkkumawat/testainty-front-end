import { commonService } from './common.services';

export const usersActions = {
  loginUser,
  getUserRole,
  signupUser,
  createCustomer,
  getCustomerById,
  updateCustomer,
  forgotPassword,
  resetPassword,
  searchCustomers,
  getSkills,
  createSkill,
  createSuperAdmin,
  createSubAdmin,
  getQuestions,
  getQuestionsBank,
  addQuestionsBank,
  updateQuestionById,
  getSubAdmins,
  addQuestion,
  getQuestionsByQuestionBankId,
  deleteQuestionById,
  deleteQuestionBankById,
  updateQuestionBankById,
  deleteSkill,
  imageUpload,
  updateSuperAdmin,
  deleteSubAdmin,
  customerInquiries,
  customerInquiriesDetails,
  deleteInquiryById,
  getLanguages,
  getNotifications,
  getAllNotifications
};

// Login user
function loginUser(apiName, userData) {
  return commonService.withOutToken(apiName, userData).then(
    (response) => {
      return response.data;
    }
  );
}


// Get customers by id
function getCustomerById(apiName, userData) {
  return commonService.withToken(apiName, userData).then(
    (response) => {
      return response;
    }
  );
}

// Get all roles
function getUserRole(apiName) {
  return commonService.getWithToken(apiName).then(
    (response) => {
      return response.data;
    }
  );
}

// Signup user
function signupUser(apiName, userData) {
  return commonService.withOutToken(apiName, userData).then(
    (response) => {
      return response.data;
    }
  );
}

// create customer
function createCustomer(apiName, userData) {
  return commonService.withToken(apiName, userData).then(
    (response) => {
      return response.data;
    }
  );
}

// Update customer

function updateCustomer(apiName, userData) {
  return commonService.withToken(apiName, userData).then(
    (response) => {
      return response.data;
    }
  );
}

function updateSuperAdmin(apiName, userData) {
  return commonService.withToken(apiName, userData).then(
    (response) => {
      return response.data;
    }
  );
}



// Forgot password

function forgotPassword(apiName, userData){
  return commonService.withOutToken(apiName, userData).then(
    (response) => {
      return response.data;
    }
  )
}

// ResetPassword 
function resetPassword(apiName, userData){
  return commonService.withOutToken(apiName, userData).then(
    (response) => {
      return response.data;
    }
  )
}


// Search Customers
function searchCustomers(apiName, userData){
  return commonService.withToken(apiName, userData).then(
    (response) => {
      return response.data;
    }
  )
}


//Get Skills

function getSkills(apiName, data){
  return commonService.withToken(apiName, data).then((response) => {
    return response.data;
  })
}



//Get Questions

function getQuestions(apiName,data){
  return commonService.getWithToken(apiName,data).then((response) => {
    return response.data;
  })
}

//Get Questions

function getQuestionsBank(apiName,data){
  return commonService.withToken(apiName,data).then((response) => {
    return response.data;
  })
}


//Get Sub admins

function getSubAdmins(apiName,data){
  return commonService.withToken(apiName,data).then((response) => {
    return response.data;
  })
}

//Get Questions by bank id

function getQuestionsByQuestionBankId(apiName,data){
  return commonService.withToken(apiName,data).then((response) => {
    return response.data;
  })
}



// Create question bank

function addQuestionsBank(apiName, userData){
  return commonService.withToken(apiName, userData).then(
    (response) => {
      return response.data;
    }
  )
}

// delete question bank

function deleteQuestionBankById(apiName, userData){
  return commonService.withToken(apiName, userData).then(
    (response) => {
      return response.data;
    }
  )
}

// edit question bank by id
function updateQuestionBankById(apiName, userData){
  return commonService.withToken(apiName, userData).then(
    (response) => {
      return response.data;
    }
  )
}

// Create question

function addQuestion(apiName, userData){
  return commonService.withToken(apiName, userData).then(
    (response) => {
      return response.data;
    }
  )
}

// create Skill
function createSkill(apiName,userData){
  return commonService.withToken(apiName,userData).then((response) => {
    return response.data;
  })
}


// delete Skill
function deleteSkill(apiName,userData){
  return commonService.withToken(apiName,userData).then((response) => {
    return response.data;
  })
}
// Create super admin
function createSuperAdmin(apiName, userData){
  return commonService.withToken(apiName, userData).then(
    (response) => {
      return response.data;
    }
  )
}

// Create sub admin
function createSubAdmin(apiName, userData){
  return commonService.withToken(apiName, userData).then(
    (response) => {
      return response.data;
    }
  )
}

// delete question by id
function deleteQuestionById(apiName, userData){
  return commonService.withToken(apiName, userData).then(
    (response) => {
      return response.data;
    }
  )
}

// delete inquiry by id
function deleteInquiryById(apiName, userData){
  return commonService.withToken(apiName, userData).then(
    (response) => {
      return response.data;
    }
  )
}

// delete subadmin by id
function deleteSubAdmin(apiName, userData){
  return commonService.withToken(apiName, userData).then(
    (response) => {
      return response.data;
    }
  )
}

function imageUpload(apiName, userData) {
  return commonService.withTokenFormData(apiName, userData).then(
    (response) => {
      return response.data;
    }
  );
}


function customerInquiries(apiName, userData) {
  return commonService.withToken(apiName, userData).then(
    (response) => {
      return response.data;
    }
  );
}


function customerInquiriesDetails(apiName, userData) {
  return commonService.withToken(apiName, userData).then(
    (response) => {
      return response.data;
    }
  );
}


//get languages for coding
function getLanguages(apiName, userData) {
  return commonService.getwithOutToken(apiName, userData).then(
    (response) => {
      return response.data
    }
  )
}


// Get Notifications
function getNotifications(apiName, userData){
  return commonService.withToken(apiName, userData).then((response) => {
    return response.data;
  })
}


// Get all Notifications
function getAllNotifications(apiName, userData){
  return commonService.withToken(apiName, userData).then((response) => {
    return response.data;
  })
}

// Update Question by id
function updateQuestionById(apiName, userData){
  return commonService.withTokenPatch(apiName, userData).then((response) => {
    return response.data;
  })
}
