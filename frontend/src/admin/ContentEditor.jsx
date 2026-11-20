'use client';

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";

import { apiFetch } from "../api/api";
import { mediaUrl } from "../lib/media";

const emptyForm = {
  title: "",
  display_section: "default",
  is_featured: false,
  category: "",
  location: "",
  year: "",
  source: "",
  tag: "",
  excerpt: "",
  content: "",
  status: "published",
  image: null,
};

const momentCategories = [
  "Healthcare",
  "Education",
  "Relief & Welfare",
  "Winter Support",
  "Legacy & Family",
];

const momentFieldPresets = {
  Healthcare: {
    locations: [
      "Mymensingh",
      "Clinic Yard",
      "Eye Camp",
      "Weekly Program",
      "Rural Area",
    ],
    years: ["2024", "2023", "2022", "Ongoing"],
  },
  Education: {
    locations: ["Local School", "Village Center", "School Ground", "Mymensingh"],
    years: ["2024", "2023", "2022"],
  },
  "Relief & Welfare": {
    locations: [
      "Mymensingh",
      "Flood-affected Area",
      "Community Field",
      "Community",
      "Rural Area",
      "Village",
    ],
    years: ["2024", "2023", "2022", "2021"],
  },
  "Winter Support": {
    locations: ["Remote Village", "Village", "Mymensingh"],
    years: ["2024", "2023", "2022"],
  },
  "Legacy & Family": {
    locations: ["Family Archive", "Mymensingh", "Government of Bangladesh"],
    years: ["Legacy", "Family", "2007"],
  },
};

const newsCategories = [
  "Community",
  "Health",
  "Education",
  "Awareness",
  "Volunteer Stories",
  "Women & Children",
  "Relief & Welfare",
];

const newsSections = [
  {
    value: "top_headline",
    label: "Top Headline",
    helper: "Large main article card at the top of News & Articles.",
  },
  {
    value: "side_headline",
    label: "Latest Headlines",
    helper:
      "Small text headline cards beside the main story. Only title and short description are needed.",
  },
  {
    value: "feed_story",
    label: "Stories for you",
    helper:
      "Article cards in the bottom story feed with image, source and short description.",
  },
  {
    value: "default",
    label: "Auto placement",
    helper: "The page will place it by newest-first order.",
  },
];

const newsQuickOptions = {
  top_headline: {
    categories: ["Community", "Health", "Relief & Welfare"],
    tags: ["Top Story", "Featured", "Impact Story"],
    sources: ["Foundation Desk", "Health Desk", "Community Desk"],
  },
  side_headline: {
    categories: ["Health", "Education", "Volunteer Stories", "Community"],
    tags: ["Update", "Latest", "Notice"],
    sources: ["Foundation Desk", "Community Voices", "Field Report"],
  },
  feed_story: {
    categories: newsCategories,
    tags: ["Article", "Story", "Field Report"],
    sources: [
      "Foundation Desk",
      "Community Voices",
      "Field Report",
      "Health Desk",
      "Editorial",
      "Community Desk",
    ],
  },
  default: {
    categories: newsCategories,
    tags: ["Article", "Update", "Top Story"],
    sources: ["Foundation Desk", "Community Voices", "Field Report"],
  },
};

function getImagePreview(preview, existingImage) {
  return preview || existingImage || "";
}

function PreviewPlaceholder({ text = "Choose an image to preview" }) {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      spacing={1}
      sx={{
        height: "100%",
        minHeight: "inherit",
        color: "text.secondary",
        textAlign: "center",
        px: 2,
      }}
    >
      <Box
        sx={{
          width: 58,
          height: 58,
          borderRadius: 4,
          display: "grid",
          placeItems: "center",
          bgcolor: "rgba(46,125,50,0.08)",
          color: "rgba(46,125,50,0.55)",
        }}
      >
        <ImageRoundedIcon sx={{ fontSize: 31 }} />
      </Box>

      <Typography
        sx={{
          fontSize: ".9rem",
          fontWeight: 650,
          color: "#64748b",
        }}
      >
        {text}
      </Typography>
    </Stack>
  );
}

