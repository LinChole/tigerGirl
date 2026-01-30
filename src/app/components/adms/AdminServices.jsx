import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
  Divider,
  Container,
  Card,
  CardMedia,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import CloseIcon from "@material-ui/icons/Close";

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
  paper: {
    background: "rgba(255, 255, 255, 0.95)",
    padding: theme.spacing(4),
    borderRadius: 24,
    boxShadow: "0 8px 25px rgba(89, 152, 202, 0.15)",
    marginBottom: theme.spacing(4),
  },
  imageUploadCard: {
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
    height: 200,
    background: "rgba(151, 188, 238, 0.1)",
    border: "2px dashed #97BCEE",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.3s ease",
    "&:hover": {
      background: "rgba(151, 188, 238, 0.2)",
      borderColor: "#5998CA",
    },
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  uploadIcon: {
    fontSize: 48,
    color: "#97BCEE",
  },
  textField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 12,
    },
  },
  addButton: {
    borderRadius: 20,
    padding: theme.spacing(1, 3),
    borderColor: "#97BCEE",
    color: "#5998CA",
    "&:hover": {
      borderColor: "#5998CA",
      background: "rgba(89, 152, 202, 0.1)",
    },
  },
  saveButton: {
    borderRadius: 30,
    padding: theme.spacing(1.5, 5),
    fontWeight: 600,
    background: "linear-gradient(135deg, #5998CA 0%, #7C84A4 50%, #CD75CE 100%)",
    color: "#fff",
    boxShadow: "0 4px 15px rgba(89, 152, 202, 0.3)",
    "&:hover": {
      boxShadow: "0 6px 20px rgba(205, 117, 206, 0.4)",
    },
  },
  serviceCard: {
    background: "rgba(255, 255, 255, 0.95)",
    borderRadius: 20,
    padding: theme.spacing(3),
    marginBottom: theme.spacing(2),
    boxShadow: "0 4px 15px rgba(89, 152, 202, 0.1)",
  },
  childCard: {
    background: "rgba(151, 188, 238, 0.1)",
    borderRadius: 12,
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  deleteButton: {
    color: "#CD75CE",
  },
  editButton: {
    color: "#5998CA",
  },
  dialogTitle: {
    background: "linear-gradient(135deg, #5998CA 0%, #CD75CE 100%)",
    color: "#fff",
  },
  removeImageButton: {
    position: "absolute",
    top: 8,
    right: 8,
    background: "rgba(205, 117, 206, 0.9)",
    color: "#fff",
    "&:hover": {
      background: "#CD75CE",
    },
  },
}));

