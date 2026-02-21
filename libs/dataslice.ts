import { Group, Reel, User } from "@/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  user: {} as User,
  reels: [] as Reel[],
  groups: [] as Group[],
  loading: false,
};

const dataSlice = createSlice({
  name: "dataSlice",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setReels: (state, action: PayloadAction<Reel[]>) => {
      state.reels = action.payload;
    },
    setGroup: (state, action: PayloadAction<Group>) => {
      state.groups = [...state.groups, action.payload];
    },
    setGroups: (state, action: PayloadAction<Group[]>) => {
      state.groups = action.payload;
    },

    resetState: () => initialState,
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setUser,
  setReels,
  setGroup,
  setGroups,
  resetState,
  setLoading,
} = dataSlice.actions;
export default dataSlice.reducer;
