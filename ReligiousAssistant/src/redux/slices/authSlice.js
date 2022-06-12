import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import {apiPOST, apiGET} from '../../services/apis/AuthService'

import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    token:null,
    isLoading:false,
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

export const addToken = createAsyncThunk(
    'addToken',
    async ()=>{
       const result =  await AsyncStorage.getItem('token') 
       return result  
    }
)

const authSlice = createSlice({
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
          state.isLoading = false
          if(error){
              state.error =error
              alert(error)
          }else{
              state.error = message
             alert(message)
          }
        },
        [addToken.fulfilled]:(state,action)=>{
            state.token = action.payload
        },
        [addToken.rejected]:(state,action)=>{
            state.isLoading=false
            state.error='Could not load token'
            state.token = null

        },
        [addToken.pending]:(state,action)=>{
            state.isLoading=false
            state.error='Loading Auth- token'
        },

        [registerUser.fulfilled]:(state,action)=>{
            state.loading = false
            state.error='Could not register'
        },
        [registerUser.pending]:(state,action)=>{
            state.loading = true
        },
        [registerUser.rejected]:(state,action)=>{
            state.loading = false
            state.error='Could not register'
        },
        
        [loginUser.pending]:(state,action)=>{
            state.loading = true
        },
        [loginUser.rejected]:(state,action)=>{
            console.log("Comes")
            state.error = true;
            state.loading=false;
            alert(state.error)
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

export const {logout}  = authSlice.actions

export const selectToken=(state)=>state.authSlice.token
export const selectTokenIsLoading=(state)=>state.authSlice.token
export const selectTokenHasError=(state)=>state.authSlice.token

export default authSlice.reducer