import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    currentTab:'Home',
}

const bottomNavSlice = createSlice({
    name:"bottomNav",
    initialState,
    reducers:{
        setTab:(state,action)=>{
            state.currentTab=action.payload
        },
    },
})

export const {setTab, getTab}  = bottomNavSlice.actions

export const selectCurrentTab=(state)=>state.bottomNavSlice.currentTab
export default bottomNavSlice.reducer