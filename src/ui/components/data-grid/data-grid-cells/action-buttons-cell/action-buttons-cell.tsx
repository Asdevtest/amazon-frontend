import { Popconfirm } from 'antd'
import { ItemType } from 'antd/es/menu/interface'
import { FC, memo } from 'react'
import { MdOutlineDelete, MdOutlineEdit } from 'react-icons/md'
import { v4 as uuid } from 'uuid'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

import { useStyles } from './action-buttons-cell.style'

import { getButtonActionsConfig } from './action-buttons-cell.helper'
import { ActionButtonsCellProps } from './action-buttons-cell.type'

export const ActionButtonsCell: FC<ActionButtonsCellProps> = memo(props => {
  const { block = true, row, wrapperClassName, className } = props

  const { classes: styles, cx, theme } = useStyles()

  return (
    <div className={cx(styles.wrapper, { [styles.wrapperRow]: row }, wrapperClassName)}>
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
          onClickEdit,
          onClickRemove,
        } = button

        if (!showButton) {
          return null
        }

        const menuItems: ItemType[] = [
          onClickEdit
            ? {
                key: uuid(),
                label: <MdOutlineEdit size={16} color={theme.palette.primary.main} />,
                onClick: onClickEdit,
              }
            : null,
          onClickRemove
            ? {
                key: uuid(),
                label: <MdOutlineDelete size={16} color={theme.palette.text.red} />,
                onClick: onClickRemove,
              }
            : null,
        ]
        const buttonProps = {
          dropdown: dropdown && (!!onClickEdit || !!onClickRemove),
          block: !!content && block,
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
          menuItems,
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
