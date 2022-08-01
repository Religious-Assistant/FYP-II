import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import {apiPOST, apiGET, apiDELETE} from '../../../apis/apiService'
import { delete_announcement, get_announcements, make_announcement} from '../../endpoints';


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
        const result =  await apiPOST(get_announcements, body)
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
            state.hasErrorInAnnouncements=false
            state.isLoadingAnnouncements = false
            console.log(action.payload.data)
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
export const selectIsLoadingAnnouncements=(state)=>state.announcement.isLoadingAnnouncements
export const selectHasErrorInAnnouncements=(state)=>state.announcement.hasErrorInAnnouncements

export const selectIsLoadingMakeAnnouncement=(state)=>state.announcement.isLoadingMakeAnnouncement
export const selectHasErrorInMakeAnnouncement=(state)=>state.announcement.hasErrorInMakeAnnouncement

export default announcementSlice.reducer