import { Popconfirm } from 'antd'
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

import { useStyles } from './action-buttons-cell.style'

import { getButtonActionsConfig } from './action-buttons-cell.helper'
import { ActionButtonsCellProps } from './action-buttons-cell.type'

export const ActionButtonsCell: FC<ActionButtonsCellProps> = memo(props => {
  const { block = true, row, wrapperClassName, className } = props

  const { classes: styles, cx } = useStyles()

  return (
    <div className={cx(styles.wrapper, { [styles.wrapperRow]: row, [styles.fullWidth]: block }, wrapperClassName)}>
      {getButtonActionsConfig(props).map((button, index) => {
        const {
          dropdown,
          showButton,
          danger,
          ghost,
          icon,
          iconPosition,
          loading,
          shape,
          size = 'small',
          type = 'primary',
          content,
          disabled,
          description,
          onClick,
        } = button

        if (!showButton) {
          return null
        }

        const buttonProps = {
          dropdown,
          block: block && !icon,
          danger,
          ghost,
          icon,
          iconPosition,
          loading,
          shape,
          size,
          type,
          disabled,
          className,
          onClick,
        }

        if (description) {
          return (
            <Popconfirm
              key={index}
              title={t(TranslationKey[description as TranslationKey])}
              okText={t(TranslationKey.Yes)}
              cancelText={t(TranslationKey.No)}
              onConfirm={onClick}
            >
              <CustomButton {...buttonProps} onClick={undefined}>
                {content}
              </CustomButton>
            </Popconfirm>
          )
        }

        return (
          <CustomButton key={index} {...buttonProps}>
            {content}
          </CustomButton>
        )
      })}
    </div>
  )
})
