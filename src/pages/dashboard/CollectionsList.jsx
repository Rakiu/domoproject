import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCollections,
  removeVideoFromCollection,
} from "../../features/collections/collectionSlice";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const CollectionsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list: collections, loading } = useSelector(
    (state) => state.collections
  );

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    dispatch(fetchCollections());
  }, [dispatch]);

  /* 🔍 DEBUG */
  useEffect(() => {
    console.log("COLLECTIONS DATA:", collections);
  }, [collections]);

  /* ================= DELETE ================= */

  const handleDeleteClick = (collectionId, video) => {
    console.log("DELETE CLICK:", {
      collectionId,
      videoId: video.videoId, // ✅ CORRECT
    });

    setSelected({
      collectionId,
      videoId: video.videoId, // ✅ MUST MATCH POSTMAN
    });

    setOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selected) return;

    console.log("FINAL DELETE PAYLOAD:", selected);

    await dispatch(removeVideoFromCollection(selected));

    setOpen(false);
    setSelected(null);
  };

  return (
    <Box p={{ xs: 2, md: 4 }}>
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h5" fontWeight="bold">
          🎬 Manage Collections
        </Typography>

        <Button
          variant="contained"
          onClick={() => navigate("/dashboard/add-video")}
        >
          ➕ Add Video
        </Button>
      </Box>

      {/* COLLECTIONS */}
      {collections.map((collection) => {
        // ✅ SHOW ONLY VIDEOS HAVING videoId
        const filteredVideos = (collection.videos || []).filter(
          (video) => video.videoId && video.videoId.trim() !== ""
        );

        return (
          <Box key={collection._id} mb={4}>
            <Typography variant="h6" mb={1}>
              {collection.name}
            </Typography>

            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Thumbnail</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Play</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {filteredVideos.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        No videos found
                      </TableCell>
                    </TableRow>
                  )}

                  {filteredVideos.map((video) => (
                    <TableRow key={video._id}>
                      <TableCell>
                        <Avatar
                          variant="rounded"
                          src={video.thumbnail}
                          sx={{ width: 60, height: 40 }}
                        />
                      </TableCell>

                      <TableCell>{video.title}</TableCell>

                      <TableCell>
                        {video.videoUrl && (
                          <a
                            href={video.videoUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            ▶ Play
                          </a>
                        )}
                      </TableCell>

                      <TableCell align="right">
                        <Button
                          color="error"
                          size="small"
                          disabled={loading}
                          onClick={() =>
                            handleDeleteClick(collection._id, video)
                          }
                        >
                          {loading ? (
                            <CircularProgress size={16} color="inherit" />
                          ) : (
                            "Delete"
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        );
      })}

      {/* CONFIRM DELETE */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this video?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            color="error"
            variant="contained"
            onClick={handleConfirmDelete}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Delete"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CollectionsList;
