import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import {apiPOST, apiDELETE} from '../../../apis/apiService'
import { delete_hindu_notification, get_hindu_user_notifications } from '../../endpoints'


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
        const result =  await apiPOST(get_hindu_user_notifications, body)
        return result
    }
)


export const deleteNotification = createAsyncThunk(
    'deleteNotification',
    async(body)=>{
        const result =  await apiDELETE(delete_hindu_notification,body)
        return result 
    }
)

const hinduNotificationSlice = createSlice({
    name:"hinduNotificationSlice",
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


export const selectHinduNotifications =(state)=> state.hindu_notifications.notifications;
export const selectIsLoadingNotification=(state)=>state.hindu_notifications.isLoadingNotification
export const selectHasErrorInGettingNotifications=(state)=>state.hindu_notifications.hasErrorInGettingNotifications

export const selectIsLoadingDeleteNotification=(state)=>state.hindu_notifications.isLoadingDeleteNotification
export const selectHasErrorDeleteNotifications=(state)=>state.hindu_notifications.hasErrorDeleteNotification


export default hinduNotificationSlice.reducer