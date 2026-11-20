'use client';

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  Alert,
  Button,
  Box,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import FilterVintageOutlinedIcon from "@mui/icons-material/FilterVintageOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import Banner from "../../assets/Banner/Banner";
import { myTheme } from "../../assets/Theme/myTheme";
import bannerImg from "../../img/Embaded/family.png";


const defaultMomentCategories = [
  "All",
  "Healthcare",
  "Education",
  "Relief & Welfare",
  "Winter Support",
  "Legacy & Family",
];

const formatMoment = (item) => ({
  id: item.id,
  slug: item.slug || String(item.id),
  createdAt: item.created_at || null,
  updatedAt: item.updated_at || item.created_at || null,
  src: item.image_url || "",
  title: item.title || "Untitled Moment",
  category: item.category || "Relief & Welfare",
  location: item.location || "Community",
  year: item.year || new Date(item.created_at).getFullYear(),
  excerpt: item.excerpt || "",
  content: item.content || "",
  is_featured: Boolean(item.is_featured),
});

const CommunityMomentsPage = ({ initialItems = [], initialError = "" }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const momentsImages = useMemo(() => initialItems.map(formatMoment), [initialItems]);
  const loading = false;
  const error = initialError;

  const momentCategories = useMemo(() => {
    const dynamicCategories = momentsImages
      .map((item) => item.category)
      .filter(Boolean);

    return [
      "All",
      ...new Set([...defaultMomentCategories.slice(1), ...dynamicCategories]),
    ];
  }, [momentsImages]);

  const filteredImages = useMemo(() => {
    if (activeCategory === "All") return momentsImages;
    return momentsImages.filter((m) => m.category === activeCategory);
  }, [activeCategory, momentsImages]);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setSelectedIndex(null);
  };

  const handleOpenMoment = (index) => {
    setSelectedIndex(index);
  };

  const handleCloseMoment = () => {
    setSelectedIndex(null);
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => {
      if (prev === null || filteredImages.length === 0) return prev;
      return prev === 0 ? filteredImages.length - 1 : prev - 1;
    });
  };

  const handleNext = () => {
    setSelectedIndex((prev) => {
      if (prev === null || filteredImages.length === 0) return prev;
      return prev === filteredImages.length - 1 ? 0 : prev + 1;
    });
  };

  const currentMoment =
    selectedIndex !== null ? filteredImages[selectedIndex] : null;

  const featuredMoment =
    momentsImages.find((item) => item.is_featured) || momentsImages[0];

  return (
    <>
      <Banner
        bannerHeight="26rem"
        text={{
          supportTitle: "Memories • Stories • Impact",
          mainTitle: "Moments of Compassion",
          descriptionText:
            "A visual journey through the work of Amzad Ali Memorial Foundation — from health camps to relief, education and family legacy.",
        }}
        img={bannerImg}
        alt="Community moments from Amzad Ali Memorial Foundation"
      />
      <Box sx={{ py: 8, bgcolor: "#fafbff" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography
              component="h2"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontSize: { xs: "2rem", md: "3rem" },
                fontWeight: 700,
                color: myTheme.palette.textColor,
                mb: 1.5,
              }}
            >
              Captured Moments
            </Typography>
            <Typography
              sx={{
                fontSize: "1rem",
                color: myTheme.palette.miniText,
                maxWidth: 700,
                mx: "auto",
                lineHeight: 1.8,
              }}
            >
              Every photograph carries a story — a blanket wrapped around
              someone in winter, a child holding books, a patient seeing clearly
              again. Explore the milestones and everyday acts of kindness that
              define our community.
            </Typography>
          </Box>
          <Stack
            direction="row"
            flexWrap="wrap"
            spacing={1.5}
            sx={{
              justifyContent: "center",
              mb: 4,
            }}
          >
            {momentCategories.map((cat) => (
              <Chip
                key={cat}
                label={cat}
                clickable
                onClick={() => handleCategoryChange(cat)}
                icon={
                  cat === "All" ? (
                    <CameraAltOutlinedIcon sx={{ fontSize: "1rem" }} />
                  ) : undefined
                }
                sx={{
                  borderRadius: "999px",
                  px: 1,
                  fontSize: ".85rem",
                  fontWeight: 500,
                  backgroundColor:
                    activeCategory === cat
                      ? myTheme.palette.green
                      : "white",
                  color:
                    activeCategory === cat
                      ? "white"
                      : myTheme.palette.textColor,
                  border:
                    activeCategory === cat
                      ? "none"
                      : `1px solid ${myTheme.palette.lightGreen}`,
                  boxShadow:
                    activeCategory === cat
                      ? "0 10px 25px rgba(118,186,27,0.35)"
                      : "0 4px 12px rgba(15,23,42,0.08)",
                  "&:hover": {
                    backgroundColor:
                      activeCategory === cat
                        ? myTheme.palette.green
                        : "#f4f7fb",
                  },
                }}
              />
            ))}
          </Stack>

          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
              <CircularProgress color="success" />
            </Box>
          )}

          {!loading && error && <Alert severity="error">{error}</Alert>}

          {!loading && !error && momentsImages.length === 0 && (
            <Box
              sx={{
                textAlign: "center",
                bgcolor: "white",
                borderRadius: 3,
                p: 5,
                boxShadow: "0 12px 40px rgba(15,23,42,0.08)",
              }}
            >
              <Typography sx={{ fontWeight: 700, mb: 1 }}>
                No moments found
              </Typography>
              <Typography sx={{ color: myTheme.palette.miniText }}>
                Please add published moments from the admin panel.
              </Typography>
            </Box>
          )}

          {!loading && !error && momentsImages.length > 0 && (
            <>
              <Grid container spacing={4} sx={{ mb: 6, alignItems: "center" }}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box
                    sx={{
                      borderRadius: 3,
                      overflow: "hidden",
                      position: "relative",
                      boxShadow: "0 20px 45px rgba(15,23,42,0.18)",
                    }}
                  >
                    <Box
                      component="img"
                      src={featuredMoment.src}
                      alt={featuredMoment.title}
                      sx={{
                        width: "100%",
                        height: { xs: 260, md: 320 },
                        objectFit: "cover",
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.6), transparent 50%)",
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 16,
                        left: 16,
                        right: 16,
                        display: "flex",
                        flexDirection: "column",
                        gap: 0.5,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: ".75rem",
                          letterSpacing: 1.2,
                          textTransform: "uppercase",
                          color: myTheme.palette.lightBlue,
                        }}
                      >
                        Featured Moment
                      </Typography>
                      <Typography
                        component={Link}
                        href={`/moments/${encodeURIComponent(featuredMoment.slug)}`}
                        onClick={(event) => event.stopPropagation()}
                        sx={{
                          fontSize: "1.2rem",
                          fontWeight: 600,
                          color: "white",
                          textDecoration: "none",
                        }}
                      >
                        {featuredMoment.title}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: ".85rem",
                          color: "rgba(255,255,255,0.85)",
                        }}
                      >
                        {featuredMoment.location} • {featuredMoment.year}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Stack spacing={2}>
                    <Typography
                      sx={{
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        color: myTheme.palette.textColor,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <FilterVintageOutlinedIcon
                        sx={{ color: myTheme.palette.green }}
                      />
                      Little frames, big stories.
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: ".95rem",
                        color: myTheme.palette.miniText,
                        lineHeight: 1.8,
                      }}
                    >
                      From the earliest days of the foundation to recent community
                      programs, these moments speak of compassion, service and
                      togetherness. Volunteers, doctors, students and families—all
                      are part of this journey.
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: ".95rem",
                        color: myTheme.palette.miniText,
                      }}
                    >
                      Scroll down and discover the smiles, the crowds, the heartfelt
                      thanks and the quiet, meaningful changes happening in people’s
                      lives.
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>

              <Box
                sx={{
                  borderRadius: 3,
                  bgcolor: "white",
                  boxShadow: "0 12px 40px rgba(15,23,42,0.08)",
                  p: { xs: 2, md: 3 },
                }}
              >
                <Grid container spacing={2.5}>
                  {filteredImages.map((item, index) => (
                    <Grid key={item.id} size={{ xs: 12, sm: 6 }}>
                      <Box
                        onClick={() => handleOpenMoment(index)}
                        sx={{
                          cursor: "pointer",
                          borderRadius: 3,
                          overflow: "hidden",
                          position: "relative",
                          height: { xs: 220, md: 260 },
                          boxShadow: "0 6px 18px rgba(15,23,42,0.12)",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-4px)",
                            boxShadow: "0 16px 40px rgba(15,23,42,0.25)",
                          },
                        }}
                      >
                        <Box
                          component="img"
                          src={item.src}
                          alt={item.title}
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />

                        <Box
                          sx={{
                            position: "absolute",
                            inset: "auto 0 0 0",
                            p: 2,
                            background:
                              "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                          }}
                        >
                          <Typography
                            component={Link}
                            href={`/moments/${encodeURIComponent(item.slug)}`}
                            onClick={(event) => event.stopPropagation()}
                            sx={{
                              display: "block",
                              fontSize: ".9rem",
                              fontWeight: 600,
                              color: "white",
                              textDecoration: "none",
                            }}
                          >
                            {item.title}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: ".75rem",
                              color: "rgba(255,255,255,0.85)",
                            }}
                          >
                            {item.location} • {item.year}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </>
          )}
        </Container>
      </Box>

      <Dialog
        open={selectedIndex !== null && !!currentMoment}
        onClose={handleCloseMoment}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            overflow: "hidden",
            bgcolor: "black",
          },
        }}
      >
        {currentMoment && (
          <DialogContent
            sx={{
              p: 0,
              bgcolor: "black",
              position: "relative",
            }}
          >
            <Box sx={{ position: "absolute", top: 8, right: 8, zIndex: 3 }}>
              <IconButton
                onClick={handleCloseMoment}
                sx={{
                  color: "white",
                  bgcolor: "rgba(0,0,0,0.4)",
                  "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: 8,
                transform: "translateY(-50%)",
                zIndex: 3,
              }}
            >
              <IconButton
                onClick={handlePrev}
                sx={{
                  color: "white",
                  bgcolor: "rgba(0,0,0,0.4)",
                  "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
                }}
              >
                <ChevronLeftIcon />
              </IconButton>
            </Box>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                right: 8,
                transform: "translateY(-50%)",
                zIndex: 3,
              }}
            >
              <IconButton
                onClick={handleNext}
                sx={{
                  color: "white",
                  bgcolor: "rgba(0,0,0,0.4)",
                  "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
                }}
              >
                <ChevronRightIcon />
              </IconButton>
            </Box>

            <Box sx={{ bgcolor: "black" }}>
              <Box
                component="img"
                src={currentMoment.src}
                alt={currentMoment.title}
                sx={{
                  width: "100%",
                  maxHeight: "70vh",
                  objectFit: "contain",
                  display: "block",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  p: 2.5,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.85), transparent)",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "white",
                    mb: 0.5,
                  }}
                >
                  {currentMoment.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: ".85rem",
                    color: "rgba(255,255,255,0.8)",
                  }}
                >
                  {currentMoment.location} • {currentMoment.year}
                </Typography>
                <Button
                  component={Link}
                  href={`/moments/${encodeURIComponent(currentMoment.slug)}`}
                  onClick={handleCloseMoment}
                  size="small"
                  sx={{ mt: 0.75, px: 0, color: "white", textTransform: "none", justifyContent: "flex-start" }}
                >
                  View moment page
                </Button>
              </Box>
            </Box>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};

export default CommunityMomentsPage;
