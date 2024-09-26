import { memo } from 'react'

import { useStyles } from './chats-list.styles'

export const ChatsList = memo(() => {
  const { classes: styles, cx } = useStyles()

  return <div className={styles.chat}></div>
})
