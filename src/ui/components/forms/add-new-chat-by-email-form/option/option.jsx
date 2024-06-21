import { memo } from 'react'
import { components } from 'react-select'

import { Avatar } from '@mui/material'

import { useStyles } from '../add-new-chat-by-email-form.style'

export const Option = memo(({ innerRef, isFocused, ...props }) => {
  const { classes: styles, cx } = useStyles()

  return (
    <div
      ref={innerRef}
      className={cx(styles.customBtnNameWrapper, {
        option: true,
        [styles.isFocusedOption]: isFocused,
      })}
    >
      <Avatar src={props.data.img} className={styles.avatarWrapper} sx={{ width: 28, height: 28 }} />
      <components.Option {...props} />
    </div>
  )
})
