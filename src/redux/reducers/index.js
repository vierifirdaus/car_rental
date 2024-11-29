import { combineReducers } from '@reduxjs/toolkit';
import userSlice from './user';
import formSlice from './form';
import carsSlice from './cars';
const rootReducer = combineReducers({
    user: userSlice,
    form: formSlice,
    cars: carsSlice,
})

export default rootReducer;
