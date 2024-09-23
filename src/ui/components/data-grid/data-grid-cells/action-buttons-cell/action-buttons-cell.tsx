import { ItemType } from 'antd/es/menu/interface'
import { FC, memo } from 'react'
import { MdLocalPrintshop, MdOutlineDelete, MdOutlineEdit } from 'react-icons/md'
import { v4 as uuid } from 'uuid'

import { CustomButton } from '@components/shared/custom-button'

import { useStyles } from './action-buttons-cell.style'

import { getButtonActionsConfig } from './action-buttons-cell.helper'
import { ActionButtonsCellProps } from './action-buttons-cell.type'

export const ActionButtonsCell: FC<ActionButtonsCellProps> = memo(props => {
  const { block = true, row, wrapperClassName, className } = props

  const { classes: styles, cx, theme } = useStyles()

  return (
    <div className={cx(styles.wrapper, { [styles.wrapperRow]: row, [styles.block]: block }, wrapperClassName)}>
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
          confirmText,
          onClick,
          onClickEdit,
          onClickRemove,
          onClickPrint,
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
          onClickPrint
            ? {
                key: uuid(),
                label: <MdLocalPrintshop size={16} color={theme.palette.primary.main} />,
                onClick: onClickPrint,
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
          dropdown: dropdown && (!!onClickEdit || !!onClickRemove || !!onClickPrint),
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
          confirmText,
          onClick,
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
