import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import {apiPOST, apiGET} from '../../../services/apis/AuthService'

import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    token:null,
    userData:null,
    religion:null,
    isLoading:false,
    hasError:false,

}

export const registerUser = createAsyncThunk(
    'registerUser',
    async (body)=>{
       const result =  await apiPOST('registerUser',body)
       return result  
    }
)

export const loginUser = createAsyncThunk(
    'loginUser',
    async (body)=>{
       const result =  await apiPOST('loginUser',body)
       return result  
    }
)

export const getToken = createAsyncThunk(
    'getToken',
    async ()=>{
       const result =  await AsyncStorage.getItem('token') 
       return result  
    }
)

export const getReligion = createAsyncThunk(
    'getReligion',
    async ()=>{
       const result =  await AsyncStorage.getItem('religion') 
       return result  
    }
)

const authSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        logout:(state,action)=>{
            state.token = null
            state.religion=null
            state.userData=null
            AsyncStorage.removeItem('token')
            AsyncStorage.removeItem('religion')
        }
    },
    extraReducers:{
        [getToken.fulfilled]:(state,action)=>{
            state.hasError=false
            state.isPending=false
            state.token = action.payload
            
        },
        [getToken.rejected]:(state,action)=>{
            state.isLoading=false
            state.hasError=true
            state.token = null

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
            state.religion = null

        },
        [getReligion.pending]:(state,action)=>{
            state.isLoading=false
            state.hasError=false
        },

        [registerUser.fulfilled]:(state,payload)=>{
            console.log(payload)

            state.isLoading = false
            state.hasError=false
            // state.userData=

        },
        [registerUser.pending]:(state,action)=>{
            state.isLoading = true
            state.hasError=false
        },
        [registerUser.rejected]:(state,action)=>{
            state.hasError=true
            state.isLoading=false
        },
        
        [loginUser.pending]:(state,action)=>{
            console.log('Login Pending')
            state.isLoading = true
            state.hasError=false
        },
        [loginUser.rejected]:(state,action)=>{
            console.log('Login  Rejected')
            state.hasError = true;
            state.isLoading=false;
        },
        
        [loginUser.fulfilled]:(state,action)=>{
            const {token, religion}=action.payload.data
            state.isLoading = false
            state.hasError=false
            state.token = token
            AsyncStorage.setItem('token',token)
            AsyncStorage.setItem('religion',JSON.stringify(religion))
          },
    }
})

export const {logout}  = authSlice.actions

export const selectToken=(state)=>state.user.token
export const selectReligion=(state)=>state.user.religion
export const selectIsLoading=(state)=>state.user.isLoading
export const selectHasError=(state)=>state.user.hasError
export const selectUserData=(state)=>state.user.userData

export default authSlice.reducer