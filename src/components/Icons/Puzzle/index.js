import React from 'react'
import PropTypes from 'prop-types'

import styled, { css } from 'styled-components'

const sizeStyle = css`
  height: ${props => props.size}px;
  width: ${props => props.size}px;
`

export const Frame = styled.div`
  ${sizeStyle};
  transform-origin: center center;

  > svg {
    ${sizeStyle};
  }
`

const PuzzleIcon = ({ size, shadow, color, shadowColor }) => {
  return (
    <Frame size={size}>
      <svg
        version="1.1"
        viewBox="0 0 128 128"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs />
        <g id="Layer 1">
          {shadow && (
            <path
              d="M47.3461+61.1731C48.4467+41.2507+19.5816+66.1708+19.5546+48.3605C19.51+18.8919+9.37549+22.4951+49.2369+21.2092C74.3103+20.4004+57.0522+72.1379+74.3276+70.7157C96.8173+68.8641+51.1278+21.2092+76.2185+21.208C118.439+21.206+102.828+29.9111+102.495+63.9588C102.158+98.3742+108.745+97.1571+76.2185+97.255C56.4956+97.3144+92.6525+120.095+61.7319+120.082C27.052+120.066+62.4256+97.8186+47.3461+98.2423C8.38267+99.3372+19.5816+99.3977+19.5816+72.5672C19.5816+56.7235+46.2575+80.8774+47.3461+61.1731Z"
              fill={shadowColor}
              opacity="1"
            />
          )}
          <path
            d="M50.0611+61.1637C51.1618+41.2413+22.2967+66.1614+22.2697+48.3511C22.225+18.8826+12.0905+22.4857+51.952+21.1999C77.0254+20.391+59.7673+72.1285+77.0427+70.7063C99.5323+68.8548+53.8428+21.1999+78.9335+21.1986C121.154+21.1966+105.543+29.9017+105.21+63.9494C104.873+98.3649+111.46+97.1477+78.9335+97.2456C59.2107+97.305+95.3675+120.086+64.447+120.072C29.767+120.057+65.1407+97.8092+50.0611+98.2329C11.0977+99.3278+22.2967+99.3883+22.2967+72.5578C22.2967+56.7141+48.9725+80.868+50.0611+61.1637Z"
            fill={color}
            opacity="1"
          />
        </g>
      </svg>
    </Frame>
  )
}

PuzzleIcon.defaultProps = {
  size: 128,
  shadow: true,
  color: '#0a0a0a',
  shadowColor: '#c8c8c8',
}

PuzzleIcon.propTypes = {
  color: PropTypes.string,
  shadow: PropTypes.bool,
  shadowColor: PropTypes.string,
  size: PropTypes.number,
}

export default PuzzleIcon
