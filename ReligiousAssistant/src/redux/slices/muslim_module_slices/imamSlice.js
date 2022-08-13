import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import {apiPOST} from '../../../apis/apiService'
import {become_imam} from '../../endpoints';


const initialState = {

    hasBecomeImam:false,
    isLoadingBecomeImam:false,
    hasErrorBecomeImam:false,

}

export const becomeImam = createAsyncThunk(
    'becomeImam',
    async (body)=>{
       const result =  await apiPOST(become_imam,body)
       return result  
    }
)


const imamSlice = createSlice({
    name:"imam",
    initialState,
    reducers:{},
    extraReducers:{
        [becomeImam.fulfilled]:(state,action)=>{
            state.isLoadingBecomeImam = false
            state.hasErrorBecomeImam = false
        },
        [becomeImam.pending]:(state,action)=>{
            state.isLoadingBecomeImam=true
            state.hasErrorBecomeImam=false
            state.hasBecomeImam=true            //succeefulle applied to become imam
        },
        [becomeImam.rejected]:(state,action)=>{
            state.isLoadingBecomeImam = false
            state.hasErrorBecomeImam = true

        },
    }
})

export const selectIsLoadingBecomeImam=(state)=>state.imam.isLoadingBecomeImam
export const selectHasErrorBecomingImam=(state)=>state.imam.hasErrorBecomeImam
export const selectHasBecomeImam=(state)=>state.imam.hasBecomeImam


export default imamSlice.reducer