import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import {apiPATCH, apiGET} from '../../../apis/apiService'
import {get_learn_namaz_progress,update_learn_namaz_progress} from '../../endpoints';


const initialState = {
    learnNamazProgress:null,
    isLoading:true,
    hasError:false,
}

export const getLearnNamazProgress = createAsyncThunk(
    'getLearnNamazProgress',
    async ()=>{
       const result =  await apiGET(get_learn_namaz_progress)
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
            state.hasError=false
            state.isPending=false
            state.learnNamazProgress = action.payload.data
            
        },
        [getLearnNamazProgress.rejected]:(state,action)=>{
            state.isLoading=false
            state.hasError=true

        },
        [getLearnNamazProgress.pending]:(state,action)=>{
            state.isLoading=true
            state.hasError=false
        },
        [getLearnNamazProgress.fulfilled]:(state,action)=>{
            state.hasError=false
            state.isPending=false
            state.closestTemples = action.payload.data
            
        },
        [updateLearnNamazProgress.fulfilled]:(state,action)=>{
            state.hasError = false
            state.isLoading = false
        },
        [updateLearnNamazProgress.pending]:(state,action)=>{
            state.isLoading=true
            state.hasError=false
        },
        [updateLearnNamazProgress.rejected]:(state,action)=>{
            state.hasError = true
            state.isLoading = false
        },
    }
})

export const selectLearnNamazProgress=(state)=>state.learnNamaz.getLearnNamazProgress
export const selectIsLoading=(state)=>state.learnNamaz.isLoading
export const selectHasError=(state)=>state.learnNamaz.hasError

export default learnNamazSlice.reducer