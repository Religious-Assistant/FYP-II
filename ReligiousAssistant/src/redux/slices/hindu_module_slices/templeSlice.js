import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {apiPOST, apiGET, apiPATCH} from '../../../apis/apiService';
import {
  add_temple,
  cast_down_vote_for_temple,
  cast_up_vote_for_temple,
  get_all_temples,
  get_closest_temples,
  get_temple_by_id,
  get_unverified_temples_around_user,
} from '../../endpoints';

const initialState = {
  allTemples: null,
  closestTemples: null,
  newTemple: null,
  unerifiedTemple: null,
  templeById: null,

  isLoadingAllTemples: false,
  hasErrorInGettingAllTemples: false,

  isLoadingCastUpvote: false,
  hasErrorInCastingUpVote: false,

  isLoadingCastDownvote: false,
  hasErrorInCastingDownVote: false,

  isLoadingGetTempleById: false,
  hasErrorGetTempleById: false,

  isLoadingClosestTemples: false,
  hasErrorInGettingClosestTemples: false,

  isLoadingUnverifiedTemples: false,
  hasErrorInGettingUnverifiedTemples: false,

  isLoadingAddNewTemple: false,
  hasErrorInAddingTemple: false,
};

export const getAllTemples = createAsyncThunk('getAllTemples', async () => {
  const result = await apiGET(get_all_temples);
  return result;
});

export const getClosestTemples = createAsyncThunk(
  'getClosestTemples',
  async location => {
    const result = await apiPOST(get_closest_temples, location); //Location object with latitude and longitude
    return result;
  },
);

export const getUnverifiedTemplesAroundUser = createAsyncThunk(
  'getUnverifiedTemplesAroundUser',
  async location => {
    const result = await apiPOST(get_unverified_temples_around_user, location); //Location object with latitude and longitude
    return result;
  },
);

export const addTemple = createAsyncThunk('addTemple', async body => {
  const result = await apiPOST(add_temple, body);
  return result;
});

export const getTempleById = createAsyncThunk('getTempleById', async body => {
  const result = await apiPOST(get_temple_by_id, body); //body with required info
  return result;
});

export const castUpvote = createAsyncThunk('castUpvote', async body => {
  const result = await apiPATCH(cast_up_vote_for_temple, body); //body with required info
  return result;
});

export const castDownvote = createAsyncThunk('castDownvote', async body => {
  const result = await apiPATCH(cast_down_vote_for_temple, body); //body with required info
  return result;
});

