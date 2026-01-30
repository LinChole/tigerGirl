import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Container
} from "@material-ui/core";
import PeopleIcon from "@material-ui/icons/People";
import EventIcon from "@material-ui/icons/Event";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import TodayIcon from "@material-ui/icons/Today";
import AssignmentIcon from "@material-ui/icons/Assignment";
import SettingsIcon from "@material-ui/icons/Settings";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    background: "#F7F2FB",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  title: {
    fontWeight: 700,
    marginBottom: theme.spacing(4),
    background: "linear-gradient(135deg, #5998CA 0%, #CD75CE 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  sectionTitle: {
    fontWeight: 600,
    color: "#5998CA",
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(6),
  },
  statCard: {
    borderRadius: 24,
    padding: theme.spacing(3),
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(20px)",
    boxShadow: "0 8px 25px rgba(89, 152, 202, 0.15)",
    border: "1px solid rgba(255, 255, 255, 0.5)",
    transition: "all 0.3s ease",
    height: "100%",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 12px 35px rgba(205, 117, 206, 0.25)",
    },
  },
  statIconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing(2),
    background: "linear-gradient(135deg, #5998CA 0%, #7C84A4 50%, #CD75CE 100%)",
    boxShadow: "0 4px 15px rgba(89, 152, 202, 0.3)",
  },
  statIcon: {
    fontSize: 32,
    color: "#fff",
  },
  statValue: {
    fontSize: "2rem",
    fontWeight: 700,
    color: "#5998CA",
    marginBottom: theme.spacing(0.5),
  },
  statLabel: {
    color: "#7C84A4",
    fontSize: "0.9rem",
  },
  menuCard: {
    borderRadius: 24,
    padding: theme.spacing(4),
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(20px)",
    boxShadow: "0 8px 25px rgba(89, 152, 202, 0.15)",
    border: "1px solid rgba(255, 255, 255, 0.5)",
    transition: "all 0.3s ease",
    textDecoration: "none",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    "&:hover": {
      transform: "translateY(-8px)",
      boxShadow: "0 12px 35px rgba(205, 117, 206, 0.3)",
      background: "linear-gradient(135deg, rgba(89, 152, 202, 0.05) 0%, rgba(205, 117, 206, 0.05) 100%)",
    },
  },
  menuIconWrapper: {
    width: 70,
    height: 70,
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing(2),
    background: "linear-gradient(135deg, #97BCEE 0%, #CD75CE 100%)",
    boxShadow: "0 4px 15px rgba(151, 188, 238, 0.3)",
  },
  menuIcon: {
    fontSize: 36,
    color: "#fff",
  },
  menuTitle: {
    fontWeight: 600,
    color: "#5998CA",
    marginBottom: theme.spacing(1),
  },
  menuDescription: {
    color: "#7C84A4",
    fontSize: "0.9rem",
  },
}));

export default function AdminBackstage(props) {
  const classes = useStyles();
  const {
    fetching, items, error
  } = props

  const stats = [
    {
      icon: <PeopleIcon className={classes.statIcon} />,
      label: "總用戶數",
      value: items?.totalUsers || 500
    },
    {
      icon: <EventIcon className={classes.statIcon} />,
      label: "總預約數",
      value: items?.totalBookings || 168
    },
    {
      icon: <HourglassEmptyIcon className={classes.statIcon} />,
      label: "待確認預約",
      value: items?.pendingBookings || 20
    },
    {
      icon: <TodayIcon className={classes.statIcon} />,
      label: "今日預約",
      value: items?.todayBookings || 5
    }
  ];

  const menuItems = [
    {
      to: "/admin/bookings",
      icon: <AssignmentIcon className={classes.menuIcon} />,
      title: "預約管理",
      description: "查看和管理所有預約，編輯預約資料"
    },
    {
      to: "/admin/services",
      icon: <SettingsIcon className={classes.menuIcon} />,
      title: "服務項目",
      description: "維護服務項目設定，上傳服務圖片"
    }
  ];

  return (
    <Box className={classes.root}>
      <Container>
        <Typography variant="h3" className={classes.title}>
          管理後台
        </Typography>

        {/* 統計卡片 */}
        <Typography variant="h5" className={classes.sectionTitle}>
          今日概況
        </Typography>
        <Grid container spacing={3}>
          {stats.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card className={classes.statCard} elevation={0}>
                <CardContent>
                  <Box className={classes.statIconWrapper}>
                    {item.icon}
                  </Box>
                  <Typography className={classes.statValue}>
                    {item.value}
                  </Typography>
                  <Typography className={classes.statLabel}>
                    {item.label}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* 管理功能 */}
        <Typography variant="h5" className={classes.sectionTitle}>
          管理功能
        </Typography>
        <Grid container spacing={3}>
          {menuItems.map((item, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card
                component={Link}
                to={item.to}
                className={classes.menuCard}
                elevation={0}
              >
                <Box className={classes.menuIconWrapper}>
                  {item.icon}
                </Box>
                <Typography variant="h5" className={classes.menuTitle}>
                  {item.title}
                </Typography>
                <Typography className={classes.menuDescription}>
                  {item.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
