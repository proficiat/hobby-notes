import React from 'react'

import PropTypes from 'prop-types'

import {
  Filament,
  BulbCenter,
  Bulb,
  Sparks,
  Reflections,
  HiddenCheckbox,
  Switch,
} from './styles'

const BubbleSwitch = ({ isChecked, onToggle }) => {
  return (
    <Switch>
      <HiddenCheckbox checked={isChecked} name="toggle" onChange={onToggle} />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="toggle">
        <Bulb>
          <BulbCenter />
          <Filament />
          <Filament />
          <Filament />
          <Filament />
          <Reflections>
            <span />
          </Reflections>
          <Sparks>
            <i className="spark1" />
            <i className="spark2" />
            <i className="spark3" />
            <i className="spark4" />
          </Sparks>
        </Bulb>
      </label>
    </Switch>
  )
}

BubbleSwitch.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
}

export default BubbleSwitch
