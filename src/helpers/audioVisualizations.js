import forEach from 'lodash/forEach'

// https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API#Creating_a_frequency_bar_graph
export const subscribeFrequencyBar = (canvasRef, audioRef) => {
  const { analyser, canvas, canvasContext } = createAnalyser(
    audioRef,
    canvasRef,
    256,
  )
  const bufferLength = analyser.frequencyBinCount
  const dataArray = new Uint8Array(bufferLength)
  const { width: WIDTH, height: HEIGHT } = canvas

  const barWidth = (WIDTH / bufferLength) * 4

  const renderFrequencyBar = () => {
    requestAnimationFrame(renderFrequencyBar)
    let x = 0
    analyser.getByteFrequencyData(dataArray)
    canvasContext.fillStyle = '#f7f8fa'
    canvasContext.fillRect(0, 0, WIDTH, HEIGHT)
    canvasContext.fillStyle = '#DDEDF4'
    forEach(dataArray, height => {
      const barHeight = height * 2
      canvasContext.fillRect(x, HEIGHT - barHeight, barWidth, barHeight)
      x += barWidth + 1
    })
  }
  renderFrequencyBar()
}

export const subscribeWaveForm = (canvasRef, audioRef) => {
  const { analyser, canvas, canvasContext } = createAnalyser(
    audioRef,
    canvasRef,
    2048,
  )

  const bufferLength = analyser.frequencyBinCount
  const dataArray = new Uint8Array(bufferLength)
  const { width: WIDTH, height: HEIGHT } = canvas

  const renderWaveForm = () => {
    requestAnimationFrame(renderWaveForm)
    analyser.getByteTimeDomainData(dataArray)
    canvasContext.fillStyle = '#f7f8fa'
    canvasContext.fillRect(0, 0, WIDTH, HEIGHT)
    canvasContext.lineWidth = 4
    canvasContext.strokeStyle = '#DDEDF4'
    canvasContext.beginPath()
    const sliceWidth = WIDTH / bufferLength
    let x = 0
    forEach(dataArray, (height, index) => {
      const v = height / 128.0
      const y = (v * HEIGHT) / 2

      if (index === 0) {
        canvasContext.moveTo(x, y)
      } else {
        canvasContext.lineTo(x, y)
      }

      x += sliceWidth
    })
    canvasContext.lineTo(WIDTH, HEIGHT / 2)
    canvasContext.stroke()
  }
  renderWaveForm()
}

const createAnalyser = (audioRef, canvasRef, fftSize) => {
  audioRef.crossOrigin = 'anonymous'
  const audioContext = new (window.AudioContext || window.webkitAudioContext)()
  const contextSource = audioContext.createMediaElementSource(audioRef)
  const analyser = audioContext.createAnalyser()

  canvasRef.width = window.innerWidth
  canvasRef.height = window.innerHeight

  const canvasContext = canvasRef.getContext('2d')
  contextSource.connect(analyser)
  analyser.connect(audioContext.destination)
  analyser.fftSize = fftSize

  return { analyser, canvas: canvasRef, canvasContext }
}
