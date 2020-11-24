import { Duration } from 'luxon'
import get from 'lodash/get'
import memoize from 'lodash/memoize'
import find from 'lodash/find'
import findIndex from 'lodash/findIndex'

export const DEFAULT_AUDIO_VOLUME = 0.5

export const getSoundDurations = (sound, currentTime) => {
  const currentDuration = Duration.fromObject({
    seconds: currentTime,
  }).toFormat('mm:ss')
  const soundDuration = Duration.fromObject({
    seconds: get(sound, 'duration', 0),
  }).toFormat('mm:ss')
  return { currentDuration, soundDuration }
}

export const findActiveSound = memoize((activeSoundId, sounds) =>
  find(sounds, sound => get(sound, 'id') === activeSoundId),
)

export const findActiveSoundIndex = memoize((activeSoundId, sounds) =>
  findIndex(sounds, ['id', activeSoundId]),
)
