import { FC, memo } from 'react'

import { Button } from '@components/shared/buttons/button'

import { useStyles } from './action-buttons-cell.style'

import { getButtonActionsConfig } from './action-buttons-cell.helper'
import { ActionButtonsCellProps } from './action-buttons-cell.type'

/**
 * Renders a table cell with action buttons.
 *
 * @param {boolean} isFirstRow - Indicates if the cell is in the first row.
 * @param {boolean} row - Arrangement of buttons in a row (flex-direction: 'row).
 * @param {string} buttonWrapperClassName - Custom styles for the button wrapper.
 * @param {string} buttonClassName - Custom styles for the button.
 * @param {boolean} resetStyles - Reset button styles.
 * @param {string | JSX.Element} firstButtonElement - The text or element for the first button.
 * @param {string | JSX.Element} secondButtonElement - The text or element for the second button.
 * @param {string | JSX.Element} thirdButtonElement - The text or element for the third button.
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
  const { classes: styles, cx } = useStyles()

  return (
    <div className={cx(styles.wrapper, { [styles.wrapperRow]: props.row }, props.buttonWrapperClassName)}>
      {getButtonActionsConfig(props).map((button, index) =>
        button.showButton ? (
          <Button
            key={index}
            {...button.style}
            transparent={props.resetStyles}
            tooltipInfoContent={button.tooltipText}
            className={cx({ [styles.button]: !props.resetStyles }, props.buttonClassName)}
            onClick={button.onclick}
          >
            {button.buttonElement}
          </Button>
        ) : null,
      )}
    </div>
  )
})
