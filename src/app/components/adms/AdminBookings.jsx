import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Paper,
  Typography,
  Button,
  Select,
  MenuItem,
  Grid,
  IconButton,
  Container,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Divider
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import EventIcon from "@material-ui/icons/Event";
import PersonIcon from "@material-ui/icons/Person";
import CategoryIcon from "@material-ui/icons/Category";

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
  filterBox: {
    marginBottom: theme.spacing(4),
    padding: theme.spacing(3),
    background: "rgba(255, 255, 255, 0.95)",
    borderRadius: 20,
    boxShadow: "0 4px 15px rgba(89, 152, 202, 0.1)",
  },
  select: {
    borderRadius: 12,
    "& .MuiOutlinedInput-root": {
      borderRadius: 12,
    },
  },
  card: {
    background: "rgba(255, 255, 255, 0.95)",
    borderRadius: 20,
    padding: theme.spacing(3),
    marginBottom: theme.spacing(2),
    boxShadow: "0 4px 15px rgba(89, 152, 202, 0.1)",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-3px)",
      boxShadow: "0 8px 25px rgba(205, 117, 206, 0.2)",
    },
  },
  statusChip: {
    fontWeight: 600,
    borderRadius: 20,
  },
  statusPending: {
    background: "rgba(89, 152, 202, 0.2)",
    color: "#5998CA",
  },
  statusConfirmed: {
    background: "rgba(76, 175, 80, 0.2)",
    color: "#4CAF50",
  },
  statusCancelled: {
    background: "rgba(158, 158, 158, 0.2)",
    color: "#9E9E9E",
  },
  infoRow: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1.5),
  },
  icon: {
    color: "#5998CA",
    marginRight: theme.spacing(1.5),
    fontSize: 20,
  },
  label: {
    color: "#7C84A4",
    marginRight: theme.spacing(1),
    fontWeight: 500,
  },
  value: {
    color: "#5998CA",
    fontWeight: 500,
  },
  actionButton: {
    borderRadius: 20,
    marginLeft: theme.spacing(1),
  },
  editButton: {
    color: "#5998CA",
    borderColor: "#5998CA",
    "&:hover": {
      borderColor: "#5998CA",
      background: "rgba(89, 152, 202, 0.1)",
    },
  },
  deleteButton: {
    color: "#CD75CE",
    borderColor: "#CD75CE",
    "&:hover": {
      borderColor: "#CD75CE",
      background: "rgba(205, 117, 206, 0.1)",
    },
  },
  confirmButton: {
    color: "#4CAF50",
    borderColor: "#4CAF50",
    "&:hover": {
      borderColor: "#4CAF50",
      background: "rgba(76, 175, 80, 0.1)",
    },
  },
  dialogTitle: {
    background: "linear-gradient(135deg, #5998CA 0%, #CD75CE 100%)",
    color: "#fff",
  },
  saveButton: {
    background: "linear-gradient(135deg, #5998CA 0%, #7C84A4 50%, #CD75CE 100%)",
    color: "#fff",
    "&:hover": {
      background: "linear-gradient(135deg, #5998CA 0%, #7C84A4 50%, #CD75CE 100%)",
      opacity: 0.9,
    },
  },
}));

