import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import {apiPATCH} from '../../../apis/apiService'
import { update_accountability_notifications_setting, update_auto_silent_settings, update_namaz_notifications_setting, update_password, update_primary_mosque } from '../../endpoints';

const initialState = {
    hasUpdatedPassword:false,
    hasUpdatedAutoSilentSettings:false,
    hasUpdatedNamazNotificationsSetting:false,
    hasUpdatedPrimaryMosque:false,
    hasUpdatedNamazAccountabilityNotificationsSetting:false,
    isLoading:true,
    hasError:false,
}


export const updatePassword = createAsyncThunk(
    'updatePassword',
    async (body)=>{
       const result =  await apiPATCH(update_password,body)
       return result  
    }
)

export const updatePrimaryMosque = createAsyncThunk(
    'updatePrimaryMosque',
    async (body)=>{
       const result =  await apiPATCH(update_primary_mosque,body)
       return result  
    }
)


export const updateNamazAccountabilityNotificationsSetting = createAsyncThunk(
    'updateNamazAccountabilityNotificationsSetting',
    async (body)=>{
       const result =  await apiPATCH(update_accountability_notifications_setting,body)
       return result  
    }
)

export const updateAutoSilentSetting = createAsyncThunk(
    'updateAutoSilentSetting',
    async (body)=>{
       const result =  await apiPATCH(update_auto_silent_settings,body)
       return result  
    }
)

export const updateNamazNotificationSettings = createAsyncThunk(
    'updateNamazNotificationSettings',
    async (body)=>{
       const result =  await apiPATCH(update_namaz_notifications_setting,body)
       return result  
    }
)

const muslimPreferencesSlice = createSlice({
    name:"muslimpreferences",
    initialState,
    reducers:{},
    
    extraReducers:{

        [updatePassword.fulfilled]:(state,action)=>{
            state.isLoading = false
            state.hasError=false
            state.hasUpdatedPassword=true
        },
        [updatePassword.pending]:(state,action)=>{
            state.isLoading = true
            state.hasError=false
            state.hasUpdatedPassword=false
        },
        [updatePassword.rejected]:(state,action)=>{
            state.hasError=true
            state.isLoading=false
            state.hasUpdatedPassword=false
        },

        [updateNamazNotificationSettings.fulfilled]:(state,action)=>{
            state.isLoading = false
            state.hasError=false
            state.hasUpdatedNamazNotificationsSetting=true
        },
        [updateNamazNotificationSettings.pending]:(state,action)=>{
            state.isLoading = true
            state.hasError=false
            state.hasUpdatedNamazNotificationsSetting=false
        },
        [updateNamazNotificationSettings.rejected]:(state,action)=>{
            state.hasError=true
            state.isLoading=false
            state.hasUpdatedNamazNotificationsSetting=false
        },

        [updateAutoSilentSetting.fulfilled]:(state,action)=>{
            state.isLoading = false
            state.hasError=false
            state.hasUpdatedAutoSilentSettings=true
        },
        [updateAutoSilentSetting.pending]:(state,action)=>{
            state.isLoading = true
            state.hasError=false
            state.hasUpdatedAutoSilentSettings=false
        },
        [updateAutoSilentSetting.rejected]:(state,action)=>{
            state.hasError=true
            state.isLoading=false
            state.hasUpdatedAutoSilentSettings=false
        },

        [updateNamazAccountabilityNotificationsSetting.fulfilled]:(state,action)=>{
            state.isLoading = false
            state.hasError=false
            state.hasUpdatedNamazAccountabilityNotificationsSetting=true
        },
        [updateNamazAccountabilityNotificationsSetting.pending]:(state,action)=>{
            state.isLoading = true
            state.hasError=false
            state.hasUpdatedNamazAccountabilityNotificationsSetting=false
        },
        [updateNamazAccountabilityNotificationsSetting.rejected]:(state,action)=>{
            state.hasError=true
            state.isLoading=false
            state.hasUpdatedNamazAccountabilityNotificationsSetting=false
        },

        [updatePrimaryMosque.fulfilled]:(state,action)=>{
            state.isLoading = false
            state.hasError=false
            state.hasUpdatedPrimaryMosque=true
        },
        [updatePrimaryMosque.pending]:(state,action)=>{
            state.isLoading = true
            state.hasError=false
            state.hasUpdatedPrimaryMosque=false
        },
        [updatePrimaryMosque.rejected]:(state,action)=>{
            state.hasError=true
            state.isLoading=false
            state.hasUpdatedPrimaryMosque=false
        },


    }
})

export const selectHasUpdatedPassword=(state)=>state.muslimpreferences.hasUpdatedPassword
export const selectHasUpdatedPrimaryMosque=(state)=>state.muslimpreferences.hasUpdatedPrimaryMosque
export const selectHasUpdatedNamazNotificationsSettings=(state)=>state.muslimpreferences.hasUpdatedNamazNotificationsSetting
export const selectHasUpdatedAutosilentSetting=(state)=>state.muslimpreferences.hasUpdatedAutoSilentSettings
export const selectHasUpdatedNamazAccountabilityNotificationSettings=(state)=>state.muslimpreferences.hasUpdatedNamazAccountabilityNotificationsSetting

export const selectIsLoading=(state)=>state.muslimpreferences.isLoading
export const selectHasError=(state)=>state.muslimpreferences.hasError

export default muslimPreferencesSlice.reducer