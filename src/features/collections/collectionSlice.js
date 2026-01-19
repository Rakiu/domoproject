import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

/* ===================== THUNKS ===================== */

/* ---------- FETCH COLLECTIONS ---------- */
export const fetchCollections = createAsyncThunk(
  "collections/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/collections");
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Failed to fetch collections"
      );
    }
  }
);

/* ---------- CREATE COLLECTION ---------- */
/* 🔴 IMPORTANT: name must be STRING */
export const createCollection = createAsyncThunk(
  "collections/create",
  async (name, { rejectWithValue }) => {
    try {
      console.log("CREATE COLLECTION PAYLOAD:", name);

      const res = await api.post("/collections", {
        name: name, // ✅ STRING ONLY
      });

      return res.data;
    } catch (err) {
      console.error("CREATE COLLECTION ERROR:", err.response?.data);
      return rejectWithValue(
        err.response?.data || "Failed to create collection"
      );
    }
  }
);

/* ---------- ADD VIDEO ---------- */
export const addVideoToCollection = createAsyncThunk(
  "collections/addVideo",
  async ({ collectionId, data }, { rejectWithValue }) => {
    try {
      console.log("ADD VIDEO → Collection:", collectionId);

      const res = await api.post(
        `/collections/${collectionId}/videos`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("ADD VIDEO RESPONSE:", res.data);

      return res.data; // ✅ updated collection
    } catch (err) {
      console.error("ADD VIDEO ERROR:", err.response?.data);
      return rejectWithValue(
        err.response?.data || "Failed to add video"
      );
    }
  }
);

/* ---------- REMOVE VIDEO (POSTMAN MATCH) ---------- */
export const removeVideoFromCollection = createAsyncThunk(
  "collections/removeVideo",
  async ({ collectionId, videoId }, { rejectWithValue }) => {
    try {
      console.log("DELETE API CALL:", {
        collectionId,
        videoId, // ✅ abc123
      });

      const res = await api.delete(
        `/collections/${collectionId}/videos/${videoId}`
      );

      console.log("DELETE RESPONSE:", res.data);

      return { collectionId, videoId };
    } catch (err) {
      console.error("DELETE ERROR:", err.response?.data);
      return rejectWithValue(
        err.response?.data || "Failed to remove video"
      );
    }
  }
);

/* ===================== SLICE ===================== */

const collectionSlice = createSlice({
  name: "collections",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      /* ---------- FETCH COLLECTIONS ---------- */
      .addCase(fetchCollections.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCollections.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchCollections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- CREATE COLLECTION ---------- */
      .addCase(createCollection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCollection.fulfilled, (state, action) => {
        state.list.push(action.payload);
        state.loading = false;
      })
      .addCase(createCollection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- ADD VIDEO ---------- */
      .addCase(addVideoToCollection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addVideoToCollection.fulfilled, (state, action) => {
        const updatedCollection = action.payload;

        const index = state.list.findIndex(
          (c) => c._id === updatedCollection._id
        );

        if (index !== -1) {
          state.list[index] = updatedCollection;
        }

        state.loading = false;
      })
      .addCase(addVideoToCollection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- REMOVE VIDEO (✅ FINAL FIX) ---------- */
      .addCase(removeVideoFromCollection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeVideoFromCollection.fulfilled, (state, action) => {
        const { collectionId, videoId } = action.payload;

        console.log("REDUX REMOVE VIDEO:", {
          collectionId,
          videoId,
        });

        const collection = state.list.find(
          (c) => c._id === collectionId
        );

        if (collection) {
          collection.videos = collection.videos.filter(
            (v) => v.videoId !== videoId // ✅ CORRECT (Postman style)
          );
        }

        state.loading = false;
      })
      .addCase(removeVideoFromCollection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default collectionSlice.reducer;
