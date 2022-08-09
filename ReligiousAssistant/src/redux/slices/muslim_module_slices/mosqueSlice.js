import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import {apiPOST, apiGET} from '../../../apis/apiService'
import { add_mosque, get_all_mosques, get_closest_mosques, get_unverified_mosques_around_user } from '../../endpoints'

const initialState = {
    allMosques:null,
    closestMosques:null,
    newMosque:null,    
    unerifiedMosques:null,

    isLoadingAllMosques:false,
    hasErrorInGettingAllMosques:false,
    
    isLoadingClosestMosques:false,
    hasErrorInGettingClosestMosques:false,
    
    isLoadingUnverifiedMosques:false,
    hasErrorInGettingUnverifiedMosques:false,

    isLoadingAddNewMosque:false,
    hasErrorInAddingMosque:false,

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
            state.hasErrorInGettingAllMosques=false
            state.isLoadingAllMosques=false
            state.allMosques = action.payload.data
            
        },
        [getAllMosques.rejected]:(state,action)=>{
            state.isLoadingAllMosques=false
            state.hasErrorInGettingAllMosques=true

        },
        [getAllMosques.pending]:(state,action)=>{
            state.isLoadingAllMosques=true
            state.hasErrorInGettingAllMosques=false
        },
        [getClosestMosques.fulfilled]:(state,action)=>{
            state.hasErrorInGettingClosestMosques=false
            state.isLoadingClosestMosques=false
            state.closestMosques = action.payload.data
            
        },
        [getClosestMosques.rejected]:(state,action)=>{
            state.isLoadingClosestMosques=false
            state.hasErrorInGettingClosestMosques=true

        },
        [getClosestMosques.pending]:(state,action)=>{
            state.isLoadingClosestMosques=true
            state.hasErrorInGettingClosestMosques=false
        },

        [getUnverifiedMosquesAroundUser.fulfilled]:(state,action)=>{
            state.isLoadingUnverifiedMosques = false
            state.hasErrorInGettingUnverifiedMosques=false
            state.unerifiedMosques=action.payload.data
        },
        [getUnverifiedMosquesAroundUser.pending]:(state,action)=>{
            state.isLoadingUnverifiedMosques = true
            state.hasErrorInGettingUnverifiedMosques=false
        },
        [getUnverifiedMosquesAroundUser.rejected]:(state,action)=>{
            state.hasErrorInGettingUnverifiedMosques=true
            state.isLoadingUnverifiedMosques=false
        },
        
        [addMosque.fulfilled]:(state,action)=>{
            state.hasErrorInAddingMosque = false;
            state.isLoadingAddNewMosque=false;
            state.newMosque=action.payload.data

        },
        [addMosque.pending]:(state,action)=>{
            state.isLoadingAddNewMosque = true
            state.hasErrorInAddingMosque=false
        },
        [addMosque.rejected]:(state,action)=>{
            state.hasErrorInAddingMosque = true;
            state.isLoadingAddNewMosque=false;
        },

    }
})

export const selectAllMosques=(state)=>state.mosque.allMosques
export const selectClosestMosques=(state)=>state.mosque.closestMosques
export const selectUnverifiedMosques=(state)=>state.mosque.unerifiedMosques
export const selectNewAddedMosque=(state)=>state.mosque.newMosque

export const selectIsLoadingAllMosques=(state)=>state.mosque.isLoadingAllMosques
export const selectHasErrorInGettingAllMosques=(state)=>state.mosque.hasErrorInGettingAllMosques

export const selectIsLoadingClosestMosques=(state)=>state.mosque.isLoadingClosestMosques
export const selectHasErrorInGettingClosestMosques=(state)=>state.mosque.hasErrorInGettingClosestMosques

export const selectIsLoadingAddNewMosque=(state)=>state.mosque.isLoadingAddNewMosque
export const selectHasErrorInAddingNewMosque=(state)=>state.mosque.hasErrorInAddingMosque

export const selectIsLoadingUnverifiedMosques=(state)=>state.mosque.isLoadingUnverifiedMosques
export const selectHasErrorInGettingUnverifiedMosques=(state)=>state.mosque.hasErrorInGettingUnverifiedMosques


export default mosqueSlice.reducer