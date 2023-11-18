import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import {apiGET, apiPATCH, apiPOST} from '../../../apis/apiService'
import {get_namaz_accountability, update_namaz_accountability} from '../../endpoints';


const initialState = {
    accountabilityData:null,
    isLoadingGetAccountabilityData:false,
    hasErrorInGetAccountabilityData:false,

    isLoadingUpdateAccountability:false,
    hasErrorInUpdateAccountability:false,
}

export const getNamazAccountability = createAsyncThunk(
    'getNamazAccountability',
    async(body)=>{
        const result =  await apiPOST(get_namaz_accountability, body)
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
            state.isLoadingGetAccountabilityData=false
            state.hasErrorInGetAccountabilityData=false
            state.accountabilityData = action.payload.data
        },
        [getNamazAccountability.pending]:(state,action)=>{
            state.isLoadingGetAccountabilityData=true
            state.hasErrorInGetAccountabilityData=false
        },
        [getNamazAccountability.rejected]:(state,action)=>{
            state.isLoadingGetAccountabilityData=false
            state.hasErrorInGetAccountabilityData=false
        },
        [updateNamazAccountability.fulfilled]:(state,action)=>{
            state.hasErrorInUpdateAccountability=false
            state.isLoadingUpdateAccountability = false
        },
        [updateNamazAccountability.pending]:(state,action)=>{
            state.isLoadingUpdateAccountability = true
            state.hasErrorInUpdateAccountability=false
        },
        [updateNamazAccountability.rejected]:(state,action)=>{
            state.isLoadingUpdateAccountability = false
            state.hasErrorInUpdateAccountability=true
        },

    }
})

export const selectAccountabilityData =(state)=> state.namazAccountability.accountabilityData
export const selectHasErrorInGetAccountabilityData =(state)=> state.namazAccountability.hasErrorInGetAccountabilityData
export const selectIsLoadingGetAccountabilityData =(state)=> state.namazAccountability.isLoadingGetAccountabilityData

export const selectIsLoadingUpdateAccountability =(state)=> state.namazAccountability.isLoadingUpdateAccountability
export const selectHasErrorInUpdateAccountability =(state)=> state.namazAccountability.hasErrorInUpdateAccountability


export default namazAccountabilitySlice.reducer