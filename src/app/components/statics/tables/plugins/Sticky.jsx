import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import styled, { css } from 'styled-components'
import classNames from 'classnames'
import throttle from 'lodash/throttle'

const TbStyle = styled.table`
  ${props => css`
    top: ${props.trigger ? '0' : `${props.maxHeight || 0}px`}
  `}
`

function Sticky(props) {
  const { Comp, bodyEl, maxHeight, ...otherProps } = props
  const [scrollY, setScrollY] = useState(0)
  useEffect(() => {
    handleScroll()
    window.onscroll = () => middleScrollThrottle()
    return () => {
      window.onscroll = null
    }
  }, [])
  const trigger = useScrollTrigger()
  const middleScrollThrottle = useCallback(throttle(handleScroll, 500), [])
  function handleScroll() {
    setScrollY(window.scrollY)
  }
  return (
    <TbStyle
      className={classNames('fw-t-all-light-gray fw-t-layout fw-th-gray', {
        'fw-sticky': bodyEl
          ? ((bodyEl?.offsetTop + bodyEl?.offsetHeight) > window.scrollY)
          : true
      })}
      trigger={trigger}
      maxHeight={maxHeight}
    >
      <Comp {...otherProps} />
    </TbStyle>
  )
}

Sticky.propTypes = {
  Comp: PropTypes.func.isRequired,
  bodyEl: PropTypes.object,
  maxHeight: PropTypes.number
}

export default Sticky