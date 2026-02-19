import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Box,
  Paper
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import StarIcon from "@material-ui/icons/Star";
import PeopleIcon from "@material-ui/icons/People";
import LocalFloristIcon from "@material-ui/icons/LocalFlorist";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    background: "#F7F2FB",
  },
  hero: {
    minHeight: "85vh",
    background: "linear-gradient(135deg, #5998CA 0%, #97BCEE 50%, #CD75CE 100%)",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    "&::before": {
      content: '""',
      position: "absolute",
      width: "500px",
      height: "500px",
      background: "radial-gradient(circle, rgba(151, 188, 238, 0.3) 0%, transparent 70%)",
      top: "-100px",
      left: "-100px",
      animation: "$float 6s ease-in-out infinite",
    },
    "&::after": {
      content: '""',
      position: "absolute",
      width: "400px",
      height: "400px",
      background: "radial-gradient(circle, rgba(205, 117, 206, 0.3) 0%, transparent 70%)",
      bottom: "-100px",
      right: "-100px",
      animation: "$float 8s ease-in-out infinite reverse",
    },
  },
  "@keyframes float": {
    "0%, 100%": {
      transform: "translate(0, 0)",
    },
    "50%": {
      transform: "translate(30px, 30px)",
    },
  },
  "@keyframes fadeInUp": {
    from: {
      opacity: 0,
      transform: "translateY(30px)",
    },
    to: {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
  heroContent: {
    position: "relative",
    zIndex: 1,
    background: "rgba(247, 242, 251, 0.95)",
    backdropFilter: "blur(20px)",
    padding: theme.spacing(6),
    borderRadius: 24,
    boxShadow: "0 20px 60px rgba(89, 152, 202, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.5)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    animation: "$fadeInUp 0.8s ease-out",
    textAlign: "center",
  },
  heroTitle: {
    fontWeight: 700,
    marginBottom: theme.spacing(2),
    background: "linear-gradient(135deg, #5998CA 0%, #CD75CE 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  heroSubtitle: {
    color: "#7C84A4",
    marginBottom: theme.spacing(3),
    fontWeight: 500,
    fontSize: "1.2rem",
  },
  primaryButton: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1.5, 5),
    borderRadius: 30,
    fontSize: "1.1rem",
    fontWeight: 600,
    background: "linear-gradient(135deg, #5998CA 0%, #7C84A4 50%, #CD75CE 100%)",
    backgroundSize: "200% 200%",
    color: "#fff",
    boxShadow: "0 8px 20px rgba(89, 152, 202, 0.4)",
    transition: "all 0.4s ease",
    "&:hover": {
      backgroundPosition: "100% 0",
      boxShadow: "0 12px 30px rgba(205, 117, 206, 0.5)",
      transform: "translateY(-3px)",
    },
  },
  section: {
    padding: theme.spacing(10, 0),
  },
  sectionTitle: {
    fontWeight: 700,
    marginBottom: theme.spacing(1),
    textAlign: "center",
    background: "linear-gradient(135deg, #5998CA 0%, #CD75CE 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  sectionSubtitle: {
    color: "#7C84A4",
    textAlign: "center",
    marginBottom: theme.spacing(6),
    fontSize: "1.1rem",
  },
  card: {
    borderRadius: 24,
    boxShadow: "0 8px 30px rgba(89, 152, 202, 0.15)",
    transition: "all 0.4s ease",
    overflow: "hidden",
    height: "100%",
    "&:hover": {
      transform: "translateY(-10px)",
      boxShadow: "0 15px 40px rgba(205, 117, 206, 0.25)",
    },
  },
  media: {
    height: 280,
    position: "relative",
    "&::after": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "linear-gradient(180deg, transparent 0%, rgba(89, 152, 202, 0.1) 100%)",
    },
  },
  cardContent: {
    padding: theme.spacing(3),
  },
  cardTitle: {
    fontWeight: 600,
    color: "#5998CA",
    marginBottom: theme.spacing(1),
  },
  cardDescription: {
    color: "#7C84A4",
    lineHeight: 1.8,
  },
  featureCard: {
    background: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(10px)",
    borderRadius: 20,
    padding: theme.spacing(4),
    textAlign: "center",
    boxShadow: "0 8px 25px rgba(89, 152, 202, 0.15)",
    transition: "all 0.3s ease",
    height: "100%",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 12px 35px rgba(205, 117, 206, 0.2)",
    },
  },
  featureIcon: {
    fontSize: 60,
    color: "#5998CA",
    marginBottom: theme.spacing(2),
  },
  featureTitle: {
    fontWeight: 600,
    color: "#5998CA",
    marginBottom: theme.spacing(1),
  },
  featureDescription: {
    color: "#7C84A4",
    lineHeight: 1.6,
  },
  galleryImage: {
    width: "100%",
    height: 250,
    objectFit: "cover",
    borderRadius: 16,
    boxShadow: "0 8px 25px rgba(89, 152, 202, 0.2)",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0 12px 35px rgba(205, 117, 206, 0.3)",
    },
  },
  ctaSection: {
    background: "linear-gradient(135deg, #5998CA 0%, #97BCEE 50%, #CD75CE 100%)",
    padding: theme.spacing(10, 0),
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  },
  ctaTitle: {
    color: "#fff",
    fontWeight: 700,
    marginBottom: theme.spacing(2),
  },
  ctaSubtitle: {
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: theme.spacing(4),
    fontSize: "1.1rem",
  },
  ctaButton: {
    padding: theme.spacing(1.5, 5),
    borderRadius: 30,
    fontSize: "1.1rem",
    fontWeight: 600,
    background: "#fff",
    color: "#5998CA",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
    transition: "all 0.3s ease",
    "&:hover": {
      background: "#F7F2FB",
      transform: "translateY(-3px)",
      boxShadow: "0 12px 30px rgba(0, 0, 0, 0.3)",
    },
  },
}));

