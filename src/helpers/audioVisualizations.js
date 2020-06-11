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

export const drawLinearWaveForm = (normalizedData, waveformImageRef) => {
  // Set up the canvas
  const canvas = waveformImageRef
  const dpr = window.devicePixelRatio || 1
  const padding = 20
  canvas.width = canvas.offsetWidth * dpr
  canvas.height = (canvas.offsetHeight + padding * 2) * dpr
  const ctx = canvas.getContext('2d')
  ctx.scale(dpr, dpr)
  ctx.translate(0, canvas.offsetHeight / 2 + padding) // Set Y = 0 to be in the middle of the canvas

  // draw the line segments
  const width = canvas.offsetWidth / normalizedData.length
  for (let i = 0; i < normalizedData.length; i += 1) {
    const x = width * i
    let height = normalizedData[i] * canvas.offsetHeight - padding
    if (height < 0) {
      height = 0
    } else if (height > canvas.offsetHeight / 2) {
      height = height > canvas.offsetHeight / 2
    }
    drawLineSegment(ctx, x, height, width, (i + 1) % 2)
  }
}

const drawLineSegment = (ctx, x, y, width, isEven) => {
  ctx.lineWidth = 1 // how thick the line is
  ctx.strokeStyle = 'red' // what color our line is
  ctx.beginPath()
  y = isEven ? y : -y
  ctx.moveTo(x, 0)
  ctx.lineTo(x, y)
  ctx.arc(x + width / 2, y, width / 2, Math.PI, 0, isEven)
  ctx.lineTo(x + width, 0)
  ctx.stroke()
}

export const drawWaveFormBars = (data, waveformImageRef) => {
  const canvas = waveformImageRef
  const ctx = canvas.getContext('2d')
  const step = 2 // 2 points for line, 1 for space
  // const width = data.length * step
  let maxY = 0

  // find max height
  ctx.fillStyle = '#C3002F'
  for (let i = 0; i < data.length; i += 1) {
    if (data[i] > maxY) maxY = data[i]
  }
  ctx.transform(1, 0, 0, -canvas.height / maxY, 0, canvas.height) // scale horizontally and flip coordinate system
  // ctx.transform(0.1, 0, 0, 0, 0, canvas.height)
  for (let i = 0; i < data.length; i += 1) ctx.fillRect(i * step, 0, 1, data[i])

  // ctx.fill()

  // return canvas.toDataURL()
}
