import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import {apiPOST, apiPATCH} from '../../../apis/apiService'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { forgot_password, get_otp_code, get_updated_user_data, login_user, register_user, verify_otp_code } from '../../endpoints';

const initialState = {
    userData:null,
    token:null,
    religion:null,
    otp_id:null,                //received in get otp code
    isOTPVerified:false,
    isOTPObtained:false,
    
    isLoadingLogin:false,
    isLoadingRegister:false,
    isLoadingGetUserData:false,
    isLoadingGetToken:false,
    isLoadingGetReligion:false,
    isLoadingForgotPassword:false,

    isLoadingGetUpdatedUserData:false,
    hasErrorGetUpdatedUserData:false,

    isLoadingGetOTPCode:false,
    hasErrorGetOTPCode:false,

    isLoadingVerifyOTP:false,
    hasErrorVerifyOTP:false,

    hasError:false, 
    hasRecoveredForgetPassword:false,
}

export const registerUser = createAsyncThunk(
    'registerUser',
    async (body)=>{
       const result =  await apiPOST(register_user,body)
       return result  
    }
)

export const getOTPCode = createAsyncThunk(
    'getOTPCode',
    async (mobileNumber)=>{
        console.log(`Mobile Number ${mobileNumber}`)
       const result =  await apiPOST(get_otp_code,mobileNumber)
       return result  
    }
)

export const verifyOTPCode = createAsyncThunk(
    'verifyOTPCode',
    async (otpNumber)=>{
       const result =  await apiPOST(verify_otp_code,otpNumber)
       return result  
    }
)

export const loginUser = createAsyncThunk(
    'loginUser',
    async (body)=>{
       const result =  await apiPOST(login_user,body)
       return result  
    }
)

export const forgotPassword = createAsyncThunk(
    'forgotPassword',
    async (body)=>{
       const result =  await apiPATCH(forgot_password,body)
       return result  
    }
)

export const getUserData = createAsyncThunk(
    'getUserData',
    async ()=>{
        try{
            const result =  await AsyncStorage.getItem('user') 
            return result!=null?JSON.parse(result):null  
        }catch(e){
            console.log('ERROR while Retrieving user data from Async Storage', e)
        }
    }
)

export const getUpdatedUserData = createAsyncThunk(
    'getUpdatedUserData',
    async (body)=>{
        const result =  await apiPOST(get_updated_user_data,body)
        return result  
     }
)

export const getToken = createAsyncThunk(
    'getToken',
    async ()=>{
        try{
            const result =  await AsyncStorage.getItem('token') 
            return result
        }catch(e){
            console.log('ERROR while Retrieving Token data from Async Storage', e)
        }
    }
)

export const getReligion = createAsyncThunk(
    'getReligion',
    async ()=>{
        try{
            const result =  await AsyncStorage.getItem('religion') 
            return result 
        }catch(e){
            console.log('ERROR while Retrieving Religion data from Async Storage', e)
        }
    }
)


const authSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        logout:(state,action)=>{
            state.userData=null
            state.token=null
            state.religion=null

            AsyncStorage.removeItem('user')
            AsyncStorage.removeItem('religion')
            AsyncStorage.removeItem('token')
        }
    },
    
    extraReducers:{

        [getUpdatedUserData.fulfilled]:(state,action)=>{
            state.hasErrorGetUpdatedUserData=false
            state.isLoadingGetUpdatedUserData=false
            state.userData = action.payload.data

            const user=JSON.stringify(action.payload.data)
            AsyncStorage.setItem('user',user)

        },
        [getUpdatedUserData.rejected]:(state,action)=>{
            state.isLoadingGetUpdatedUserData=false
            state.hasErrorGetUpdatedUserData=true

        },
        [getUpdatedUserData.pending]:(state,action)=>{
            state.isLoadingGetUpdatedUserData=true
            state.hasErrorGetUpdatedUserData=false
        },

        [getUserData.fulfilled]:(state,action)=>{
            state.hasError=false
            state.isLoadingGetUserData=false
            state.userData = action.payload
        },
        [getUserData.rejected]:(state,action)=>{
            state.isLoadingGetUserData=false
            state.hasError=true

        },
        [getUserData.pending]:(state,action)=>{
            state.isLoadingGetUserData=true
            state.hasError=false
        },

        [getOTPCode.fulfilled]:(state,action)=>{
            state.hasErrorGetOTPCode=false
            state.isLoadingGetOTPCode=false
            state.otp_id=action.payload.data
            if(state.otp_id){
                state.hasErrorGetOTPCode=false
                state.isOTPObtained=true
            }
            else{
                state.hasErrorGetOTPCode=true
            }

        },
        [getOTPCode.rejected]:(state,action)=>{
            state.isLoadingGetOTPCode=false
            state.hasErrorGetOTPCode=true
            
        },
        [getOTPCode.pending]:(state,action)=>{
            state.isLoadingGetOTPCode=true
            state.hasErrorGetOTPCode=false
        },

        [verifyOTPCode.fulfilled]:(state,action)=>{
            state.hasErrorVerifyOTP=false
            state.isLoadingVerifyOTP=false
            state.isOTPVerified=true
        },
        [verifyOTPCode.rejected]:(state,action)=>{
            state.isLoadingVerifyOTP=false
            state.hasErrorVerifyOTP=true

        },
        [verifyOTPCode.pending]:(state,action)=>{
            state.isLoadingVerifyOTP=true
            state.hasErrorVerifyOTP=false
        },

        [getToken.fulfilled]:(state,action)=>{
            state.hasError=false
            state.isLoadingGetToken=false
            state.token = action.payload
        },
        [getToken.rejected]:(state,action)=>{
            state.isLoadingGetToken=false
            state.hasError=true

        },
        [getToken.pending]:(state,action)=>{
            state.isLoadingGetToken=true
            state.hasError=false
        },

        [getReligion.fulfilled]:(state,action)=>{
            state.hasError=false
            state.isLoadingGetReligion=false
            state.religion = action.payload
        },
        [getReligion.rejected]:(state,action)=>{
            state.isLoadingGetReligion=false
            state.hasError=true

        },
        [getReligion.pending]:(state,action)=>{
            state.isLoadingGetReligion=true
            state.hasError=false
        },
        [registerUser.fulfilled]:(state,action)=>{
            state.isLoadingRegister = false
            state.hasError=false
        },
        [registerUser.pending]:(state,action)=>{
            state.isLoadingRegister = true
            state.hasError=false
        },
        [registerUser.rejected]:(state,action)=>{
            state.hasError=true
            state.isLoadingRegister=false
        },
        [forgotPassword.fulfilled]:(state,action)=>{
            state.isLoadingForgotPassword = false
            state.hasError=false
            state.hasRecoveredForgetPassword=true
        },
        [forgotPassword.pending]:(state,action)=>{
            state.isLoadingForgotPassword = true
            state.hasError=false
            state.hasRecoveredForgetPassword=false
        },
        [forgotPassword.rejected]:(state,action)=>{
            state.hasError=true
            state.isLoadingForgotPassword=false
            state.hasRecoveredForgetPassword=false
        },

        [loginUser.pending]:(state,action)=>{
            state.isLoadingLogin = true
            state.hasError=false
        },
        [loginUser.rejected]:(state,action)=>{
            state.hasError = true;
            state.isLoadingLogin=false;
        },
        
        [loginUser.fulfilled]:(state,action)=>{

            const {msg, success}=action.payload
            state.isLoadingLogin=false
            if(!success){            
                state.hasError=true
                alert(msg)
                return
            }

            state.hasError=false
            state.userData=action.payload.data
            
            const {token, religion}=action.payload.data
            state.token=token
            state.religion=religion+''

            try{
                const user=JSON.stringify(action.payload.data)
                AsyncStorage.setItem('user',user)
                AsyncStorage.setItem('token',token)
                AsyncStorage.setItem('religion',religion+'')
            }
            catch(e){
                console.log('ERROR while storing user details in async storage', e)
            }
          },
    }
})

export const {logout}  = authSlice.actions 

export const selectToken=(state)=>state.user.token
// export const selectDeviceToken=(state)=>state.user.deviceToken
export const selectReligion=(state)=>state.user.religion

export const selectIsLoadingLogin=(state)=>state.user.isLoadingLogin
export const selectIsLoadingRegister=(state)=>state.user.isLoadingRegister
export const selectIsLoadingGetUserData=(state)=>state.user.isLoadingGetUserData
export const selectIsLoadingGetToken=(state)=>state.user.isLoadingGetToken
export const selectIsLoadingGetReligion=(state)=>state.user.isLoadingGetReligion
export const selectIsLoadingForgotPassword=(state)=>state.user.isLoadingForgotPassword

export const selectIsLoadingVerifyOTPCode=(state)=>state.user.isLoadingVerifyOTP
export const selectIsLoadingGetOTPCode=(state)=>state.user.isLoadingGetOTPCode
export const selectIsOTPVerified=(state)=>state.user.isOTPVerified
export const selectHasErrorVerifyOTP=(state)=>state.user.hasErrorVerifyOTP
export const selectHasErrorGetOTPCode=(state)=>state.user.hasErrorGetOTPCode
export const selectIsObtainedOTP=(state)=>state.user.isOTPObtained

export const selectHasErrorGetUpdatedUserData=(state)=>state.user.hasErrorGetUpdatedUserData
export const selectIsLoadingGetUpdatedUserData=(state)=>state.user.isLoadingGetUpdatedUserData

export const selectHasError=(state)=>state.user.hasError
export const selectHasRecoveredForgetPassword=(state)=>state.user.hasRecoveredForgetPassword
export const selectUserData=(state)=>state.user.userData
export const selectOtpId=(state)=>state.user.otp_id
export default authSlice.reducer