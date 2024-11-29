import { createSlice } from "@reduxjs/toolkit";
import { getCars } from "./api";

const initialState ={
    cars: [],
    status: 'idle',
}

export const carsSlice = createSlice({
    name: 'cars',
    initialState,
    reducers: { 
        resetState: (state) => initialState,
    },
    extraReducers: (builder) => {
        
        //Get Profile Reducers
        builder.addCase(getCars.pending, (state, action) => {
            state.cars = [];
            state.status = 'loading';
        });
        builder.addCase(getCars.fulfilled, (state, action) => {
            state.cars = action.payload;
            state.status = 'success';
        });
        builder.addCase(getCars.rejected, (state, action) => {
            state.cars=[]
            state.status = 'failed';
        });
    }
});

export { getCars}; 
export const selectCars = (state) => state.cars; 
export default carsSlice.reducer; 
