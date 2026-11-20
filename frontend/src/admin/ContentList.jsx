'use client';

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Alert,
  Box,
  Button,
  Chip,
  IconButton,
  Paper,
  Stack,
  Typography,
  alpha,
} from "@mui/material";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import NewReleasesRoundedIcon from "@mui/icons-material/NewReleasesRounded";
import UpdateRoundedIcon from "@mui/icons-material/UpdateRounded";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";

import { apiFetch } from "../api/api";
import { mediaUrl } from "../lib/media";

const newsSectionLabels = {
  top_headline: "Top Headline",
  side_headline: "Latest Headlines",
  feed_story: "Stories for you",
  default: "Auto placement",
};

const filters = {
  moment: [
    { value: "all", label: "All moments" },
    { value: "featured", label: "Featured" },
    { value: "published", label: "Published" },
    { value: "draft", label: "Drafts" },
  ],
  news: [
    { value: "all", label: "All news" },
    { value: "top_headline", label: "Top Headline" },
    { value: "side_headline", label: "Latest Headlines" },
    { value: "feed_story", label: "Stories for you" },
    { value: "draft", label: "Drafts" },
  ],
};

const summaryIcons = {
  Total: GridViewRoundedIcon,
  Featured: AutoAwesomeRoundedIcon,
  Published: CheckCircleRoundedIcon,
  Drafts: EditNoteRoundedIcon,
  Top: NewReleasesRoundedIcon,
  Latest: UpdateRoundedIcon,
  Stories: AutoStoriesRoundedIcon,
};

const summaryColors = {
  Total: {
    bg: "#eef5ff",
    iconBg: "#dceafe",
    icon: "#2563eb",
    value: "#1e3a8a",
  },
  Featured: {
    bg: "#fff8e8",
    iconBg: "#ffefbf",
    icon: "#f59e0b",
    value: "#92400e",
  },
  Published: {
    bg: "#ecfdf3",
    iconBg: "#d3f8df",
    icon: "#2e7d32",
    value: "#14532d",
  },
  Drafts: {
    bg: "#f6f0ff",
    iconBg: "#eadcff",
    icon: "#7c3aed",
    value: "#4c1d95",
  },
  Top: {
    bg: "#fff1f2",
    iconBg: "#ffe4e6",
    icon: "#e11d48",
    value: "#881337",
  },
  Latest: {
    bg: "#ecfeff",
    iconBg: "#cffafe",
    icon: "#0891b2",
    value: "#164e63",
  },
  Stories: {
    bg: "#fff7ed",
    iconBg: "#ffedd5",
    icon: "#ea580c",
    value: "#9a3412",
  },
};

