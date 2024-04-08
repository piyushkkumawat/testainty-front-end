import { commonService } from './common.services.js';
export const assessmentActions = {
  createAssessment,
  getQuestionBank,
  inviteCandidates,
  getAllAssessments,
  deleteAssessment,
  getCandidate,
  deleteCandidate,
  updateAssessment,
  updateAssessmentById
};

// create customer
function createAssessment(apiName, userData) {
  return commonService.withToken(apiName, userData).then(
    (response) => {
      return response.data;
    }
  );
}

// Get question banks list
function getQuestionBank(apiName, userData) {
  return commonService.withToken(apiName, userData).then(
    (response) => {
      return response.data;
    }
  );
}

// Invite candidates
function inviteCandidates(apiName, userData) {
  return commonService.withToken(apiName, userData).then(
    (response) => {
      return response.data;
    }
  );
}

// Get all assessment list
function getAllAssessments(apiName, assessmentdata) {
  return commonService.withToken(apiName, assessmentdata).then(
    (response) => {
      return response.data
    }
  )
}

// Delete assessment
function deleteAssessment(apiName, assessmentId) {
  return commonService.deleteWithToken(apiName, assessmentId).then(
    (response) => {
      return response.data
    }
  )
}

// Update Assessment
function updateAssessment(apiName, assessmentId) {
  return commonService.withToken(apiName, assessmentId).then(
    (response) => {
      return response.data
    }
  )
}

// Update Assessment by id
function updateAssessmentById(apiName, assessmentId) {
  return commonService.withTokenPatch(apiName, assessmentId).then(
    (response) => {
      return response.data
    }
  )
}



// Get canidate list
function getCandidate(apiName, userData) {
  return commonService.withToken(apiName, userData).then(
    (response) => {
      return response.data
    }
  )
}

// Delete candidate
function deleteCandidate(apiName, userData) {
  return commonService.deleteWithToken(apiName, userData).then(
    (response) => {
      return response.data
    }
  )
}




