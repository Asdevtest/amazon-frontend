import { FC, MouseEvent, memo } from 'react'

import { Button } from '@components/shared/buttons/button'

import { DefaultButtonStyles } from '@typings/enums/default-button-style'

import { useStyles } from './action-buttons-cell.style'

interface ActionButtonsCellProps {
  isFirstRow?: boolean
  styleVariant?: string
  firstButtonText?: string
  secondButtonText?: string
  thirdButtonText?: string
  firstButtonTooltipText?: string
  secondButtonTooltipText?: string
  thirdButtonTooltipText?: string
  isFirstButton?: boolean
  isSecondButton?: boolean
  isThirdButton?: boolean
  firstVariantStyle?: DefaultButtonStyles
  secondVariantStyle?: DefaultButtonStyles
  thirdVariantStyle?: DefaultButtonStyles
  onClickFirstButton?: () => void
  onClickSecondButton?: () => void
  onClickThirdButton?: () => void
}

export const ActionButtonsCell: FC<ActionButtonsCellProps> = memo(props => {
  const {
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
  } = props

  const { classes: styles } = useStyles()

  const handleClickButton = (onClick?: () => void) => (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()

    if (onClick) {
      onClick()
    }
  }

  const getDefaultButtonStyle = (style?: DefaultButtonStyles): Record<DefaultButtonStyles, boolean> => ({
    [DefaultButtonStyles.SUCCESS]: style === DefaultButtonStyles.SUCCESS,
    [DefaultButtonStyles.DANGER]: style === DefaultButtonStyles.DANGER,
    [DefaultButtonStyles.OUTLINED]: style === DefaultButtonStyles.OUTLINED,
  })

  const buttonActionsConfig = [
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

  return (
    <div className={styles.wrapper}>
      {buttonActionsConfig.map((button, index) =>
        button.showButton ? (
          <Button
            key={index}
            {...button.style}
            tooltipInfoContent={button.tooltipText}
            className={styles.button}
            onClick={button.onclick}
          >
            {button.buttonText}
          </Button>
        ) : null,
      )}
    </div>
  )
})
