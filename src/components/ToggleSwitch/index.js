import React from 'react'

import PropTypes from 'prop-types'

import styled, { css } from 'styled-components'

const Slider = styled.span`
  position: absolute;
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
`

const SlideArea = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props => props.theme.blush};
  -webkit-transition: 0.4s;
  transition: 0.4s;

  ${props =>
    props.round &&
    css`
      border-radius: 20px;
      ${Slider} {
        border-radius: 50%;
      }
    `}
`

const Input = styled.input.attrs({
  type: 'checkbox',
})`
  &:checked + ${SlideArea} {
    background-color: ${props => props.theme.suicidePreventionBlue};
  }
  &:focus + ${SlideArea} {
    box-shadow: 0 0 1px ${props => props.theme.suicidePreventionBlue};
  }

  &:checked + ${SlideArea} > ${Slider} {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
`

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;

  > ${Input} {
    opacity: 0;
    width: 0;
    height: 0;
  }
`

const ToggleSwitch = ({ isChecked, onToggle }) => {
  return (
    <Switch>
      <Input checked={isChecked} onChange={onToggle} />
      <SlideArea round>
        <Slider />
      </SlideArea>
    </Switch>
  )
}

ToggleSwitch.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
}

export default ToggleSwitch
