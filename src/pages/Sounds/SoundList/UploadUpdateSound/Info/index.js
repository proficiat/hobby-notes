import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import RadioButton from 'components/RadioButton'

import { Field, Input, Base, StyledSup, TextArea, Row, Privacy } from './styles'

export const INFO_FIELDS = {
  name: 'name',
  description: 'description',
  buyLink: 'buyLink',
  isPrivate: 'isPrivate',
}

export const PRIVACY = {
  public: 'public',
  private: 'private',
}

class Info extends PureComponent {
  render() {
    const {
      name,
      description,
      buyLink,
      isPrivate,
      onChangeInfoField,
    } = this.props
    return (
      <Base>
        <Row>
          <Field>
            <div>
              Name<StyledSup>*</StyledSup>
            </div>
            <Input
              placeholder="Name your track"
              type="text"
              value={name}
              onChange={onChangeInfoField(INFO_FIELDS.name)}
            />
          </Field>
          <Field>
            <div>
              Privacy<StyledSup invisible>*</StyledSup>
            </div>
            <Privacy>
              {Object.values(PRIVACY).map(value => (
                <RadioButton
                  checked={value === PRIVACY.private ? isPrivate : !isPrivate}
                  key={value}
                  label={value.charAt(0).toUpperCase() + value.slice(1)}
                  value={value}
                  onChange={onChangeInfoField(INFO_FIELDS.isPrivate)}
                />
              ))}
            </Privacy>
          </Field>
        </Row>
        <Field>
          Buy-link
          <Input
            type="text"
            value={buyLink}
            width={1}
            onChange={onChangeInfoField(INFO_FIELDS.buyLink)}
          />
        </Field>
        <Field>
          Description
          <TextArea
            placeholder="Describe your track"
            value={description}
            onChange={onChangeInfoField(INFO_FIELDS.description)}
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
  onChangeInfoField: PropTypes.func.isRequired,
}

export default Info
