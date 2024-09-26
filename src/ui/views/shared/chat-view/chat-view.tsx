import { memo } from 'react'

import { useStyles } from './chat-view.style'

export const ChatView = memo(() => {
  const { classes: styles, cx } = useStyles()

  return <div className="viewWrapper"></div>
})
