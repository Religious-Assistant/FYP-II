import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import {apiPATCH, apiPOST} from '../../../apis/apiService'
import { get_namaz_alarms_for_user, update_namaz_alarm_times} from '../../endpoints'


const initialState = {

    namazAlarmTimes:null,
    isLoadingNamazAlarmTimes:false,
    hasErrorGettingNamazAlarmTimes:false,

    hasUpdatedNamazAlarmTimes:null,
    isLoadingUpdateNamaAlarmTimes:false,
    hasErrorUpdateNamazAlarmTimes:false,

}

export const updateNamazAlarmTimes = createAsyncThunk(
    'updateNamazAlarmTimes',
    async (body)=>{
       const result =  await apiPATCH(update_namaz_alarm_times,body)
       return result  
    }
)

export const getNamazAlarmsForUser = createAsyncThunk(
    'getNamazAlarmsForUser',
    async (body)=>{
       const result =  await apiPOST(get_namaz_alarms_for_user,body)   //body with required info
       return result  
    }
)

const namazAlarmsSlice = createSlice({
    name:"namaz_alarms",
    initialState,
    reducers:{},
    extraReducers:{
        [updateNamazAlarmTimes.fulfilled]:(state,action)=>{
            state.isLoadingUpdateNamaAlarmTimes = false
            state.hasErrorUpdateNamazAlarmTimes = false
            state.hasUpdatedNamazAlarmTimes=true
        },
        [updateNamazAlarmTimes.pending]:(state,action)=>{
            state.isLoadingUpdateNamaAlarmTimes=true
            state.hasErrorUpdateNamazAlarmTimes=false
            state.hasUpdatedNamazAlarmTimes=false
        },
        [updateNamazAlarmTimes.rejected]:(state,action)=>{
            state.isLoadingUpdateNamaAlarmTimes = false
            state.hasErrorUpdateNamazAlarmTimes = true
            state.hasUpdatedNamazAlarmTimes=false
        },

        [getNamazAlarmsForUser.fulfilled]:(state,action)=>{
            state.isLoadingNamazAlarmTimes = false
            state.hasErrorGettingNamazAlarmTimes = false
            state.namazAlarmTimes=action.payload.data
        },
        [getNamazAlarmsForUser.pending]:(state,action)=>{
            state.isLoadingNamazAlarmTimes=true
            state.hasErrorGettingNamazAlarmTimes=false
        },
        [getNamazAlarmsForUser.rejected]:(state,action)=>{
            state.isLoadingNamazAlarmTimes = false
            state.hasErrorGettingNamazAlarmTimes = true

        },
    }
})

export const selectNamazAlarmTimesForUser=(state)=>state.namaz_alarms.namazAlarmTimes
export const selectUpdatedNamazAlarmTimes=(state)=>state.namaz_alarms.hasUpdatedNamazAlarmTimes


export const selectIsLoadingNamazAlarmTimesForUser=(state)=>state.namaz_alarms.isLoadingNamazAlarmTimes
export const selectHasErrorGettingNamazAlarmTimesForUser=(state)=>state.namaz_alarms.hasErrorGettingNamazAlarmTimes

export const selectIsLoadingUpdateNamazAlarmTimes=(state)=>state.namaz_alarms.isLoadingUpdateNamaAlarmTimes
export const selectHasErrorUpdatingNamazAlarmTimes=(state)=>state.namaz_alarms.hasErrorUpdateNamazAlarmTimes

export default namazAlarmsSlice.reducer