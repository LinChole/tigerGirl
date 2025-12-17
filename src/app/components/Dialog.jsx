import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Close from '@material-ui/icons/Close'
import { headerBackground } from 'Config'

function AlertDialog(props) {
  const {
    open, title, content, userClose, maxWidth, fullScreen,
    closeDialog
  } = props
  const tit = (
    <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
  )
  const cnt = (
    <DialogContent id='alert-dialog-description'>
      {
        typeof content === 'string' ? (
          <DialogContentText>{content}</DialogContentText>
        ) : content
      }
      {/* dangerouslySetInnerHTML={{ __html: content }} */}
    </DialogContent>
  )
  return (
    <Dialog
      open={open}
      onClose={userClose ? closeDialog : null}
      fullWidth={!!maxWidth}
      maxWidth={maxWidth}
      fullScreen={fullScreen}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    // className='fw-vm'
    >
      {
        !fullScreen ? (
          <>
            {tit}
            {cnt}
            <DialogActions>
              {userClose && <Button onClick={closeDialog} color='primary' >確認</Button>}
            </DialogActions>
          </>
        ) : (
          <>
            <AppBar position='relative' className={headerBackground}>
              <Toolbar variant='dense'>
                <IconButton edge='start' color='inherit' onClick={closeDialog} aria-label='close'>
                  <Close />
                </IconButton>
                {tit}
              </Toolbar>
            </AppBar>
            {cnt}
          </>
        )
      }
    </Dialog>
  )
}

AlertDialog.defaultProps = {
  userClose: true,
  maxWidth: false,
  fullScreen: false
}

AlertDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  userClose: PropTypes.bool,
  maxWidth: PropTypes.oneOf([
    false, 'xs', 'sm', 'md', 'lg', 'xl'
  ]),
  fullScreen: PropTypes.bool,
  closeDialog: PropTypes.func.isRequired
}

export default AlertDialog
