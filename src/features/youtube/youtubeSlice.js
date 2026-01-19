import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const searchVideos = createAsyncThunk(
  "youtube/search",
  async (query) => {
    const res = await api.get(`/youtube/search?query=${query}`);
    return res.data;
  }
);

const youtubeSlice = createSlice({
  name: "youtube",
  initialState: { videos: [] },
  extraReducers: (builder) => {
    builder.addCase(searchVideos.fulfilled, (state, action) => {
      state.videos = action.payload;
    });
  },
});

export default youtubeSlice.reducer;
