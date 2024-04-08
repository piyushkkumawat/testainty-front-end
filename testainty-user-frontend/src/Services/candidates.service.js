import { commonService } from './common.services.js';
export const candidatesActions = {
  searchAllCandidates,
  getCandidateById,
  candidateTestLogs
};


function searchAllCandidates(apiName, userData) {
  return commonService.withToken(apiName, userData).then(
    (response) => {
      return response.data;
    }
  );
}

function getCandidateById(apiName, userData) {
  return commonService.withToken(apiName, userData).then(
    (response) => {
      return response.data
    }
  )
}



// Candidate test logs
function candidateTestLogs(apiName, userData){
  return commonService.withToken(apiName, userData).then((response) => {
    return response.data;
  })
}




