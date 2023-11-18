import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import {apiPOST, apiGET, apiDELETE} from '../../../apis/apiService'
import { delete_announcement_for_hindu_users, get_announcements_for_hindu_users, make_announcement_for_hindu_users} from '../../endpoints';


const initialState = {
    announcements:null,
    isLoadingAnnouncements:false,
    hasErrorInAnnouncements:false,

    isLoadingMakeAnnouncement:false,
    hasErrorInMakeAnnouncement:false,

}

export const getAnnouncements = createAsyncThunk(
    'getAnnouncements',
    async(body)=>{
        const result =  await apiPOST(get_announcements_for_hindu_users, body)
        return result
    }
)

export const makeAnnouncement = createAsyncThunk(
    'makeAnnouncement',
    async(body)=>{
        const result =  await apiPOST(make_announcement_for_hindu_users,body)
        return result  
    }
)

export const deleteAnnouncement = createAsyncThunk(
    'deleteAnnouncement',
    async(body)=>{
        const result =  await apiDELETE(delete_announcement_for_hindu_users,body)
        return result 
    }
)

const hinduAnnouncementSlice = createSlice({
    name:"hindu_announcement",
    initialState,
    reducers:{},
    extraReducers:{
        [getAnnouncements.fulfilled]:(state,action)=>{
            state.hasErrorInAnnouncements=false
            state.isLoadingAnnouncements = false
            state.announcements = action.payload.data
        },
        [getAnnouncements.pending]:(state,action)=>{
            state.isLoadingAnnouncements=true
            state.hasErrorInAnnouncements=false
        },
        [getAnnouncements.rejected]:(state,action)=>{
            state.hasErrorInAnnouncements = true
            state.isLoadingAnnouncements = false
        },
        [makeAnnouncement.fulfilled]:(state,action)=>{
            state.hasErrorInMakeAnnouncement = false
            state.isLoadingMakeAnnouncement = false
        },
        [makeAnnouncement.pending]:(state,action)=>{
            state.isLoadingMakeAnnouncement=true
            state.hasErrorInMakeAnnouncement=false
        },
        [makeAnnouncement.rejected]:(state,action)=>{
            state.hasErrorInMakeAnnouncement = true
            state.isLoadingMakeAnnouncement = false
        },
        [deleteAnnouncement.fulfilled]:(state,action)=>{
            state.hasErrorInAnnouncements = false
            state.isLoadingAnnouncements = false
            state.announcements=action.payload.data
        },
        [deleteAnnouncement.pending]:(state,action)=>{
            state.isLoadingAnnouncements=true
            state.hasErrorInAnnouncements=false
        },
        [deleteAnnouncement.rejected]:(state,action)=>{
            state.hasErrorInAnnouncements = true
            state.isLoadingAnnouncements = false
        },

    }
})


export const selectAnnouncements =(state)=> state.hindu_announcement.announcements;
export const selectIsLoadingAnnouncements=(state)=>state.hindu_announcement.isLoadingAnnouncements
export const selectHasErrorInAnnouncements=(state)=>state.hindu_announcement.hasErrorInAnnouncements

export const selectIsLoadingMakeAnnouncement=(state)=>state.hindu_announcement.isLoadingMakeAnnouncement
export const selectHasErrorInMakeAnnouncement=(state)=>state.hindu_announcement.hasErrorInMakeAnnouncement

export default hinduAnnouncementSlice.reducer