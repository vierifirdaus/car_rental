import { createSlice } from "@reduxjs/toolkit"


const initialState ={
    id : 0,
    bankType: '',
    promoCode: '',
    expiredPayment:null,
    confirmedPayment:null
}

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setForm: (state, action) => {
            state.id = action.payload.id
            state.bankType = action.payload.bankType
            state.promoCode = action.payload.promoCode
            state.expiredPayment = action.payload.expiredPayment
            state.confirmedPayment = action.payload.confirmedPayment
        },
        resetForm: (state) => {
            state.id = 0
            state.bankType = ''
            state.promoCode = ''
            state.expiredPayment = null
            state.confirmedPayment = null
        }
    }
})

export const selectForm = (state) => state.form
export const {setForm, resetForm} = formSlice.actions
export default formSlice.reducer