export default function AdminBookings() {
  const classes = useStyles();
  const [filterDate, setFilterDate] = useState("today");
  const [filterStatus, setFilterStatus] = useState("all");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);

  // 模擬資料
  const bookings = [
    {
      id: 1,
      date: "2025/12/19 16:00",
      customer: "王小美",
      service: "美睫嫁接 - 6D 100根",
      status: 0, // 0: 待確認, 1: 已確認, 2: 已取消
      phone: "0912-345-678",
      note: "對膠水較敏感"
    },
    {
      id: 2,
      date: "2025/12/20 14:00",
      customer: "李小姐",
      service: "自然霧眉",
      status: 1,
      phone: "0923-456-789",
      note: ""
    },
    {
      id: 3,
      date: "2025/12/21 10:00",
      customer: "陳太太",
      service: "專業洗眉",
      status: 0,
      phone: "0934-567-890",
      note: "第二次洗眉"
    }
  ];

  const getStatusText = (status) => {
    switch (status) {
      case 0: return "待確認";
      case 1: return "已確認";
      case 2: return "已取消";
      default: return "未知";
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 0: return classes.statusPending;
      case 1: return classes.statusConfirmed;
      case 2: return classes.statusCancelled;
      default: return classes.statusPending;
    }
  };

  const handleEdit = (booking) => {
    setCurrentBooking(booking);
    setEditDialogOpen(true);
  };

  const handleSave = () => {
    // 這裡應該調用 API 保存資料
    console.log("保存預約資料:", currentBooking);
    setEditDialogOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("確定要刪除此預約嗎？")) {
      // 這裡應該調用 API 刪除資料
      console.log("刪除預約:", id);
    }
  };

  const handleConfirm = (id) => {
    // 這裡應該調用 API 確認預約
    console.log("確認預約:", id);
  };

  return (
    <Box className={classes.root}>
      <Container>
        <Typography variant="h3" className={classes.title}>
          預約管理
        </Typography>

        {/* 篩選區塊 */}
        <Paper className={classes.filterBox} elevation={0}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth variant="outlined" className={classes.select}>
                <InputLabel>日期篩選</InputLabel>
                <Select
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  label="日期篩選"
                >
                  <MenuItem value="today">今日</MenuItem>
                  <MenuItem value="tomorrow">明日</MenuItem>
                  <MenuItem value="week">本週</MenuItem>
                  <MenuItem value="month">本月</MenuItem>
                  <MenuItem value="all">全部</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth variant="outlined" className={classes.select}>
                <InputLabel>狀態篩選</InputLabel>
                <Select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  label="狀態篩選"
                >
                  <MenuItem value="all">全部狀態</MenuItem>
                  <MenuItem value="pending">待確認</MenuItem>
                  <MenuItem value="confirmed">已確認</MenuItem>
                  <MenuItem value="cancelled">已取消</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>

        {/* 預約列表 */}
        {bookings.map((booking) => (
          <Paper className={classes.card} key={booking.id} elevation={0}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <Box className={classes.infoRow}>
                  <EventIcon className={classes.icon} />
                  <Typography className={classes.label}>預約時間：</Typography>
                  <Typography className={classes.value}>{booking.date}</Typography>
                </Box>
                <Box className={classes.infoRow}>
                  <PersonIcon className={classes.icon} />
                  <Typography className={classes.label}>客戶姓名：</Typography>
                  <Typography className={classes.value}>{booking.customer}</Typography>
                  <Typography className={classes.label} style={{ marginLeft: 16 }}>電話：</Typography>
                  <Typography className={classes.value}>{booking.phone}</Typography>
                </Box>
                <Box className={classes.infoRow}>
                  <CategoryIcon className={classes.icon} />
                  <Typography className={classes.label}>服務項目：</Typography>
                  <Typography className={classes.value}>{booking.service}</Typography>
                </Box>
                {booking.note && (
                  <Box className={classes.infoRow}>
                    <Typography className={classes.label}>備註：</Typography>
                    <Typography className={classes.value}>{booking.note}</Typography>
                  </Box>
                )}
              </Grid>

              <Grid item xs={12} md={4}>
                <Box display="flex" flexDirection="column" alignItems="flex-end" height="100%" justifyContent="space-between">
                  <Chip
                    label={getStatusText(booking.status)}
                    className={`${classes.statusChip} ${getStatusClass(booking.status)}`}
                  />
                  <Box display="flex" flexWrap="wrap" justifyContent="flex-end" mt={2}>
                    {booking.status === 0 && (
                      <Button
                        variant="outlined"
                        size="small"
                        className={`${classes.actionButton} ${classes.confirmButton}`}
                        startIcon={<CheckCircleIcon />}
                        onClick={() => handleConfirm(booking.id)}
                      >
                        確認
                      </Button>
                    )}
                    <Button
                      variant="outlined"
                      size="small"
                      className={`${classes.actionButton} ${classes.editButton}`}
                      startIcon={<EditIcon />}
                      onClick={() => handleEdit(booking)}
                    >
                      編輯
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      className={`${classes.actionButton} ${classes.deleteButton}`}
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDelete(booking.id)}
                    >
                      刪除
                    </Button>
                    <IconButton
                      size="small"
                      className={classes.actionButton}
                      style={{ color: "#7C84A4" }}
                    >
                      <NotificationsActiveIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        ))}

        {/* 編輯對話框 */}
        <Dialog
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle className={classes.dialogTitle}>
            編輯預約資料
          </DialogTitle>
          <DialogContent style={{ paddingTop: 20 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="客戶姓名"
                  value={currentBooking?.customer || ""}
                  onChange={(e) => setCurrentBooking({ ...currentBooking, customer: e.target.value })}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="聯絡電話"
                  value={currentBooking?.phone || ""}
                  onChange={(e) => setCurrentBooking({ ...currentBooking, phone: e.target.value })}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="預約時間"
                  type="datetime-local"
                  value={currentBooking?.date || ""}
                  onChange={(e) => setCurrentBooking({ ...currentBooking, date: e.target.value })}
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="服務項目"
                  value={currentBooking?.service || ""}
                  onChange={(e) => setCurrentBooking({ ...currentBooking, service: e.target.value })}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>狀態</InputLabel>
                  <Select
                    value={currentBooking?.status || 0}
                    onChange={(e) => setCurrentBooking({ ...currentBooking, status: e.target.value })}
                    label="狀態"
                  >
                    <MenuItem value={0}>待確認</MenuItem>
                    <MenuItem value={1}>已確認</MenuItem>
                    <MenuItem value={2}>已取消</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="備註"
                  value={currentBooking?.note || ""}
                  onChange={(e) => setCurrentBooking({ ...currentBooking, note: e.target.value })}
                  variant="outlined"
                  multiline
                  rows={3}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions style={{ padding: 16 }}>
            <Button onClick={() => setEditDialogOpen(false)}>
              取消
            </Button>
            <Button
              onClick={handleSave}
              className={classes.saveButton}
              variant="contained"
            >
              儲存
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}
