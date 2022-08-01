import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import {apiPOST, apiGET} from '../../../apis/apiService'
import { add_mosque, get_all_mosques, get_closest_mosques, get_unverified_mosques_around_user } from '../../endpoints'

const initialState = {
    allMosques:null,
    closestMosques:null,
    newMosque:null,
    unerifiedMosques:null,
    isLoading:true,
    hasError:false,
}

export const getAllMosques = createAsyncThunk(
    'getAllMosques',
    async ()=>{
       const result =  await apiGET(get_all_mosques)
       return result  
    }
)

export const getClosestMosques = createAsyncThunk(
    'getClosestMosques',
    async (location)=>{
       const result =  await apiPOST(get_closest_mosques,location)   //Location object with latitude and longitude
       return result  
    }
)


export const getUnverifiedMosquesAroundUser = createAsyncThunk(
    'getUnverifiedMosquesAroundUser',
    async (location)=>{
       const result =  await apiPOST(get_unverified_mosques_around_user,location)   //Location object with latitude and longitude
       return result  
    }
)

export const addMosque = createAsyncThunk(
    'addMosque',
    async (body)=>{
       const result =  await apiPOST(add_mosque,body)   //body with required info
       return result  
    }
)


const mosqueSlice = createSlice({
    name:"mosque",
    initialState,
    reducers:{},
    extraReducers:{
        [getAllMosques.fulfilled]:(state,action)=>{
            state.hasError=false
            state.isPending=false
            state.allMosques = action.payload.data
            
        },
        [getAllMosques.rejected]:(state,action)=>{
            state.isLoading=false
            state.hasError=true

        },
        [getAllMosques.pending]:(state,action)=>{
            state.isLoading=true
            state.hasError=false
        },
        [getClosestMosques.fulfilled]:(state,action)=>{
            state.hasError=false
            state.isPending=false
            state.closestMosques = action.payload.data
            
        },
        [getClosestMosques.rejected]:(state,action)=>{
            state.isLoading=false
            state.hasError=true

        },
        [getClosestMosques.pending]:(state,action)=>{
            state.isLoading=true
            state.hasError=false
        },

        [getUnverifiedMosquesAroundUser.fulfilled]:(state,action)=>{
            state.isLoading = false
            state.hasError=false
            state.unerifiedMosques=action.payload.data
        },
        [getUnverifiedMosquesAroundUser.pending]:(state,action)=>{
            state.isLoading = true
            state.hasError=false
        },
        [getUnverifiedMosquesAroundUser.rejected]:(state,action)=>{
            state.hasError=true
            state.isLoading=false
        },
        
        [addMosque.fulfilled]:(state,action)=>{
            state.hasError = false;
            state.isLoading=false;
            state.newMosque=action.payload.data

        },
        [addMosque.pending]:(state,action)=>{
            state.isLoading = true
            state.hasError=false
        },
        [addMosque.rejected]:(state,action)=>{
            state.hasError = true;
            state.isLoading=false;
        },

    }
})

export const selectAllMosques=(state)=>state.mosque.allMosques
export const selectClosestMosques=(state)=>state.mosque.closestMosques
export const selectUnverifiedMosques=(state)=>state.mosque.unerifiedMosques
export const selectNewAddedMosque=(state)=>state.mosque.newMosque
export const selectIsLoading=(state)=>state.mosque.isLoading
export const selectHasError=(state)=>state.mosque.hasError

export default mosqueSlice.reducer