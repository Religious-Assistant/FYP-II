import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import {apiPATCH, apiGET, apiPOST} from '../../../apis/apiService'
import {get_learn_namaz_progress,update_learn_namaz_progress} from '../../endpoints';


const initialState = {
    namazProgress:null,
    isLoadingGetNamazProgress:false,
    hasErroGetNamazProgress:false,

    isLoadingUpdateNamazProgress:false,
    hasErroUpdateNamazProgress:false,

}

export const getLearnNamazProgress = createAsyncThunk(
    'getLearnNamazProgress',
    async (body)=>{
       const result =  await apiPOST(get_learn_namaz_progress,body)
       return result  
    }
)

export const updateLearnNamazProgress = createAsyncThunk(
    'updateLearnNamazProgress',
    async(body)=>{
        const result =  await apiPATCH(update_learn_namaz_progress,body)
        return result
    }
)

const learnNamazSlice = createSlice({
    name:"learnNamaz",
    initialState,
    reducers:{},
    extraReducers:{
        [getLearnNamazProgress.fulfilled]:(state,action)=>{
            state.hasErroGetNamazProgress=false
            state.isLoadingGetNamazProgress=false
            state.namazProgress = action.payload.data
            
        },
        [getLearnNamazProgress.rejected]:(state,action)=>{
            state.isLoadingGetNamazProgress=false
            state.hasErroGetNamazProgress=true

        },
        [getLearnNamazProgress.pending]:(state,action)=>{
            state.isLoadingGetNamazProgress=true
            state.hasErroGetNamazProgress=false
        },

        [updateLearnNamazProgress.fulfilled]:(state,action)=>{
            state.hasErroUpdateNamazProgress = false
            state.isLoadingUpdateNamazProgress = false
        },
        [updateLearnNamazProgress.pending]:(state,action)=>{
            state.isLoadingUpdateNamazProgress=true
            state.hasErroUpdateNamazProgress=false
        },
        [updateLearnNamazProgress.rejected]:(state,action)=>{
            state.hasErroUpdateNamazProgress = true
            state.isLoadingUpdateNamazProgress = false
        },
    }
})

export const selectLearnNamazProgress=(state)=>state.learnNamaz.namazProgress
export const selectIsLoadingGetNamazProgress=(state)=>state.learnNamaz.isLoadingGetNamazProgress
export const selectIsLoadingUpdateNamazProgress=(state)=>state.learnNamaz.isLoadingUpdateNamazProgress

export default learnNamazSlice.reducer