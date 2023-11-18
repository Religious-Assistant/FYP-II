import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {apiPOST, apiGET, apiPATCH} from '../../../apis/apiService';
import {set_veg_days, get_veg_days} from '../../endpoints';

const initialState = {
  vegData: null,

  isLoadingVegData: false,
  hasErrorGettingVegData: false,

  isSettingVegData: false,
  hasErrorSettingVegData: false,
};

export const getVegData = createAsyncThunk('getVegData', async body => {
  const result = await apiPOST(get_veg_days, body);
  return result;
});

export const setVegData = createAsyncThunk('setVegData', async body => {
  const result = await apiPATCH(set_veg_days, body);
  return result;
});

const vegNonVegSlice = createSlice({
  name: 'vegnonveg',
  initialState,
  reducers: {},
  extraReducers: {
    [getVegData.fulfilled]: (state, action) => {
      state.hasErrorGettingVegData = false;
      state.isLoadingVegData = false;
      state.vegData = action.payload.data;
    },
    [getVegData.rejected]: (state, action) => {
      state.isLoadingVegData = false;
      state.hasErrorGettingVegData = true;
    },
    [getVegData.pending]: (state, action) => {
      state.isLoadingVegData = true;
      state.hasErrorGettingVegData = false;
    },

    [setVegData.fulfilled]: (state, action) => {
      state.hasErrorSettingVegData = false;
      state.isSettingVegData = false;
      state.vegData=action.payload.data
    },
    [setVegData.rejected]: (state, action) => {
      state.isSettingVegData = false;
      state.hasErrorSettingVegData = true;
    },
    [setVegData.pending]: (state, action) => {
      state.isSettingVegData = true;
      state.hasErrorSettingVegData = false;
    },
  },
});

export const selectVegData = state => state.vegnonveg.vegData;

export const selectIsLoadingVegData = state => state.vegnonveg.isLoadingVegData;
export const selectHasErrorGettingVegData = state =>
  state.vegnonveg.hasErrorGettingVegData;

export const selectIsSettingVegData = state => state.vegnonveg.isSettingVegData;
export const selectHasErrorSettingVegData = state =>
  state.vegnonveg.hasErrorSettingVegData;

export default vegNonVegSlice.reducer;
