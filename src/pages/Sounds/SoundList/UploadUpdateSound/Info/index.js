import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import get from 'lodash/get'

import { Field, Input, Base, StyledSup, TextArea } from './styles'

class Info extends PureComponent {
  constructor(props) {
    super(props)
    const { initData } = props
    this.state = {
      name: get(initData, 'name', ''),
      description: get(initData, 'description', ''),
    }
  }

  handleChangeName = event => {
    const name = get(event, 'target.value')
    this.setState({ name })
  }

  handleChangeDescription = event => {
    const description = get(event, 'target.value')
    this.setState({ description })
  }

  render() {
    const { name, description } = this.state
    const { isVisible } = this.props
    if (!isVisible) {
      return null
    }
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

Info.defaultProps = {
  initData: null,
}

Info.propTypes = {
  initData: PropTypes.object,
  isVisible: PropTypes.bool.isRequired,
}

export default Info
