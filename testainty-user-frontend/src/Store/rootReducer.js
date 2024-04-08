import { combineReducers } from '@reduxjs/toolkit';
import userSlice from './userSlice.js';
import assessmentSlice from './assessmentSlice.js';
import counterReducer from './createAssesmentSlice.js'
import teamsSlice from './teamsSlice.js';
import testSlice from './testSlice.js';
import candidateSlice from './candidateSlice.js';
import runCode from './assessmentTestSlice.js';

const rootReducer = combineReducers({
    user: userSlice,
    assessment: assessmentSlice,
    createAssessment: counterReducer,
    teams: teamsSlice,
    test: testSlice,
    candidates: candidateSlice,
    runCode: runCode,
    
});

export default rootReducer;