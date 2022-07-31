import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import {apiGET, apiPATCH} from '../../../apis/apiService'
import {get_fast_accountability, update_fast_accountability,} from '../../endpoints';


const initialState = {
    accountability:null,
    isLoading:true,
    hasError:false,
}

export const getFastAccountability = createAsyncThunk(
    'getFastAccountability',
    async()=>{
        const result =  await apiGET(get_fast_accountability)
        return result
    }
)

export const updateFastAccountability = createAsyncThunk(
    'updateFastAccountability',
    async(body)=>{
        const result =  await apiPATCH(update_fast_accountability,body)
        return result
    }
)

const fastAccountabilitySlice = createSlice({
    name:"fastAccountability",
    initialState,
    reducers:{},
    extraReducers:{
        [getFastAccountability.fulfilled]:(state,action)=>{
            state.hasError=false
            state.isLoading = false
            state.accountability = action.payload.data
        },
        [getFastAccountability.pending]:(state,action)=>{
            state.isLoading=true
            state.hasError=false
        },
        [getFastAccountability.rejected]:(state,action)=>{
            state.hasError = true
            state.isLoading = false
        },
        [updateFastAccountability.fulfilled]:(state,action)=>{
            state.hasError = false
            state.isLoading = false
        },
        [updateFastAccountability.pending]:(state,action)=>{
            state.isLoading=true
            state.hasError=false
        },
        [updateFastAccountability.rejected]:(state,action)=>{
            state.hasError = true
            state.isLoading = false
        },

    }
})

export const selectFastAccountability =(state)=> state.fastAccountability.accountability
export const selectIsLoading=(state)=>state.fastAccountability.isLoading
export const selectHasError=(state)=>state.fastAccountability.hasError


export default fastAccountabilitySlice.reducer