function MomentPreview({ form, preview, existingImage }) {
  const image = getImagePreview(preview, existingImage);

  return (
    <Box sx={{ width: "100%" }}>
      <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mb: 2 }}>
        <Box
          sx={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
            bgcolor: "rgba(46,125,50,0.10)",
            color: "#2e7d32",
            flexShrink: 0,
          }}
        >
          <VisibilityRoundedIcon sx={{ fontSize: 20 }} />
        </Box>

        <Box sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              fontWeight: 900,
              color: "#111827",
              fontSize: "1rem",
              lineHeight: 1.15,
            }}
          >
            Live public preview
          </Typography>

          <Typography
            sx={{
              color: "#64748b",
              fontSize: ".78rem",
              mt: 0.25,
              lineHeight: 1.5,
            }}
          >
            Preview how this moment will appear on the website.
          </Typography>
        </Box>
      </Stack>

      {form.is_featured && (
        <Box
          sx={{
            width: "100%",
            borderRadius: 5,
            overflow: "hidden",
            position: "relative",
            minHeight: { xs: 250, md: 285 },
            boxShadow: "0 20px 52px rgba(15,23,42,0.16)",
            background: image
              ? `url(${image}) center/cover`
              : "linear-gradient(135deg,#edf7ef,#f9fcfa)",
            mb: 2.25,
            border: "1px solid rgba(46,125,50,0.08)",
          }}
        >
          {!image && <PreviewPlaceholder text="Choose an image" />}

          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.72), rgba(0,0,0,0.12) 45%, transparent 72%)",
            }}
          />

          <Chip
            size="small"
            icon={<StarRoundedIcon sx={{ fontSize: "1rem !important" }} />}
            label="Featured Moment"
            sx={{
              position: "absolute",
              top: 16,
              left: 16,
              bgcolor: "rgba(46,125,50,0.94)",
              color: "white",
              fontWeight: 850,
              height: 30,
              borderRadius: 999,
              boxShadow: "0 10px 24px rgba(0,0,0,0.20)",
              "& .MuiChip-icon": {
                color: "white",
              },
            }}
          />

          <Box
            sx={{
              position: "absolute",
              bottom: 20,
              left: 20,
              right: 20,
            }}
          >
            <Typography
              sx={{
                fontSize: ".72rem",
                letterSpacing: 1.5,
                textTransform: "uppercase",
                color: "#d7f6dc",
                fontWeight: 850,
                mb: 0.75,
              }}
            >
              Featured Preview
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: "1.15rem", md: "1.32rem" },
                fontWeight: 950,
                color: "white",
                lineHeight: 1.22,
                mb: 0.7,
                textShadow: "0 2px 12px rgba(0,0,0,0.26)",
              }}
            >
              {form.title || "Featured moment title"}
            </Typography>

            <Typography
              sx={{
                fontSize: ".88rem",
                color: "rgba(255,255,255,.90)",
                fontWeight: 550,
              }}
            >
              {form.location || "Location"} • {form.year || "Year"}
            </Typography>
          </Box>
        </Box>
      )}

      <Box
        sx={{
          width: "100%",
          borderRadius: 5,
          overflow: "hidden",
          position: "relative",
          minHeight: { xs: 285, md: 325 },
          boxShadow: "0 18px 46px rgba(15,23,42,0.13)",
          background: image
            ? `url(${image}) center/cover`
            : "linear-gradient(135deg,#edf7ef,#f9fcfa)",
          border: "1px solid rgba(46,125,50,0.08)",
        }}
      >
        {!image && <PreviewPlaceholder />}

        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.84), rgba(0,0,0,0.20) 48%, transparent 78%)",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            bottom: 20,
            left: 20,
            right: 20,
          }}
        >
          <Typography
            sx={{
              fontSize: ".74rem",
              letterSpacing: 1.35,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.78)",
              fontWeight: 750,
              mb: 0.8,
            }}
          >
            Moment Card Preview
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "1.12rem", md: "1.26rem" },
              fontWeight: 950,
              color: "white",
              lineHeight: 1.25,
              mb: 0.75,
              textShadow: "0 2px 12px rgba(0,0,0,0.26)",
            }}
          >
            {form.title || "Moment title will appear here"}
          </Typography>

          <Typography
            sx={{
              fontSize: ".86rem",
              color: "rgba(255,255,255,0.90)",
              fontWeight: 550,
            }}
          >
            {form.location || "Location"} • {form.year || "Year"}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          mt: 1.8,
          p: 1.55,
          borderRadius: 4,
          bgcolor: "#f8fbf8",
          border: "1px solid #e5efe7",
        }}
      >
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {form.is_featured && (
            <Chip
              size="small"
              icon={<StarRoundedIcon />}
              label="Featured"
              color="success"
              sx={{ fontWeight: 750 }}
            />
          )}

          <Chip
            size="small"
            label={form.category || "Category"}
            color="success"
            variant="outlined"
            sx={{ fontWeight: 750 }}
          />

          <Chip
            size="small"
            label={form.status || "published"}
            variant="outlined"
            sx={{ fontWeight: 750, textTransform: "capitalize" }}
          />
        </Stack>
      </Box>
    </Box>
  );
}

