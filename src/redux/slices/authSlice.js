import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk("auth/fetchUser", async () => {
  const res = await axios.get("/api/auth/me");
  return res.data.user; // this will populate user in Redux
});

const initialState = {
  user: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
      });
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
