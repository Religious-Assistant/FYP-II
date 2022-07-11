import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {apiGET, apiPATCH, apiPOST} from '../../../apis/apiService';
import {
  check_parah_is_read,
  check_surah_is_read,
  get_last_read_parah,
  get_last_read_surah,
  get_parahs,
  get_recitation_stats,
  mark_parah_as_read,
  mark_parah_as_unread,
  mark_surah_as_read,
  mark_surah_as_unread,
  update_last_read_parah,
  update_last_read_surah,
} from '../../endpoints';

const initialState = {
  //Data
  surahs: null,
  parahs: null,
  surahByNumber: null,
  recitedSurahs: null,
  recitedParahs: null,
  parahByNumber: null,
  recitationStats: null,
  surahRecitationStatus: null, //Stored data of recited surah when called to checkSurahIsRead
  parahRecitationStatus: null, //Stored data of recited parah when called to checkParahIsRead
  lastReadSurah: null,
  lastReadParah: null,
  //Loaders
  isLoadingSurahs: true,
  isLoadingParahs: true,
  isLoadingSurahByNumber: true,
  isLoadingParahByNumber: true,
  isLoadingUpdateLastReadSurah: false,
  isLoadingUpdateLastReadParah: false,
  isLoadingMarkSurahAsRead: false,
  isLoadingMarkSurahAsUnRead: false,
  isLoadingMarkParahAsRead: false,
  isLoadingMarkParahAsUnRead: false,
  isLoadingGetRecitationStats: false,
  isLoadingSurahRecitationStatus: false,
  isLoadingParahRecitationStatus: false,
  isLoadingLastReadSurah: false,
  isLoadingLastReadParah: false,

  //Erros
  hasError: false,
};

export const getSurahs = createAsyncThunk('getSurahs', async () => {
  const surahs = await fetch('http://api.alquran.cloud/v1/surah');
  const data = await surahs.json();
  return data;
});

export const getSurahByNumber = createAsyncThunk(
  'getSurahByNumber',
  async number => {
    const surahs = await fetch(
      `http://api.alquran.cloud/v1/surah/${number}/ar.alafasy`,
    );
    const data = await surahs.json();
    return data;
  },
);

export const getParahs = createAsyncThunk('getParahs', async () => {
  const parahs = await apiGET(get_parahs);
  return parahs;
});

export const getParahByNumber = createAsyncThunk(
  'getParahByNumber',
  async number => {

    console.log('NUMBER',number)
    const parah = await fetch(
      `https://api.alquran.cloud/v1/juz/${number}/quran-uthmani`,
    );
    const data = await parah.json();
    return data;
  },
);

export const updateLastReadSurah = createAsyncThunk(
  'updateLastReadSurah',
  async body => {
    const result = await apiPATCH(update_last_read_surah, body);
    return result;
  },
);

export const markSurahAsRead = createAsyncThunk(
  'markSurahAsRead',
  async body => {
    const result = await apiPATCH(mark_surah_as_read, body);
    return result;
  },
);

export const markSurahAsUnRead = createAsyncThunk(
  'markSurahAsUnRead',
  async body => {
    const result = await apiPATCH(mark_surah_as_unread, body);
    return result;
  },
);

export const markParahAsRead = createAsyncThunk(
  'markParahAsRead',
  async body => {
    const result = await apiPATCH(mark_parah_as_read, body);
    return result;
  },
);

export const markParahAsUnRead = createAsyncThunk(
  'markParahAsUnRead',
  async body => {
    const result = await apiPATCH(mark_parah_as_unread, body);
    return result;
  },
);

export const updateLastReadParah = createAsyncThunk(
  'updateLastReadParah',
  async body => {
    const result = await apiPATCH(update_last_read_parah, body);
    return result;
  },
);

export const getRecitationStats = createAsyncThunk(
  'getRecitationStats',
  async (username) => {
    console.log(username)
    const result = await apiPOST(get_recitation_stats, username);
    return result;
  },
);

