import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {apiPATCH, apiPOST} from '../../../apis/apiService';

import {
  mark_summary_as_read,
  mark_summary_as_unread,
  update_last_read_summary,
  get_last_read_summary,
  check_summary_is_read,
  get_last_read_chapter,
  check_chapter_is_read,
  update_last_read_chapter,
  mark_chapter_as_unread,
  mark_chapter_as_read,
  get_gita_recitation_stats,
} from '../../endpoints';

const initialState = {
  //Data
  chapters: null,
  chapterById: null,
  recitedChapters: null,
  recitedSummaries: null,
  recitationStats: null,
  chapterRecitationStatus: null, //Stored data of recited surah when called to checkChapterIsRead
  summaryRecitationStatus: null, //Stored data of recited parah when called to checkSummaryIsRead
  lastReadChapter: null,
  lastReadSummary: null,

  //Loaders
  isLoadingChapters: true,
  isLoadingChapterByNumber: true,
  isLoadingSummaryByNumber: true,
  isLoadingUpdateLastReadChapter: false,
  isLoadingUpdateLastReadSummary: false,
  isLoadingMarkChapterAsRead: false,
  isLoadingMarkChapterAsUnRead: false,
  isLoadingMarkSummaryAsRead: false,
  isLoadingMarkSummaryAsUnRead: false,
  isLoadingGetRecitationStats: false,
  isLoadingChapterRecitationStatus: false,
  isLoadingSummaryRecitationStatus: false,
  isLoadingLastReadChapter: false,
  isLoadingLastReadSummary: false,

  //Erros
  hasError: false,
};

export const getChapters = createAsyncThunk('getChapters', async () => {
  const chapters = await fetch('https://bhagavadgitaapi.in/chapters');
  const data = await chapters.json();
  return data;
});

export const getChapterByNumber = createAsyncThunk(
  'getChapterByNumber',
  async number => {
    const chapter = await fetch(
      `https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${number}/verses/`,
      {
        headers: {
          'X-RapidAPI-Key':
            '6b01d2ba32mshfccc1a5f7bcfd3dp1e6767jsn702683ff7204',
        },
      },
    );
    const data = await chapter.json();
    return data;
  },
);

export const updateLastReadChapter = createAsyncThunk(
  'updateLastReadChapter',
  async body => {
    const result = await apiPATCH(update_last_read_chapter, body);
    return result;
  },
);

export const markChapterAsRead = createAsyncThunk(
  'markChapterAsRead',
  async body => {
    const result = await apiPATCH(mark_chapter_as_read, body);
    return result;
  },
);

export const markChapterAsUnRead = createAsyncThunk(
  'markChapterAsUnRead',
  async body => {
    const result = await apiPATCH(mark_chapter_as_unread, body);
    return result;
  },
);

export const markSummaryAsRead = createAsyncThunk(
  'markSummaryAsRead',
  async body => {
    const result = await apiPATCH(mark_summary_as_read, body);
    return result;
  },
);

export const markSummaryAsUnRead = createAsyncThunk(
  'markSummaryAsUnRead',
  async body => {
    const result = await apiPATCH(mark_summary_as_unread, body);
    return result;
  },
);

export const updateLastReadSummary = createAsyncThunk(
  'updateLastReadSummary',
  async body => {
    const result = await apiPATCH(update_last_read_summary, body);
    return result;
  },
);

export const getRecitationStats = createAsyncThunk(
  'getRecitationStats',
  async username => {
    const result = await apiPOST(get_gita_recitation_stats, username);
    return result;
  },
);

export const checkChapterIsRead = createAsyncThunk(
  'checkChapterIsRead',
  async body => {
    const result = await apiPOST(check_chapter_is_read, body);
    return result;
  },
);

//To be updated as ChapterIsRead
export const checkSummaryIsRead = createAsyncThunk(
  'checkSummaryIsRead',
  async body => {
    const result = await apiPOST(check_summary_is_read, body);
    return result;
  },
);

export const getLastReadChapter = createAsyncThunk(
  'getLastReadChapter',
  async body => {
    const result = await apiPOST(get_last_read_chapter, body);
    return result;
  },
);

export const getLastReadSummary = createAsyncThunk(
  'getLastReadSummary',
  async body => {
    const result = await apiPOST(get_last_read_summary, body);
    return result;
  },
);

