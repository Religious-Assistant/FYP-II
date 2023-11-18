import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {apiPATCH, apiPOST} from '../../../apis/apiService';
import {get_tasbih_count, update_tasbih} from '../../endpoints';

const initialState = {
  count: 0,
  isLoading: true,
  hasError: false,
};

export const updateTasbih = createAsyncThunk('updateTasbih', async body => {
  return await apiPATCH(update_tasbih, body);
});

export const getTasbihCount = createAsyncThunk('getTasbihCount', async body => {
  return await apiPOST(get_tasbih_count, body);
});

const tasbihSlice = createSlice({
  name: 'tasbih',
  initialState,
  reducers: {
    updateCount: (state, action) => {
      console.log(action.payload)
      state.count = action.payload;
    },
  },
  extraReducers: {
    [updateTasbih.fulfilled]: (state, action) => {
      state.hasError = false;
      state.isLoading = false;
      state.count = action.payload.data.count;
    },
    [updateTasbih.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [updateTasbih.rejected]: (state, action) => {
      state.hasError = true;
      state.isLoading = false;
    },

    [getTasbihCount.fulfilled]: (state, action) => {
      state.hasError = false;
      state.isLoading = false;
      state.count = action.payload.data.count;
    },
    [getTasbihCount.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [getTasbihCount.rejected]: (state, action) => {
      state.hasError = true;
      state.isLoading = false;
    },
  },
});

export const {updateCount} = tasbihSlice.actions;

export const selectTasbihCount = state => state.tasbih.count;
export const selectIsTasbihLoading = state => state.tasbih.isLoading;
export const selectHasTasbihError = state => state.tasbih.hasError;

export default tasbihSlice.reducer;
