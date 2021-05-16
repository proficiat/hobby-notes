import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import get from 'lodash/get'

import RadioButton from 'components/RadioButton'

import { Field, Input, Base, StyledSup, TextArea, Row, Privacy } from './styles'

class Info extends PureComponent {
  handleChangeName = event => {
    const { onChangeName } = this.props
    const name = get(event, 'target.value')
    onChangeName(name)
  }

  handleChangeDescription = event => {
    const { onChangeDescription } = this.props
    const description = get(event, 'target.value')
    onChangeDescription(description)
  }

  handleChangeBuyLink = event => {
    const { onChangeBuyLink } = this.props
    const buyLink = get(event, 'target.value')
    onChangeBuyLink(buyLink)
  }

  handleChangePrivacy = event => {
    const { onChangePrivacy } = this.props
    const {
      target: { value },
    } = event
    onChangePrivacy(value)
  }

  render() {
    const { name, description, buyLink, isPrivate } = this.props
    return (
      <Base>
        <Row>
          <Field>
            <div>
              Name<StyledSup>*</StyledSup>
            </div>{' '}
            <Input
              placeholder="Name your track"
              type="text"
              value={name}
              onChange={this.handleChangeName}
            />
          </Field>
          <Field>
            <div>
              Privacy<StyledSup invisible>*</StyledSup>
            </div>
            <Privacy>
              <RadioButton
                checked={!isPrivate}
                label="Public"
                value="public"
                onChange={this.handleChangePrivacy}
              />
              <RadioButton
                checked={isPrivate}
                label="Private"
                value="private"
                onChange={this.handleChangePrivacy}
              />
            </Privacy>
          </Field>
        </Row>
        <Field>
          Buy-link
          <Input
            type="text"
            value={buyLink}
            width={1}
            onChange={this.handleChangeBuyLink}
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
      </Base>
    )
  }
}

Info.propTypes = {
  buyLink: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isPrivate: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  onChangeBuyLink: PropTypes.func.isRequired,
  onChangeDescription: PropTypes.func.isRequired,
  onChangeName: PropTypes.func.isRequired,
  onChangePrivacy: PropTypes.func.isRequired,
}

export default Info
