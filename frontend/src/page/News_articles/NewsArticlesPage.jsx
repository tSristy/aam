'use client';

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  Box,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  Card,
  CardMedia,
  CardContent,
  Divider,
  CircularProgress,
  Alert,
  Dialog,
  DialogContent,
  IconButton,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { myTheme } from "../../assets/Theme/myTheme";


const formatNews = (item) => ({
  id: item.id,
  slug: item.slug || String(item.id),
  createdAt: item.created_at || null,
  updatedAt: item.updated_at || item.created_at || null,
  image: item.image_url || "",
  category: item.category || "Community",
  tag: item.tag || "Top Story",
  source: item.source || "Foundation Desk",
  title: item.title || "Untitled Article",
  description: item.excerpt || item.content || "",
  content: item.content || item.excerpt || "",
  display_section: item.display_section || "default",
  timestamp:
    item.location ||
    item.year ||
    new Date(item.created_at).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
});

const NewsArticlesPage = ({ initialItems = [], initialError = "" }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const stories = useMemo(() => initialItems.map(formatNews), [initialItems]);
  const loading = false;
  const error = initialError;
  const [selectedStory, setSelectedStory] = useState(null);

  const topHeadline = useMemo(() => {
    return (
      stories.find((story) => story.display_section === "top_headline") ||
      stories[0]
    );
  }, [stories]);

  const sideHeadlines = useMemo(() => {
    const sectionItems = stories.filter(
      (story) => story.display_section === "side_headline"
    );

    if (sectionItems.length) return sectionItems.slice(0, 3);

    return stories.filter((story) => story.id !== topHeadline?.id).slice(0, 3);
  }, [stories, topHeadline]);

  const feedStories = useMemo(() => {
    const sectionItems = stories.filter(
      (story) => story.display_section === "feed_story"
    );

    if (sectionItems.length) return sectionItems;

    const reservedIds = new Set([
      topHeadline?.id,
      ...sideHeadlines.map((story) => story.id),
    ]);

    return stories.filter((story) => !reservedIds.has(story.id));
  }, [stories, topHeadline, sideHeadlines]);

  const handleOpenStory = (story) => {
    setSelectedStory(story);
  };

  const handleCloseStory = () => {
    setSelectedStory(null);
  };

  return (
    <Box sx={{ bgcolor: "#f5f7fb", minHeight: "100vh", pb: 8 }}>
      <Container maxWidth="lg" sx={{ pt: 4 }}>
        <Typography
          component="h1"
          variant="caption"
          sx={{
            color: myTheme.palette.miniText,
            textTransform: "uppercase",
            letterSpacing: 1.5,
          }}
        >
          News & Articles
        </Typography>

        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
            <CircularProgress color="success" />
          </Box>
        )}

        {!loading && error && (
          <Alert severity="error" sx={{ mt: 3 }}>
            {error}
          </Alert>
        )}

        {!loading && !error && stories.length === 0 && (
          <Card
            sx={{
              mt: 3,
              borderRadius: 4,
              boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 5 }, textAlign: "center" }}>
              <Typography
                sx={{ fontWeight: 800, color: myTheme.palette.textColor }}
              >
                No news articles published yet.
              </Typography>
              <Typography sx={{ mt: 1, color: myTheme.palette.miniText }}>
                Add published news from the admin panel and it will appear here.
              </Typography>
            </CardContent>
          </Card>
        )}

        {!loading && !error && topHeadline && (
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 8 }}>
              <Card
                onClick={() => handleOpenStory(topHeadline)}
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 16px 36px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <Box
                  sx={{
                    flex: { md: 3 },
                    minHeight: { xs: 220, md: 320 },
                    background: topHeadline.image
                      ? "transparent"
                      : "linear-gradient(135deg,#dfeee2,#f7fbf8)",
                  }}
                >
                  {topHeadline.image && (
                    <CardMedia
                      component="img"
                      image={topHeadline.image}
                      alt={topHeadline.title}
                      sx={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                      }}
                    />
                  )}
                </Box>

                <CardContent
                  sx={{
                    flex: { md: 2 },
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    bgcolor: "white",
                  }}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={{ mb: 1 }}
                  >
                    <Chip
                      label={topHeadline.tag || "Top Story"}
                      size="small"
                      sx={{
                        bgcolor: myTheme.palette.green,
                        color: "white",
                        fontWeight: 600,
                      }}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        color: myTheme.palette.miniText,
                        textTransform: "uppercase",
                        letterSpacing: 1.2,
                      }}
                    >
                      {topHeadline.category}
                    </Typography>
                  </Stack>

                  <Typography
                    sx={{
                      fontSize: { xs: "1.4rem", md: "1.8rem" },
                      fontWeight: 700,
                      mb: 1,
                      lineHeight: 1.3,
                      color: myTheme.palette.textColor,
                    }}
                  >
                    {topHeadline.title}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: ".95rem",
                      color: myTheme.palette.miniText,
                      mb: 2,
                    }}
                  >
                    {topHeadline.description}
                  </Typography>

                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ mt: "auto" }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        color: myTheme.palette.miniText,
                      }}
                    >
                      {topHeadline.timestamp}
                    </Typography>

                    <Button
                      component={Link}
                      href={`/news-articles/${encodeURIComponent(topHeadline.slug)}`}
                      onClick={(event) => event.stopPropagation()}
                      size="small"
                      endIcon={<OpenInNewIcon />}
                      sx={{
                        color: myTheme.palette.green,
                        fontWeight: 700,
                        textTransform: "none",
                      }}
                    >
                      Read more
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Card
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  height: "100%",
                }}
              >
                <Box sx={{ p: 2.5 }}>
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      fontWeight: 700,
                      mb: 1,
                      color: myTheme.palette.textColor,
                    }}
                  >
                    Latest Headlines
                  </Typography>
                  <Divider sx={{ mb: 1.5 }} />

                  <Stack spacing={1.5}>
                    {sideHeadlines.length === 0 && (
                      <Typography
                        sx={{
                          fontSize: ".9rem",
                          color: myTheme.palette.miniText,
                        }}
                      >
                        More headlines will appear after you publish more
                        articles.
                      </Typography>
                    )}

                    {sideHeadlines.map((item) => (
                      <Box
                        key={item.id}
                        onClick={() => handleOpenStory(item)}
                        sx={{
                          cursor: "pointer",
                          borderRadius: 2,
                          p: 1,
                          mx: -1,
                          transition: "all 0.2s ease",
                          "&:hover": {
                            bgcolor: "#f4f9f3",
                          },
                          "&:not(:last-of-type)": {
                            pb: 1.5,
                            borderBottom: "1px solid #eceff4",
                          },
                        }}
                      >
                        <Typography
                          component={Link}
                          href={`/news-articles/${encodeURIComponent(item.slug)}`}
                          onClick={(event) => event.stopPropagation()}
                          sx={{
                            display: "block",
                            textDecoration: "none",
                            fontSize: ".95rem",
                            fontWeight: 700,
                            color: myTheme.palette.textColor,
                            mb: 0.5,
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: ".85rem",
                            color: myTheme.palette.miniText,
                          }}
                        >
                          {item.description}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>

      {!loading && !error && feedStories.length > 0 && (
        <Container maxWidth="lg" sx={{ mt: 5 }}>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <Box
              sx={{
                width: 6,
                height: 18,
                borderRadius: 999,
                bgcolor: myTheme.palette.green,
              }}
            />
            <Typography
              sx={{
                fontSize: "1rem",
                fontWeight: 700,
                color: myTheme.palette.textColor,
              }}
            >
              Stories for you
            </Typography>
          </Stack>

          <Grid container spacing={3}>
            {feedStories.map((story) => (
              <Grid key={story.id} size={{ xs: 12, md: 6 }}>
                <Card
                  onClick={() => handleOpenStory(story)}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    borderRadius: 3,
                    overflow: "hidden",
                    boxShadow: "0 4px 18px rgba(0,0,0,0.06)",
                    height: "100%",
                    cursor: "pointer",
                    "&:hover": {
                      boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                      transform: "translateY(-3px)",
                    },
                    transition: "all 0.25s ease",
                  }}
                >
                  <Box
                    sx={{
                      width: 140,
                      flexShrink: 0,
                      display: { xs: "none", sm: "block" },
                      background: story.image
                        ? "transparent"
                        : "linear-gradient(135deg,#dfeee2,#f7fbf8)",
                    }}
                  >
                    {story.image && (
                      <CardMedia
                        component="img"
                        image={story.image}
                        alt={story.title}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    )}
                  </Box>

                  <CardContent
                    sx={{
                      p: 2.5,
                      display: "flex",
                      flexDirection: "column",
                      flex: 1,
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      sx={{ mb: 0.5 }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          color: myTheme.palette.green,
                          fontWeight: 600,
                          textTransform: "uppercase",
                        }}
                      >
                        {story.category}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: myTheme.palette.miniText }}
                      >
                        • {story.source}
                      </Typography>
                    </Stack>

                    <Typography
                      component={Link}
                      href={`/news-articles/${encodeURIComponent(story.slug)}`}
                      onClick={(event) => event.stopPropagation()}
                      sx={{
                        display: "block",
                        textDecoration: "none",
                        fontWeight: 700,
                        color: myTheme.palette.textColor,
                        mb: 0.5,
                        fontSize: "1rem",
                      }}
                    >
                      {story.title}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: ".85rem",
                        color: myTheme.palette.miniText,
                        mb: 1.5,
                      }}
                    >
                      {story.description}
                    </Typography>

                    <Typography
                      sx={{
                        mt: "auto",
                        fontSize: ".78rem",
                        fontWeight: 700,
                        color: myTheme.palette.green,
                      }}
                    >
                      Read story
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}

      <Dialog
        open={!!selectedStory}
        onClose={handleCloseStory}
        maxWidth="lg"
        fullWidth
        fullScreen={fullScreen}
        PaperProps={{
          sx: {
            borderRadius: { xs: 0, sm: 4 },
            overflow: "hidden",
            minHeight: { xs: "100vh", sm: "auto" },
            maxHeight: { xs: "100vh", sm: "88vh" },
            bgcolor: "#ffffff",
            boxShadow: "0 24px 80px rgba(15,23,42,0.25)",
          },
        }}
      >
        {selectedStory && (
          <DialogContent
            sx={{
              p: 0,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <IconButton
              onClick={handleCloseStory}
              sx={{
                position: "absolute",
                top: 14,
                right: 14,
                zIndex: 5,
                bgcolor: "rgba(255,255,255,0.92)",
                color: myTheme.palette.textColor,
                boxShadow: "0 8px 22px rgba(15,23,42,0.18)",
                "&:hover": {
                  bgcolor: "white",
                },
              }}
            >
              <CloseIcon />
            </IconButton>

            <Grid container sx={{ minHeight: { xs: "100vh", sm: 520 } }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Box
                  sx={{
                    height: { xs: 280, sm: 360, md: "100%" },
                    minHeight: { md: 560 },
                    position: "relative",
                    background: selectedStory.image
                      ? "#111827"
                      : "linear-gradient(135deg,#dfeee2,#f7fbf8)",
                  }}
                >
                  {selectedStory.image ? (
                    <Box
                      component="img"
                      src={selectedStory.image}
                      alt={selectedStory.title}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  ) : (
                    <Stack
                      alignItems="center"
                      justifyContent="center"
                      sx={{
                        height: "100%",
                        color: myTheme.palette.green,
                      }}
                    >
                      <ArticleOutlinedIcon sx={{ fontSize: 72, mb: 1 }} />
                      <Typography sx={{ fontWeight: 800 }}>
                        AAMF News
                      </Typography>
                    </Stack>
                  )}

                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.58), transparent 52%)",
                    }}
                  />

                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                      position: "absolute",
                      left: 20,
                      bottom: 20,
                      flexWrap: "wrap",
                    }}
                  >
                    <Chip
                      label={selectedStory.category}
                      size="small"
                      sx={{
                        bgcolor: "rgba(255,255,255,0.92)",
                        color: myTheme.palette.textColor,
                        fontWeight: 700,
                      }}
                    />
                    {selectedStory.tag && (
                      <Chip
                        label={selectedStory.tag}
                        size="small"
                        sx={{
                          bgcolor: myTheme.palette.green,
                          color: "white",
                          fontWeight: 700,
                        }}
                      />
                    )}
                  </Stack>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Box
                  sx={{
                    p: { xs: 3, sm: 4, md: 5 },
                    height: "100%",
                    maxHeight: { xs: "calc(100vh - 280px)", md: "88vh" },
                    overflowY: "auto",
                    bgcolor:
                      "linear-gradient(180deg, #ffffff 0%, #fbfdf9 100%)",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: myTheme.palette.green,
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: 1.4,
                    }}
                  >
                    {selectedStory.source} • {selectedStory.timestamp}
                  </Typography>

                  <Typography
                    sx={{
                      mt: 1.5,
                      fontSize: { xs: "1.55rem", md: "2rem" },
                      lineHeight: 1.22,
                      fontWeight: 900,
                      color: myTheme.palette.textColor,
                    }}
                  >
                    {selectedStory.title}
                  </Typography>

                  {/* <Typography
                    sx={{
                      mt: 2,
                      fontSize: { xs: ".98rem", md: "1.04rem" },
                      lineHeight: 1.8,
                      color: myTheme.palette.miniText,
                      fontWeight: 500,
                    }}
                  >
                    {selectedStory.description}
                  </Typography> */}

                  <Divider sx={{ my: 3 }} />

                  <Typography
                    sx={{
                      whiteSpace: "pre-line",
                      fontSize: ".98rem",
                      lineHeight: 1.9,
                      color: "#374151",
                    }}
                  >
                    {selectedStory.content || selectedStory.description}
                  </Typography>

                  <Button
                    component={Link}
                    href={`/news-articles/${encodeURIComponent(selectedStory.slug)}`}
                    onClick={handleCloseStory}
                    variant="contained"
                    color="success"
                    sx={{ mt: 3, alignSelf: "flex-start", textTransform: "none", fontWeight: 800 }}
                  >
                    Open full article page
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </DialogContent>
        )}
      </Dialog>
    </Box>
  );
};

export default NewsArticlesPage;