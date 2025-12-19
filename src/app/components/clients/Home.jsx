import React from "react";
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
  Box
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  hero: {
    minHeight: "80vh",
    backgroundImage:
      "linear-gradient(rgba(255,182,193,0.4), rgba(255,182,193,0.4)), url('https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    color: "#fff",
  },
  heroContent: {
    background: "rgba(255,255,255,0.85)",
    padding: theme.spacing(4),
    borderRadius: 16,
    color: "#333",
  },
  section: {
    padding: theme.spacing(8, 0),
  },
  card: {
    borderRadius: 16,
    boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
    transition: "transform 0.3s",
    '&:hover': {
      transform: "translateY(-6px)",
    },
  },
  media: {
    height: 260,
  },
  primaryButton: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(1.5, 4),
    borderRadius: 30,
    fontSize: "1rem",
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <>
      {/* HERO */}
      <Box className={classes.hero}>
        <Container maxWidth="sm">
          <Box className={classes.heroContent} textAlign="center">
            <Typography variant="h3" gutterBottom>
              美睫 · 霧眉
            </Typography>
            <Typography variant="h6" color="textSecondary">
              打造專屬於妳的精緻魅力
            </Typography>
            <Button
              variant="contained"
              color="primary"
              className={classes.primaryButton}
            >
              立即預約
            </Button>
          </Box>
        </Container>
      </Box>

      {/* SERVICES */}
      <Container className={classes.section}>
        <Typography variant="h4" align="center" gutterBottom>
          我們的服務
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image="https://images.unsplash.com/photo-1633346152343-5486573d3d50?q=80&w=1103&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                title="美睫"
              />
              <CardContent>
                <Typography variant="h5">美睫嫁接</Typography>
                <Typography variant="body2" color="textSecondary">
                  自然、濃密、客製化款式，讓雙眼更有神。
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image="https://images.unsplash.com/photo-1620508467736-0140acd17ce4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                title="霧眉"
              />
              <CardContent>
                <Typography variant="h5">自然霧眉</Typography>
                <Typography variant="body2" color="textSecondary">
                  柔霧妝感，修飾臉型，素顏也精緻。
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