function NewsPreview({ form, preview, existingImage }) {
  const image = getImagePreview(preview, existingImage);
  const section =
    newsSections.find((item) => item.value === form.display_section)?.label ||
    "Auto placement";

  return (
    <Box>
      <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mb: 2 }}>
        <Box
          sx={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
            bgcolor: "rgba(46,125,50,0.10)",
            color: "#2e7d32",
            flexShrink: 0,
          }}
        >
          <VisibilityRoundedIcon sx={{ fontSize: 20 }} />
        </Box>

        <Box>
          <Typography
            sx={{
              fontWeight: 900,
              color: "#111827",
              fontSize: "1rem",
              lineHeight: 1.15,
            }}
          >
            Live public preview
          </Typography>

          <Typography
            sx={{
              color: "#64748b",
              fontSize: ".78rem",
              mt: 0.25,
              lineHeight: 1.5,
            }}
          >
            Preview how this article section will look.
          </Typography>
        </Box>
      </Stack>

      {form.display_section === "side_headline" ? (
        <Paper
          elevation={0}
          sx={{
            p: 2.4,
            borderRadius: 4,
            border: "1px solid #e6eee8",
            bgcolor: "white",
          }}
        >
          <Typography
            sx={{
              fontSize: "1rem",
              fontWeight: 850,
              color: "#1f2937",
              mb: 0.6,
              lineHeight: 1.35,
            }}
          >
            {form.title || "Latest headline title"}
          </Typography>

          <Typography
            sx={{
              fontSize: ".86rem",
              color: "text.secondary",
              lineHeight: 1.65,
            }}
          >
            {form.excerpt || "Short description will appear under the headline."}
          </Typography>
        </Paper>
      ) : form.display_section === "feed_story" ? (
        <Paper
          elevation={0}
          sx={{
            display: "flex",
            borderRadius: 4,
            overflow: "hidden",
            border: "1px solid #e6eee8",
            boxShadow: "0 8px 28px rgba(0,0,0,0.06)",
            bgcolor: "white",
            minHeight: 160,
          }}
        >
          <Box
            sx={{
              width: { xs: 128, md: 160 },
              flexShrink: 0,
              background: image
                ? `url(${image}) center/cover`
                : "linear-gradient(135deg,#e8f5e9,#f9fcfa)",
              display: "grid",
              placeItems: "center",
            }}
          >
            {!image && (
              <ArticleRoundedIcon sx={{ color: "#2e7d32", opacity: 0.35 }} />
            )}
          </Box>

          <Box sx={{ p: 2, flex: 1 }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.55 }}>
              <Typography
                variant="caption"
                sx={{
                  color: "#2e7d32",
                  fontWeight: 850,
                  textTransform: "uppercase",
                }}
              >
                {form.category || "Category"}
              </Typography>

              <Typography variant="caption" color="text.secondary">
                • {form.source || "Source"}
              </Typography>
            </Stack>

            <Typography
              sx={{
                fontWeight: 900,
                color: "#1f2937",
                mb: 0.5,
                fontSize: "1rem",
                lineHeight: 1.28,
              }}
            >
              {form.title || "Story title"}
            </Typography>

            <Typography
              sx={{
                fontSize: ".84rem",
                color: "text.secondary",
                lineHeight: 1.55,
              }}
            >
              {form.excerpt || "Short article description will appear here."}
            </Typography>
          </Box>
        </Paper>
      ) : (
        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            border: "1px solid #e6eee8",
            bgcolor: "white",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          <Box
            sx={{
              height: { xs: 220, md: 250 },
              background: image
                ? `url(${image}) center/cover`
                : "linear-gradient(135deg,#e8f5e9,#f9fcfa)",
              display: "grid",
              placeItems: "center",
            }}
          >
            {!image && (
              <Typography color="text.secondary">
                Choose an image to preview
              </Typography>
            )}
          </Box>

          <Box sx={{ p: 2.25 }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
              <Chip
                size="small"
                label={form.tag || "Top Story"}
                sx={{
                  bgcolor: "#2e7d32",
                  color: "white",
                  fontWeight: 800,
                }}
              />

              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  textTransform: "uppercase",
                  letterSpacing: 1.2,
                }}
              >
                {form.category || "Community"}
              </Typography>
            </Stack>

            <Typography
              sx={{
                fontSize: "1.18rem",
                fontWeight: 950,
                lineHeight: 1.25,
                color: "#1f2937",
                mb: 1,
              }}
            >
              {form.title || "Article title will appear here"}
            </Typography>

            <Typography
              sx={{
                color: "text.secondary",
                fontSize: ".88rem",
                lineHeight: 1.7,
              }}
            >
              {form.excerpt || "Article short description will appear here."}
            </Typography>

            <Typography
              variant="caption"
              sx={{
                display: "block",
                color: "text.secondary",
                mt: 1.8,
              }}
            >
              {form.location || form.year || "Timestamp / location"}
            </Typography>
          </Box>
        </Paper>
      )}

      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 1.5 }}>
        <Chip size="small" label={section} color="success" variant="outlined" />
        <Chip
          size="small"
          label={form.status || "published"}
          variant="outlined"
          sx={{ textTransform: "capitalize" }}
        />
      </Stack>
    </Box>
  );
}

