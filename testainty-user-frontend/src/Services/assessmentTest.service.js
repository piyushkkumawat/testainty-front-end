import { commonService } from './common.services.js';
export const runCodeActions = {
    runCode
};


// create customer
function runCode(apiName, codeData) {
    console.log(apiName)
    return commonService.withOutToken(apiName, codeData).then(
      (response) => {
        return response.data;
      }
    );
  }