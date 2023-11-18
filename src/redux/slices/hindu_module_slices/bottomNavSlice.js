import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    currentTab:'Home',
}

const hinduBottomNavSlice = createSlice({
    name:"hindu_bottom_nav",
    initialState,
    reducers:{
        setTab:(state,action)=>{
            state.currentTab=action.payload
        },
    },
})

export const {setTab}  = hinduBottomNavSlice.actions

export const selectCurrentTab=(state)=>state.hindu_bottom_nav.currentTab

export default hinduBottomNavSlice.reducer