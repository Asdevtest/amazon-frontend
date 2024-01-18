import { MouseEvent } from 'react'

import { DefaultButtonStyles } from '@typings/enums/default-button-style'

import { ActionButtonsCellProps } from './action-buttons-cell.type'

export const handleClickButton = (onClick?: () => void) => (e: MouseEvent<HTMLButtonElement>) => {
  e.stopPropagation()

  if (onClick) {
    onClick()
  }
}

export const getDefaultButtonStyle = (style?: DefaultButtonStyles): Record<DefaultButtonStyles, boolean> => ({
  [DefaultButtonStyles.SUCCESS]: style === DefaultButtonStyles.SUCCESS,
  [DefaultButtonStyles.DANGER]: style === DefaultButtonStyles.DANGER,
  [DefaultButtonStyles.OUTLINED]: style === DefaultButtonStyles.OUTLINED,
})

export const getButtonActionsConfig = ({
  isFirstRow = false,
  firstButtonText,
  secondButtonText,
  thirdButtonText,
  firstButtonTooltipText,
  secondButtonTooltipText,
  thirdButtonTooltipText,
  isFirstButton = false,
  isSecondButton = false,
  isThirdButton = false,
  firstVariantStyle,
  secondVariantStyle,
  thirdVariantStyle,
  onClickFirstButton,
  onClickSecondButton,
  onClickThirdButton,
}: ActionButtonsCellProps) => [
  {
    showButton: isFirstButton,
    buttonText: firstButtonText,
    tooltipText: isFirstRow ? firstButtonTooltipText : '',
    style: getDefaultButtonStyle(firstVariantStyle),
    onclick: handleClickButton(onClickFirstButton),
  },
  {
    showButton: isSecondButton,
    buttonText: secondButtonText,
    tooltipText: isFirstRow ? secondButtonTooltipText : '',
    style: getDefaultButtonStyle(secondVariantStyle),
    onclick: handleClickButton(onClickSecondButton),
  },
  {
    showButton: isThirdButton,
    buttonText: thirdButtonText,
    tooltipText: isFirstRow ? thirdButtonTooltipText : '',
    style: getDefaultButtonStyle(thirdVariantStyle),
    onclick: handleClickButton(onClickThirdButton),
  },
]
