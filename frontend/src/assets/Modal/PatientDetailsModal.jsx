'use client';

import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Stack,
  IconButton,
  InputAdornment,
  useMediaQuery,
  useTheme,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import CardMembershipOutlinedIcon from "@mui/icons-material/CardMembershipOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { useState } from "react";
import { myTheme } from "../Theme/myTheme";

const PatientDetailsModal = ({ open, onClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [formValues, setFormValues] = useState({
    name: "",
    phone: "",
    nid: "",
    membershipType: "",
    age: "",
    address: "",
    date: "",
  });

  const handleChange = (field) => (event) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  // Only digits for number fields
  const handleNumberChange = (field) => (event) => {
    const raw = event.target.value || "";
    const digitsOnly = raw.replace(/\D/g, "");
    setFormValues((prev) => ({
      ...prev,
      [field]: digitsOnly,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(formValues);

    setFormValues({
      name: "",
      phone: "",
      nid: "",
      membershipType: "",
      age: "",
      address: "",
      date: "",
    });

    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  const inputSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 3,
      backgroundColor: "#fafafa",
      "& fieldset": {
        borderColor: "#e0e0e0",
      },
      "&:hover fieldset": {
        borderColor: myTheme.palette.green,
      },
      "&.Mui-focused fieldset": {
        borderColor: myTheme.palette.green,
      },
      "& .MuiOutlinedInput-input": {
        paddingY: 1.5,
      },
    },
  };

  return (
    <Dialog
      open={open}
      // don't close on outside click
      onClose={(event, reason) => {
        if (reason === "backdropClick") return;
        handleClose();
      }}
      fullWidth
      fullScreen={fullScreen}
      maxWidth="md"
      disableEscapeKeyDown
      PaperProps={{
        sx: {
          borderRadius: fullScreen ? 0 : 3,
          boxShadow: 6,
        },
      }}
    >
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #e0e0e0",
            bgcolor: "linear-gradient(90deg, #f7f9fb 0%, #ffffff 100%)",
          }}
        >
          <Typography
            variant="h6"
            component="span"
            sx={{ fontWeight: 600, color: myTheme.palette.textColor }}
          >
            Patient Details
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent
          sx={{
            mt: 3,
            pt: 3,
            pb: 1,
            bgcolor: "#fdfefe",
          }}
        >
          <Stack spacing={2.5}>
            {/* Name (full row) */}
            <TextField
              fullWidth
              required
              placeholder="Name *"
              value={formValues.name}
              onChange={handleChange("name")}
              variant="outlined"
              sx={inputSx}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon
                      sx={{ color: myTheme.palette.miniText }}
                    />
                  </InputAdornment>
                ),
              }}
            />

            {/* Phone | NID */}
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  required
                  placeholder="Phone No *"
                  value={formValues.phone}
                  onChange={handleNumberChange("phone")}
                  variant="outlined"
                  sx={inputSx}
                  inputProps={{
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIphoneOutlinedIcon
                          sx={{ color: myTheme.palette.miniText }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  required
                  placeholder="NID *"
                  value={formValues.nid}
                  onChange={handleNumberChange("nid")}
                  variant="outlined"
                  sx={inputSx}
                  inputProps={{
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CreditCardOutlinedIcon
                          sx={{ color: myTheme.palette.miniText }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            {/* Membership type | Age */}
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  required
                  placeholder="Membership type *"
                  value={formValues.membershipType}
                  onChange={handleChange("membershipType")}
                  variant="outlined"
                  sx={inputSx}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CardMembershipOutlinedIcon
                          sx={{ color: myTheme.palette.miniText }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  required
                  placeholder="Age *"
                  value={formValues.age}
                  onChange={handleNumberChange("age")}
                  variant="outlined"
                  sx={inputSx}
                  inputProps={{
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlineIcon
                          sx={{ color: myTheme.palette.miniText }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            {/* Address | Date */}
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  required
                  placeholder="Address *"
                  value={formValues.address}
                  onChange={handleChange("address")}
                  variant="outlined"
                  sx={inputSx}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <HomeOutlinedIcon
                          sx={{ color: myTheme.palette.miniText }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  required
                  label="Date of Birth"
                  type="date"
                  value={formValues.date}
                  onChange={handleChange("date")}
                  variant="outlined"
                  sx={inputSx}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarTodayOutlinedIcon
                          sx={{ color: myTheme.palette.miniText }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </Stack>
        </DialogContent>

        <DialogActions
          sx={{
            p: 2.5,
            pt: 1,
            bgcolor: "#ffffff",
          }}
        >
          <Button onClick={handleClose} sx={{ textTransform: "none" }}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              textTransform: "none",
              fontWeight: 600,
              px: 4,
              borderRadius: 999,
              boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
              backgroundColor: myTheme.palette.green,
              "&:hover": {
                backgroundColor: "#2e7d32",
              },
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default PatientDetailsModal;
