import React from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Select,
  MenuItem,
  Grid,
  IconButton,
} from "@material-ui/core";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  card: {
    background: "rgba(255,255,255,0.07)",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16
  },
  status: {
    padding: "4px 12px",
    borderRadius: 20,
    fontSize: 12,
  },
});

export default function BookingList() {
  const classes = useStyles();

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        預約管理
      </Typography>

      {/* 篩選 */}
      <Box display="flex" mb={3}>
        <Select defaultValue="today" style={{ color: "#fff", marginRight: 16 }}>
          <MenuItem value="today">今日</MenuItem>
          <MenuItem value="future">未來</MenuItem>
        </Select>

        <Select defaultValue="all" style={{ color: "#fff" }}>
          <MenuItem value="all">全部狀態</MenuItem>
          <MenuItem value="confirmed">已確認</MenuItem>
          <MenuItem value="pending">待確認</MenuItem>
        </Select>
      </Box>

      {/* 預約卡片 */}
      {[1, 2, 3].map((item) => (
        <Paper className={classes.card} key={item}>
          <Grid container alignItems="center">
            <Grid item xs={8}>
              <Typography>2025/12/19 16:00</Typography>
              <Typography style={{ opacity: 0.8 }}>
                王小姐｜美睫自然款
              </Typography>
            </Grid>

            <Grid item xs={4} style={{ textAlign: "right" }}>
              <span
                className={classes.status}
                style={{ background: "#e91e63" }}
              >
                已確認
              </span>
              <IconButton>
                <NotificationsActiveIcon style={{ color: "#f3c77c" }} />
              </IconButton>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Box>
  );
}
