import styled, { css, keyframes } from 'styled-components'

const spark1 = keyframes`
  0% {
    right: -5px;
    height: 1px;
    width: 1px;
    opacity: 0;
  }
  20% {
    right: 0;
    height: 3px;
    width: 3px;
    opacity: 1;
  }
  30% {
    right: -5px;
    height: 3px;
    width: 3px;
    opacity: 1;
  }
  70% {
    height: 3px;
    width: 3px;
  }
  100% {
    right: -60px;
    bottom: 40px;
    opacity: 0;
  }
  `

const spark2 = keyframes`
  0% {
    height: 3px;
    width: 3px;
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  100% {
    right: -20px;
    bottom: 100px;
    opacity: 0;
  }
`
const spark3 = keyframes`
  0% {
    opacity: 0;
  }
  30% {
    opacity: 1;
    height: 2px;
    width: 2px;
  }
  100% {
    left: 0;
    bottom: 100px;
    opacity: 0;
    height: 3px;
    width: 3px;
  }
`
const spark4 = keyframes`
  0% {
    opacity: 0;
  }
  30% {
    opacity: 1;
    height: 2px;
    width: 2px;
  }
  100% {
    left: -20px;
    bottom: -10px;
    opacity: 0;
    height: 3px;
    width: 3px;
  }
  `

export const Filament = styled.span`
  position: absolute;
  display: block;
  height: 35px;
  width: 35px;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  overflow: hidden;
  transform: translate(-50%, -50%) rotate(-45deg);
  &::after,
  &::before {
    content: '';
    display: block;
    height: 6px;
    width: 17px;
    border-radius: 50%;
    border: 2px solid #4a426b;
    position: absolute;
    transition: var(--ts-speed);
    top: -4px;
    left: -2px;
    transform: rotate(-10deg);
  }
  &::before {
    left: 15px;
    transform: rotate(10deg);
  }
`

export const BulbCenter = styled.span`
  position: absolute;
  display: block;
  height: 36px;
  width: 36px;
  background-color: #5a527b;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transition: var(--ts-speed);
  transform: translate(-50%, -50%);
  box-shadow: inset 0 0 0 4px #635a84;
  &::after {
    content: '';
    display: block;
    height: 14px;
    width: 14px;
    background-color: #7b7394;
    border-radius: 50%;
    position: absolute;
    transition: var(--ts-speed);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 2px 4px #524a73;
  }
`

export const Bulb = styled.i`
  height: 90px;
  width: 90px;
  background-color: #4a426b;
  border-radius: 50%;
  position: relative;
  top: 10px;
  left: 10px;
  display: block;
  transition: var(--ts-speed);
  box-shadow: inset 0 0 1px 3px #4a426b, inset 0 0 6px 8px #423963,
    0 20px 30px -10px rgba(0, 0, 0, 0.4);

  > ${Filament}:nth-child(2) {
    transform: translate(-50%, -50%) rotate(45deg) !important;
  }
  > ${Filament}:nth-child(3) {
    transform: translate(-50%, -50%) rotate(135deg) !important;
  }
  > ${Filament}:nth-child(4) {
    transform: translate(-50%, -50%) rotate(225deg) !important;
  }
`

const defaultSparkStyle = css`
  position: absolute;
  display: block;
  height: 3px;
  width: 3px;
  background-color: #d1b82b;
  border-radius: 50%;
  transition: 0.4s;
  opacity: 0;
`
export const Sparks = styled.span`
  .spark1 {
    ${defaultSparkStyle};
    height: 1px;
    width: 1px;
    right: -5px;
    bottom: 23px;
  }
  .spark2 {
    ${defaultSparkStyle};
    right: 20px;
    bottom: 80px;
  }
  .spark3 {
    ${defaultSparkStyle};
    left: 20px;
    bottom: 80px;
  }
  .spark4 {
    ${defaultSparkStyle};
    left: 20px;
    bottom: 20px;
  }
`

export const Reflections = styled.span`
  height: 100%;
  width: 100%;
  display: block;
  border-radius: 50%;
  overflow: hidden;
  position: absolute;
  z-index: 90;
  perspective: 70px;
  > span {
    height: 80px;
    width: 80px;
    border-radius: 50%;
    background-image: linear-gradient(
      -135deg,
      transparent 10%,
      rgba(255, 255, 255, 0.3)
    );
    position: absolute;
    left: -40px;
    bottom: -45px;
    &::after {
      content: '';
      display: block;
      height: 35px;
      width: 20px;
      position: absolute;
      top: -36px;
      right: -40px;
      border-radius: 50%;
      box-shadow: 4px -2px 0 -3px rgba(255, 255, 255, 0.4);
      filter: blur(1px);
      transform: rotate(-10deg);
    }
  }
  &::after {
    content: '';
    display: block;
    height: 80px;
    width: 50px;
    background-image: linear-gradient(
      80deg,
      rgba(255, 255, 255, 0.05) 45%,
      rgba(255, 255, 255, 0.5)
    );
    border-radius: 10% 20% 50% 30% / 30% 60% 30% 40%;
    position: absolute;
    transform-style: preserve-3d;
    transform: rotateX(-25deg) rotate(-35deg) skewx(-15deg)
      translate(10px, -20px);
    top: -8px;
    left: -5px;
  }
  &::before {
    content: '';
    display: block;
    position: absolute;
    height: 10px;
    width: 30px;
    background-image: linear-gradient(
      to right,
      transparent,
      rgba(255, 255, 255, 0.15)
    );
    bottom: 10px;
    right: 0;
    transform: rotate(45deg);
  }
`

export const HiddenCheckbox = styled.input.attrs({
  type: 'checkbox',
})`
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  z-index: 100;
  cursor: pointer;

  &:checked ~ label ${Bulb} {
    left: 120px;
    background-color: #a7694a;
    box-shadow: inset 0 0 1px 3px #a56758, inset 0 0 6px 8px #6b454f,
      0 20px 30px -10px rgba(255, 255, 255, 0.4),
      0 0 30px 50px rgba(253, 184, 67, 0.1);
  }

  &:checked ~ label ${Bulb} > ${BulbCenter} {
    background-color: #feed6b;
    box-shadow: inset 0 0 0 4px #fdec6a, 0 0 12px 10px #bca83c,
      0 0 20px 14px #a1664a;
    &::after {
      background-color: #fef401;
      box-shadow: 0 0 2px 4px #fdb843;
    }
  }

  &:checked ~ label ${Bulb} > ${Filament} {
    &::before,
    &::after {
      border-color: #fef4d5;
    }
  }

  &:checked ~ label ${Bulb} > ${Sparks} {
    &.spark1 {
      height: 1px;
      width: 1px;
      animation: ${spark1} 2s ease-in-out;
      animation-delay: 0.4s;
    }
    &.spark2 {
      height: 1px;
      width: 1px;
      animation: ${spark2} 2.4s ease-in-out;
      animation-delay: 0.4s;
    }
    &.spark3 {
      height: 1px;
      width: 1px;
      animation: ${spark3} 2s ease-in-out;
      animation-delay: 0.9s;
    }
    &.spark4 {
      height: 1px;
      width: 1px;
      animation: ${spark4} 1.7s ease-in-out;
      animation-delay: 0.9s;
    }
  }
`

export const Switch = styled.div`
  --ts-speed: 0.7s;

  position: relative;
  > label {
    height: 110px;
    width: 220px;
    background-color: #39315a;
    border-radius: 100px;
    display: block;
    box-shadow: inset 0 0 20px rgba(255.255, 255, 0.2) inset 0 0 5px -2px rgba(255.255, 255, 0.4);
  }
`
