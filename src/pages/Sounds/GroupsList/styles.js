import styled from 'styled-components'

import { colors } from 'styles'

// import { space, layout } from 'styled-system'

export const Frame = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
  background: ghostwhite;
  padding-left: 36px;
  flex-shrink: 0;
  overflow-y: auto;
  overflow-x: hidden;
  box-shadow: 1px 0 22px 0 rgba(10, 10, 10, 0.08);
`

export const Item = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
  margin-bottom: 24px;
  color: ${colors.lushLava};
  font-weight: 300;
`

export const Controls = styled(Item)``
