import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Box,
  Chip
} from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";


const useStyles = makeStyles((theme) => ({
  sectionTitle: {
    fontWeight: 600,
    color: "#5998CA",
    marginBottom: theme.spacing(3),
  },
  card: {
    borderRadius: 20,
    boxShadow: "0 8px 25px rgba(89, 152, 202, 0.15)",
    transition: "all 0.3s ease",
    border: "2px solid transparent",
    height: "100%",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 12px 35px rgba(205, 117, 206, 0.25)",
    },
  },
  selected: {
    border: "2px solid #5998CA",
    background: "linear-gradient(135deg, rgba(89, 152, 202, 0.05) 0%, rgba(205, 117, 206, 0.05) 100%)",
    boxShadow: "0 12px 35px rgba(89, 152, 202, 0.3)",
  },
  cardContent: {
    padding: theme.spacing(3),
    position: "relative",
  },
  serviceName: {
    fontWeight: 600,
    color: "#5998CA",
    marginBottom: theme.spacing(1),
  },
  duration: {
    color: "#7C84A4",
    marginBottom: theme.spacing(1),
  },
  price: {
    fontWeight: 600,
    fontSize: "1.2rem",
    color: "#CD75CE",
  },
  checkIcon: {
    position: "absolute",
    top: theme.spacing(2),
    right: theme.spacing(2),
    color: "#5998CA",
  },
  divider: {
    margin: theme.spacing(4, 0, 3, 0),
    background: "linear-gradient(90deg, transparent, #97BCEE, transparent)",
  },
}));

const duration = (d, h, m) => {
  const dd = d ? `${d}天` : ''
  const hh = h ? `${h}小時` : ''
  const mm = m ? `${m}分鐘` : ''
  return `${dd}${hh}${mm}`
}

function Base(props) {
  const classes = useStyles();
  const { data, select, isSelected } = props

  return (
    <Card className={`${classes.card} ${isSelected ? classes.selected : ''}`}>
      <CardActionArea onClick={() => select(data.id)}>
        <CardContent className={classes.cardContent}>
          {isSelected && <CheckCircleIcon className={classes.checkIcon} />}
          <Typography variant="h6" className={classes.serviceName}>
            {data.Name}
          </Typography>
          <Typography variant="body2" className={classes.duration}>
            ⏱️ {duration(data.DD, data.HH, data.MM)}
          </Typography>
          <Typography variant="h6" className={classes.price}>
            NT$ {data.Price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default function Project(props) {
  const classes = useStyles()
  const [show, setShow] = useState(false);
  const {
    fetching, items, error, pfetching,
    subproject,
    getProject, getSubproject,
    selectProject, selectSubproject
  } = props

  useEffect(() => {
    getProject()
  }, [])

  const projectHandler = (id, show) => {
    setShow(show)
    if (show) getSubproject(id)
  }

  return (
    <Box>
      <Typography variant="h5" className={classes.sectionTitle}>
        選擇服務項目
      </Typography>
      <Grid container spacing={3}>
        {items.map((d, i) => (
          <Grid
            item xs={12} sm={6} md={4} lg={3}
            key={i}
            onClick={() => projectHandler(d.id, d.subporject)}>
            <Base data={d} select={selectProject} isSelected={d.selected} />
          </Grid>
        ))}
      </Grid>
      {show && (
        <div>
          <Divider className={classes.divider} />
          <Typography variant="h5" className={classes.sectionTitle}>
            選擇項目內容
          </Typography>
          <Grid container spacing={3}>
            {subproject.items.map((d, i) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                <Base data={d} select={selectSubproject} isSelected={d.selected} />
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </Box>
  )
}