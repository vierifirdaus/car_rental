import { combineReducers } from '@reduxjs/toolkit';
import userSlice from './user';
import formSlice from './form';
const rootReducer = combineReducers({
    user: userSlice,
    form: formSlice,
})

export default rootReducer;
