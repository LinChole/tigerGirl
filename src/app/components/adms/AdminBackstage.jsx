import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    padding: theme.spacing(4),
  },

  header: {
    marginBottom: theme.spacing(4)
  },

  subtitle: {
    opacity: 0.7,
    marginTop: theme.spacing(0.5)
  },

  statCard: {
    display: "flex",
    alignItems: "center",
    borderRadius: 20,
    background: "rgba(255,255,255,0.06)",
    backdropFilter: "blur(12px)",
    boxShadow: "0 12px 30px rgba(0,0,0,0.45)",
    transition: "all .35s",
    "&:hover": {
      transform: "translateY(-6px)",
      boxShadow: "0 0 25px rgba(233,90,155,.35)"
    }
  },

  statIcon: {
    fontSize: 32,
    marginRight: theme.spacing(2)
  },

  menuCard: {
    display: "flex",
    flexDirection: "column",
    height: "100%",           // ⭐ 關鍵
    padding: theme.spacing(3),
    borderRadius: 26,
    textDecoration: "none",
    // color: "#fff",

    background: "rgba(255,255,255,0.06)",
    backdropFilter: "blur(14px)",
    boxShadow: "0 12px 32px rgba(0,0,0,0.45)",

    transition: "all .35s",
    "&:hover": {
      transform: "translateY(-8px)",
      background: "rgba(233,90,155,.16)",
      boxShadow: "0 0 32px rgba(233,90,155,.45)"
    },

    menuIcon: {
      fontSize: 34,
      marginBottom: theme.spacing(1.5)
    }
  }
}));

export default function AdminBackstage(props) {
  const classes = useStyles();
  const {
    fetching, items, error
  } = props
  return (
    <Box className={classes.root}>
      {/* Header */}
      <Box className={classes.header}>
        <Typography variant="h6" gutterBottom>今日概況</Typography>
      </Box>

      {/* 統計卡片 */}
      <Grid container spacing={3}>
        {[
          { icon: "👥", label: "總用戶數", value: items?.totalUsers || 500 },
          { icon: "📅", label: "總預約數", value: items?.totalBookings || 168 },
          { icon: "⏳", label: "待確認預約", value: items?.pendingBookings || 20 },
          { icon: "📆", label: "今日預約", value: items?.todayBookings || 5 }
        ].map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card className={classes.statCard}>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <div className={classes.statIcon}>{item.icon}</div>
                  <div>
                    <Typography variant="h5">{item.value}</Typography>
                    <Typography variant="body2" style={{ opacity: 0.7 }}>{item.label}</Typography>
                  </div>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* 管理功能 */}
      <Box mt={6} >
        {/* Header */}
        <Box className={classes.header}>
          <Typography variant="h6" gutterBottom>
            管理功能
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card
              component={Link}
              to="/admin/bookings"
              className={classes.menuCard}
            >
              <div className={classes.menuIcon}>📋</div>
              <Typography variant="h6">預約管理</Typography>
              <Typography variant="body2" style={{ opacity: 0.7 }}>
                查看和管理所有預約
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              component={Link}
              to="/admin/users"
              className={classes.menuCard}
            >
              <div className={classes.menuIcon}>👤</div>
              <Typography variant="h6">用戶管理</Typography>
              <Typography variant="body2" style={{ opacity: 0.7 }}>
                管理註冊用戶資料
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              component={Link}
              to="/admin/services"
              className={classes.menuCard}
            >
              <div className={classes.menuIcon}>🛠️</div>
              <Typography variant="h6">服務類型</Typography>
              <Typography variant="body2" style={{ opacity: 0.7 }}>
                維護服務項目設定
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
