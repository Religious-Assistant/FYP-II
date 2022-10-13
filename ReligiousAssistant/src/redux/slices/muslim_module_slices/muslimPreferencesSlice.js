import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import {apiPATCH} from '../../../apis/apiService'
import { update_accountability_notifications_setting, update_auto_silent_settings, update_location, update_namaz_notifications_setting, update_password, update_primary_mosque, update_profile_image } from '../../endpoints';

const initialState = {
    profileData:null,
    hasUpdatedPassword:false,
    hasUpdatedAutoSilentSettings:false,
    hasUpdatedNamazNotificationsSetting:false,
    hasUpdatedPrimaryMosque:false,
    hasUpdatedNamazAccountabilityNotificationsSetting:false,

    isUploadingProfileImage:false,
    hasErrorInUploadingProfileImage:false,

    isUpdatingLocation:false,
    hasErrorUpdatingLocation:false,

    isLoading:true,
    hasError:false,

    primaryMosqueData:null,
    isLoadingGetPrimaryMosqueData:false,
    hasErrorGetPrimaryMosqueData:false,


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

export const updateProfileImage = createAsyncThunk(
    'updateProfileImage',
    async (body)=>{
       const result =  await apiPATCH(update_profile_image,body)
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

export const updateLocation = createAsyncThunk(
    'updateLocation',
    async (body)=>{
       const result =  await apiPATCH(update_location,body)
       return result  
    }
)

export const getPrimaryMosqueData = createAsyncThunk(
    'getPrimaryMosqueData',
    async ()=>{
        try{
            const result =  await AsyncStorage.getItem('primarymosque') 
            console.log('PM')
            console.log(result)
            return result!=null?JSON.parse(result):null  
        }catch(e){
            console.log('ERROR while Retrieving Primary Mosque Data', e)
        }
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

        [updateLocation.fulfilled]:(state,action)=>{
            state.isUpdatingLocation = false
            state.hasErrorUpdatingLocation=false
            AsyncStorage.setItem('user',JSON.stringify(action.payload.data))

        },
        [updateLocation.pending]:(state,action)=>{
            state.isUpdatingLocation = true
            state.hasErrorUpdatingLocation=false

        },
        [updateLocation.rejected]:(state,action)=>{
            state.isUpdatingLocation=false
            state.hasErrorUpdatingLocation=true

        },

        [updateProfileImage.fulfilled]:(state,action)=>{
            state.isUploadingProfileImage = false
            state.hasErrorInUploadingProfileImage=false
            state.profileData=action.payload?.data

        },
        [updateProfileImage.pending]:(state,action)=>{
            state.isUploadingProfileImage = true
            state.hasErrorInUploadingProfileImage=false

        },
        [updateProfileImage.rejected]:(state,action)=>{
            state.isUploadingProfileImage = false
            state.hasErrorInUploadingProfileImage=true

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

            if(action.payload.data){
                AsyncStorage.setItem('primarymosque',JSON.stringify(action.payload.data))
            }
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

        [getPrimaryMosqueData.fulfilled]:(state,action)=>{
            state.isLoadingGetPrimaryMosqueData = false
            state.hasErrorGetPrimaryMosqueData=false
            state.primaryMosqueData=action.payload
        },
        [getPrimaryMosqueData.pending]:(state,action)=>{
            state.isLoadingGetPrimaryMosqueData = true
            state.hasErrorGetPrimaryMosqueData=false

        },
        [getPrimaryMosqueData.rejected]:(state,action)=>{
            state.hasErrorGetPrimaryMosqueData=true
            state.isLoadingGetPrimaryMosqueData=false

        },


    }
})

export const selectHasUpdatedPassword=(state)=>state.muslimpreferences.hasUpdatedPassword
export const selectHasUpdatedPrimaryMosque=(state)=>state.muslimpreferences.hasUpdatedPrimaryMosque
export const selectHasUpdatedNamazNotificationsSettings=(state)=>state.muslimpreferences.hasUpdatedNamazNotificationsSetting
export const selectHasUpdatedAutosilentSetting=(state)=>state.muslimpreferences.hasUpdatedAutoSilentSettings
export const selectHasUpdatedNamazAccountabilityNotificationSettings=(state)=>state.muslimpreferences.hasUpdatedNamazAccountabilityNotificationsSetting

export const selectIsUploadingProfileImage=(state)=>state.muslimpreferences.isUploadingProfileImage
export const selectHasErrorInUploadingProfileImage=(state)=>state.muslimpreferences.hasErrorInUploadingProfileImage

export const selectIsUpdatingLocation=(state)=>state.muslimpreferences.isUpdatingLocation
export const selectHasErrorUpdatingLocation=(state)=>state.muslimpreferences.hasErrorUpdatingLocation

export const selectPrimaryMosqueData=(state)=>state.muslimpreferences.primaryMosqueData
export const selectHasErrorGetPrimaryMosqueData=(state)=>state.muslimpreferences.hasErrorGetPrimaryMosqueData
export const selectIsLoadingGetPrimaryMosqueData=(state)=>state.muslimpreferences.isLoadingGetPrimaryMosqueData


export const selectIsLoading=(state)=>state.muslimpreferences.isLoading
export const selectHasError=(state)=>state.muslimpreferences.hasError
export const selectProfileData=(state)=>state.muslimpreferences.profileData

export default muslimPreferencesSlice.reducer