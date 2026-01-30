import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Box,
  Container,
  Grid,
  IconButton,
  Divider
} from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import LocationOnIcon from "@material-ui/icons/LocationOn";

const useStyles = makeStyles((theme) => ({
  footer: {
    background: "linear-gradient(135deg, #F7F2FB 0%, #97BCEE 100%)",
    padding: theme.spacing(6, 0, 3),
    marginTop: "auto",
  },
  brand: {
    fontWeight: 700,
    fontSize: "1.5rem",
    background: "linear-gradient(135deg, #5998CA 0%, #CD75CE 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    marginBottom: theme.spacing(2),
  },
  description: {
    color: "#7C84A4",
    marginBottom: theme.spacing(2),
    lineHeight: 1.8,
  },
  sectionTitle: {
    fontWeight: 600,
    color: "#5998CA",
    marginBottom: theme.spacing(2),
  },
  link: {
    color: "#7C84A4",
    textDecoration: "none",
    display: "block",
    marginBottom: theme.spacing(1),
    transition: "all 0.2s ease",
    "&:hover": {
      color: "#5998CA",
      transform: "translateX(5px)",
    },
  },
  contactItem: {
    display: "flex",
    alignItems: "center",
    color: "#7C84A4",
    marginBottom: theme.spacing(1.5),
    "& svg": {
      marginRight: theme.spacing(1),
      color: "#5998CA",
    },
  },
  socialIcon: {
    color: "#7C84A4",
    transition: "all 0.3s ease",
    "&:hover": {
      color: "#CD75CE",
      transform: "scale(1.2)",
    },
  },
  divider: {
    margin: theme.spacing(3, 0, 2),
    background: "linear-gradient(90deg, transparent, #97BCEE, transparent)",
  },
  copyright: {
    color: "#7C84A4",
    textAlign: "center",
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <Box className={classes.footer}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* 品牌資訊 */}
          <Grid item xs={12} md={4}>
            <Typography className={classes.brand}>
              TigerLady's 老虎小姐
            </Typography>
            <Typography variant="body2" className={classes.description}>
              專業美睫、霧眉服務，打造專屬於妳的精緻魅力。我們致力於提供最優質的美容體驗，讓每位顧客都能展現自信美麗。
            </Typography>
            <Box>
              <IconButton className={classes.socialIcon} aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton className={classes.socialIcon} aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* 快速連結 */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" className={classes.sectionTitle}>
              快速連結
            </Typography>
            <Link to="/" className={classes.link}>
              首頁
            </Link>
            <Link to="/services" className={classes.link}>
              服務項目
            </Link>
            <Link to="/schedule" className={classes.link}>
              線上預約
            </Link>
            <Link to="/about" className={classes.link}>
              關於我們
            </Link>
          </Grid>

          {/* 聯絡資訊 */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" className={classes.sectionTitle}>
              聯絡我們
            </Typography>
            <Box className={classes.contactItem}>
              <PhoneIcon />
              <Typography variant="body2">0912-345-678</Typography>
            </Box>
            <Box className={classes.contactItem}>
              <EmailIcon />
              <Typography variant="body2">tigerlady@example.com</Typography>
            </Box>
            <Box className={classes.contactItem}>
              <LocationOnIcon />
              <Typography variant="body2">台北市信義區美麗街123號</Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider className={classes.divider} />

        <Typography variant="body2" className={classes.copyright}>
          © {new Date().getFullYear()} TigerLady's 老虎小姐. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}