import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const postLogin = createAsyncThunk(
    'user/postLogin',
    async (payload, { rejectWithValue }) => {
        try {
            const res = await axios.post('http://192.168.0.5:3000/api/v1/auth/signin',
                JSON.stringify(payload), {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            );
            const data = res.data;
            return data;
        } catch (e) {
            if(e.response.data){
                return rejectWithValue(e.response.data.message);
            }else{
                return rejectWithValue('Something went wrong');
            }
        }
    }
);

export const getProfile = createAsyncThunk(
    'user/getProfile',
    async (token, { rejectWithValue }) => {
        try {
            const res = await axios('http://192.168.1.22:3000/api/v1/auth/whoami', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const { data } = res.data;
            console.log("get profile reduxxx\n",data)
            return data;
        } catch (e) {
            if(e.response.data){
                return rejectWithValue(e.response.data.message);
            }else{
                return rejectWithValue('Something went wrong');
            }
        }
    }
)

export const googleLogin = createAsyncThunk(
    'user/googleLogin',
    async (payload, { rejectWithValue }) => {
        try {
            console.log("ini payload id token ",payload)
            const res = await axios.post('http://192.168.0.5:3000/api/v1/auth/googlesignIn',
                JSON.stringify({
                    idToken:payload.idToken
                }), {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = res.data;
            console.log("ini google boss ",data)
            return data;
        } catch (e) {
            console.log(e)
            if (e.response.data) {
                return rejectWithValue(e.response.data.message);
            } else {
                return rejectWithValue('Something went wrong');
            }
        }
    }
);