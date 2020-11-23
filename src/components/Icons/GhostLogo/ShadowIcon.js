import React from 'react'

import styled, { keyframes } from 'styled-components'

const pulse = keyframes`
  0% {
    width: 72%;
  }
  50% {
    width: 69%;
  } 
  100% {
    width: 72%;
  }
`

export const Frame = styled.div`
  height: 32px;
  width: 64px;
  animation: ${pulse} 3s ease-out infinite;
  transform-origin: center center;
`

const ShadowIcon = () => {
  return (
    <Frame>
      <svg version="1.1" viewBox="0 0 64 32" xmlns="http://www.w3.org/2000/svg">
        <defs />
        <g id="Layer 1">
          <path
            d="M13.6553+16C13.6553+12.7281+21.8685+10.0756+32+10.0756C42.1315+10.0756+50.3447+12.7281+50.3447+16C50.3447+19.2719+42.1315+21.9244+32+21.9244C21.8685+21.9244+13.6553+19.2719+13.6553+16Z"
            fill="#000000"
            opacity="0.88"
          />
          <path
            d="M16.3243+15.7498C16.3243+13.4422+23.344+11.5715+32.0032+11.5715C40.6624+11.5715+47.682+13.4422+47.682+15.7498C47.682+18.0574+40.6624+19.9281+32.0032+19.9281C23.344+19.9281+16.3243+18.0574+16.3243+15.7498Z"
            fill="#ffffff"
            opacity="1"
          />
        </g>
      </svg>
    </Frame>
  )
}

export default ShadowIcon
