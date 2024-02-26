import { MouseEvent } from 'react'

import { ButtonStyle, ButtonVariant } from '@typings/enums/button-style'

import { ActionButtonsCellProps } from './action-buttons-cell.type'

export const handleClickButton =
  (onClick?: () => void) =>
  (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation()

    if (onClick) {
      onClick()
    }
  }

export const getButtonStyle = (style?: ButtonStyle): ButtonStyle => {
  switch (style) {
    case ButtonStyle.SUCCESS:
      return ButtonStyle.SUCCESS
    case ButtonStyle.DANGER:
      return ButtonStyle.DANGER
    case ButtonStyle.PRIMARY:
      return ButtonStyle.PRIMARY
    case ButtonStyle.TRANSPARENT:
      return ButtonStyle.TRANSPARENT
    case ButtonStyle.CASUAL:
      return ButtonStyle.CASUAL
    default:
      return ButtonStyle.DEFAULT
  }
}

export const getButtonVariant = (variant?: ButtonVariant): ButtonVariant => {
  switch (variant) {
    case ButtonVariant.OUTLINED:
      return ButtonVariant.OUTLINED
    default:
      return ButtonVariant.CONTAINED
  }
}

export const getButtonActionsConfig = ({
  isFirstRow = false,
  firstButtonElement,
  secondButtonElement,
  thirdButtonElement,
  firstButtonTooltipText,
  secondButtonTooltipText,
  thirdButtonTooltipText,
  isFirstButton = false,
  isSecondButton = false,
  isThirdButton = false,
  firstButtonStyle,
  secondButtonStyle,
  thirdButtonStyle,
  firstButtonVariant,
  secondButtonVariant,
  thirdButtonVariant,
  disabledFirstButton,
  disabledSecondButton,
  disabledThirdButton,
  onClickFirstButton,
  onClickSecondButton,
  onClickThirdButton,
}: ActionButtonsCellProps) => [
  {
    showButton: isFirstButton,
    buttonElement: firstButtonElement,
    tooltipText: isFirstRow ? firstButtonTooltipText : '',
    styleType: getButtonStyle(firstButtonStyle),
    variant: getButtonVariant(firstButtonVariant),
    disabled: disabledFirstButton,
    onclick: handleClickButton(onClickFirstButton),
  },
  {
    showButton: isSecondButton,
    buttonElement: secondButtonElement,
    tooltipText: isFirstRow ? secondButtonTooltipText : '',
    styleType: getButtonStyle(secondButtonStyle),
    variant: getButtonVariant(secondButtonVariant),
    disabled: disabledSecondButton,
    onclick: handleClickButton(onClickSecondButton),
  },
  {
    showButton: isThirdButton,
    buttonElement: thirdButtonElement,
    tooltipText: isFirstRow ? thirdButtonTooltipText : '',
    styleType: getButtonStyle(thirdButtonStyle),
    variant: getButtonVariant(thirdButtonVariant),
    disabled: disabledThirdButton,
    onclick: handleClickButton(onClickThirdButton),
  },
]
