import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    currentTab:'Home',
}

const bottomNavSlice = createSlice({
    name:"bottomNav",
    initialState,
    reducers:{
        switchTab:(state,action)=>{
            console.log('Switch Tab Clicked')
        }
    },
})

export const {switchTab}  = bottomNavSlice.actions

export const selectCurrentTab=(state)=>state.bottomNavSlice.currentTab
export default bottomNavSlice.reducer