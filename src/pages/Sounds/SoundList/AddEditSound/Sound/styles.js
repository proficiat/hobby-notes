import styled from 'styled-components'

// import { colors } from 'styles'

import { IoIosCog } from 'react-icons/io'

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1;
  background: white;
  cursor: pointer;
  padding: 18px;
`

export const DropzoneRoot = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
`

export const StyledCogIcon = styled(IoIosCog)``
