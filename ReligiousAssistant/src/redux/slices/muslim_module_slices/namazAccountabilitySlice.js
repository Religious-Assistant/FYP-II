import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import {apiGET, apiPATCH} from '../../../services/apis/AuthService'
import {get_namaz_accountability, update_namaz_accountability} from '../../endpoints';


const initialState = {
    accountability:null,
    isLoading:true,
    hasError:false,
}

export const getNamazAccountability = createAsyncThunk(
    'getNamazAccountability',
    async()=>{
        const result =  await apiGET(get_namaz_accountability)
        return result
    }
)

export const updateNamazAccountability = createAsyncThunk(
    'updateNamazAccountability',
    async(body)=>{
        const result =  await apiPATCH(update_namaz_accountability,body)
        return result
    }
)

const namazAccountabilitySlice = createSlice({
    name:"namazAccountability",
    initialState,
    reducers:{},
    extraReducers:{
        [getNamazAccountability.fulfilled]:(state,action)=>{
            state.hasError=false
            state.isLoading = false
            state.accountability = action.payload.data
        },
        [getNamazAccountability.pending]:(state,action)=>{
            state.isLoading=true
            state.hasError=false
        },
        [getNamazAccountability.rejected]:(state,action)=>{
            state.hasError = true
            state.isLoading = false
        },
        [updateNamazAccountability.fulfilled]:(state,action)=>{
            state.hasError = false
            state.isLoading = false
        },
        [updateNamazAccountability.pending]:(state,action)=>{
            state.isLoading=true
            state.hasError=false
        },
        [updateNamazAccountability.rejected]:(state,action)=>{
            state.hasError = true
            state.isLoading = false
        },

    }
})

export const selectNamazAccountability =(state)=> state.namazAccountability.accountability
export const selectIsLoading=(state)=>state.namazAccountability.isLoading
export const selectHasError=(state)=>state.namazAccountability.hasError


export default namazAccountabilitySlice.reducer