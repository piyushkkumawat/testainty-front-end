import { commonService } from './common.services.js';

export const usersActions = {
  loginUser,
  forgotPassword,
  resetPassword,
  getUserRole,
  getAllCustomers,
  createCustomer,
  getProfile,
  imageUpload,
  uploadPicture,
  createSiteUser,
  verifySiteUser,
  getNotifications,
  getAllNotifications,
  changePassword
};

// Login user
function loginUser(apiName, userData) {
  return commonService.withOutToken(apiName, userData).then(
    (response) => {
      return response.data;
    }
  );
}

// Forgot password

function forgotPassword(apiName, userData) {
  return commonService.withOutToken(apiName, userData).then(
    (response) => {
      return response.data;
    }
  )
}

// ResetPassword 
function resetPassword(apiName, userData) {
  return commonService.withOutToken(apiName, userData).then(
    (response) => {
      return response.data;
    }
  )
}

// Change Password 
function changePassword(apiName, userData) {
  return commonService.withToken(apiName, userData).then(
    (response) => {
      return response.data;
    }
  )
}

// Get all customers
function getAllCustomers(apiName, userData) {
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


// create customer
function createCustomer(apiName, userData) {
  return commonService.withToken(apiName, userData).then(
    (response) => {
      return response.data;
    }
  );
}

// Get Profile with token
function getProfile(apiName, userData) {
  return commonService.withToken(apiName, userData).then(
    (response) => {
      return response.data;
    }
  );
}

function imageUpload(apiName, userData) {
  return commonService.withTokenFormData(apiName, userData).then(
    (response) => {
      return response.data;
    }
  );
}

// Upload image function
function uploadPicture(apiName, userData) {
  return commonService.withTokenFormData(apiName, userData).then(
    (response) => {
      return response.data;
    }
  );
}

// create createSiteUser
function createSiteUser(apiName,userData){
  return commonService.withOutToken(apiName,userData).then((response) => {
    return response.data;
  })
}

// verify site user
function verifySiteUser(apiName,userData){
  return commonService.withOutToken(apiName,userData).then((response) => {
    return response.data;
  })
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




