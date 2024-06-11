import { Popconfirm } from 'antd'
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'

import { t } from '@utils/translations'

import { useStyles } from './action-buttons-cell.style'

import { getButtonActionsConfig } from './action-buttons-cell.helper'
import { ActionButtonsCellProps } from './action-buttons-cell.type'

/**
 * Renders a table cell with action buttons.
 *
 * @param {boolean} isFirstRow - Indicates if the cell is in the first row.
 * @param {boolean} fullWidth - Indicates if the cell is in the first row.
 * @param {boolean} row - Arrangement of buttons in a row (flex-direction: 'row).
 * @param {iconButton} iconButton - The button will icon button.
 * @param {string} buttonWrapperClassName - Custom styles for the button wrapper.
 * @param {string} buttonClassName - Custom styles for the button.
 * @param {string | JSX.Element} firstButtonElement - The text or element for the first button.
 * @param {string | JSX.Element} secondButtonElement - The text or element for the second button.
 * @param {string | JSX.Element} thirdButtonElement - The text or element for the third button.
 * @param {string} firstButtonTooltipText - The tooltip text for the first button.
 * @param {string} secondButtonTooltipText - The tooltip text for the second button.
 * @param {string} thirdButtonTooltipText - The tooltip text for the third button.
 * @param {boolean} isFirstButton - Indicates if the first button should be shown.
 * @param {boolean} isSecondButton - Indicates if the second button should be shown.
 * @param {boolean} isThirdButton - Indicates if the third button should be shown.
 * @param {ButtonStyle} firstButtonStyle - The style for the first button.
 * @param {ButtonStyle} secondButtonStyle - The style for the second button.
 * @param {ButtonStyle} thirdButtonStyle - The style for the third button.
 * @param {ButtonVariant} firstButtonVariant - The style variant for the first button.
 * @param {ButtonVariant} secondButtonVariant - The style variant for the second button.
 * @param {ButtonVariant} thirdButtonVariant - The style variant for the third button.
 * @param {boolean} disabledFirstButton - Indicates if the first button should be disabled.
 * @param {boolean} disabledSecondButton - Indicates if the second button should be disabled.
 * @param {boolean} disabledThirdButton - Indicates if the third button should be disabled.
 * @param {string} firstDescriptionText - Description of actions in the confirm modal window - first button.
 * @param {string} secondDescriptionText - Description of actions in the confirm modal window - second button.
 * @param {string} thirdDescriptionText - Description of actions in the confirm modal window - third button.
 * @param {Function} onClickFirstButton - The callback function for when the first button is clicked.
 * @param {Function} onClickSecondButton - The callback function for when the second button is clicked.
 * @param {Function} onClickThirdButton - The callback function for when the third button is clicked.
 * @returns {HTMLElement} Return table cell with action buttons.
 */
export const ActionButtonsCell: FC<ActionButtonsCellProps> = memo(props => {
  const { row, buttonWrapperClassName, buttonClassName, iconButton, fullWidth } = props

  const { classes: styles, cx } = useStyles()

  return (
    <div
      className={cx(
        styles.wrapper,
        { [styles.wrapperRow]: row, [styles.fullWidth]: fullWidth },
        buttonWrapperClassName,
      )}
    >
      {getButtonActionsConfig(props).map((button, index) => {
        const { showButton, disabled, variant, styleType, tooltipText, buttonElement, descriptionText, onClick } =
          button

        if (!showButton) {
          return null
        }

        const buttonProps = {
          isTableButton: true,
          iconButton,
          disabled,
          variant,
          styleType,
          tooltipInfoContent: tooltipText,
          className: buttonClassName,
          children: buttonElement,
          onClick,
        }

        return descriptionText ? (
          <Popconfirm
            key={index}
            title={t(TranslationKey[descriptionText as TranslationKey])}
            okText={t(TranslationKey.Yes)}
            cancelText={t(TranslationKey.No)}
            onConfirm={onClick}
          >
            <Button {...buttonProps} onClick={undefined} />
          </Popconfirm>
        ) : (
          <Button key={index} {...buttonProps} />
        )
      })}
    </div>
  )
})
