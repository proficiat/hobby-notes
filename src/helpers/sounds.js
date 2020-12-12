import { Duration } from 'luxon'
import get from 'lodash/get'
import memoize from 'lodash/memoize'
import find from 'lodash/find'
import findIndex from 'lodash/findIndex'

export const DEFAULT_AUDIO_VOLUME = 0.5

// ToDo: just format seconds
export const getSoundDurations = (sound = null, currentTime = null) => {
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

const filterData = audioBuffer => {
  const rawData = audioBuffer.getChannelData(0) // We only need to work with one channel of data
  const samples = 70 // Number of samples we want to have in our final data set
  const blockSize = Math.floor(rawData.length / samples) // the number of samples in each subdivision
  const filteredData = []
  for (let i = 0; i < samples; i += 1) {
    const blockStart = blockSize * i // the location of the first sample in the block
    let sum = 0
    for (let j = 0; j < blockSize; j += 1) {
      sum += Math.abs(rawData[blockStart + j]) // find the sum of all the samples in the block
    }
    filteredData.push(sum / blockSize) // divide the sum by the block size to get the average
  }
  return filteredData
}

// This guarantees that the largest data point will be set to 1,
// and the rest of the data will scale proportionally
const normalizeData = filteredData => {
  const multiplier = Math.pow(Math.max(...filteredData), -1)
  return filteredData.map(n => n * multiplier)
}

export const getWaveformDataPoints = audioBuffer => {
  const filtered = filterData(audioBuffer)
  return normalizeData(filtered)
}