const formatDate = (value) => {
  if (!value) return "";

  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const smallChipSx = {
  height: 23,
  fontSize: "0.66rem",
  fontWeight: 700,
  borderRadius: 999,
  maxWidth: "100%",
  bgcolor: "#ffffff",
  "& .MuiChip-label": {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    px: 0.9,
  },
};

export default function ContentList({ type }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");

  const config = useMemo(() => {
    return type === "moment"
      ? {
          title: "Moments Gallery",
          createPath: "/admin/moments/new",
          publicPath: "/moments",
          intro:
            "Manage public gallery cards, category filters and the Featured Moment top card.",
          emptyIcon: ImageRoundedIcon,
        }
      : {
          title: "News & Articles",
          createPath: "/admin/news/new",
          publicPath: "/news-articles",
          intro:
            "Manage Top Headline, Latest Headlines and Stories for you section-wise.",
          emptyIcon: AutoStoriesRoundedIcon,
        };
  }, [type]);

  async function load() {
    setLoading(true);
    setError("");

    try {
      const res = await apiFetch(`/admin/content?type=${type}`);
      setItems(res.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function removeItem(id) {
    if (!confirm("Delete this item permanently?")) return;

    try {
      await apiFetch(`/admin/content/${id}`, { method: "DELETE" });
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      alert(err.message);
    }
  }

  useEffect(() => {
    setActiveFilter("all");
    load();
  }, [type]);

  const visibleItems = useMemo(() => {
    if (activeFilter === "all") return items;

    if (activeFilter === "featured") {
      return items.filter((item) => item.is_featured);
    }

    if (activeFilter === "published" || activeFilter === "draft") {
      return items.filter((item) => item.status === activeFilter);
    }

    return items.filter((item) => item.display_section === activeFilter);
  }, [activeFilter, items]);

  const summary = useMemo(() => {
    if (type === "moment") {
      return [
        { label: "Total", value: items.length },
        {
          label: "Featured",
          value: items.filter((item) => item.is_featured).length,
        },
        {
          label: "Published",
          value: items.filter((item) => item.status === "published").length,
        },
        {
          label: "Drafts",
          value: items.filter((item) => item.status === "draft").length,
        },
      ];
    }

    return [
      {
        label: "Top",
        value: items.filter((item) => item.display_section === "top_headline")
          .length,
      },
      {
        label: "Latest",
        value: items.filter((item) => item.display_section === "side_headline")
          .length,
      },
      {
        label: "Stories",
        value: items.filter((item) => item.display_section === "feed_story")
          .length,
      },
      {
        label: "Drafts",
        value: items.filter((item) => item.status === "draft").length,
      },
    ];
  }, [items, type]);

  const EmptyIcon = config.emptyIcon;

  return (
    <Stack spacing={3}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.2, md: 3 },
          borderRadius: 4,
          background: "linear-gradient(135deg, #ffffff 0%, #f7fbf8 100%)",
          border: "1px solid rgba(46,125,50,0.08)",
          boxShadow: "0 16px 42px rgba(20,60,35,0.06)",
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2.5}
          justifyContent="space-between"
          alignItems={{ xs: "stretch", md: "center" }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: { xs: "1.35rem", md: "1.65rem" },
                fontWeight: 900,
                letterSpacing: "-0.04em",
                color: "#102018",
                lineHeight: 1.12,
              }}
            >
              {config.title}
            </Typography>

            <Typography
              sx={{
                mt: 0.7,
                fontSize: "0.9rem",
                color: "#667085",
                lineHeight: 1.65,
                maxWidth: 620,
              }}
            >
              {config.intro}
            </Typography>
          </Box>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
            <Button
              component="a"
              href={config.publicPath}
              target="_blank"
              startIcon={<VisibilityRoundedIcon sx={{ fontSize: 18 }} />}
              variant="outlined"
              sx={{
                height: 40,
                px: 2.2,
                borderRadius: 3,
                fontSize: "0.8rem",
                fontWeight: 800,
                color: "#2e7d32",
                borderColor: alpha("#2e7d32", 0.28),
                bgcolor: "rgba(255,255,255,0.75)",
                whiteSpace: "nowrap",
                "&:hover": {
                  bgcolor: alpha("#2e7d32", 0.05),
                  borderColor: "#2e7d32",
                },
              }}
            >
              Public View
            </Button>

            <Button
              component={Link}
              href={config.createPath}
              startIcon={<AddRoundedIcon sx={{ fontSize: 18 }} />}
              variant="contained"
              sx={{
                height: 40,
                px: 2.35,
                borderRadius: 3,
                fontSize: "0.8rem",
                fontWeight: 800,
                whiteSpace: "nowrap",
                background: "linear-gradient(135deg, #2e7d32, #43a047)",
                boxShadow: "0 8px 18px rgba(46,125,50,0.22)",
                "&:hover": {
                  background: "linear-gradient(135deg, #1b5e20, #2e7d32)",
                },
              }}
            >
              Add New
            </Button>
          </Stack>
        </Stack>

        <Box
          sx={{
            mt: 2.6,
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, minmax(0, 1fr))",
              md: "repeat(4, minmax(0, 1fr))",
            },
            gap: 1.6,
          }}
        >
          {summary.map((item) => {
            const colors = summaryColors[item.label] || summaryColors.Total;
            const Icon = summaryIcons[item.label] || GridViewRoundedIcon;

            return (
              <Box
                key={item.label}
                sx={{
                  height: 94,
                  minWidth: 0,
                  p: 1.55,
                  borderRadius: 3.2,
                  bgcolor: colors.bg,
                  border: `1px solid ${alpha(colors.icon, 0.18)}`,
                  display: "flex",
                  alignItems: "center",
                  gap: 1.25,
                  overflow: "hidden",
                  boxSizing: "border-box",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: `0 10px 24px ${alpha(colors.icon, 0.13)}`,
                  },
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: 2.5,
                    bgcolor: colors.iconBg,
                    color: colors.icon,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon sx={{ fontSize: 22 }} />
                </Box>

                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    sx={{
                      fontSize: "0.7rem",
                      color: "#667085",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      lineHeight: 1.2,
                    }}
                  >
                    {item.label}
                  </Typography>

                  <Typography
                    sx={{
                      mt: 0.35,
                      fontWeight: 900,
                      fontSize: "1.45rem",
                      color: colors.value,
                      lineHeight: 1,
                    }}
                  >
                    {item.value}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Paper>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 0.9,
        }}
      >
        {filters[type].map((filter) => (
          <Chip
            key={filter.value}
            label={filter.label}
            clickable
            onClick={() => setActiveFilter(filter.value)}
            variant={activeFilter === filter.value ? "filled" : "outlined"}
            sx={{
              height: 34,
              borderRadius: 2.4,
              px: 0.45,
              fontSize: "0.77rem",
              fontWeight: activeFilter === filter.value ? 800 : 700,
              ...(activeFilter === filter.value
                ? {
                    bgcolor: "#2e7d32",
                    color: "white",
                    boxShadow: "0 4px 10px rgba(46,125,50,0.22)",
                    "&:hover": { bgcolor: "#1b5e20" },
                  }
                : {
                    color: "#344054",
                    borderColor: alpha("#2e7d32", 0.22),
                    bgcolor: "rgba(255,255,255,0.85)",
                    "&:hover": {
                      bgcolor: alpha("#2e7d32", 0.05),
                      borderColor: alpha("#2e7d32", 0.42),
                    },
                  }),
            }}
          />
        ))}
      </Box>

      {error && (
        <Alert severity="error" sx={{ borderRadius: 3 }}>
          {error}
        </Alert>
      )}

      {loading && (
        <Box sx={{ py: 6, textAlign: "center" }}>
          <Typography color="text.secondary" sx={{ fontWeight: 600 }}>
            Loading content...
          </Typography>
        </Box>
      )}

      {!loading && visibleItems.length === 0 && (
        <Paper
          elevation={0}
          sx={{
            p: 5,
            textAlign: "center",
            borderRadius: 4,
            bgcolor: "white",
            border: `1px dashed ${alpha("#2e7d32", 0.25)}`,
          }}
        >
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              bgcolor: alpha("#2e7d32", 0.06),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 2,
            }}
          >
            <GridViewRoundedIcon
              sx={{ fontSize: 28, color: alpha("#2e7d32", 0.45) }}
            />
          </Box>

          <Typography variant="h6" fontWeight={800} sx={{ mb: 0.5 }}>
            No content found
          </Typography>

          <Typography color="text.secondary" sx={{ mb: 2.5, fontSize: "0.9rem" }}>
            Create the first item or choose another filter.
          </Typography>

          <Button
            component={Link}
            href={config.createPath}
            variant="contained"
            startIcon={<AddRoundedIcon />}
            sx={{
              borderRadius: 3,
              fontWeight: 800,
              background: "linear-gradient(135deg, #2e7d32, #43a047)",
            }}
          >
            Create Now
          </Button>
        </Paper>
      )}

      {!loading && visibleItems.length > 0 && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "minmax(0, 1fr)",
              sm: "repeat(2, minmax(0, 1fr))",
              lg: "repeat(3, minmax(0, 1fr))",
              xl: "repeat(4, minmax(0, 1fr))",
            },
            gap: 2.4,
            alignItems: "stretch",
          }}
        >
          {visibleItems.map((item) => (
            <Paper
              key={item.id}
              elevation={0}
              sx={{
                width: "100%",
                minWidth: 0,
                height: 410,
                borderRadius: 3.5,
                overflow: "hidden",
                bgcolor: "white",
                border: `1px solid ${alpha("#2e7d32", 0.08)}`,
                boxShadow:
                  "0 1px 3px rgba(16,24,40,0.04), 0 10px 28px rgba(20,60,35,0.06)",
                display: "flex",
                flexDirection: "column",
                boxSizing: "border-box",
                transition: "all 0.25s ease",
                "&:hover": {
                  transform: "translateY(-3px)",
                  borderColor: alpha("#2e7d32", 0.18),
                  boxShadow:
                    "0 2px 6px rgba(16,24,40,0.05), 0 16px 38px rgba(20,60,35,0.10)",
                },
              }}
            >
              <Box
                sx={{
                  height: 154,
                  flexShrink: 0,
                  position: "relative",
                  overflow: "hidden",
                  bgcolor: "#eef8f0",
                }}
              >
                {mediaUrl(item) ? (
                  <Box
                    component="img"
                    src={mediaUrl(item)}
                    alt={item.title}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      transition: "transform 0.45s ease",
                      ".MuiPaper-root:hover &": {
                        transform: "scale(1.04)",
                      },
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      background:
                        "linear-gradient(135deg, #edf8f0 0%, #ffffff 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: 3,
                        bgcolor: alpha("#2e7d32", 0.08),
                        color: alpha("#2e7d32", 0.45),
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <EmptyIcon sx={{ fontSize: 27 }} />
                    </Box>
                  </Box>
                )}

                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.18), transparent 55%)",
                  }}
                />

                {type === "moment" && item.is_featured && (
                  <Chip
                    icon={<StarRoundedIcon sx={{ fontSize: 14 }} />}
                    label="Featured"
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 10,
                      left: 10,
                      height: 26,
                      fontSize: "0.68rem",
                      fontWeight: 800,
                      bgcolor: "rgba(245,158,11,0.94)",
                      color: "white",
                      backdropFilter: "blur(8px)",
                      boxShadow: "0 8px 18px rgba(0,0,0,0.14)",
                      "& .MuiChip-icon": { color: "white" },
                    }}
                  />
                )}

                <Chip
                  size="small"
                  label={item.status}
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    height: 24,
                    fontSize: "0.64rem",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.03em",
                    bgcolor:
                      item.status === "published"
                        ? "rgba(46,125,50,0.92)"
                        : "rgba(100,116,139,0.90)",
                    color: "white",
                    backdropFilter: "blur(8px)",
                  }}
                />
              </Box>

              <Box
                sx={{
                  p: 1.9,
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  minHeight: 0,
                }}
              >
                <Box
                  sx={{
                    height: 52,
                    overflow: "hidden",
                    display: "flex",
                    flexWrap: "wrap",
                    alignContent: "flex-start",
                    gap: 0.55,
                    mb: 1,
                  }}
                >
                  {type === "news" && (
                    <Chip
                      size="small"
                      variant="outlined"
                      label={
                        newsSectionLabels[item.display_section] ||
                        "Auto placement"
                      }
                      sx={{
                        ...smallChipSx,
                        color: "#2e7d32",
                        borderColor: alpha("#2e7d32", 0.26),
                        bgcolor: alpha("#2e7d32", 0.04),
                      }}
                    />
                  )}

                  {item.category && (
                    <Chip
                      size="small"
                      variant="outlined"
                      label={item.category}
                      sx={smallChipSx}
                    />
                  )}

                  {type === "moment" && item.location && (
                    <Chip
                      size="small"
                      variant="outlined"
                      label={item.location}
                      sx={smallChipSx}
                    />
                  )}

                  {type === "moment" && item.year && (
                    <Chip
                      size="small"
                      variant="outlined"
                      label={item.year}
                      sx={smallChipSx}
                    />
                  )}

                  {type === "news" && item.source && (
                    <Chip
                      size="small"
                      variant="outlined"
                      label={item.source}
                      sx={smallChipSx}
                    />
                  )}
                </Box>

                <Typography
                  sx={{
                    height: 48,
                    fontSize: "0.98rem",
                    fontWeight: 900,
                    lineHeight: 1.25,
                    color: "#102018",
                    letterSpacing: "-0.02em",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    mb: 0.8,
                  }}
                >
                  {item.title}
                </Typography>

                <Typography
                  sx={{
                    height: 44,
                    fontSize: "0.8rem",
                    lineHeight: 1.45,
                    color: "#667085",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {item.excerpt || item.content || "No description added yet."}
                </Typography>

                <Box sx={{ flex: 1 }} />

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{
                    pt: 1.35,
                    mt: 1.3,
                    borderTop: `1px solid ${alpha("#000", 0.06)}`,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      fontSize: "0.72rem",
                      color: "#667085",
                      fontWeight: 700,
                    }}
                  >
                    {formatDate(item.created_at)}
                  </Typography>

                  <Stack direction="row" spacing={0.35}>
                    <IconButton
                      component="a"
                      href={config.publicPath}
                      target="_blank"
                      size="small"
                      sx={{
                        width: 31,
                        height: 31,
                        color: "#2e7d32",
                        "&:hover": { bgcolor: alpha("#2e7d32", 0.08) },
                      }}
                    >
                      <VisibilityRoundedIcon sx={{ fontSize: 17 }} />
                    </IconButton>

                    <IconButton
                      component={Link}
                      href={`${
                        type === "moment" ? "/admin/moments" : "/admin/news"
                      }/${item.id}/edit`}
                      size="small"
                      sx={{
                        width: 31,
                        height: 31,
                        color: "#1565c0",
                        "&:hover": { bgcolor: alpha("#1565c0", 0.08) },
                      }}
                    >
                      <EditRoundedIcon sx={{ fontSize: 17 }} />
                    </IconButton>

                    <IconButton
                      onClick={() => removeItem(item.id)}
                      size="small"
                      sx={{
                        width: 31,
                        height: 31,
                        color: "#d32f2f",
                        "&:hover": { bgcolor: alpha("#d32f2f", 0.08) },
                      }}
                    >
                      <DeleteRoundedIcon sx={{ fontSize: 17 }} />
                    </IconButton>
                  </Stack>
                </Stack>
              </Box>
            </Paper>
          ))}
        </Box>
      )}
    </Stack>
  );
}