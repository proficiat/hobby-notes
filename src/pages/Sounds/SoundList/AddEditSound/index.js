import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

// import { gql } from 'apollo-boost'

import get from 'lodash/get'
import { colors } from 'styles'
// import isEmpty from 'lodash/isEmpty'

// import { Mutation, Query } from 'react-apollo'

import Puzzle from 'components/Puzzle'

import {
  ImageWrapper,
  Container,
  Cover,
  Sound,
  BottomInfoTip,
  Field,
  Input,
  TextArea,
} from './styles'

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
      <Container>
        <Cover onClick={this.handleAddImage}>
          {imageUrl && (
            <ImageWrapper>
              <img alt="Flowers in Chania" src={imageUrl} />
            </ImageWrapper>
          )}
          <Puzzle bgColor="white" color={colors.luciaLash} side="left" />
        </Cover>
        <Sound>
          <Field>
            <div>
              Name<sup>*</sup>
            </div>{' '}
            <Input
              placeholder="Name your track"
              type="text"
              value={audioName}
              onChange={this.handleChangeName}
            />
          </Field>
          <Field>
            Description{' '}
            <TextArea
              placeholder="Describe your track"
              value={description}
              onChange={this.handleChangeDescription}
            />
          </Field>
          <BottomInfoTip
            onClick={audioUrl ? this.handleSubmit : this.handleAddAudio}
          >
            {audioUrl ? 'Upload' : 'Please click here to upload your sound'}
          </BottomInfoTip>
        </Sound>
      </Container>
    )
  }
}

AddEditSound.propTypes = {
  addSound: PropTypes.func.isRequired,
}

export default AddEditSound