function ImageUploadCard({ title, image, onImageChange, onImageRemove }) {
  const classes = useStyles();
  const [preview, setPreview] = useState(image);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onImageChange(file, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onImageRemove();
  };

  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom style={{ color: "#7C84A4" }}>
        {title}
      </Typography>
      <Card className={classes.imageUploadCard}>
        {preview ? (
          <>
            <img src={preview} alt={title} className={classes.imagePreview} />
            <IconButton
              className={classes.removeImageButton}
              size="small"
              onClick={handleRemove}
            >
              <CloseIcon />
            </IconButton>
          </>
        ) : (
          <label htmlFor={`upload-${title}`} style={{ cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <AddPhotoAlternateIcon className={classes.uploadIcon} />
            <Typography variant="body2" style={{ color: "#7C84A4", marginTop: 8 }}>
              點擊上傳圖片
            </Typography>
            <input
              id={`upload-${title}`}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </label>
        )}
      </Card>
    </Box>
  );
}

export default function AdminServices(props) {
  const classes = useStyles();
  const { services } = props;

  const [hasChildren, setHasChildren] = useState(false);
  const [children, setChildren] = useState([]);
  const [serviceName, setServiceName] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");

  // 圖片狀態
  const [images, setImages] = useState({
    eyelash: null,
    eyebrow: null,
    removal: null,
    trial: null
  });

  const addChild = () => {
    setChildren([
      ...children,
      { name: "", price: "", duration: "" }
    ]);
  };

  const handleImageChange = (key, file, preview) => {
    setImages({ ...images, [key]: { file, preview } });
  };

  const handleImageRemove = (key) => {
    setImages({ ...images, [key]: null });
  };

  const handleSaveService = () => {
    // 這裡應該調用 API 保存服務項目
    console.log("保存服務項目:", { serviceName, price, duration, hasChildren, children });
  };

  const handleSaveImages = () => {
    // 這裡應該調用 API 保存圖片
    console.log("保存圖片:", images);
  };

  // 模擬已存在的服務項目
  const existingServices = [
    {
      id: 1,
      name: "美睫嫁接",
      hasChildren: true,
      children: [
        { id: 1, name: "6D 100根", price: 1200, duration: 120 },
        { id: 2, name: "5D 100根", price: 1100, duration: 120 }
      ]
    },
    {
      id: 2,
      name: "自然霧眉",
      hasChildren: false,
      price: 5000,
      duration: 120
    }
  ];

  return (
    <Box className={classes.root}>
      <Container>
        <Typography variant="h3" className={classes.title}>
          服務項目管理
        </Typography>

        {/* 圖片上傳區塊 */}
        <Typography variant="h5" className={classes.sectionTitle}>
          首頁服務圖片管理
        </Typography>
        <Paper className={classes.paper} elevation={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <ImageUploadCard
                title="美睫嫁接"
                image={images.eyelash?.preview}
                onImageChange={(file, preview) => handleImageChange("eyelash", file, preview)}
                onImageRemove={() => handleImageRemove("eyelash")}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <ImageUploadCard
                title="自然霧眉"
                image={images.eyebrow?.preview}
                onImageChange={(file, preview) => handleImageChange("eyebrow", file, preview)}
                onImageRemove={() => handleImageRemove("eyebrow")}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <ImageUploadCard
                title="專業洗眉"
                image={images.removal?.preview}
                onImageChange={(file, preview) => handleImageChange("removal", file, preview)}
                onImageRemove={() => handleImageRemove("removal")}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <ImageUploadCard
                title="體驗課程"
                image={images.trial?.preview}
                onImageChange={(file, preview) => handleImageChange("trial", file, preview)}
                onImageRemove={() => handleImageRemove("trial")}
              />
            </Grid>
          </Grid>
          <Box mt={3} textAlign="right">
            <Button
              variant="contained"
              className={classes.saveButton}
              onClick={handleSaveImages}
            >
              儲存圖片
            </Button>
          </Box>
        </Paper>

        {/* 新增服務項目 */}
        <Typography variant="h5" className={classes.sectionTitle}>
          新增服務項目
        </Typography>
        <Paper className={classes.paper} elevation={0}>
          <TextField
            fullWidth
            label="服務項目名稱"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            variant="outlined"
            className={classes.textField}
            margin="normal"
          />

          <FormControlLabel
            control={
              <Switch
                checked={hasChildren}
                onChange={(e) => setHasChildren(e.target.checked)}
                color="primary"
              />
            }
            label="此服務是否有子項目"
            style={{ marginTop: 16 }}
          />

          <Divider style={{ margin: "24px 0" }} />

          {!hasChildren && (
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="價格（元）"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  variant="outlined"
                  className={classes.textField}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="所需時間（分鐘）"
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  variant="outlined"
                  className={classes.textField}
                />
              </Grid>
            </Grid>
          )}

          {hasChildren && (
            <Box>
              <Typography variant="subtitle1" gutterBottom style={{ color: "#5998CA" }}>
                子項目設定
              </Typography>

              {children.map((child, index) => (
                <Paper
                  key={index}
                  className={classes.childCard}
                  elevation={0}
                >
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label="子項目名稱"
                        variant="outlined"
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        fullWidth
                        label="價格（元）"
                        type="number"
                        variant="outlined"
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        fullWidth
                        label="時間（分鐘）"
                        type="number"
                        variant="outlined"
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <IconButton
                        size="small"
                        className={classes.deleteButton}
                        onClick={() => setChildren(children.filter((_, i) => i !== index))}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Paper>
              ))}

              <Button
                onClick={addChild}
                variant="outlined"
                className={classes.addButton}
                style={{ marginTop: 16 }}
              >
                ＋ 新增子項目
              </Button>
            </Box>
          )}

          <Box mt={4} textAlign="right">
            <Button
              variant="contained"
              className={classes.saveButton}
              onClick={handleSaveService}
            >
              儲存服務設定
            </Button>
          </Box>
        </Paper>

        {/* 已新增服務項目 */}
        <Typography variant="h5" className={classes.sectionTitle}>
          已新增服務項目
        </Typography>
        {existingServices.map((service) => (
          <Paper key={service.id} className={classes.serviceCard} elevation={0}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" style={{ color: "#5998CA", fontWeight: 600 }}>
                {service.name}
              </Typography>
              <Box>
                <IconButton size="small" className={classes.editButton}>
                  <EditIcon />
                </IconButton>
                <IconButton size="small" className={classes.deleteButton}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>

            {!service.hasChildren && (
              <Typography style={{ color: "#7C84A4", marginTop: 8 }}>
                NT$ {service.price} ｜ {service.duration} 分鐘
              </Typography>
            )}

            {service.hasChildren && service.children && (
              <Box mt={2}>
                {service.children.map((child) => (
                  <Box
                    key={child.id}
                    className={classes.childCard}
                    display="flex"
                    justifyContent="space-between"
                  >
                    <Typography style={{ color: "#5998CA" }}>{child.name}</Typography>
                    <Typography style={{ color: "#7C84A4" }}>
                      NT$ {child.price} ｜ {child.duration} 分鐘
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Paper>
        ))}
      </Container>
    </Box>
  );
}
