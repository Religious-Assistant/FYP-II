import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import {apiPATCH, apiGET, apiPOST} from '../../../apis/apiService'
import {get_learn_namaz_progress,get_particular_rakat_info,update_learn_namaz_progress} from '../../endpoints';


const initialState = {
    namazProgress:null,
    hasLearnedParticularRakat:false,
    
    isLoadingGetNamazProgress:false,
    hasErroGetNamazProgress:false,

    isLoadingUpdateNamazProgress:false,
    hasErroUpdateNamazProgress:false,

    isLoadingHasLearnedParticularRakat:false,
    hasErroGettingParticularRakat:false,
    

}

export const getLearnNamazProgress = createAsyncThunk(
    'getLearnNamazProgress',
    async (body)=>{
       const result =  await apiPOST(get_learn_namaz_progress,body)
       return result  
    }
)

export const getParticularRakatInfo = createAsyncThunk(
    'getParticularRakatInfo',
    async (body)=>{
       const result =  await apiPOST(get_particular_rakat_info,body)
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

        [getParticularRakatInfo.fulfilled]:(state,action)=>{
            state.hasErroGettingParticularRakat=false
            state.isLoadingHasLearnedParticularRakat=false
            state.hasLearnedParticularRakat = action.payload.data
        },
        [getParticularRakatInfo.rejected]:(state,action)=>{
            state.isLoadingHasLearnedParticularRakat=false
            state.hasErroGettingParticularRakat=true
            state.hasLearnedParticularRakat = false

        },
        [getParticularRakatInfo.pending]:(state,action)=>{
            state.isLoadingHasLearnedParticularRakat=true
            state.hasErroGettingParticularRakat=false
            state.hasLearnedParticularRakat = false
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

export const selectHasLearnedParticularRakat=(state)=>state.learnNamaz.hasLearnedParticularRakat
export const selectIsLoadingHasLearnedparticularRakat=(state)=>state.learnNamaz.isLoadingHasLearnedParticularRakat

export default learnNamazSlice.reducer