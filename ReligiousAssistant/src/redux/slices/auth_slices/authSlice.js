import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import {apiPOST, apiPATCH} from '../../../services/apis/AuthService'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { forgot_password, login_user, register_user } from '../../endpoints';

const initialState = {
    userData:null,
    token:null,
    religion:null,
    isLoading:true,
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
        console.log(`Forgot Pass ${body}`)
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

        [getUserData.fulfilled]:(state,action)=>{
            state.hasError=false
            state.isPending=false
            state.userData = action.payload
        },
        [getUserData.rejected]:(state,action)=>{
            state.isLoading=false
            state.hasError=true

        },
        [getUserData.pending]:(state,action)=>{
            state.isLoading=false
            state.hasError=false
        },

        [getToken.fulfilled]:(state,action)=>{
            state.hasError=false
            state.isPending=false
            state.token = action.payload
        },
        [getToken.rejected]:(state,action)=>{
            state.isLoading=false
            state.hasError=true

        },
        [getToken.pending]:(state,action)=>{
            state.isLoading=false
            state.hasError=false
        },

        [getReligion.fulfilled]:(state,action)=>{
            state.hasError=false
            state.isPending=false
            state.religion = action.payload
        },
        [getReligion.rejected]:(state,action)=>{
            state.isLoading=false
            state.hasError=true

        },
        [getReligion.pending]:(state,action)=>{
            state.isLoading=true
            state.hasError=false
        },
        [registerUser.fulfilled]:(state,action)=>{
            state.isLoading = false
            state.hasError=false
        },
        [registerUser.pending]:(state,action)=>{
            state.isLoading = true
            state.hasError=false
        },
        [registerUser.rejected]:(state,action)=>{
            state.hasError=true
            state.isLoading=false
        },
        [forgotPassword.fulfilled]:(state,action)=>{
            state.isLoading = false
            state.hasError=false
            state.hasRecoveredForgetPassword=true
        },
        [forgotPassword.pending]:(state,action)=>{
            state.isLoading = true
            state.hasError=false
            state.hasRecoveredForgetPassword=false
        },
        [forgotPassword.rejected]:(state,action)=>{
            state.hasError=true
            state.isLoading=false
            state.hasRecoveredForgetPassword=false
        },

        [loginUser.pending]:(state,action)=>{
            state.isLoading = true
            state.hasError=false
        },
        [loginUser.rejected]:(state,action)=>{
            state.hasError = true;
            state.isLoading=false;
        },
        
        [loginUser.fulfilled]:(state,action)=>{

            const {msg, success}=action.payload
            if(!success){            
                state.hasError=true
                state.isLoading=false
                alert(msg)
                return
            }

            state.isLoading = false            
            state.hasError=false
            state.userData=action.payload.data
            
            console.log('LOGIN TOKEN',action.payload.data.token)
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
export const selectIsLoading=(state)=>state.user.isLoading
export const selectHasError=(state)=>state.user.hasError
export const selectHasRecoveredForgetPassword=(state)=>state.user.hasRecoveredForgetPassword
export const selectUserData=(state)=>state.user.userData

export default authSlice.reducer