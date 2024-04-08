import { commonService } from './common.services.js';
export const teamsActions = {
  getAllTeams,
  inviteAdmin,
  deleteAdmin
};


function getAllTeams(apiName, userData) {
  return commonService.withToken(apiName, userData).then(
    (response) => {
      return response.data;
    }
  );
}

function deleteAdmin(apiName, adminId) {
  return commonService.withToken(apiName, adminId).then(
    (response) => {
      return response.data
    }
  )
}



function inviteAdmin(apiName, userData) {
  return commonService.withToken(apiName, userData).then(
    (response) => {
      return response.data;
    }
  );
}
