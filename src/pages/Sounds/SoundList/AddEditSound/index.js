import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

// import { gql } from 'apollo-boost'

import get from 'lodash/get'
// import isEmpty from 'lodash/isEmpty'

// import { Mutation, Query } from 'react-apollo'

import { ImageWrapper } from './styles'

const widgetSetup = {
  cloudName: 'adsum-cloud',
  uploadPreset: 'hu777qhj',
}

// https://cloudinary.com/documentation/upload_widget
class AddEditSound extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      audioName: '',
      audioUrl: '',
      imageUrl: '',
      description: '',
    }
  }

  handleAddImage = () => {
    const widget = window.cloudinary.createUploadWidget(
      widgetSetup,
      (error, res) => {
        if (!error && res && res.event === 'success') {
          console.log('Done! Here is the image info: ', res.info)
          const cloudinaryUrl = get(res, 'info.url', '')
          if (cloudinaryUrl) {
            this.setState({ imageUrl: cloudinaryUrl })
          }
        }
      },
    )
    widget.open()
  }

  handleAddAudio = () => {
    const widget = window.cloudinary.createUploadWidget(
      widgetSetup,
      (error, res) => {
        if (!error && res && res.event === 'success') {
          console.log('Done! Here is the image info: ', res.info)
          const cloudinaryUrl = get(res, 'info.secure_url', '')
          if (cloudinaryUrl) {
            this.setState({ audioUrl: cloudinaryUrl })
          }
        }
      },
    )
    widget.open()
  }

  handleChangeName = target => {
    const audioName = get(target, 'target.value')
    this.setState({ audioName })
  }

  handleChangeDescription = target => {
    const description = get(target, 'target.value')
    this.setState({ description })
  }

  handleSubmit = async () => {
    const { addSound } = this.props
    const { audioName, imageUrl, audioUrl, description } = this.state
    console.log({ audioName, imageUrl, audioUrl, description })
    await addSound({
      variables: {
        name: audioName,
        imageUrl,
        audioUrl,
        description,
      },
    })
    this.setState({
      audioName: '',
      imageUrl: '',
      audioUrl: '',
      description: '',
    })
  }

  render() {
    const { audioName, imageUrl, audioUrl, description } = this.state
    return (
      <div>
        <div>
          Name <input value={audioName} onChange={this.handleChangeName} />
        </div>
        <div>
          {imageUrl && (
            <ImageWrapper>
              <img alt="Flowers in Chania" src={imageUrl} />
            </ImageWrapper>
          )}
          {!imageUrl && (
            <button type="button" onClick={this.handleAddImage}>
              Add Image
            </button>
          )}
        </div>
        <div>
          {!audioUrl && (
            <button type="button" onClick={this.handleAddAudio}>
              Add Audio
            </button>
          )}
        </div>
        <div>
          Description{' '}
          <input value={description} onChange={this.handleChangeDescription} />
        </div>
        <button type="button" onClick={this.handleSubmit}>
          add!
        </button>
      </div>
    )
  }
}

AddEditSound.propTypes = {
  addSound: PropTypes.func.isRequired,
}

export default AddEditSound
