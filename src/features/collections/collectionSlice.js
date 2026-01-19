import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const fetchCollections = createAsyncThunk(
  "collections/fetch",
  async () => {
    const res = await api.get("/collections");
    return res.data;
  }
);

export const createCollection = createAsyncThunk(
  "collections/create",
  async (name) => {
    await api.post("/collections", { name });
    return name;
  }
);

export const addVideo = createAsyncThunk(
  "collections/addVideo",
  async ({ collectionId, video }) => {
    await api.post(`/collections/${collectionId}/videos`, video);
    return { collectionId, video };
  }
);

const collectionSlice = createSlice({
  name: "collections",
  initialState: { list: [] },
  extraReducers: (builder) => {
    builder.addCase(fetchCollections.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

export default collectionSlice.reducer;
