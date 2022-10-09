import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import {apiPATCH} from '../../../apis/apiService'
import { update_accountability_notifications_setting, update_auto_silent_settings, update_location, update_namaz_notifications_setting, update_password, update_primupdate_primary_temple, ary_temple, update_profile_image, update_primary_temple, update_veg_notifications_setting, update_auto_silent_settings_for_hindu_user } from '../../endpoints';

const initialState = {
    profileData:null,
    hasUpdatedPassword:false,
    hasUpdatedAutoSilentSettings:false,
    hasUpdatedPrimaryTemple:false,
    hasUpdatedVegNotifications:false,

    isUploadingProfileImage:false,
    hasErrorInUploadingProfileImage:false,

    isUpdatingLocation:false,
    hasErrorUpdatingLocation:false,

    isLoading:true,
    hasError:false,

    primaryTempleData:null,
    isLoadingGetPrimaryTempleData:false,
    hasErrorGetPrimaryTempleData:false,


}

export const updatePassword = createAsyncThunk(
    'updatePassword',
    async (body)=>{
       const result =  await apiPATCH(update_password,body)
       return result  
    }
)

export const updatePrimaryTemple = createAsyncThunk(
    'updatePrimaryTemple',
    async (body)=>{
       const result =  await apiPATCH(update_primary_temple,body)
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

export const updateVegNotifications = createAsyncThunk(
    'updateVegNotifications',
    async (body)=>{
       const result =  await apiPATCH(update_veg_notifications_setting,body)
       return result  
    }
)

export const updateAutoSilentSetting = createAsyncThunk(
    'updateAutoSilentSetting',
    async (body)=>{
       const result =  await apiPATCH(update_auto_silent_settings_for_hindu_user,body)
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


const hinduPreferencesSlice = createSlice({
    name:"hindupreferences",
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
            if(action.payload.data){
                AsyncStorage.setItem('user',JSON.stringify(action.payload.data))
            }
            else{
                alert('Could not update location')
            }

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

        [updateVegNotifications.fulfilled]:(state,action)=>{
            state.isLoading = false
            state.hasError=false
            state.hasUpdatedVegNotifications=true
        },
        [updateVegNotifications.pending]:(state,action)=>{
            state.isLoading = true
            state.hasError=false
            state.hasUpdatedVegNotifications=false
        },
        [updateVegNotifications.rejected]:(state,action)=>{
            state.hasError=true
            state.isLoading=false
            state.hasUpdatedVegNotifications=false
        },

        [updatePrimaryTemple.fulfilled]:(state,action)=>{
            state.isLoading = false
            state.hasError=false
            state.hasUpdatedPrimaryTemple=true

            // if(action.payload.data){
            //     AsyncStorage.setItem('primarytemple',JSON.stringify(action.payload.data))
            // }
        },
        [updatePrimaryTemple.pending]:(state,action)=>{
            state.isLoading = true
            state.hasError=false
            state.hasUpdatedPrimaryTemple=false
        },
        [updatePrimaryTemple.rejected]:(state,action)=>{
            state.hasError=true
            state.isLoading=false
            state.hasUpdatedPrimaryTemple=false
        },

    }
})

export const selectHasUpdatedPassword=(state)=>state.hindupreferences.hasUpdatedPassword
export const selectHasUpdatedPrimaryTemple=(state)=>state.hindupreferences.hasUpdatedPrimaryTemple
export const selectHasUpdatedAutosilentSetting=(state)=>state.hindupreferences.hasUpdatedAutoSilentSettings
export const selectHasUpdatedVegNotifications=(state)=>state.hindupreferences.hasUpdatedVegNotifications

export const selectIsUploadingProfileImage=(state)=>state.hindupreferences.isUploadingProfileImage
export const selectHasErrorInUploadingProfileImage=(state)=>state.hindupreferences.hasErrorInUploadingProfileImage

export const selectIsUpdatingLocation=(state)=>state.hindupreferences.isUpdatingLocation
export const selectHasErrorUpdatingLocation=(state)=>state.hindupreferences.hasErrorUpdatingLocation

export const selectHasErrorGetPrimaryTempleData=(state)=>state.hindupreferences.hasErrorGetPrimaryTempleData
export const selectIsLoadingGetPrimaryTempleData=(state)=>state.hindupreferences.isLoadingGetPrimaryTempleData

export const selectIsLoading=(state)=>state.hindupreferences.isLoading
export const selectHasError=(state)=>state.hindupreferences.hasError
export const selectProfileData=(state)=>state.hindupreferences.profileData

export default hinduPreferencesSlice.reducer