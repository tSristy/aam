'use client';

import React from "react";
import bannerImg from "../../img/Embaded/12.jpg";
import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  alpha,
  Divider,
} from "@mui/material";
import Banner from "../../assets/Banner/Banner";
import { myTheme } from "../../assets/Theme/myTheme";
import {
  executiveCommittee2025,
  organogramLevels,
} from "./CommunityData";

const CommunityPage = () => {
  const president = executiveCommittee2025.filter(
    (m) => m.group === "president"
  );
  const vicePresidents = executiveCommittee2025.filter(
    (m) => m.group === "vice"
  );
  const secretaryTeam = executiveCommittee2025.filter(
    (m) => m.group === "general" || m.group === "joint"
  );
  const treasurer = executiveCommittee2025.filter(
    (m) => m.group === "treasurer"
  );
  const departmentSecretaries = executiveCommittee2025.filter(
    (m) => m.group === "secretary"
  );
  const executives = executiveCommittee2025.filter(
    (m) => m.group === "executive"
  );

  /* ── shared style objects ── */

  const sectionHeaderSx = {
    textAlign: "center",
    mb: 7,
  };

  const sectionTitleSx = {
    fontFamily: '"Playfair Display", serif',
    fontSize: { xs: "2rem", md: "2.75rem" },
    color: myTheme.palette.blue,
    fontWeight: 700,
    letterSpacing: "-0.01em",
    position: "relative",
    display: "inline-block",
  };

  const titleUnderlineSx = {
    width: 60,
    height: 3,
    borderRadius: 2,
    background: `linear-gradient(90deg, ${myTheme.palette.green}, ${myTheme.palette.blue})`,
    mx: "auto",
    mt: 1.25,
  };

  const sectionSubtitleSx = {
    fontSize: "1.05rem",
    color: myTheme.palette.miniText,
    maxWidth: 580,
    mx: "auto",
    lineHeight: 1.75,
    mt: 1.5,
  };

  const positionLabelSx = {
    display: "inline-flex",
    alignItems: "center",
    gap: 1.5,
    fontSize: ".78rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "2px",
    color: myTheme.palette.blue,
    mb: 3,
    pl: 3,
    position: "relative",
    "&::before": {
      content: '""',
      position: "absolute",
      left: 0,
      top: "50%",
      transform: "translateY(-50%)",
      width: "3px",
      height: "18px",
      background: `linear-gradient(180deg, ${myTheme.palette.green}, ${myTheme.palette.blue})`,
      borderRadius: "2px",
    },
    "&::after": {
      content: '""',
      display: "block",
      width: 40,
      height: "1px",
      bgcolor: alpha(myTheme.palette.blue, 0.2),
    },
  };

  /* ── decorative ornament ── */
  const Ornament = ({ color = myTheme.palette.green, size = 8 }) => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 0.75,
      }}
    >
      <Box
        sx={{
          width: size * 4,
          height: 1,
          bgcolor: alpha(color, 0.25),
          borderRadius: 1,
        }}
      />
      <Box
        sx={{
          width: size,
          height: size,
          borderRadius: "50%",
          bgcolor: color,
          opacity: 0.6,
        }}
      />
      <Box
        sx={{
          width: size * 4,
          height: 1,
          bgcolor: alpha(color, 0.25),
          borderRadius: 1,
        }}
      />
    </Box>
  );

  /* ── member card renderer ── */
  const renderMemberCard = (member, { presidentVariant = false } = {}) => {
    const baseNumber = member.id.toString().padStart(2, "0");

    if (presidentVariant) {
      return (
        <Box
          key={member.id}
          sx={{
            maxWidth: 620,
            mx: "auto",
            position: "relative",
            borderRadius: "24px",
            overflow: "hidden",
            background: `linear-gradient(145deg, ${myTheme.palette.blue} 0%, #1e3f68 100%)`,
            p: { xs: 3.5, md: 4.5 },
            boxShadow: "0 20px 60px rgba(30,63,104,0.25), 0 0 0 1px rgba(255,255,255,0.05) inset",
          }}
        >
          {/* Decorative background shapes */}
          <Box
            sx={{
              position: "absolute",
              top: -60,
              right: -60,
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.03)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: -40,
              left: -40,
              width: 150,
              height: 150,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.02)",
            }}
          />

          {/* Top row */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            sx={{ position: "relative", zIndex: 1 }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: ".72rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "2.5px",
                  color: myTheme.palette.yellow,
                  mb: 1,
                }}
              >
                {member.position}
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"Hind Siliguri", "Inter", sans-serif',
                  fontSize: { xs: "1.35rem", md: "1.65rem" },
                  fontWeight: 700,
                  color: "white",
                  lineHeight: 1.35,
                }}
              >
                {member.name}
              </Typography>
            </Box>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: "16px",
                bgcolor: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Typography
                sx={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: "1.3rem",
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: 1,
                }}
              >
                {baseNumber}
              </Typography>
            </Box>
          </Stack>

          {/* Bottom accent line */}
          <Box
            sx={{
              mt: 3,
              height: 2,
              borderRadius: 1,
              background: `linear-gradient(90deg, ${myTheme.palette.yellow}, transparent)`,
              opacity: 0.5,
            }}
          />
        </Box>
      );
    }

    return (
      <Box
        key={member.id}
        sx={{
          position: "relative",
          backgroundColor: "white",
          borderRadius: "16px",
          p: 2.75,
          boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 6px 24px rgba(54,116,181,0.06)",
          transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          overflow: "hidden",
          border: "1px solid",
          borderColor: alpha(myTheme.palette.blue, 0.06),
          "&:hover": {
            transform: "translateY(-6px)",
            boxShadow: "0 2px 4px rgba(0,0,0,0.04), 0 16px 40px rgba(54,116,181,0.12)",
            borderColor: alpha(myTheme.palette.green, 0.3),
            "& .card-accent-line": {
              width: "100%",
              opacity: 1,
            },
            "& .card-number": {
              color: myTheme.palette.green,
            },
          },
        }}
      >
        {/* Top accent line */}
        <Box
          className="card-accent-line"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            height: 2.5,
            width: 40,
            borderRadius: "0 2px 2px 0",
            background: `linear-gradient(90deg, ${myTheme.palette.green}, ${myTheme.palette.blue})`,
            opacity: 0.6,
            transition: "all 0.35s ease",
          }}
        />

        {/* Number */}
        <Typography
          className="card-number"
          sx={{
            position: "absolute",
            top: "0.85rem",
            right: "1.25rem",
            fontSize: "1.4rem",
            fontWeight: 800,
            color: alpha(myTheme.palette.blue, 0.08),
            fontFamily: '"Playfair Display", serif',
            lineHeight: 1,
            transition: "color 0.35s ease",
            userSelect: "none",
          }}
        >
          {baseNumber}
        </Typography>

        {/* Position */}
        <Typography
          sx={{
            fontSize: ".72rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            color: myTheme.palette.green,
            mb: 0.75,
            display: "flex",
            alignItems: "center",
            gap: 0.75,
          }}
        >
          <Box
            component="span"
            aria-hidden="true"
            sx={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              bgcolor: myTheme.palette.green,
              flexShrink: 0,
              display: "inline-block",
            }}
          />
          {member.position}
        </Typography>

        {/* Name */}
        <Typography
          sx={{
            fontFamily: '"Hind Siliguri", "Inter", sans-serif',
            fontSize: "1rem",
            fontWeight: 700,
            color: myTheme.palette.textColor,
            lineHeight: 1.45,
          }}
        >
          {member.name}
        </Typography>
      </Box>
    );
  };

  /* ── section block renderer ── */
  const renderSection = (label, members, gridSizes = { xs: 12, sm: 6, md: 4 }) => {
    if (members.length === 0) return null;
    return (
      <Box sx={{ mb: 6 }}>
        <Typography sx={positionLabelSx}>{label}</Typography>
        <Grid container spacing={2.5}>
          {members.map((m) => (
            <Grid size={gridSizes} key={m.id}>
              {renderMemberCard(m)}
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  return (
    <>
      {/* ── Banner ── */}
      <Banner
        bannerHeight="26rem"
        text={{
          supportTitle: "Community Leadership • 2025",
          mainTitle: "Executive Committee",
          descriptionText:
            "The dedicated leadership team guiding Amzad Ali Memorial Foundation's community initiatives.",
        }}
        img={bannerImg}
        alt="Community Leadership Banner"
      />

      {/* ── Organogram ── */}
      <Box
        sx={{
          py: { xs: 8, md: 10 },
          bgcolor: `linear-gradient(180deg, ${myTheme.palette.lightBlue} 0%, #ffffff 100%)`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle background decoration */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${alpha(myTheme.palette.blue, 0.03)} 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={sectionHeaderSx}>
            <Typography component="h2" sx={sectionTitleSx}>Organogram</Typography>
            <Box sx={titleUnderlineSx} />
            <Typography sx={sectionSubtitleSx}>
              A structured leadership to ensure accountability, transparency and
              effective community service.
            </Typography>
          </Box>

          <Box
            sx={{
              maxWidth: 960,
              mx: "auto",
              display: "flex",
              flexWrap: "wrap",
              gap: { xs: 1.5, md: 2 },
              justifyContent: "center",
              alignItems: "center",
              py: 3,
            }}
          >
            {organogramLevels.map((level, index) => (
              <React.Fragment key={level}>
                <Box
                  sx={{
                    backgroundColor: "white",
                    px: { xs: 2, md: 3 },
                    py: 1,
                    borderRadius: "50px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 6px 20px rgba(54,116,181,0.08)",
                    fontWeight: 600,
                    fontSize: { xs: ".82rem", md: ".9rem" },
                    color: myTheme.palette.blue,
                    border: "1px solid",
                    borderColor: alpha(myTheme.palette.blue, 0.06),
                    cursor: "default",
                    transition: "all 0.3s ease",
                    whiteSpace: "nowrap",
                    "&:hover": {
                      transform: "translateY(-3px)",
                      boxShadow: "0 4px 12px rgba(54,116,181,0.15)",
                      borderColor: alpha(myTheme.palette.green, 0.3),
                      color: myTheme.palette.green,
                    },
                  }}
                >
                  {level}
                </Box>

                {index < organogramLevels.length - 1 && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.25,
                      color: alpha(myTheme.palette.orange, 0.5),
                    }}
                  >
                    <Box
                      sx={{
                        width: 16,
                        height: 1,
                        bgcolor: alpha(myTheme.palette.blue, 0.15),
                        borderRadius: 1,
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: ".7rem",
                        fontWeight: 700,
                        color: alpha(myTheme.palette.orange, 0.6),
                      }}
                    >
                      ›
                    </Typography>
                    <Box
                      sx={{
                        width: 16,
                        height: 1,
                        bgcolor: alpha(myTheme.palette.blue, 0.15),
                        borderRadius: 1,
                      }}
                    />
                  </Box>
                )}
              </React.Fragment>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ── Executive Committee ── */}
      <Box
        sx={{
          py: { xs: 8, md: 10 },
          bgcolor: "#fafbff",
          position: "relative",
        }}
      >
        {/* Subtle top edge */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background: `linear-gradient(90deg, transparent, ${alpha(myTheme.palette.green, 0.15)}, transparent)`,
          }}
        />

        <Container maxWidth="lg">
          <Box sx={sectionHeaderSx}>
            <Typography component="h2" sx={sectionTitleSx}>
              Executive Committee (2025)
            </Typography>
            <Box sx={titleUnderlineSx} />
            <Typography
              sx={{
                ...sectionSubtitleSx,
                maxWidth: 720,
              }}
            >
              A diverse committee of professionals, community leaders and
              volunteers working together to continue the legacy of Amzad Ali
              Miah.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Ornament />
            </Box>
          </Box>

          {/* President */}
          <Box sx={{ mb: 7 }}>
            <Typography sx={positionLabelSx}>President</Typography>
            <Grid container spacing={3}>
              {president.map((m) => (
                <Grid size={{ xs: 12 }} key={m.id}>
                  {renderMemberCard(m, { presidentVariant: true })}
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Subtle divider */}
          <Box sx={{ maxWidth: 200, mx: "auto", mb: 7 }}>
            <Ornament size={5} color={alpha(myTheme.palette.blue, 0.2)} />
          </Box>

          {/* Vice Presidents */}
          {renderSection("Vice Presidents", vicePresidents, {
            xs: 12,
            sm: 6,
          })}

          <Box sx={{ maxWidth: 200, mx: "auto", mb: 7 }}>
            <Ornament size={5} color={alpha(myTheme.palette.blue, 0.2)} />
          </Box>

          {/* Secretary Team */}
          {renderSection("Secretary Team", secretaryTeam)}

          <Box sx={{ maxWidth: 200, mx: "auto", mb: 7 }}>
            <Ornament size={5} color={alpha(myTheme.palette.blue, 0.2)} />
          </Box>

          {/* Treasurer */}
          {renderSection("Treasurer", treasurer)}

          <Box sx={{ maxWidth: 200, mx: "auto", mb: 7 }}>
            <Ornament size={5} color={alpha(myTheme.palette.blue, 0.2)} />
          </Box>

          {/* Department Secretaries */}
          {renderSection("Department Secretaries", departmentSecretaries)}

          <Box sx={{ maxWidth: 200, mx: "auto", mb: 7 }}>
            <Ornament size={5} color={alpha(myTheme.palette.blue, 0.2)} />
          </Box>

          {/* Executive Members */}
          {renderSection("Executive Members", executives, {
            xs: 12,
            sm: 6,
            md: 4,
          })}
        </Container>
      </Box>

      {/* ── Bottom closing section ── */}
      <Box
        sx={{
          py: { xs: 6, md: 8 },
          background: `linear-gradient(180deg, #fafbff 0%, ${myTheme.palette.lightBlue} 100%)`,
          textAlign: "center",
        }}
      >
        <Container maxWidth="sm">
          <Ornament color={myTheme.palette.green} size={6} />
          <Typography
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontSize: { xs: "1.3rem", md: "1.5rem" },
              fontWeight: 600,
              color: myTheme.palette.blue,
              mt: 2.5,
              mb: 1,
              lineHeight: 1.5,
            }}
          >
            "Together we serve, together we grow."
          </Typography>
          <Typography
            sx={{
              fontSize: ".88rem",
              color: myTheme.palette.miniText,
              lineHeight: 1.7,
            }}
          >
            Every member of this committee brings unique strengths, united by a
            shared commitment to community upliftment.
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default CommunityPage;