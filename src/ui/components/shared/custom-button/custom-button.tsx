import { Button, ButtonProps, Dropdown, Popconfirm } from 'antd'
import { ItemType } from 'antd/es/menu/interface'
import { FC, MouseEvent, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { throttle } from '@utils/throttle'
import { t } from '@utils/translations'

import { useStyles } from './custom-button.style'

interface CustomButtonProps extends ButtonProps {
  isCell?: boolean
  dropdown?: boolean
  confirmText?: string
  menuItems?: ItemType[]
}

export const CustomButton: FC<CustomButtonProps> = memo(props => {
  const { isCell, icon, className, dropdown, children, menuItems, confirmText, onClick, ...restProps } = props

  const { classes: styles, cx } = useStyles()

  const handleClick = throttle((e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onClick?.(e)
  })

  if (dropdown) {
    return (
      <Dropdown.Button
        {...restProps}
        destroyPopupOnHide
        overlayClassName={styles.dropdown}
        className={styles.dropdownButton}
        menu={{ items: menuItems }}
        onClick={handleClick}
      >
        {children}
        {icon}
      </Dropdown.Button>
    )
  }

  if (confirmText) {
    return (
      <Popconfirm
        title={t(TranslationKey[confirmText as TranslationKey])}
        okText={t(TranslationKey.Yes)}
        cancelText={t(TranslationKey.No)}
        onConfirm={handleClick}
      >
        <Button {...restProps} icon={icon} className={cx(styles.button, { [styles.iconButton]: !!icon }, className)}>
          {children}
        </Button>
      </Popconfirm>
    )
  }

  return (
    <Button
      {...restProps}
      icon={icon}
      className={cx(styles.button, { [styles.iconButton]: !!icon }, className)}
      onClick={handleClick}
    >
      {children}
    </Button>
  )
})
