import { FC, MouseEvent, memo } from 'react'

import { Button } from '@components/shared/buttons/button'

import { DefaultButtonStyles } from '@typings/enums/default-button-style'

import { useStyles } from './action-buttons-cell.style'

interface ActionButtonsCellProps {
  isFirstRow?: boolean
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

/**
 * Renders a table cell with action buttons.
 *
 * @param {boolean} isFirstRow - Indicates if the cell is in the first row.
 * @param {string} firstButtonText - The text for the first button.
 * @param {string} secondButtonText - The text for the second button.
 * @param {string} thirdButtonText - The text for the third button.
 * @param {string} firstButtonTooltipText - The tooltip text for the first button.
 * @param {string} secondButtonTooltipText - The tooltip text for the second button.
 * @param {string} thirdButtonTooltipText - The tooltip text for the third button.
 * @param {boolean} isFirstButton - Indicates if the first button should be shown.
 * @param {boolean} isSecondButton - Indicates if the second button should be shown.
 * @param {boolean} isThirdButton - Indicates if the third button should be shown.
 * @param {DefaultButtonStyles} firstVariantStyle - The style variant for the first button.
 * @param {DefaultButtonStyles} secondVariantStyle - The style variant for the second button.
 * @param {DefaultButtonStyles} thirdVariantStyle - The style variant for the third button.
 * @param {Function} onClickFirstButton - The callback function for when the first button is clicked.
 * @param {Function} onClickSecondButton - The callback function for when the second button is clicked.
 * @param {Function} onClickThirdButton - The callback function for when the third button is clicked.
 * @returns {HTMLElement} Return table cell with action buttons.
 */
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