export default function Home() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {/* HERO */}
      <Box className={classes.hero}>
        <Container maxWidth="md">
          <Box className={classes.heroContent}>
            <Typography variant="h2" className={classes.heroTitle}>
              美睫 · 霧眉
            </Typography>
            <Typography variant="h6" className={classes.heroSubtitle}>
              打造專屬於妳的精緻魅力
            </Typography>
            <Typography variant="body1" style={{ color: "#7C84A4", marginBottom: 16 }}>
              專業團隊 · 優質產品 · 舒適環境
            </Typography>
            <Button
              variant="contained"
              className={classes.primaryButton}
              component={Link}
              to="/schedule"
            >
              立即預約
            </Button>
          </Box>
        </Container>
      </Box>

      {/* SERVICES */}
      <Container className={classes.section}>
        <Typography variant="h3" className={classes.sectionTitle}>
          我們的服務
        </Typography>
        <Typography variant="body1" className={classes.sectionSubtitle}>
          提供最專業的美容服務，讓妳展現自信美麗
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image={require("../../images/eyelash_service.png")}
                title="美睫"
              />
              <CardContent className={classes.cardContent}>
                <Typography variant="h5" className={classes.cardTitle}>
                  美睫嫁接
                </Typography>
                <Typography variant="body2" className={classes.cardDescription}>
                  自然、濃密、客製化款式，讓雙眼更有神。使用高品質進口睫毛，持久不易脫落，打造迷人電眼。
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image={require("../../images/eyebrow_service.png")}
                title="霧眉"
              />
              <CardContent className={classes.cardContent}>
                <Typography variant="h5" className={classes.cardTitle}>
                  自然霧眉
                </Typography>
                <Typography variant="body2" className={classes.cardDescription}>
                  柔霧妝感，修飾臉型，素顏也精緻。專業設計師根據臉型量身打造，呈現最自然的眉型。
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image={require("../../images/removal_service.png")}
                title="洗眉"
              />
              <CardContent className={classes.cardContent}>
                <Typography variant="h5" className={classes.cardTitle}>
                  專業洗眉
                </Typography>
                <Typography variant="body2" className={classes.cardDescription}>
                  安全有效的紋繡去除服務，使用先進雷射技術，溫和不傷肌膚，讓您重新開始。
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image={require("../../images/trial_course.png")}
                title="體驗課程"
              />
              <CardContent className={classes.cardContent}>
                <Typography variant="h5" className={classes.cardTitle}>
                  體驗課程
                </Typography>
                <Typography variant="body2" className={classes.cardDescription}>
                  專業美睫技術培訓，從基礎到進階，小班制教學，提供完整的實作練習與證書認證。
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* FEATURES */}
      <Box style={{ background: "linear-gradient(180deg, #F7F2FB 0%, rgba(151, 188, 238, 0.1) 100%)" }}>
        <Container className={classes.section}>
          <Typography variant="h3" className={classes.sectionTitle}>
            為什麼選擇我們
          </Typography>
          <Typography variant="body1" className={classes.sectionSubtitle}>
            專業、安心、美麗
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper className={classes.featureCard} elevation={0}>
                <PeopleIcon className={classes.featureIcon} />
                <Typography variant="h6" className={classes.featureTitle}>
                  專業團隊
                </Typography>
                <Typography variant="body2" className={classes.featureDescription}>
                  經驗豐富的美睫師，持有專業證照
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper className={classes.featureCard} elevation={0}>
                <VerifiedUserIcon className={classes.featureIcon} />
                <Typography variant="h6" className={classes.featureTitle}>
                  安全保證
                </Typography>
                <Typography variant="body2" className={classes.featureDescription}>
                  使用經過認證的安全產品
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper className={classes.featureCard} elevation={0}>
                <LocalFloristIcon className={classes.featureIcon} />
                <Typography variant="h6" className={classes.featureTitle}>
                  舒適環境
                </Typography>
                <Typography variant="body2" className={classes.featureDescription}>
                  優雅舒適的空間，讓妳放鬆享受
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper className={classes.featureCard} elevation={0}>
                <StarIcon className={classes.featureIcon} />
                <Typography variant="h6" className={classes.featureTitle}>
                  客戶好評
                </Typography>
                <Typography variant="body2" className={classes.featureDescription}>
                  眾多滿意客戶的五星推薦
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* GALLERY */}
      <Container className={classes.section}>
        <Typography variant="h3" className={classes.sectionTitle}>
          作品展示
        </Typography>
        <Typography variant="body1" className={classes.sectionSubtitle}>
          看看我們為客戶打造的美麗成果
        </Typography>
        <Grid container spacing={3}>
          {[
            "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=1170&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=1171&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=1074&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1169&auto=format&fit=crop",
          ].map((img, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <img src={img} alt={`作品 ${index + 1}`} className={classes.galleryImage} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA */}
      <Box className={classes.ctaSection}>
        <Container>
          <Typography variant="h3" className={classes.ctaTitle}>
            準備好變美了嗎？
          </Typography>
          <Typography variant="h6" className={classes.ctaSubtitle}>
            立即預約，開啟妳的美麗之旅
          </Typography>
          <Button
            variant="contained"
            className={classes.ctaButton}
            component={Link}
            to="/schedule"
          >
            馬上預約
          </Button>
        </Container>
      </Box>
    </div>
  );
}
