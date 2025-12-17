import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Loading from '../statics/Loading'
import Button from '../statics/Button'
import Icons from '../statics/Icons'
import Refresh from '@material-ui/icons/Refresh'
import Input from '../statics/Input'

function ValidateCode(props) {
  const {
    fetching, items, error,
    pfetching, paddingTop,
    getCode
  } = props
  useEffect(() => {
    getCode()
  }, [])
  if (fetching || error) return fetching ? <Loading /> : error
  if (!items) return '驗證碼讀取失敗'
  return (
    <div className={classNames({ 'w3-margin-top': paddingTop })}>
      <Input type='text' name='code' placeholder='Enter Validate Code' cn='w3-input w3-border' required autoComplete='off' />
      <div className='w3-section'>
        <img src={`data:image/jpeg;base64,${items}`} alt='Images Validate Code' className='w3-margin-right' />
        {
          !pfetching && (
            <Button onClick={getCode}>
              <Icons Icon={Refresh} isInlineButton />更換驗證碼
            </Button>
          )
        }
      </div>
    </div>
  )
}

ValidateCode.propTypes = {
  fetching: PropTypes.bool.isRequired,
  items: PropTypes.string,
  error: PropTypes.string,
  pfetching: PropTypes.bool,
  paddingTop: PropTypes.bool,
  getCode: PropTypes.func.isRequired
}

export default ValidateCode
