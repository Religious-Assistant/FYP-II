import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import {apiGET, apiPOST} from '../../../services/apis/AuthService'
import {get_recitation_stats, save_last_read, save_recitation_progress} from '../../endpoints';


const initialState = {
    recitationStats:null,
    isLoading:true,
    hasError:false,
}

export const getRecitationStats = createAsyncThunk(
    'getRecitationStats',
    async()=>{
        const result =  await apiGET(get_recitation_stats)
        return result
    }
)

export const saveRecitationProgress = createAsyncThunk(
    'saveRecitationProgress',
    async(body)=>{
        const result =  await apiPOST(save_recitation_progress,body)
        return result
    }
)

export const saveLastRead = createAsyncThunk(
    'saveLastRead',
    async(body)=>{
        const result =  await apiPOST(save_last_read,body)
        return result
    }
)

const quranRecitationSlice = createSlice({
    name:"quranRecitation",
    initialState,
    reducers:{},
    extraReducers:{
        [getRecitationStats.fulfilled]:(state,action)=>{
            state.hasError = false
            state.isLoading = false
            state.recitationStats = action.payload.data
        },
        [getRecitationStats.pending]:(state,action)=>{
            state.isLoading=true
            state.hasError=false
        },
        [getRecitationStats.rejected]:(state,action)=>{
            state.hasError = true
            state.isLoading = false
        },
        [saveLastRead.fulfilled]:(state,action)=>{
            state.hasError = false
            state.isLoading = false
        },
        [saveLastRead.pending]:(state,action)=>{
            state.isLoading=true
            state.hasError=false
        },
        [saveLastRead.rejected]:(state,action)=>{
            state.hasError = true
            state.isLoading = false
        },
        [saveRecitationProgress.fulfilled]:(state,action)=>{
            state.hasError = false
            state.isLoading = false
        },
        [saveRecitationProgress.pending]:(state,action)=>{
            state.isLoading=true
            state.hasError=false
        },
        [saveRecitationProgress.rejected]:(state,action)=>{
            state.hasError = true
            state.isLoading = false
        },

    }
})


export const selectQuranRecitation =(state)=> state.quranRecitation.recitationStats
export const selectIsLoading=(state)=>state.quranRecitation.isLoading
export const selectHasError=(state)=>state.quranRecitation.hasError


export default quranRecitationSlice.reducer