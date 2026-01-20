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
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Header = ({ onMenuClick }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setOpen(false);
  };

  return (
    <>
      <AppBar position="static" color="inherit" elevation={1}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <div className="flex items-center gap-2">
            {/* Mobile Menu Button */}
            <IconButton
              onClick={onMenuClick}
              className="lg:hidden"
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" fontWeight="bold">
              YouTube Playlist Curator
            </Typography>
          </div>

          <Button
            color="error"
            variant="outlined"
            onClick={() => setOpen(true)}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Logout Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to logout?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleLogout}>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Header;
