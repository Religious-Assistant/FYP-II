import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import {apiPATCH, apiPOST} from '../../../services/apis/AuthService'
import {update_tasbih} from '../../endpoints';


const initialState = {
    count:0,
    isLoading:true,
    hasError:false,
}

export const updateTasbih = createAsyncThunk(
    'updateTasbih',
    async(body)=>{
        const result =  await apiPOST(update_tasbih,body)
      if(result.success){
        return body.count
      }else {
        return result
      }
    }
)

const tasbihSlice = createSlice({
    name:"tasbih",
    initialState,
    reducers:{
        updateCount:(state,action)=>{
            state.count=action.payload
        }
    },
    extraReducers:{
        [updateTasbih.fulfilled]:(state,action)=>{
            state.hasError = false
            state.isLoading = false
            state.count=action.payload
            
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

export const {updateCount} = tasbihSlice.actions;

export const selectTasbih =(state)=> state.tasbih.count
export const selectIsLoading=(state)=>state.tasbih.isLoading
export const selectHasError=(state)=>state.tasbih.hasError


export default tasbihSlice.reducer