const templeSlice = createSlice({
  name: 'temple',
  initialState,
  reducers: {},
  extraReducers: {
    [getAllTemples.fulfilled]: (state, action) => {
      state.hasErrorInGettingAllTemples = false;
      state.isLoadingAllTemples = false;
      state.allTemples = action.payload.data;
    },
    [getAllTemples.rejected]: (state, action) => {
      state.isLoadingAllTemples = false;
      state.hasErrorInGettingAllTemples = true;
    },
    [getAllTemples.pending]: (state, action) => {
      state.isLoadingAllTemples = true;
      state.hasErrorInGettingAllTemples = false;
    },

    [castUpvote.fulfilled]: (state, action) => {
      state.hasErrorInCastingUpVote = false;
      state.isLoadingCastUpvote = false;
      state.templeById = action.payload.data;
    },
    [castUpvote.rejected]: (state, action) => {
      state.isLoadingCastUpvote = false;
      state.hasErrorInCastingUpVote = true;
    },
    [castUpvote.pending]: (state, action) => {
      state.isLoadingCastUpvote = true;
      state.hasErrorInCastingUpVote = false;
    },

    [castDownvote.fulfilled]: (state, action) => {
      state.hasErrorInCastingDownVote = false;
      state.isLoadingCastDownvote = false;
      state.templeById = action.payload.data;
    },
    [castDownvote.rejected]: (state, action) => {
      state.isLoadingCastDownvote = false;
      state.hasErrorInCastingDownVote = true;
    },
    [castDownvote.pending]: (state, action) => {
      state.isLoadingCastDownvote = true;
      state.hasErrorInCastingDownVote = false;
    },
    [getTempleById.fulfilled]: (state, action) => {
      state.hasErrorGetTempleById = false;
      state.isLoadingGetTempleById = false;
      state.templeById = action.payload.data;
    },
    [getTempleById.rejected]: (state, action) => {
      state.isLoadingGetTempleById = false;
      state.hasErrorGetTempleById = true;
    },
    [getTempleById.pending]: (state, action) => {
      state.isLoadingGetTempleById = true;
      state.hasErrorGetTempleById = false;
    },
    [getClosestTemples.fulfilled]: (state, action) => {
      state.hasErrorInGettingClosestTemples = false;
      state.isLoadingClosestTemples = false;
      state.closestTemples = action.payload.data;
    },
    [getClosestTemples.rejected]: (state, action) => {
      state.isLoadingClosestTemples = false;
      state.hasErrorInGettingClosestTemples = true;
    },
    [getClosestTemples.pending]: (state, action) => {
      state.isLoadingClosestTemples = true;
      state.hasErrorInGettingClosestTemples = false;
    },

    [getUnverifiedTemplesAroundUser.fulfilled]: (state, action) => {
      state.isLoadingUnverifiedTemples = false;
      state.hasErrorInGettingUnverifiedTemples = false;
      state.unerifiedTemple = action.payload.data;
    },
    [getUnverifiedTemplesAroundUser.pending]: (state, action) => {
      state.isLoadingUnverifiedTemples = true;
      state.hasErrorInGettingUnverifiedTemples = false;
    },
    [getUnverifiedTemplesAroundUser.rejected]: (state, action) => {
      state.hasErrorInGettingUnverifiedTemples = true;
      state.isLoadingUnverifiedTemples = false;
    },

    [addTemple.fulfilled]: (state, action) => {
      state.hasErrorInAddingTemple = false;
      state.isLoadingAddNewTemple = false;
      state.newTemple = action.payload.data;
    },
    [addTemple.pending]: (state, action) => {
      state.isLoadingAddNewTemple = true;
      state.hasErrorInAddingTemple = false;
    },
    [addTemple.rejected]: (state, action) => {
      state.hasErrorInAddingTemple = true;
      state.isLoadingAddNewTemple = false;
    },
  },
});

export const selectAllTemples = state => state.temple.allTemples;
export const selectClosestTemples = state => state.temple.closestTemples;
export const selectUnverifiedTemples = state => state.temple.unerifiedTemple;
export const selectNewAddedTemple = state => state.temple.newTemple;
export const selectTempleById = state => state.temple.templeById;

export const selectIsLoadingAllTemple = state =>
  state.temple.isLoadingAllTemples;
export const selectHasErrorInGettingAllTemple = state =>
  state.temple.hasErrorInGettingAllTemples;

export const selectIsLoadingCastUpVote = state =>
  state.temple.isLoadingCastUpvote;
export const selectHasErrorInCastingUpVote = state =>
  state.temple.hasErrorInCastingUpVote;

export const selectIsLoadingCastDownVote = state =>
  state.temple.isLoadingCastDownvote;
export const selectHasErrorInCastingDownVote = state =>
  state.temple.hasErrorInCastingDownVote;

export const selectIsLoadingGetTempleById = state =>
  state.temple.isLoadingGetTempleById;
export const selectHasErrorGetTempleById = state =>
  state.temple.hasErrorGetTempleById;

export const selectIsLoadingClosestTemple = state =>
  state.temple.isLoadingClosestTemples;
export const selectHasErrorInGettingClosestTemple = state =>
  state.temple.hasErrorInGettingClosestTemples;

export const selectIsLoadingAddNewTemple = state =>
  state.temple.isLoadingAddNewTemple;
export const selectHasErrorInAddingNewTemple = state =>
  state.temple.hasErrorInAddingTemple;

export const selectIsLoadingUnverifiedTemples = state =>
  state.temple.isLoadingUnverifiedTemples;
export const selectHasErrorInGettingUnverifiedTemples = state =>
  state.temple.hasErrorInGettingUnverifiedTemples;

export default templeSlice.reducer;
