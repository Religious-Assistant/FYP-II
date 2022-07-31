import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import {apiPOST} from '../../../apis/apiService'
import {become_imam} from '../../endpoints';


const initialState = {
    isLoading:true,
    hasError:false,
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
            state.hasError = false
            state.isLoading = false
        },
        [becomeImam.pending]:(state,action)=>{
            state.isLoading=true
            state.hasError=false
        },
        [becomeImam.rejected]:(state,action)=>{
            state.hasError = true
            state.isLoading = false
        },
    }
})

export const selectIsLoading=(state)=>state.imam.isLoading
export const selectHasError=(state)=>state.imam.hasError

export default imamSlice.reducer