export const checkSurahIsRead = createAsyncThunk(
  'checkSurahIsRead',
  async body => {
    const result = await apiPOST(check_surah_is_read, body);
    return result;
  },
);

//To be updated as SurahIsRead
export const checkParahIsRead = createAsyncThunk(
  'checkParahIsRead',
  async (body) => {
    const result = await apiPOST(check_parah_is_read, body);
    return result;
  },
);

export const getLastReadSurah = createAsyncThunk(
  'getLastReadSurah',
  async body => {
    const result = await apiPOST(get_last_read_surah, body);
    return result;
  },
);

export const getLastReadParah = createAsyncThunk(
  'getLastReadParah',
  async body => {
    const result = await apiPOST(get_last_read_parah, body);
    return result;
  },
);

const reciteQuranSlice = createSlice({
  name: 'quranrecitation',
  initialState,
  reducers: {},
  extraReducers: {
    [getRecitationStats.fulfilled]: (state, action) => {
      state.hasError = false;
      state.isLoadingGetRecitationStats = false;
      state.recitationStats = action.payload.data;
    },
    [getRecitationStats.rejected]: (state, action) => {
      state.isLoadingGetRecitationStats = false;
      state.hasError = true;
    },
    [getRecitationStats.pending]: (state, action) => {
      state.isLoadingGetRecitationStats = true;
      state.hasError = false;
    },

    [getParahs.fulfilled]: (state, action) => {
      state.hasError = false;
      state.isLoadingParahs = false;
      state.parahs = action.payload.data;
    },
    [getParahs.rejected]: (state, action) => {
      state.isLoadingParahs = false;
      state.hasError = true;
    },
    [getParahs.pending]: (state, action) => {
      state.isLoadingParahs = true;
      state.hasError = false;
    },

    [getLastReadSurah.fulfilled]: (state, action) => {
      state.hasError = false;
      state.isLoadingLastReadSurah = false;
      state.lastReadSurah = action.payload.data;
    },
    [getLastReadSurah.rejected]: (state, action) => {
      state.isLoadingLastReadSurah = false;
      state.hasError = true;
    },
    [getLastReadSurah.pending]: (state, action) => {
      state.isLoadingLastReadSurah = true;
      state.hasError = false;
    },

    [getLastReadParah.fulfilled]: (state, action) => {
      state.hasError = false;
      state.isLoadingLastReadParah = false;
      state.lastReadParah = action.payload.data;
    },
    [getLastReadParah.rejected]: (state, action) => {
      state.isLoadingLastReadParah = false;
      state.hasError = true;
    },
    [getLastReadParah.pending]: (state, action) => {
      state.isLoadingLastReadParah = true;
      state.hasError = false;
    },

    [checkSurahIsRead.fulfilled]: (state, action) => {
      state.hasError = false;
      state.isLoadingSurahRecitationStatus = false;
      state.surahRecitationStatus = action.payload.data;
    },
    [checkSurahIsRead.rejected]: (state, action) => {
      state.isLoadingSurahRecitationStatus = false;
      state.hasError = true;
    },
    [checkSurahIsRead.pending]: (state, action) => {
      state.isLoadingSurahRecitationStatus = true;
      state.hasError = false;
    },

    [checkParahIsRead.fulfilled]: (state, action) => {
      state.hasError = false;
      state.isLoadingParahRecitationStatus = false;
      state.parahRecitationStatus = action.payload.data;
    },
    [checkParahIsRead.rejected]: (state, action) => {
      state.isLoadingParahRecitationStatus = false;
      state.hasError = true;
    },
    [checkParahIsRead.pending]: (state, action) => {
      state.isLoadingParahRecitationStatus = true;
      state.hasError = false;
    },

    [getSurahs.fulfilled]: (state, action) => {
      state.hasError = false;
      state.isLoadingSurahs = false;
      state.surahs = action.payload.data;
    },
    [getSurahs.rejected]: (state, action) => {
      state.isLoadingSurahs = false;
      state.hasError = true;
    },
    [getSurahs.pending]: (state, action) => {
      state.isLoadingSurahs = true;
      state.hasError = false;
    },

    [getSurahByNumber.fulfilled]: (state, action) => {
      state.hasError = false;
      state.isLoadingSurahByNumber = false;
      state.surahByNumber = action.payload.data;
    },
    [getSurahByNumber.rejected]: (state, action) => {
      state.isLoadingSurahByNumber = false;
      state.hasError = true;
    },
    [getSurahByNumber.pending]: (state, action) => {
      state.isLoadingSurahByNumber = true;
      state.hasError = false;
    },

    [getParahByNumber.fulfilled]: (state, action) => {
      state.hasError = false;
      state.isLoadingParahByNumber = false;
      state.parahByNumber = action.payload.data;
    },
    [getParahByNumber.rejected]: (state, action) => {
      state.isLoadingParahByNumber = false;
      state.hasError = true;
    },
    [getParahByNumber.pending]: (state, action) => {
      state.isLoadingParahByNumber = true;
      state.hasError = false;
    },

    [updateLastReadSurah.fulfilled]: (state, action) => {
      state.hasError = false;
      state.isLoadingUpdateLastReadSurah = false;
      state.lastReadSurah = action.payload.data;
    },
    [updateLastReadSurah.rejected]: (state, action) => {
      state.isLoadingUpdateLastReadSurah = false;
      state.hasError = true;
    },
    [updateLastReadSurah.pending]: (state, action) => {
      state.isLoadingUpdateLastReadSurah = true;
      state.hasError = false;
    },

    [updateLastReadParah.fulfilled]: (state, action) => {
      state.hasError = false;
      state.isLoadingUpdateLastReadParah = false;
      state.lastReadParah = action.payload.data;
    },
    [updateLastReadParah.rejected]: (state, action) => {
      state.isLoadingUpdateLastReadParah = false;
      state.hasError = true;
    },
    [updateLastReadParah.pending]: (state, action) => {
      state.isLoadingUpdateLastReadParah = true;
      state.hasError = false;
    },

    [markSurahAsRead.fulfilled]: (state, action) => {
      state.hasError = false;
      state.isLoadingMarkSurahAsRead = false;
      state.recitedSurahs = action.payload.data;
    },
    [markSurahAsRead.rejected]: (state, action) => {
      state.isLoadingMarkSurahAsRead = false;
      state.hasError = true;
    },
    [markSurahAsRead.pending]: (state, action) => {
      state.isLoadingMarkSurahAsRead = true;
      state.hasError = false;
    },

    [markSurahAsUnRead.fulfilled]: (state, action) => {
      state.hasError = false;
      state.isLoadingMarkSurahAsUnRead = false;
      state.recitedSurahs = action.payload.data;
    },
    [markSurahAsUnRead.rejected]: (state, action) => {
      state.isLoadingMarkSurahAsUnRead = false;
      state.hasError = true;
    },
    [markSurahAsUnRead.pending]: (state, action) => {
      state.isLoadingMarkSurahAsUnRead = true;
      state.hasError = false;
    },

    [markParahAsRead.fulfilled]: (state, action) => {
      state.hasError = false;
      state.isLoadingMarkParahAsRead = false;
      state.recitedParahs = action.payload.data;
    },
    [markParahAsRead.rejected]: (state, action) => {
      state.isLoadingMarkParahAsRead = false;
      state.hasError = true;
    },
    [markParahAsRead.pending]: (state, action) => {
      state.isLoadingMarkParahAsRead = true;
      state.hasError = false;
    },

    [markParahAsUnRead.fulfilled]: (state, action) => {
      state.hasError = false;
      state.isLoadingMarkParahAsUnRead = false;
    },
    [markParahAsUnRead.rejected]: (state, action) => {
      state.isLoadingMarkParahAsUnRead = false;
      state.hasError = true;
    },
    [markParahAsUnRead.pending]: (state, action) => {
      state.isLoadingMarkParahAsUnRead = true;
      state.hasError = false;
    },

    [updateLastReadParah.fulfilled]: (state, action) => {
      state.hasError = false;
      state.isLoadingUpdateLastReadParah = false;
    },
    [updateLastReadParah.rejected]: (state, action) => {
      state.isLoadingUpdateLastReadParah = false;
      state.hasError = true;
    },
    [updateLastReadParah.pending]: (state, action) => {
      state.isLoadingUpdateLastReadParah = true;
      state.hasError = false;
    },
    [getParahs.fulfilled]: (state, action) => {
      state.hasError = false;
      state.isLoadingParahs = false;
      state.parahs = action.payload.data;
    },
    [getParahs.rejected]: (state, action) => {
      state.isLoadingParahs = false;
      state.hasError = true;
    },
    [getParahs.pending]: (state, action) => {
      state.isLoadingParahs = true;
      state.hasError = false;
    },
  },
});

