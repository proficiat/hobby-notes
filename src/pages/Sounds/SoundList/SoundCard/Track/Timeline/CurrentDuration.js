import React from 'react'

import { audioCurrentTimeVar } from 'cache'

import { useReactiveVar } from '@apollo/client'

import { getSoundDurations } from 'helpers/sounds'

const CurrentDuration = props => {
  const currentTime = useReactiveVar(audioCurrentTimeVar)
  const { currentDuration } = getSoundDurations(null, currentTime)
  return <span>{currentDuration}</span>
}

export default CurrentDuration
