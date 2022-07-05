import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'

const initialState = {
    surahs:null,
    parahs:null,
    isLoadingSurahs:true,
    isLoadingParahs:true,
    hasError:false,
}

export const getSurahs = createAsyncThunk(
    'getSurahs',
    async ()=>{
        const surahs=await fetch('http://api.alquran.cloud/v1/surah')
        const data=await surahs.json()
        return data
    }
)

export const getParahs = createAsyncThunk(
    'getParahs',
    async ()=>{
        const parahs=await fetch('http://api.alquran.cloud/v1/surah')
        const data=await parahs.json()
        return data
    }
)

const reciteQuranSlice = createSlice({
    name:"quranrecitation",
    initialState,
    reducers:{},
    extraReducers:{
        [getSurahs.fulfilled]:(state,action)=>{
            state.hasError=false
            state.isLoadingSurahs=false
            state.surahs = action.payload.data            
        },
        [getSurahs.rejected]:(state,action)=>{
            state.isLoadingSurahs=false
            state.hasError=true

        },
        [getSurahs.pending]:(state,action)=>{
            state.isLoadingSurahs=true
            state.hasError=false
        },
        [getParahs.fulfilled]:(state,action)=>{
            state.hasError=false
            state.isLoadingParahs=false
            state.parahs = action.payload.data
            
        },
        [getParahs.rejected]:(state,action)=>{
            state.isLoadingParahs=false
            state.hasError=true

        },
        [getParahs.pending]:(state,action)=>{
            state.isLoadingParahs=true
            state.hasError=false
        },
    }
})

export const selectSurahs=(state)=>state.quranrecitation.surahs
export const selectParahs=(state)=>state.quranrecitation.parahs
export const selectIsLoadingSurahs=(state)=>state.quranrecitation.isLoadingSurahs
export const selectIsLoadingParahs=(state)=>state.quranrecitation.isLoadingParahs
export const selectHasError=(state)=>state.quranrecitation.hasError

export default reciteQuranSlice.reducer