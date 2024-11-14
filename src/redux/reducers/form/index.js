import { createSlice } from "@reduxjs/toolkit"


const initialState ={
    id : 0,
    bankType: '',
    promoCode: '',
}

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setForm: (state, action) => {
            state.id = action.payload.id
            state.bankType = action.payload.bankType
            state.promoCode = action.payload.promoCode
        },
        resetForm: (state) => {
            state.id = 0
            state.bankType = ''
            state.promoCode = ''
        }
    }
})

export const selectForm = (state) => state.form
export const {setForm, resetForm} = formSlice.actions
export default formSlice.reducer