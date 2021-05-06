import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import get from 'lodash/get'

import { Field, Input, Base, StyledSup, TextArea } from './styles'

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

  render() {
    const { name, description } = this.props
    return (
      <Base>
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
  description: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChangeDescription: PropTypes.func.isRequired,
  onChangeName: PropTypes.func.isRequired,
}

export default Info
