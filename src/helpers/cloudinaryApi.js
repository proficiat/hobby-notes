const widgetSetup = {
  cloudName: process.env.REACT_APP_CLOUD_NAME,
  uploadPreset: process.env.REACT_APP_CLOUD_UPLOAD_PRESET,
}

export const uploadFileToCloudinary = async file => {
  if (file && file.length === 0) return null
  const formData = new FormData()
  const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${widgetSetup.cloudName}/upload`
  const CLOUDINARY_UPLOAD_PRESET = widgetSetup.uploadPreset
  formData.append('file', file)
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET) // Replace the preset name with your own

  const response = await fetch(CLOUDINARY_UPLOAD_URL, {
    method: 'POST',
    body: formData,
  })
  const data = await response.json()
  return data.secure_url
}
