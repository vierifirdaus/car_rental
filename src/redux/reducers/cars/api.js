import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCars = createAsyncThunk(
    'cars',
    async ({page=1}, { rejectWithValue }) => {
        try {
            console.log("masuk getCars");
            const res = await axios('http://192.168.0.5:3000/api/v1/cars/', {
                params: {
                    page: page,
                    isAvailable: true,
                }
            });
            const { data } = res.data;
            return data;
        } catch (e) {
            console.log(e.response.data);
            console.log("error");
            if (e.response && e.response.data) {
                return rejectWithValue(e.response.data.message);
            } else {
                return rejectWithValue('Something went wrong');
            }
        }
    }
);