export const selectSurahs = state => state.quranrecitation.surahs;
export const selectParahs = state => state.quranrecitation.parahs;
export const selectRecitedSurahs = state => state.quranrecitation.recitedSurahs;
export const selectRecitedParahs = state => state.quranrecitation.recitedParahs;
export const selectSurahByNumber = state => state.quranrecitation.surahByNumber;
export const selectParahByNumber = state => state.quranrecitation.parahByNumber;
export const selectLastReadSurah = state => state.quranrecitation.lastReadSurah;
export const selectLastReadParah = state => state.quranrecitation.lastReadParah;

export const selectSurahRecitationStatus = state =>
  state.quranrecitation.surahRecitationStatus;
export const selectParahRecitationStatus = state =>
  state.quranrecitation.parahRecitationStatus;

export const selectIsLoadingSurahs = state =>
  state.quranrecitation.isLoadingSurahs;
export const selectIsLoadingParahs = state =>
  state.quranrecitation.isLoadingParahs;
export const selectIsLoadingSurahByNumber = state =>
  state.quranrecitation.isLoadingSurahByNumber;
export const selectIsLoadingParahByNumber = state =>
  state.quranrecitation.isLoadingParahByNumber;

export const selectIsLoadingUpdateLastReadParah = state =>
  state.quranrecitation.isLoadingUpdateLastReadParah;
