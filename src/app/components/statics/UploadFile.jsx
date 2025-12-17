import React from 'react';
import PropTypes from 'prop-types';
import CloudUpload from '@material-ui/icons/CloudUpload';
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import Input from './Input'
import Button from './Button'
import Icons from './Icons'

function UploadFile(props) {
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const { files,change, accept, onInput, onClick,onSubmit, size, children, name,register } = props;
  return (
    <div className='w3-section'>
      <div className={!smallScreen ?`fw-flex fw-flex-jc-sa fw-flex-ai-center fw-ellipsis`:'fw-ellipsis' }>
      <div>
        <Input type="file" name={name} onInput={onInput} accept={accept} register={register}/>
      </div>

      <div>
        <Button onSubmit={onSubmit} disabled={!files?.length} onClick={onClick}>
          <Icons size={size} Icon={CloudUpload} isInlineButton />
          {children}
        </Button>
      </div>
    </div>
    </div>
  )
}

UploadFile.defaultProps = {
  accept: '.pdf,.odt',
  name: 'file'
}

UploadFile.propTypes = {
  files: PropTypes.object,
  accept: PropTypes.string,
  onInput: PropTypes.func.isRequired,
  // onClick: PropTypes.func.isRequired,
  size: PropTypes.number,
  children: PropTypes.string.isRequired,
  name: PropTypes.string
}

export default UploadFile