import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { colors } from 'styles'

import map from 'lodash/map'
import last from 'lodash/last'

import Popover from 'components/Popover'

import { IoEllipsisHorizontalCircle } from 'react-icons/io5'
import { FiTrash, FiEdit2 } from 'react-icons/fi'

const SettingsIcon = styled(IoEllipsisHorizontalCircle).attrs({
  size: 20,
})`
  color: ${props =>
    props.open ? colors.suicidePreventionBlue : colors.luciaLash};
  :hover {
    color: ${colors.suicidePreventionBlue};
  }
`

const OPTION_ICONS_SIZE = 16
const optionIconsStyle = css`
  stroke-width: 3;
`

const StyledEditIcon = styled(FiEdit2).attrs({
  size: OPTION_ICONS_SIZE,
})`
  ${optionIconsStyle};
`
const StyledTrashIcon = styled(FiTrash).attrs({
  size: OPTION_ICONS_SIZE,
})`
  ${optionIconsStyle};
`

const Option = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  margin-bottom: ${props => (props.last ? 0 : 8)}px;
  cursor: pointer;

  :hover {
    color: ${colors.suicidePreventionBlue};
  }

  > svg {
    margin-right: 7px;
  }
`

const OPTIONS = props => ({
  edit: {
    icon: <StyledEditIcon />,
    text: 'Edit',
    onClick: props.onToggleUpdate,
  },
  delete: {
    icon: <StyledTrashIcon />,
    text: 'Delete',
    onClick: props.onDeleteSound,
  },
})

function SettingsPopover({ onDeleteSound, onToggleUpdate }) {
  const settingsOptions = OPTIONS({ onDeleteSound, onToggleUpdate })
  const optionKeys = Object.keys(settingsOptions)
  const lastOptionKey = last(optionKeys)
  return (
    <Popover clickableElement={<SettingsIcon />}>
      {map(settingsOptions, ({ icon, text, onClick }, key) => (
        <Option key={key} last={lastOptionKey === key} onClick={onClick}>
          {icon}
          {text}
        </Option>
      ))}
    </Popover>
  )
}

SettingsPopover.propTypes = {
  onDeleteSound: PropTypes.func.isRequired,
  onToggleUpdate: PropTypes.func.isRequired,
}

export default SettingsPopover
