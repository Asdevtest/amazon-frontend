import { FC, memo } from 'react'

import { Button } from '@components/shared/buttons/button'

import { useStyles } from './action-buttons-cell.style'

import { getButtonActionsConfig } from './action-buttons-cell.helper'
import { ActionButtonsCellProps } from './action-buttons-cell.type'

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
  const { classes: styles } = useStyles()

  return (
    <div className={styles.wrapper}>
      {getButtonActionsConfig(props).map((button, index) =>
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
