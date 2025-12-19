import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Divider
} from "@material-ui/core";
import Loading from '../statics/Loading'


const useStyles = makeStyles((theme) => ({
  card: {
    borderRadius: 12,
    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
    minWidth: 230,
    minHeight: 110
  },
  selected: {
    border: `2px solid blue`,
  },
}));

const duration = (d, h, m) => {
  const dd = d ? `${d}天` : ''
  const hh = h ? `${h}小時` : ''
  const mm = m ? `${m}分鐘` : ''
  return `${dd}${hh}${mm}`
}

function Base(props) {
  const { data, select } = props
  return (
    <Card>
      <CardActionArea onClick={() => select(data.id)}>
        <CardContent>
          <Typography variant="h6">{data.Name}</Typography>
          <Typography variant="body1" color="textSecondary">
            {duration(data.DD, data.HH, data.MM)}
          </Typography>
          <Typography variant="body1" color="primary">
            NT ${data.Price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card >
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

  if (fetching || error) return fetching ? <Loading full /> : error
  if (pfetching || error) return pfetching ? <Loading full /> : error
  return (
    <>
      <Typography variant="h5" gutterBottom>服務項目</Typography>
      <Grid container spacing={3} className='fw-mgtop-10'>
        {items.map((d, i) => (
          <Grid
            item xs={12} sm={4}
            key={i}
            className={d.selected ? `${classes.card} ${classes.selected}` : ''}
            onClick={() => projectHandler(d.id, d.subporject)}>
            <Base data={d} select={selectProject} />
          </Grid>
        ))}
      </Grid>
      {show && (
        <div className='fw-mgtop-30'>
          <Divider light />
          <Typography variant="h5" gutterBottom>項目內容</Typography>
          <Grid container spacing={3} >
            {subproject.items.map((d, i) => (
              <Grid item xs={12} sm={4} className={d.selected ? `${classes.card} ${classes.selected}` : ''} key={i}>
                <Base data={d} key={i} select={selectSubproject} />
              </Grid>
            ))}
          </Grid >
        </div>
      )
      }
    </>
  )
}