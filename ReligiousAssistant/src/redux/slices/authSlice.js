import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import {apiPOST, apiGET} from '../../services/apis/AuthService'

import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    token:null,
    loading:false,
    error:""
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

export const storeToken = createAsyncThunk(
    'storeToken',
    async ()=>{
       const result =  await AsyncStorage.getItem('token') 
       return result  
    }
)



const authReducer = createSlice({
    name:"user",
    initialState,
    reducers:{
        logout:(state,action)=>{
            state.token = null
            AsyncStorage.removeItem('token')
        }
    },
    extraReducers:{
        [registerUser.fulfilled]:(state,{payload:{error,message}})=>{
          state.loading = false
          if(error){
              state.error =error
              alert(error)
          }else{
              state.error = message
             alert(message)
          }
        },
        [storeToken.fulfilled]:(state,action)=>{
            state.token = action.payload
        },
        [registerUser.pending]:(state,action)=>{
            state.loading = true
        },
        [loginUser.pending]:(state,action)=>{
            state.loading = true
        },
        [loginUser.fulfilled]:(state,{payload:{error,data}})=>{
            state.loading = false
            if(error){
                state.error =error
                alert(error)
            }else{
                state.token = data.token
                AsyncStorage.setItem('token',data.token)
            }
          },
    }

})

export const {logout}  = authReducer.actions
export default authReducer.reducer