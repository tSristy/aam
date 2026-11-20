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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { useState } from "react";
import { myTheme } from "../Theme/myTheme";

const VolunteerModal = ({ open, onClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [formValues, setFormValues] = useState({
    name: "",
    phone: "",
    nid: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (field) => (event) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  // Only digits for phone & NID
  const handleNumberChange = (field) => (event) => {
    const raw = event.target.value || "";
    const digitsOnly = raw.replace(/\D/g, "");
    setFormValues((prev) => ({
      ...prev,
      [field]: digitsOnly,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImageFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log({
      ...formValues,
      imageFile,
    });

    setFormValues({ name: "", phone: "", nid: "" });
    setImageFile(null);
    setImagePreview(null);

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
      onClose={(event, reason) => {
        if (reason === "backdropClick") return;
        handleClose();
      }}
      fullWidth
      fullScreen={fullScreen}
      maxWidth="sm"
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
            Volunteer Registration
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

            <Box>
              <Typography
                sx={{
                  mb: 1,
                  fontSize: ".9rem",
                  fontWeight: 600,
                  color: myTheme.palette.textColor,
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                <ImageOutlinedIcon
                  sx={{
                    fontSize: "1rem",
                    color: myTheme.palette.miniText,
                  }}
                />
                Image (Photo)
              </Typography>

              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                flexWrap="wrap"
              >
                <Button
                  variant="outlined"
                  component="label"
                  sx={{
                    textTransform: "none",
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <CloudUploadOutlinedIcon
                    sx={{ fontSize: "1.2rem", color: myTheme.palette.blue }}
                  />
                  Upload Image
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={handleImageChange}
                  />
                </Button>

                {imagePreview && (
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Box
                      sx={{
                        borderRadius: 2,
                        overflow: "hidden",
                        width: 80,
                        height: 80,
                        border: "1px solid #e0e0e0",
                      }}
                    >
                      <Box
                        component="img"
                        src={imagePreview}
                        alt="Preview"
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                    <Button
                      size="small"
                      variant="text"
                      onClick={handleRemoveImage}
                      sx={{
                        textTransform: "none",
                        color: myTheme.palette.miniText,
                        "&:hover": {
                          color: myTheme.palette.green,
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      Remove
                    </Button>
                  </Stack>
                )}
              </Stack>
            </Box>
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

export default VolunteerModal;
