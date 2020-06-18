import { Duration } from 'luxon'
import get from 'lodash/get'

export const getSoundDurations = (sound, currentTime) => {
  const currentDuration = Duration.fromObject({
    seconds: currentTime,
  }).toFormat('mm:ss')
  const soundDuration = Duration.fromObject({
    seconds: get(sound, 'duration', 0),
  }).toFormat('mm:ss')
  return { currentDuration, soundDuration }
}