export default function ContentEditor({ type }) {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const router = useRouter();

  const [form, setForm] = useState(emptyForm);
  const [preview, setPreview] = useState("");
  const [existingImage, setExistingImage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const backPath = type === "moment" ? "/admin/moments" : "/admin/news";
  const publicPath = type === "moment" ? "/moments" : "/news-articles";

  const title = useMemo(() => {
    if (type === "moment") return isEdit ? "Edit Moment" : "Add New Moment";
    return isEdit ? "Edit News / Article" : "Add News / Article";
  }, [type, isEdit]);

  const currentMomentPresets = momentFieldPresets[form.category] || {
    locations: [],
    years: [],
  };

  const currentNewsOptions =
    newsQuickOptions[form.display_section] || newsQuickOptions.default;

  useEffect(() => {
    if (!isEdit) {
      setForm({
        ...emptyForm,
        display_section: type === "moment" ? "default" : "feed_story",
      });
      setPreview("");
      setExistingImage("");
      return;
    }

    async function load() {
      try {
        const res = await apiFetch(`/admin/content?type=${type}`);
        const item = res.data.find((row) => String(row.id) === String(id));

        if (!item) throw new Error("Content not found.");

        setForm({
          title: item.title || "",
          display_section:
            item.display_section || (type === "moment" ? "default" : "feed_story"),
          is_featured: Boolean(item.is_featured),
          category: item.category || "",
          location: item.location || "",
          year: item.year || "",
          source: item.source || "",
          tag: item.tag || "",
          excerpt: item.excerpt || "",
          content: item.content || "",
          status: item.status || "published",
          image: null,
        });

        setExistingImage(mediaUrl(item));
      } catch (err) {
        setError(err.message);
      }
    }

    load();
  }, [id, isEdit, type]);

  function updateField(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleImageChange(e) {
    const file = e.target.files?.[0];
    setForm((prev) => ({ ...prev, image: file || null }));

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const body = new FormData();

      body.append("type", type);
      body.append(
        "display_section",
        type === "moment" ? "default" : form.display_section
      );
      body.append(
        "is_featured",
        type === "moment" ? String(form.is_featured) : "false"
      );
      body.append("title", form.title);
      body.append("category", form.category);
      body.append("location", form.location);
      body.append("year", form.year);
      body.append("source", form.source);
      body.append("tag", form.tag);
      body.append("excerpt", form.excerpt);
      body.append("content", form.content);
      body.append("status", form.status);

      if (form.image) body.append("image", form.image);

      await apiFetch(isEdit ? `/admin/content/${id}` : "/admin/content", {
        method: isEdit ? "PUT" : "POST",
        body,
      });

      router.push(backPath);
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  const showNewsImage = type === "news" && form.display_section !== "side_headline";
  const showNewsMeta = type === "news" && form.display_section !== "side_headline";
  const showNewsBody = type === "news" && form.display_section !== "side_headline";

  return (
    <Stack spacing={2.5}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.25, md: 3 },
          borderRadius: 5,
          border: "1px solid rgba(46,125,50,.09)",
          boxShadow: "0 14px 42px rgba(20,60,35,.07)",
          background: "rgba(255,255,255,.92)",
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          spacing={2}
          alignItems={{ xs: "stretch", sm: "center" }}
        >
          <Box>
            <Typography variant="h5" fontWeight={950}>
              {title}
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                mt: 0.45,
                maxWidth: 820,
                fontSize: ".9rem",
                lineHeight: 1.7,
              }}
            >
              {type === "moment"
                ? "Choose category first, then use suggested location/year options. Mark one moment as Featured to control the top card."
                : "Choose the article section first."}
            </Typography>
          </Box>

          <Stack direction="row" spacing={1}>
            <Button
              component={Link}
              href={backPath}
              startIcon={<ArrowBackRoundedIcon />}
              variant="outlined"
              color="success"
              sx={{ borderRadius: 999 }}
            >
              Back
            </Button>

            <Button
              component="a"
              href={publicPath}
              target="_blank"
              startIcon={<VisibilityRoundedIcon />}
              variant="outlined"
              color="success"
              sx={{ borderRadius: 999 }}
            >
              Public View
            </Button>
          </Stack>
        </Stack>
      </Paper>

      {error && <Alert severity="error">{error}</Alert>}

      <Grid container spacing={3} alignItems="flex-start">
        <Grid size={{ xs: 12, lg: 6 }}>
          <Paper
            component="form"
            onSubmit={handleSubmit}
            elevation={0}
            sx={{
              p: { xs: 2.25, md: 3 },
              borderRadius: 5,
              boxShadow: "0 14px 42px rgba(20,60,35,.07)",
              border: "1px solid rgba(46,125,50,.09)",
              background: "rgba(255,255,255,.94)",
            }}
          >
            <Stack spacing={2.25}>
              {type === "news" && (
                <TextField
                  select
                  label="Where should this appear?"
                  value={form.display_section}
                  onChange={(e) => updateField("display_section", e.target.value)}
                  fullWidth
                  helperText={
                    newsSections.find((item) => item.value === form.display_section)
                      ?.helper
                  }
                >
                  {newsSections.map((section) => (
                    <MenuItem key={section.value} value={section.value}>
                      {section.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}

              {type === "moment" && (
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: 4,
                    bgcolor: "#f7fbf8",
                    border: "1px solid #e1efe5",
                  }}
                >
                  <FormControlLabel
                    control={
                      <Switch
                        color="success"
                        checked={form.is_featured}
                        onChange={(e) =>
                          updateField("is_featured", e.target.checked)
                        }
                      />
                    }
                    label={
                      <Box>
                        <Typography sx={{ fontWeight: 850, fontSize: ".94rem" }}>
                          Featured Moment
                        </Typography>

                        <Typography
                          sx={{
                            color: "text.secondary",
                            fontSize: ".78rem",
                            lineHeight: 1.6,
                          }}
                        >
                          Show this item in the large top feature card.
                        </Typography>
                      </Box>
                    }
                  />
                </Paper>
              )}

              <TextField
                label="Title"
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
                fullWidth
                required
              />

              {type === "moment" ? (
                <>
                  <TextField
                    select
                    label="Moment Category"
                    value={form.category}
                    onChange={(e) => updateField("category", e.target.value)}
                    fullWidth
                    required
                    helperText="This controls the public filter chips on the Moments page."
                  >
                    <MenuItem value="">Select category</MenuItem>
                    {momentCategories.map((cat) => (
                      <MenuItem key={cat} value={cat}>
                        {cat}
                      </MenuItem>
                    ))}
                  </TextField>

                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Autocomplete
                        freeSolo
                        options={currentMomentPresets.locations}
                        value={form.location || ""}
                        onInputChange={(_, value) =>
                          updateField("location", value || "")
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Location / Label"
                            placeholder="Family Archive"
                            helperText={
                              form.category
                                ? "Suggested options change by category. You can also type custom text."
                                : "Select category first to get suggestions."
                            }
                          />
                        )}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Autocomplete
                        freeSolo
                        options={currentMomentPresets.years}
                        value={form.year || ""}
                        onInputChange={(_, value) => updateField("year", value || "")}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Year / Label"
                            placeholder="Legacy"
                            helperText="Use values like 2024, Ongoing, Legacy or Family."
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </>
              ) : (
                <>
                  <Autocomplete
                    freeSolo
                    options={currentNewsOptions.categories}
                    value={form.category || ""}
                    onInputChange={(_, value) => updateField("category", value || "")}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Category"
                        helperText="Suggested options change by selected article section."
                      />
                    )}
                  />

                  {showNewsMeta && (
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        borderRadius: 4,
                        bgcolor: "#fbfdfb",
                        border: "1px solid rgba(46,125,50,0.10)",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: ".82rem",
                          fontWeight: 850,
                          color: "#1f2937",
                          mb: 1.5,
                        }}
                      >
                        Article Display Details
                      </Typography>

                      <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 5 }}>
                          <Autocomplete
                            freeSolo
                            options={currentNewsOptions.tags}
                            value={form.tag || ""}
                            onInputChange={(_, value) =>
                              updateField("tag", value || "")
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Tag"
                                placeholder="Top Story"
                                helperText="Small label shown on article cards."
                                fullWidth
                              />
                            )}
                          />
                        </Grid>

                        <Grid size={{ xs: 12, md: 7 }}>
                          <Autocomplete
                            freeSolo
                            options={currentNewsOptions.sources}
                            value={form.source || ""}
                            onInputChange={(_, value) =>
                              updateField("source", value || "")
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Source"
                                placeholder="Foundation Desk"
                                helperText="Where this article/news update comes from."
                                fullWidth
                              />
                            )}
                          />
                        </Grid>
                      </Grid>
                    </Paper>
                  )}

                  {form.display_section !== "side_headline" && (
                    <TextField
                      label="Location / Timestamp"
                      value={form.location}
                      onChange={(e) => updateField("location", e.target.value)}
                      fullWidth
                      placeholder="Mymensingh"
                    />
                  )}
                </>
              )}

              <TextField
                label={
                  type === "moment"
                    ? "Short caption"
                    : form.display_section === "side_headline"
                      ? "Headline description"
                      : "Short description"
                }
                value={form.excerpt}
                onChange={(e) => updateField("excerpt", e.target.value)}
                fullWidth
                multiline
                minRows={
                  type === "news" && form.display_section === "side_headline"
                    ? 2
                    : 3
                }
                helperText={
                  type === "news" && form.display_section === "side_headline"
                    ? "Only this description appears under the latest headline card."
                    : ""
                }
              />

              {type === "moment" && (
                <TextField
                  label="Moment details"
                  value={form.content}
                  onChange={(e) => updateField("content", e.target.value)}
                  fullWidth
                  multiline
                  minRows={5}
                />
              )}

              {showNewsBody && (
                <TextField
                  label="Article body"
                  value={form.content}
                  onChange={(e) => updateField("content", e.target.value)}
                  fullWidth
                  multiline
                  minRows={7}
                />
              )}

              <Divider />

              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  label="Status"
                  value={form.status}
                  onChange={(e) => updateField("status", e.target.value)}
                >
                  <MenuItem value="published">Published</MenuItem>
                  <MenuItem value="draft">Draft</MenuItem>
                </Select>
              </FormControl>

              {(type === "moment" || showNewsImage) && (
                <>
                  <Button
                    variant="outlined"
                    component="label"
                    color="success"
                    startIcon={<CloudUploadRoundedIcon />}
                    sx={{
                      borderRadius: 3,
                      py: 1.25,
                      fontWeight: 800,
                    }}
                  >
                    Choose Image
                    <input
                      hidden
                      accept="image/png,image/jpeg,image/webp"
                      type="file"
                      onChange={handleImageChange}
                    />
                  </Button>

                  <Typography variant="caption" color="text.secondary">
                    Recommended image size: 1200x800px or larger. JPG, PNG and
                    WEBP are supported.
                  </Typography>
                </>
              )}

              <Button
                type="submit"
                variant="contained"
                color="success"
                size="large"
                startIcon={<SaveRoundedIcon />}
                disabled={saving}
                sx={{
                  borderRadius: 3,
                  py: 1.35,
                  fontWeight: 850,
                }}
              >
                {saving ? "Saving..." : isEdit ? "Update Content" : "Publish Content"}
              </Button>
            </Stack>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.25, md: 2.75 },
              borderRadius: 5,
              position: { lg: "sticky" },
              top: { lg: 24 },
              boxShadow: "0 14px 42px rgba(20,60,35,.07)",
              border: "1px solid rgba(46,125,50,.09)",
              background: "rgba(255,255,255,.96)",
            }}
          >
            {type === "moment" ? (
              <MomentPreview
                form={form}
                preview={preview}
                existingImage={existingImage}
              />
            ) : (
              <NewsPreview
                form={form}
                preview={preview}
                existingImage={existingImage}
              />
            )}
          </Paper>
        </Grid>
      </Grid>
    </Stack>
  );
}