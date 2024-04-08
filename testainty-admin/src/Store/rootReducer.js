import { combineReducers } from '@reduxjs/toolkit';
import commonSlice from './commonSlice';
import userSlice from './userSlice';
import signupSlice from './signupSlice';
import userListSlice from './userListSlice';



const rootReducer = combineReducers({
    user: userSlice,
    userList: userListSlice,

    roles: commonSlice,
    signup: signupSlice
});

export default rootReducer;