import { Group, Reel, User, GroupInfo } from "@/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  user: {} as User,
  reels: [] as Reel[],
  groups: [] as GroupInfo[],
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
    setGroup: (state, action: PayloadAction<GroupInfo>) => {
      state.groups = [...state.groups, action.payload];
    },
    setGroups: (state, action: PayloadAction<GroupInfo[]>) => {
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
