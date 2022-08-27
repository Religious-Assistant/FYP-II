import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {apiGET, apiPATCH, apiPOST} from '../../../apis/apiService';
import {
  get_fast_accountability,
  update_fast_accountability,
} from '../../endpoints';

const initialState = {
  accountabilityData: null,
  isLoadingGetAccountabilityData: false,
  hasErrorInGetAccountabilityData: false,

  isLoadingUpdateAccountability: false,
  hasErrorInUpdateAccountability: false,
};

export const getFastAccountability = createAsyncThunk(
  'getFastAccountability',
  async body => {
    const result = await apiPOST(get_fast_accountability, body);
    return result;
  },
);

export const updateFastAccountability = createAsyncThunk(
  'updateFastAccountability',
  async body => {
    const result = await apiPATCH(update_fast_accountability, body);
    return result;
  },
);

const fastAccountabilitySlice = createSlice({
  name: 'fastAccountability',
  initialState,
  reducers: {},
  extraReducers: {
    [getFastAccountability.fulfilled]: (state, action) => {
      state.isLoadingGetAccountabilityData = false;
      state.hasErrorInGetAccountabilityData = false;
      state.accountabilityData = action.payload.data;
    },
    [getFastAccountability.pending]: (state, action) => {
      state.isLoadingGetAccountabilityData = true;
      state.hasErrorInGetAccountabilityData = false;
    },
    [getFastAccountability.rejected]: (state, action) => {
      state.isLoadingGetAccountabilityData = false;
      state.hasErrorInGetAccountabilityData = false;
    },
    [updateFastAccountability.fulfilled]: (state, action) => {
      state.hasErrorInUpdateAccountability = false;
      state.isLoadingUpdateAccountability = false;
    },
    [updateFastAccountability.pending]: (state, action) => {
      state.isLoadingUpdateAccountability = true;
      state.hasErrorInUpdateAccountability = false;
    },
    [updateFastAccountability.rejected]: (state, action) => {
      state.isLoadingUpdateAccountability = false;
      state.hasErrorInUpdateAccountability = true;
    },
  },
});

export const selectAccountabilityData = state =>
  state.fastAccountability.accountabilityData;
export const selectHasErrorInGetAccountabilityData = state =>
  state.fastAccountability.hasErrorInGetAccountabilityData;
export const selectIsLoadingGetAccountabilityData = state =>
  state.fastAccountability.isLoadingGetAccountabilityData;

export const selectIsLoadingUpdateAccountability = state =>
  state.fastAccountability.isLoadingUpdateAccountability;
export const selectHasErrorInUpdateAccountability = state =>
  state.fastAccountability.hasErrorInUpdateAccountability;

export default fastAccountabilitySlice.reducer;
