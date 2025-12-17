import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import Slide from '@material-ui/core/Slide'
import Close from '@material-ui/icons/Close'

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5)
  }
}))

function SlideTransition(props) {
  return <Slide {...props} direction='up' />
}

function SimpleSnackbar(props) {
  const { open, content, closeSnackbar } = props
  const classes = useStyles()
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        open={open}
        autoHideDuration={3000}
        onClose={closeSnackbar}
        key={content}
        TransitionComponent={SlideTransition}
        // ContentProps={{
        //   'aria-describedby': 'message-id',
        // }}
        // message={<span id="message-id">Note archived</span>}
        message={content}
        action={[
          <IconButton
            key='close'
            aria-label='Close'
            color='inherit'
            className={classes.close}
            onClick={closeSnackbar}
          >
            <Close />
          </IconButton>
        ]}
      />
    </div>
  )
}

SimpleSnackbar.propTypes = {
  open: PropTypes.bool.isRequired,
  content: PropTypes.string.isRequired,
  closeSnackbar: PropTypes.func.isRequired
}

export default SimpleSnackbar