const reciteGitaSlice = createSlice({
  name: 'gitarecitation',
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

    [getLastReadChapter.fulfilled]: (state, action) => {
      state.hasError = false;
      state.isLoadingLastReadChapter = false;
      state.lastReadChapter = action.payload.data;
    },
    [getLastReadChapter.rejected]: (state, action) => {
      state.isLoadingLastReadChapter = false;
      state.hasError = true;
    },
    [getLastReadChapter.pending]: (state, action) => {
      state.isLoadingLastReadChapter = true;
      state.hasError = false;
    },

    [getLastReadSummary.fulfilled]: (state, action) => {
      state.hasError = false;
      state.isLoadingLastReadSummary = false;
      state.lastReadSummary = action.payload.data;
    },
    [getLastReadSummary.rejected]: (state, action) => {
      state.isLoadingLastReadSummary = false;
      state.hasError = true;
    },
    [getLastReadSummary.pending]: (state, action) => {
      state.isLoadingLastReadSummary = true;
      state.hasError = false;
    },

    [checkChapterIsRead.fulfilled]: (state, action) => {
      state.hasError = false;
      state.isLoadingChapterRecitationStatus = false;
      state.chapterRecitationStatus = action.payload.data;
    },
    [checkChapterIsRead.rejected]: (state, action) => {
      state.isLoadingChapterRecitationStatus = false;
      state.hasError = true;
    },
    [checkChapterIsRead.pending]: (state, action) => {
      state.isLoadingChapterRecitationStatus = true;
      state.hasError = false;
    },

    [checkSummaryIsRead.fulfilled]: (state, action) => {
      state.hasError = false;
      state.isLoadingSummaryRecitationStatus = false;
      state.summaryRecitationStatus = action.payload.data;
    },
    [checkSummaryIsRead.rejected]: (state, action) => {
      state.isLoadingSummaryRecitationStatus = false;
      state.hasError = true;
    },
    [checkSummaryIsRead.pending]: (state, action) => {
      state.isLoadingSummaryRecitationStatus = true;
      state.hasError = false;
    },

    [getChapters.fulfilled]: (state, action) => {
      state.hasError = false;
      state.isLoadingChapters = false;
      state.chapters = action.payload;
    },
    [getChapters.rejected]: (state, action) => {
      state.isLoadingChapters = false;
      state.hasError = true;
    },
    [getChapters.pending]: (state, action) => {
      state.isLoadingChapters = true;
      state.hasError = false;
    },

    [getChapterByNumber.fulfilled]: (state, action) => {
      state.hasError = false;
      state.isLoadingChapterByNumber = false;
      state.chapterById = action.payload;
    },
    [getChapterByNumber.rejected]: (state, action) => {
      state.isLoadingChapterByNumber = false;
      state.hasError = true;
    },
    [getChapterByNumber.pending]: (state, action) => {
      state.isLoadingChapterByNumber = true;
      state.hasError = false;
    },

    [updateLastReadChapter.fulfilled]: (state, action) => {
      state.hasError = false;
      state.isLoadingUpdateLastReadChapter = false;
      state.lastReadChapter = action.payload.data;
    },
    [updateLastReadChapter.rejected]: (state, action) => {
      state.isLoadingUpdateLastReadChapter = false;
      state.hasError = true;
    },
    [updateLastReadChapter.pending]: (state, action) => {
      state.isLoadingUpdateLastReadChapter = true;
      state.hasError = false;
    },

    [updateLastReadSummary.fulfilled]: (state, action) => {
      state.hasError = false;
      state.isLoadingUpdateLastReadSummary = false;
      state.lastReadSummary = action.payload.data;
    },
    [updateLastReadSummary.rejected]: (state, action) => {
      state.isLoadingUpdateLastReadSummary = false;
      state.hasError = true;
    },
    [updateLastReadSummary.pending]: (state, action) => {
      state.isLoadingUpdateLastReadSummary = true;
      state.hasError = false;
    },

    [markChapterAsRead.fulfilled]: (state, action) => {
      state.hasError = false;
      state.isLoadingMarkChapterAsRead = false;
      state.recitedChapters = action.payload.data;
    },
    [markChapterAsRead.rejected]: (state, action) => {
      state.isLoadingMarkChapterAsRead = false;
      state.hasError = true;
    },
    [markChapterAsRead.pending]: (state, action) => {
      state.isLoadingMarkChapterAsRead = true;
      state.hasError = false;
    },

    [markChapterAsUnRead.fulfilled]: (state, action) => {
      state.hasError = false;
      state.isLoadingMarkChapterAsUnRead = false;
      state.recitedChapters = action.payload.data;
    },
    [markChapterAsUnRead.rejected]: (state, action) => {
      state.isLoadingMarkChapterAsUnRead = false;
      state.hasError = true;
    },
    [markChapterAsUnRead.pending]: (state, action) => {
      state.isLoadingMarkChapterAsUnRead = true;
      state.hasError = false;
    },

    [markSummaryAsRead.fulfilled]: (state, action) => {
      state.hasError = false;
      state.isLoadingMarkSummaryAsRead = false;
      state.recitedSummaries = action.payload.data;
    },
    [markSummaryAsRead.rejected]: (state, action) => {
      state.isLoadingMarkSummaryAsRead = false;
      state.hasError = true;
    },
    [markSummaryAsRead.pending]: (state, action) => {
      state.isLoadingMarkSummaryAsRead = true;
      state.hasError = false;
    },

    [markSummaryAsUnRead.fulfilled]: (state, action) => {
      state.hasError = false;
      state.isLoadingMarkSummaryAsUnRead = false;
    },
    [markSummaryAsUnRead.rejected]: (state, action) => {
      state.isLoadingMarkSummaryAsUnRead = false;
      state.hasError = true;
    },
    [markSummaryAsUnRead.pending]: (state, action) => {
      state.isLoadingMarkSummaryAsUnRead = true;
      state.hasError = false;
    },

    [updateLastReadSummary.fulfilled]: (state, action) => {
      state.hasError = false;
      state.isLoadingUpdateLastReadSummary = false;
    },
    [updateLastReadSummary.rejected]: (state, action) => {
      state.isLoadingUpdateLastReadSummary = false;
      state.hasError = true;
    },
    [updateLastReadSummary.pending]: (state, action) => {
      state.isLoadingUpdateLastReadSummary = true;
      state.hasError = false;
    },
  },
});

