import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import {apiPATCH, apiPOST} from '../../../apis/apiService'
import {become_imam, cast_down_vote_for_imam, cast_up_vote_for_imam, get_imam_by_id} from '../../endpoints';


const initialState = {

    imamById:null,

    isLoadingGetimamById:false,
    hasErrorGetimamById:false,

    isLoadingCastUpvoteForImam:false,
    hasErrorInCastingUpVoteFormImam:false,

    isLoadingCastDownvoteForImam:false,
    hasErrorInCastingDownVoteForImam:false,

    hasBecomeImam:false,
    isLoadingBecomeImam:false,
    hasErrorBecomeImam:false,

}

export const becomeImam = createAsyncThunk(
    'becomeImam',
    async (body)=>{
       const result =  await apiPOST(become_imam,body)
       return result  
    }
)

export const getImamById = createAsyncThunk(
    'getImamById',
    async (body)=>{
       const result =  await apiPOST(get_imam_by_id,body)   //body with required info
       return result  
    }
)

export const castUpvoteForImam = createAsyncThunk(
    'castUpvoteForImam',
    async (body)=>{
       const result =  await apiPATCH(cast_up_vote_for_imam,body)   //body with required info
       return result  
    }
)

export const castDownvoteForImam = createAsyncThunk(
    'castDownvoteForImam',
    async (body)=>{
       const result =  await apiPATCH(cast_down_vote_for_imam,body)   //body with required info
       return result  
    }
)

const imamSlice = createSlice({
    name:"imam",
    initialState,
    reducers:{},
    extraReducers:{
        [becomeImam.fulfilled]:(state,action)=>{
            state.isLoadingBecomeImam = false
            state.hasErrorBecomeImam = false
        },
        [becomeImam.pending]:(state,action)=>{
            state.isLoadingBecomeImam=true
            state.hasErrorBecomeImam=false
            state.hasBecomeImam=true            //succeefulle applied to become imam
        },
        [becomeImam.rejected]:(state,action)=>{
            state.isLoadingBecomeImam = false
            state.hasErrorBecomeImam = true

        },
        [getImamById.fulfilled]:(state,action)=>{
            state.hasErrorGetimamById=false
            state.isLoadingGetimamById=false
            state.imamById = action.payload.data
            
        },
        [getImamById.rejected]:(state,action)=>{
            state.isLoadingGetimamById=false
            state.hasErrorGetimamById=true

        },
        [getImamById.pending]:(state,action)=>{
            state.isLoadingGetimamById=true
            state.hasErrorGetimamById=false
        },

        [castUpvoteForImam.fulfilled]:(state,action)=>{
            state.hasErrorInCastingUpVoteFormImam=false
            state.isLoadingCastUpvoteForImam=false
            state.imamById = action.payload.data
            
        },
        [castUpvoteForImam.rejected]:(state,action)=>{
            state.isLoadingCastUpvoteForImam=false
            state.hasErrorInCastingUpVoteFormImam=true
        },
        [castUpvoteForImam.pending]:(state,action)=>{
            state.isLoadingCastUpvoteForImam=true
            state.hasErrorInCastingUpVoteFormImam=false
        },

        [castDownvoteForImam.fulfilled]:(state,action)=>{
            state.hasErrorInCastingDownVoteForImam=false
            state.isLoadingCastDownvoteForImam=false
            state.imamById = action.payload.data
            
        },
        [castDownvoteForImam.rejected]:(state,action)=>{
            state.isLoadingCastDownvoteForImam=false
            state.hasErrorInCastingDownVoteForImam=true

        },
        [castDownvoteForImam.pending]:(state,action)=>{
            state.isLoadingCastDownvoteForImam=true
            state.hasErrorInCastingDownVoteForImam=false
        },
    }
})

export const selectHasBecomeImam=(state)=>state.imam.hasBecomeImam

export const selectImamById=(state)=>state.imam.imamById

export const selectIsLoadingBecomeImam=(state)=>state.imam.isLoadingBecomeImam
export const selectHasErrorBecomingImam=(state)=>state.imam.hasErrorBecomeImam

export const selectIsLoadingGetImamById=(state)=>state.imam.isLoadingGetimamById
export const selectHasErrorGetImamById=(state)=>state.imam.hasErrorGetimamById

export const selectIsLoadingCastUpVoteForImam=(state)=>state.imam.isLoadingCastUpvoteForImam
export const selectHasErrorInCastingUpVoteForImam=(state)=>state.imam.hasErrorInCastingUpVoteFormImam

export const selectIsLoadingCastDownVoteForImam=(state)=>state.imam.isLoadingCastDownvoteForImam
export const selectHasErrorInCastingDownVoteForImam=(state)=>state.imam.hasErrorInCastingDownVoteForImam


export default imamSlice.reducer