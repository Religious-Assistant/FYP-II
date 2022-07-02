import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import {apiPOST, apiGET} from '../../../services/apis/AuthService'
import { add_temple, get_all_temples, get_unverified_temples_around_user } from '../../endpoints'


const initialState = {
    allTemples:null,
    closestTemples:null,
    newTemple:null,
    unerifiedTemples:null,
    isLoading:true,
    hasError:false,
}

export const getAllTemples = createAsyncThunk(
    'getAllTemples',
    async ()=>{
       const result =  await apiGET(get_all_temples)
       return result  
    }
)

export const getClosestTemples = createAsyncThunk(
    'getClosestTemples',
    async (location)=>{
       const result =  await apiPOST(get_closest_temples,location)
       return result  
    }
)


export const getUnverifiedTemplesAroundUser = createAsyncThunk(
    'getUnverifiedTemplesAroundUser',
    async (location)=>{
       const result =  await apiPOST(get_unverified_temples_around_user,location)
       return result  
    }
)

export const addTemple = createAsyncThunk(
    'addTemple',
    async (body)=>{
       const result =  await apiPOST(add_temple,body) 
       return result  
    }
)


const templeSlice = createSlice({
    name:"temple",
    initialState,
    reducers:{},
    extraReducers:{
        [getAllTemples.fulfilled]:(state,action)=>{
            state.hasError=false
            state.isPending=false
            state.allTemples = action.payload.data
            
        },
        [getAllTemples.rejected]:(state,action)=>{
            state.isLoading=false
            state.hasError=true

        },
        [getAllTemples.pending]:(state,action)=>{
            state.isLoading=true
            state.hasError=false
        },
        [getClosestTemples.fulfilled]:(state,action)=>{
            state.hasError=false
            state.isPending=false
            state.closestTemples = action.payload.data
            
        },
        [getClosestTemples.rejected]:(state,action)=>{
            state.isLoading=false
            state.hasError=true

        },
        [getClosestTemples.pending]:(state,action)=>{
            state.isLoading=true
            state.hasError=false
        },

        [getUnverifiedTemplesAroundUser.fulfilled]:(state,action)=>{
            state.isLoading = false
            state.hasError=false
            state.unerifiedTemples=action.payload.data
        },
        [getUnverifiedTemplesAroundUser.pending]:(state,action)=>{
            state.isLoading = true
            state.hasError=false
        },
        [getUnverifiedTemplesAroundUser.rejected]:(state,action)=>{
            state.hasError=true
            state.isLoading=false
        },
        
        [addTemple.fulfilled]:(state,action)=>{
            state.hasError = false;
            state.isLoading=false;
            state.newTemple=action.payload.data

        },
        [addTemple.pending]:(state,action)=>{
            state.isLoading = true
            state.hasError=false
        },
        [addTemple.rejected]:(state,action)=>{
            state.hasError = true;
            state.isLoading=false;
        },

    }
})

export const selectAllTemples=(state)=>state.temple.allTemples
export const selectClosestTemples=(state)=>state.temple.closestTemples
export const selectUnverifiedTemples=(state)=>state.temple.unerifiedTemples
export const selectNewAddedTemple=(state)=>state.temple.newTemple
export const selectIsLoading=(state)=>state.temple.isLoading
export const selectHasError=(state)=>state.temple.hasError

export default templeSlice.reducer