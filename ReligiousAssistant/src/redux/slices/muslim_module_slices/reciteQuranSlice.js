import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import { apiPATCH } from '../../../services/apis/AuthService'
import { mark_parah_as_read, mark_surah_as_read, update_last_read_parah, update_last_read_surah } from '../../endpoints'

const initialState = {
    surahs:null,
    parahs:null,
    surahByNumber:null,
    isLoadingSurahs:true,
    isLoadingParahs:true,
    isLoadingSurahByNumber:true,
    isLoadingUpdateLastReadSurah:false,
    isLoadingUpdateLastReadParah:false,
    isLoadingMarkSurahAsRead:false,
    isLoadingMarkParahAsRead:false,
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

export const getSurahByNumber = createAsyncThunk(
    'getSurahByNumber',
    async (number)=>{
        const surahs=await fetch(`http://api.alquran.cloud/v1/surah/${number}/ar.alafasy`)
        const data=await surahs.json()
        return data
    }
)

export const updateLastReadSurah = createAsyncThunk(
    'updateLastReadSurah',
    async (body)=>{
        console.log(body)
        const result=await apiPATCH(update_last_read_surah, body)
        return result
    }
)

export const markSurahAsRead = createAsyncThunk(
    'markSurahAsRead',
    async (body)=>{
        const result=await apiPATCH(mark_surah_as_read, body)
        return result
    }
)

export const markParahAsRead = createAsyncThunk(
    'markParahAsRead',
    async (body)=>{
        const result=await apiPATCH(mark_parah_as_read, body)
        return result
    }
)

export const updateLastReadParah = createAsyncThunk(
    'updateLastReadParah',
    async (body)=>{
        const result=await apiPATCH(update_last_read_parah, body)
        return result
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

        [getSurahByNumber.fulfilled]:(state,action)=>{
            state.hasError=false
            state.isLoadingSurahByNumber=false
            state.surahByNumber = action.payload.data            
        },
        [getSurahByNumber.rejected]:(state,action)=>{
            state.isLoadingSurahByNumber=false
            state.hasError=true

        },
        [getSurahByNumber.pending]:(state,action)=>{
            state.isLoadingSurahByNumber=true
            state.hasError=false
        },

        [updateLastReadSurah.fulfilled]:(state,action)=>{
            state.hasError=false
            state.isLoadingUpdateLastReadSurah=false
        },
        [updateLastReadSurah.rejected]:(state,action)=>{
            state.isLoadingUpdateLastReadSurah=false
            state.hasError=true

        },
        [updateLastReadSurah.pending]:(state,action)=>{
            state.isLoadingUpdateLastReadSurah=true
            state.hasError=false
        },

        [markSurahAsRead.fulfilled]:(state,action)=>{
            state.hasError=false
            state.isLoadingMarkSurahAsRead=false
        },
        [markSurahAsRead.rejected]:(state,action)=>{
            state.isLoadingMarkSurahAsRead=false
            state.hasError=true

        },
        [markSurahAsRead.pending]:(state,action)=>{
            state.isLoadingMarkSurahAsRead=true
            state.hasError=false
        },

        [markParahAsRead.fulfilled]:(state,action)=>{
            state.hasError=false
            state.isLoadingMarkParahAsRead=false
        },
        [markParahAsRead.rejected]:(state,action)=>{
            state.isLoadingMarkParahAsRead=false
            state.hasError=true

        },
        [markParahAsRead.pending]:(state,action)=>{
            state.isLoadingMarkParahAsRead=true
            state.hasError=false
        },

        [updateLastReadParah.fulfilled]:(state,action)=>{
            state.hasError=false
            state.isLoadingUpdateLastReadParah=false
        },
        [updateLastReadParah.rejected]:(state,action)=>{
            state.isLoadingUpdateLastReadParah=false
            state.hasError=true

        },
        [updateLastReadParah.pending]:(state,action)=>{
            state.isLoadingUpdateLastReadParah=true
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
export const selectSurahByNumber=(state)=>state.quranrecitation.surahByNumber
export const selectIsLoadingSurahs=(state)=>state.quranrecitation.isLoadingSurahs
export const selectIsLoadingParahs=(state)=>state.quranrecitation.isLoadingParahs
export const selectIsLoadingSurahByNumber=(state)=>state.quranrecitation.isLoadingSurahByNumber
export const selectIsLoadingUpdateLastReadParah=(state)=>state.quranrecitation.isLoadingUpdateLastReadParah
export const selectIsLoadingUpdateLastReadSurah=(state)=>state.quranrecitation.isLoadingUpdateLastReadSurah
export const selectIsLoadingMarkSurahAsRead=(state)=>state.quranrecitation.isLoadingMarkSurahAsRead
export const selectIsLoadingMarkParahAsRead=(state)=>state.quranrecitation.isLoadingMarkParahAsRead

export const selectHasError=(state)=>state.quranrecitation.hasError

export default reciteQuranSlice.reducer