import { observer } from 'mobx-react'

import { useStyles } from './messages-list.style'

export const MessagesList = observer(() => {
  const { classes: styles, cx } = useStyles()

  return <div className={cx(styles.messagesListWrapper)}></div>
})
