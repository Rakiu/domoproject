import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const Header = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setOpen(false);
  };

  return (
    <>
      {/* HEADER */}
      <AppBar position="static" color="inherit" elevation={1}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" fontWeight="bold">
            YouTube Playlist Curator
          </Typography>

          <Button
            color="error"
            variant="outlined"
            onClick={() => setOpen(true)}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* LOGOUT CONFIRMATION DIALOG */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm Logout</DialogTitle>

        <DialogContent>
          <Typography>
            Are you sure you want to logout?
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Header;
