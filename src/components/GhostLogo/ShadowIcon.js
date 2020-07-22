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
            d="M11+11.9317C11+7.51341+20.402+3.93169+32+3.93169C43.598+3.93169+53+7.51341+53+11.9317C53+16.35+43.598+19.9317+32+19.9317C20.402+19.9317+11+16.35+11+11.9317Z"
            fill="#c3002f"
            opacity="0.3"
          />
        </g>
      </svg>
    </Frame>
  )
}

export default ShadowIcon
