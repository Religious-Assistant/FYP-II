import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import {apiPATCH, apiPOST} from '../../../apis/apiService'
import { get_times_for_user, update_namaz_times } from '../../endpoints'


const initialState = {

    namazTimes:null,
    isLoadingNamazTimes:false,
    hasErrorGettingNamazTimes:false,

    updatedNamazTimes:null,
    isLoadingUpdateNamaTimes:false,
    hasErrorUpdateNamazTimes:false,

}

export const updateNamazTimes = createAsyncThunk(
    'updateNamazTimings',
    async (body)=>{
       const result =  await apiPATCH(update_namaz_times,body)
       return result  
    }
)

export const getNamazTimesForUser = createAsyncThunk(
    'getNamazTimesForUser',
    async (body)=>{
       const result =  await apiPOST(get_times_for_user,body)   //body with required info
       return result  
    }
)

const namazTimesSlice = createSlice({
    name:"namaztimes",
    initialState,
    reducers:{},
    extraReducers:{
        [updateNamazTimes.fulfilled]:(state,action)=>{
            state.isLoadingUpdateNamaTimes = false
            state.hasErrorUpdateNamazTimes = false
        },
        [updateNamazTimes.pending]:(state,action)=>{
            state.isLoadingUpdateNamaTimes=true
            state.hasErrorUpdateNamazTimes=false
            state.updateNamazTimes=true
        },
        [updateNamazTimes.rejected]:(state,action)=>{
            state.isLoadingUpdateNamaTimes = false
            state.hasErrorUpdateNamazTimes = true

        },

        [getNamazTimesForUser.fulfilled]:(state,action)=>{
            state.isLoadingNamazTimes = false
            state.hasErrorGettingNamazTimes = false
        },
        [getNamazTimesForUser.pending]:(state,action)=>{
            state.isLoadingNamazTimes=true
            state.hasErrorGettingNamazTimes=false
            state.namazTimes=true            //succeefulle applied to become imam
        },
        [getNamazTimesForUser.rejected]:(state,action)=>{
            state.isLoadingNamazTimes = false
            state.hasErrorGettingNamazTimes = true

        },
    }
})

export const selectNamazTimesForUser=(state)=>state.namaztimes.namazTimes
export const selectUpdatedNamazTimes=(state)=>state.namaztimes.updateNamazTimes


export const selectIsLoadingNamazTimesForUser=(state)=>state.namaztimes.isLoadingNamazTimes
export const selectHasErrorGettingNamazTimesForUser=(state)=>state.namaztimes.hasErrorGettingNamazTimes

export const selectIsLoadingUpdatedNamazTimes=(state)=>state.namaztimes.isLoadingUpdateNamaTimes
export const selectHasErrorUpdatingNamazTimes=(state)=>state.namaztimes.hasErrorUpdateNamazTimes

export default namazTimesSlice.reducer