export const selectChapters = state => state.gitarecitation.chapters;
export const selectRecitedChapters = state =>
  state.gitarecitation.recitedChapters;
export const selectRecitedSummaries = state =>
  state.gitarecitation.recitedSummaries;
export const selectChapterByNumber = state => state.gitarecitation.chapterById;

export const selectLastReadChapter = state =>
  state.gitarecitation.lastReadChapter;
export const selectLastReadSummary = state =>
  state.gitarecitation.lastReadSummary;

export const selectChapterRecitationStatus = state =>
  state.gitarecitation.chapterRecitationStatus;
export const selectSummaryRecitationStatus = state =>
  state.gitarecitation.summaryRecitationStatus;

export const selectIsLoadingChapters = state =>
  state.gitarecitation.isLoadingChapters;
export const selectIsLoadingChapterByNumber = state =>
  state.gitarecitation.isLoadingChapterByNumber;
export const selectIsLoadingSummaryByNumber = state =>
  state.gitarecitation.Summaryumber;

export const selectIsLoadingUpdateLastReadSummary = state =>
  state.gitarecitation.isLoadingUpdateLastReadSummary;
export const selectIsLoadingUpdateLastReadChapter = state =>
  state.gitarecitation.isLoadingUpdateLastReadChapter;

export const selectIsLoadingMarkChapterAsRead = state =>
  state.gitarecitation.isLoadingMarkChapterAsRead;
export const selectIsLoadingMarkChapterAsUnRead = state =>
  state.gitarecitation.isLoadingMarkChapterAsUnRead;
export const selectIsLoadingMarkSummaryAsRead = state =>
  state.gitarecitation.isLoadingMarkSummaryAsRead;
export const selectIsLoadingMarkSummaryAsUnRead = state =>
  state.gitarecitation.isLoadingMarkSummaryAsUnRead;
export const selectIsLoadingGetRecitationStats = state =>
  state.gitarecitation.isLoadingGetRecitationStats;
export const selectIsLoadingChapterRecitationStatus = state =>
  state.gitarecitation.isLoadingChapterRecitationStatus;
export const selectIsLoadingSummaryRecitationStatus = state =>
  state.gitarecitation.isLoadingSummaryRecitationStatus;
export const selectIsLoadingLastReadSummary = state =>
  state.gitarecitation.isLoadingLastReadSummary;
export const selectIsLoadingLastReadChapter = state =>
  state.gitarecitation.isLoadingLastReadChapter;

export const selectHasError = state => state.gitarecitation.hasError;
export const selectRecitationStats = state =>
  state.gitarecitation.recitationStats;

export default reciteGitaSlice.reducer;
