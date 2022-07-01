import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import {apiPATCH} from '../../../services/apis/AuthService'
import {update_tasbih} from '../../endpoints';


const initialState = {
    tasbihCounter:null,
    isLoading:true,
    hasError:false,
}

export const updateTasbih = createAsyncThunk(
    'updateTasbih',
    async(body)=>{
        const result =  await apiPATCH(update_tasbih,body)
        return result
    }
)

const tasbihSlice = createSlice({
    name:"tasbih",
    initialState,
    reducers:{},
    extraReducers:{
        [updateTasbih.fulfilled]:(state,action)=>{
            state.hasError = false
            state.isLoading = false
        },
        [updateTasbih.pending]:(state,action)=>{
            state.isLoading=true
            state.hasError=false
        },
        [updateTasbih.rejected]:(state,action)=>{
            state.hasError = true
            state.isLoading = false
        },

    }
})


export const selectTasbih =(state)=> state.tasbih.tasbihCounter
export const selectIsLoading=(state)=>state.tasbih.isLoading
export const selectHasError=(state)=>state.tasbih.hasError


export default tasbihSlice.reducer