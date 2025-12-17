import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

function Confirm(props) {
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
      className='fw-vm'
    >
      <DialogTitle id='confirm-dialog-title'>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id='confirm-dialog-description'>{content}</DialogContentText>
        {/* dangerouslySetInnerHTML={{ __html: content }} */}
      </DialogContent>
      <DialogActions>
        <Button onClick={closeConfirm}>取消</Button>
        <Button onClick={() => {
          typeof agreeFunc === 'string'
            ? agreeConfirm(agreeFunc)
            : agreeFunc()
          closeConfirm()
        }} color='primary'>確認</Button>
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
