import React from 'react'
import PropTypes from 'prop-types'
import ArrowTooltip from './ArrowTooltip'
import Icons from './Icons'
import Info from '@material-ui/icons/Info'

function ArrowTooltipIcons(props) {
  const { children, size, Icon, color, cursor, printDisabled, onClick, isInlineButton } = props
  return (
    <ArrowTooltip title={children}>
      <span>
        <Icons size={size} Icon={Icon} color={color} cursor={cursor} printDisabled={printDisabled} onClick={onClick} isInlineButton={isInlineButton} />
      </span>
    </ArrowTooltip>
  )
}

ArrowTooltipIcons.defaultProps = {
  Icon: Info,
  color: 'blue',
  cursor: 'help',
  printDisabled: true
}

ArrowTooltipIcons.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.element
  ]).isRequired,
  size: PropTypes.number,
  Icon: PropTypes.object,
  color: PropTypes.string,
  cursor: PropTypes.string,
  printDisabled: PropTypes.bool,
  onClick: PropTypes.func,
  isInlineButton: PropTypes.bool
}

export default ArrowTooltipIcons
