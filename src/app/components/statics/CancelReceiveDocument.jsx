import React from 'react'
import PropTypes from 'prop-types'
import Button from '../statics/Button'
import Textarea from '../statics/Textarea'
import Text from '../statics/Text'

function CancelReceiveDocument(props) {
  const {
    children, actionID,
    params, receiveDocument, openConfirm
  } = props
  return (
    <form onSubmit={e => {
      e.preventDefault()
      e.persist()
      openConfirm(`您確定要${children}嗎？`, () => receiveDocument(params.cid, params.oid, actionID, e.target.message.value))
    }}>
      <div className='w3-section'>
        <Text color='red'>請填寫原因。</Text>
        <Textarea name='message' required />
      </div>
      <Button type='submit' color='blue' full>送出</Button>
    </form>
  )
}

CancelReceiveDocument.propTypes = {
  children: PropTypes.string.isRequired,
  actionID: PropTypes.number.isRequired,
  params: PropTypes.object.isRequired,
  receiveDocument: PropTypes.func.isRequired,
  openConfirm: PropTypes.func.isRequired
}

export default CancelReceiveDocument