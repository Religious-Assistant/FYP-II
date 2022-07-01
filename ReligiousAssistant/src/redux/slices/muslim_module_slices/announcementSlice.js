import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import {apiPOST, apiGET, apiDELETE} from '../../../services/apis/AuthService'
import { delete_announcement, get_announcements, make_announcement} from '../../endpoints';


const initialState = {
    announcements:null,
    isLoading:true,
    hasError:false,
}

export const getAnnouncements = createAsyncThunk(
    'getAnnouncements',
    async()=>{
        const result =  await apiGET(get_announcements)
        return result
    }
)

export const makeAnnouncement = createAsyncThunk(
    'makeAnnouncement',
    async(body)=>{
        const result =  await apiPOST(make_announcement,body)
        return result  
    }
)

const deleteAnnouncement = createAsyncThunk(
    'deleteAnnouncement',
    async(body)=>{
        const result =  await apiDELETE(delete_announcement,body)
        return result 
    }
)

const announcementSlice = createSlice({
    name:"announcement",
    initialState,
    reducers:{},
    extraReducers:{
        [getAnnouncements.fulfilled]:(state,action)=>{
            state.hasError=false
            state.isLoading = false
            state.announcements = action.payload.data
        },
        [getAnnouncements.pending]:(state,action)=>{
            state.isLoading=true
            state.hasError=false
        },
        [getAnnouncements.rejected]:(state,action)=>{
            state.hasError = true
            state.isLoading = false
        },
        [makeAnnouncement.fulfilled]:(state,action)=>{
            state.hasError = false
            state.isLoading = false
        },
        [makeAnnouncement.pending]:(state,action)=>{
            state.isLoading=true
            state.hasError=false
        },
        [makeAnnouncement.rejected]:(state,action)=>{
            state.hasError = true
            state.isLoading = false
        },
        [deleteAnnouncement.fulfilled]:(state,action)=>{
            state.hasError = false
            state.isLoading = false
        },
        [deleteAnnouncement.pending]:(state,action)=>{
            state.isLoading=true
            state.hasError=false
        },
        [deleteAnnouncement
            .rejected]:(state,action)=>{
            state.hasError = true
            state.isLoading = false
        },

    }
})


export const selectAnnouncements =(state)=> state.announcement.announcements;
export const selectIsLoading=(state)=>state.announcement.isLoading
export const selectHasError=(state)=>state.announcement.hasError


export default announcementSlice.reducer