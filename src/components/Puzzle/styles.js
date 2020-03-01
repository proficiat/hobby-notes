import styled, { css } from 'styled-components'
import round from 'lodash/round'

const PIECE_SIZE = 20
const BRIDGE_PICE_SIZE = 10
const MIDDLE_PIECE_SIZE = 16

export const PuzzleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;

  ${props =>
    props.side === 'left' &&
    css`
      top: 50%;
      right: calc(100% - ${PIECE_SIZE}px - ${round(BRIDGE_PICE_SIZE / 2)}px);
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
    `};

  ${props =>
    props.side === 'top' &&
    css`
      right: 50%;
      bottom: calc(
        100% - ${round(PIECE_SIZE / 2)}px - ${round(BRIDGE_PICE_SIZE / 2)}px
      );
      -webkit-transform: rotate(90deg) translateY(-100%);
      transform: rotate(90deg) translateY(-100%);
    `}

  ${props =>
    props.side === 'bottom' &&
    css`
      right: 50%;
      top: calc(100% - ${round(BRIDGE_PICE_SIZE / 2)}px);
      -webkit-transform: rotate(90deg) translateY(-100%);
      transform: rotate(90deg) translateY(-100%);
    `}
`

export const Piece = styled.div`
  width: ${PIECE_SIZE}px;
  height: ${PIECE_SIZE}px;
  background: ${props => props.color};
  border-radius: 100%;
`

export const RelativePiece = styled.div`
  position: relative;
  height: 100%;
  width: 0;
`

export const BridgePiece = styled.div`
  position: absolute;
  height: ${BRIDGE_PICE_SIZE}px;
  width: ${BRIDGE_PICE_SIZE}px;
  background: ${props => props.innerColor};
  border-radius: 90%;
  left: 50%;
  -webkit-transform: translateX(-52%);
  transform: translateX(-52%);

  ${props =>
    props.top &&
    css`
      top: calc(100% - 2px);
      z-index: 2;
    `}

  ${props =>
    props.middle &&
    css`
      position: unset;
      height: ${MIDDLE_PIECE_SIZE}px;
      width: ${MIDDLE_PIECE_SIZE}px;
      background: ${props.color};
      z-index: 1;
    `}

  ${props =>
    props.bottom &&
    css`
      bottom: calc(100% - 2px);
      z-index: 2;
    `}
`

export const Container = styled.div`
  position: relative;
  background: ${props => props.color};
  height: ${props => (props.height ? props.height : 84)}px;
  width: ${props => (props.width ? props.width : 84)}px;
`
