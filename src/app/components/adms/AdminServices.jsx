import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  Switch,
  FormControlLabel,
  Grid,
  Divider
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

function ServiceManager() {
  const [hasChildren, setHasChildren] = useState(false);
  const [children, setChildren] = useState([]);

  const addChild = () => {
    setChildren([
      ...children,
      { name: "", price: "", duration: "" }
    ]);
  };

  return (
    <Paper
      style={{
        background: "rgba(255,255,255,0.08)",
        padding: 32,
        borderRadius: 24,
        // maxWidth: 800
        maxWidth: "100%"
      }}
    >
      <Typography variant="h5" gutterBottom>
        服務項目管理
      </Typography>

      {/* 服務名稱 */}
      <TextField
        fullWidth
        label="服務項目名稱"
        margin="normal"
      />

      {/* 是否有子項目 */}
      <FormControlLabel
        control={
          <Switch
            checked={hasChildren}
            onChange={(e) => setHasChildren(e.target.checked)}
            color="primary"
          />
        }
        label="此服務是否有子項目"
      />

      <Divider style={{ margin: "24px 0", background: "rgba(255,255,255,0.2)" }} />

      {/* 沒有子項目 */}
      {!hasChildren && (
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="價格（元）"
              type="number"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="所需時間（分鐘）"
              type="number"
            />
          </Grid>
        </Grid>
      )}

      {/* 有子項目 */}
      {hasChildren && (
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            子項目設定
          </Typography>

          {children.map((child, index) => (
            <Paper
              key={index}
              style={{
                background: "rgba(255,255,255,0.05)",
                padding: 16,
                borderRadius: 16,
                marginBottom: 16
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="子項目名稱"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="價格（元）"
                    type="number"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="所需時間（分鐘）"
                    type="number"
                  />
                </Grid>
              </Grid>
            </Paper>
          ))}

          <Button
            onClick={addChild}
            variant="outlined"
            style={{
              borderColor: "#f3c77c",
              color: "#f3c77c",
              borderRadius: 20
            }}
          >
            ＋ 新增子項目
          </Button>
        </Box>
      )}

      {/* 儲存 */}
      <Box mt={4} textAlign="right">
        <Button
          style={{
            background: "linear-gradient(45deg,#e91e63,#f06292)",
            color: "#fff",
            padding: "8px 32px",
            borderRadius: 24
          }}
        >
          儲存服務設定
        </Button>
      </Box>
    </Paper>
  );
}

export default function AdminServices(props) {
  const {
    services
  } = props
  return (
    <Box >
      <Box mt={6}>
        <ServiceManager />
      </Box>
      <Divider style={{ margin: "24px 0", background: "rgba(29, 27, 27, 0.2)" }} />
      <Box mt={6}>
        <Typography variant="h6" gutterBottom>已新增服務項目</Typography>

        {[{
          name: "全身按摩",
          id: 1,
          hasChildren: true,
          children: []
        }]?.map((d) => (
          <Paper
            key={d?.id}
            style={{
              background: "rgba(255,255,255,0.07)",
              padding: 20,
              borderRadius: 20,
              marginBottom: 16,
              maxWidth: "100%"
            }}
          >
            {/* 主項目 */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
                {d?.name}
              </Typography>

              <Box>
                <IconButton size="small">
                  <EditIcon style={{ color: "#f3c77c" }} />
                </IconButton>
                <IconButton size="small">
                  <DeleteIcon style={{ color: "#e91e63" }} />
                </IconButton>
              </Box>
            </Box>

            {/* 無子項目 */}
            {!d?.hasChildren && (
              <Typography style={{ opacity: 0.8, marginTop: 8 }}>
                ${d?.price} ｜ {d?.duration} 分鐘
              </Typography>
            )}

            {/* 有子項目 */}
            {d?.hasChildren && (
              <Box mt={2}>
                {d?.children.map((child) => (
                  <Box
                    key={child.id}
                    display="flex"
                    justifyContent="space-between"
                    style={{
                      padding: "8px 12px",
                      borderRadius: 12,
                      background: "rgba(255,255,255,0.05)",
                      marginBottom: 8
                    }}
                  >
                    <Typography>{child.name}</Typography>
                    <Typography style={{ opacity: 0.8 }}>
                      ${child.price} ｜ {child.duration} 分鐘
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Paper>
        ))}
      </Box>
    </Box>
  )
}
