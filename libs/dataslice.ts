import { IGUserInfo, User } from "@/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  user: {} as User,
  loading: false,
};

const dataSlice = createSlice({
  name: "dataSlice",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setIGInfo: (state, action: PayloadAction<IGUserInfo>) => {
      state.user.igUserInfo = action.payload;
    },
    resetState: () => initialState,
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setUser, setIGInfo, resetState, setLoading } = dataSlice.actions;
export default dataSlice.reducer;
