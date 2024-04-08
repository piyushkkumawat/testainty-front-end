import { commonService } from './common.services.js';
export const testActions = {
  signupCandidate,
  loginCandidate,
  getTestInfo,
  startTest,
  submitTest
};


function signupCandidate(apiName, userData) {
  return commonService.withOutToken(apiName, userData).then(
    (response) => {
      return response.data;
    }
  );
}

function loginCandidate(apiName, userData) {
  return commonService.withOutToken(apiName, userData).then(
    (response) => {
      return response.data;
    }
  );
}

function getTestInfo(apiName, userData) {
  return commonService.withOutToken(apiName, userData).then(
    (response) => {
      return response.data
    }
  )
}

function startTest(apiName, userData) {
  return commonService.withCandidateToken(apiName, userData).then(
    (response) => {
      return response.data
    }
  )
}

function submitTest(apiName, userData) {
  return commonService.withOutToken(apiName, userData).then(
    (response) => {
      return response.data
    }
  )
}






