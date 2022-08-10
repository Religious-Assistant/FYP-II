import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import {apiPOST, apiDELETE} from '../../../apis/apiService'
import { delete_muslim_notification, get_user_notifications} from '../../endpoints';


const initialState = {
    notifications:null,
    isLoadingNotification:false,
    hasErrorInGettingNotifications:false,

    isLoadingDeleteNotification:false,
    hasErrorDeleteNotification:false

}

export const getUserNotifications = createAsyncThunk(
    'getUserNotifications',
    async(body)=>{
        const result =  await apiPOST(get_user_notifications, body)
        return result
    }
)


export const deleteNotification = createAsyncThunk(
    'deleteNotification',
    async(body)=>{
        const result =  await apiDELETE(delete_muslim_notification,body)
        return result 
    }
)

const muslimNotificationSlice = createSlice({
    name:"muslimNotificationSlice",
    initialState,
    reducers:{},
    extraReducers:{
        [getUserNotifications.fulfilled]:(state,action)=>{
            state.hasErrorInGettingNotifications=false
            state.isLoadingNotification = false,
            state.notifications=action.payload.data
        },
        [getUserNotifications.pending]:(state,action)=>{
            state.isLoadingNotification=true
            state.hasErrorInGettingNotifications=false
        },
        [getUserNotifications.rejected]:(state,action)=>{
            state.isLoadingNotification=true
            state.hasErrorInGettingNotifications=false
        },
        
        [deleteNotification.fulfilled]:(state,action)=>{
            state.hasErrorDeleteNotification = false
            state.isLoadingDeleteNotification = false
            state.notifications=action.payload.data
        },
        [deleteNotification.pending]:(state,action)=>{
            state.isLoadingDeleteNotification=true
            state.hasErrorDeleteNotification=false
        },
        [deleteNotification.rejected]:(state,action)=>{
            state.hasErrorDeleteNotification = true
            state.isLoadingDeleteNotification = false
        },
    }
})


export const selectMuslimNotifications =(state)=> state.muslim_notifications.notifications;
export const selectIsLoadingNotification=(state)=>state.muslim_notifications.isLoadingNotification
export const selectHasErrorInGettingNotifications=(state)=>state.muslim_notifications.hasErrorInGettingNotifications

export const selectIsLoadingDeleteNotification=(state)=>state.muslim_notifications.isLoadingDeleteNotification
export const selectHasErrorDeleteNotifications=(state)=>state.muslim_notifications.hasErrorDeleteNotification


export default muslimNotificationSlice.reducer