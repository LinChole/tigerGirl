import React from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Avatar
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InstagramIcon from "@material-ui/icons/Instagram";
import ChatIcon from "@material-ui/icons/Chat";

const useStyles = makeStyles((theme) => ({
  statCard: {
    borderRadius: 16,
    boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
  },
  statNumber: {
    fontSize: 36,
    fontWeight: 700,
    marginTop: theme.spacing(1),
  },
  socialSection: {
    marginTop: theme.spacing(6),
    padding: theme.spacing(4),
    borderRadius: 20,
    background: "linear-gradient(135deg, #f8bbd0, #f48fb1)",
    color: "#fff",
  },
  socialButton: {
    borderRadius: 30,
    padding: theme.spacing(1.2, 4),
    fontSize: "1rem",
    marginRight: theme.spacing(2),
    textTransform: "none",
  },
  iconAvatar: {
    backgroundColor: "rgba(255,255,255,0.25)",
    marginRight: theme.spacing(1),
  },

}));

export default function AdminHome() {
  const classes = useStyles();

  // mock data (之後可接 API)
  const todayBookings = 8;
  const todayCustomers = 5;

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        管理端首頁
      </Typography>

      {/* STAT CARDS */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card className={classes.statCard}>
            <CardContent>
              <Typography color="textSecondary">今日預約數</Typography>
              <Typography className={classes.statNumber} color="primary">
                {todayBookings}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className={classes.statCard}>
            <CardContent>
              <Typography color="textSecondary">今日客戶人數</Typography>
              <Typography className={classes.statNumber} color="secondary">
                {todayCustomers}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
