import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

const useStyles = makeStyles((theme) => ({
  paper: {
    borderRadius: 20,
    padding: theme.spacing(2),
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(20px)",
    boxShadow: "0 8px 32px rgba(89, 152, 202, 0.2)",
  },
  title: {
    fontWeight: 700,
    background: "linear-gradient(135deg, #5998CA 0%, #CD75CE 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    fontSize: "1.5rem",
    textAlign: "center",
  },
  content: {
    color: "#7C84A4",
    fontSize: "1.1rem",
    textAlign: "center",
    padding: theme.spacing(2, 0),
  },
  actions: {
    justifyContent: "center",
    paddingTop: theme.spacing(2),
  },
  cancelButton: {
    borderRadius: 30,
    padding: theme.spacing(1, 4),
    color: "#7C84A4",
    "&:hover": {
      background: "rgba(124, 132, 164, 0.1)",
    },
  },
  confirmButton: {
    borderRadius: 30,
    padding: theme.spacing(1, 4),
    background: "linear-gradient(135deg, #5998CA 0%, #CD75CE 100%)",
    color: "#fff",
    fontWeight: 600,
    boxShadow: "0 4px 15px rgba(89, 152, 202, 0.3)",
    "&:hover": {
      boxShadow: "0 6px 20px rgba(205, 117, 206, 0.4)",
      transform: "translateY(-1px)",
    },
  },
}));

function Confirm(props) {
  const classes = useStyles();
  const {
    open, title, content, agreeFunc,
    closeConfirm, agreeConfirm
  } = props
  return (
    <Dialog
      open={open}
      onClose={closeConfirm}
      aria-labelledby='confirm-dialog-title'
      aria-describedby='confirm-dialog-description'
      PaperProps={{
        className: classes.paper
      }}
    >
      <DialogTitle id='confirm-dialog-title'>
        <Typography className={classes.title}>
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography className={classes.content} id='confirm-dialog-description'>
          {content}
        </Typography>
      </DialogContent>
      <DialogActions className={classes.actions}>
        <Button onClick={closeConfirm} className={classes.cancelButton}>
          取消
        </Button>
        <Button
          onClick={() => {
            typeof agreeFunc === 'string'
              ? agreeConfirm(agreeFunc)
              : agreeFunc()
            closeConfirm()
          }}
          className={classes.confirmButton}
          variant="contained"
        >
          確認
        </Button>
      </DialogActions>
    </Dialog>
  )
}

Confirm.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  agreeFunc: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string
  ]),
  closeConfirm: PropTypes.func.isRequired,
  agreeConfirm: PropTypes.func.isRequired
}

export default Confirm
