import { FC, memo } from 'react'

import { useStyles } from './title.style'

interface TitleProps {
  text: string
}

export const Title: FC<TitleProps> = memo(({ text }) => {
  const { classes: styles } = useStyles()

  return <p className={styles.title}>{text}</p>
})