export const selectIsLoadingUpdateLastReadSurah = state =>
  state.quranrecitation.isLoadingUpdateLastReadSurah;

export const selectIsLoadingMarkSurahAsRead = state =>
  state.quranrecitation.isLoadingMarkSurahAsRead;
export const selectIsLoadingMarkSurahAsUnRead = state =>
  state.quranrecitation.isLoadingMarkSurahAsUnRead;
export const selectIsLoadingMarkParahAsRead = state =>
  state.quranrecitation.isLoadingMarkParahAsRead;
export const selectIsLoadingMarkParahAsUnRead = state =>
  state.quranrecitation.isLoadingMarkParahAsUnRead;
export const selectIsLoadingGetRecitationStats = state =>
  state.quranrecitation.isLoadingGetRecitationStats;
export const selectIsLoadingSurahRecitationStatus = state =>
  state.quranrecitation.isLoadingSurahRecitationStatus;
export const selectIsLoadingParahRecitationStatus = state =>
  state.quranrecitation.isLoadingParahRecitationStatus;
export const selectIsLoadingLastReadParah = state =>
  state.quranrecitation.isLoadingLastReadParah;
export const selectIsLoadingLastReadSurah = state =>
  state.quranrecitation.isLoadingLastReadSurah;

export const selectHasError = state => state.quranrecitation.hasError;
export const selectRecitationStats = state => state.quranrecitation.recitationStats;

export default reciteQuranSlice.reducer;
