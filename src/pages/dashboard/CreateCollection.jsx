import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCollection } from "../../features/collections/collectionSlice";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const CreateCollection = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.collections);

  const handleCreate = async () => {
    if (!name.trim()) {
      alert("Collection name is required");
      return;
    }

    const res = await dispatch(createCollection(name.trim()));

    if (res.meta.requestStatus === "fulfilled") {
      navigate("/dashboard/collections");
    }
  };

  return (
    <Box p={{ xs: 2, md: 4 }}>
      <Paper sx={{ p: 4, maxWidth: 500, mx: "auto" }}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          ➕ Create Collection
        </Typography>

        <TextField
          fullWidth
          label="Collection Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3, height: 48 }}
          disabled={loading}
          onClick={handleCreate}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Create Collection"
          )}
        </Button>
      </Paper>
    </Box>
  );
};

export default CreateCollection;
