import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import {apiPATCH} from '../../../services/apis/AuthService'
import {update_auto_silent_settings,update_primary_mosque,} from '../../endpoints';


export const updatePrimaryMosque = createAsyncThunk(
    'updatePrimaryMosque',
    async(body)=>{
        const result =  await apiPATCH(update_primary_mosque,body)
        return result
    }
)

export const updateAutoSilentSettings = createAsyncThunk(
    'updateAutoSilentSettings',
    async(body)=>{
        const result =  await apiPATCH(update_auto_silent_settings,body)
        return result
    }
)

const muslimUserPrefSlice = createSlice({
    name:"muslimUserPref",
    reducers:{},
    extraReducers:{
        [updatePrimaryMosque.fulfilled]:(state,action)=>{
            state.hasError = false
            state.isLoading = false
        },
        [updatePrimaryMosque.pending]:(state,action)=>{
            state.isLoading=true
            state.hasError=false
        },
        [updatePrimaryMosque.rejected]:(state,action)=>{
            state.hasError = true
            state.isLoading = false
        },
        [updateAutoSilentSettings.fulfilled]:(state,action)=>{
            state.hasError = false
            state.isLoading = false
        },
        [updateAutoSilentSettings.pending]:(state,action)=>{
            state.isLoading=true
            state.hasError=false
        },
        [updateAutoSilentSettings.rejected]:(state,action)=>{
            state.hasError = true
            state.isLoading = false
        },

    }
})

// export const selectmuslimUserPref =(state)=> state.fastAccountability.accountability
export const selectIsLoading=(state)=>state.muslimUserPref.isLoading
export const selectHasError=(state)=>state.muslimUserPref.hasError


export default muslimUserPrefSlice.reducer