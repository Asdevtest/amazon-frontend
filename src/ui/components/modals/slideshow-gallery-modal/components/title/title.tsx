import { FC, memo } from 'react'

import { useStyles } from './title.style'

interface TitleProps {}

export const Title: FC<TitleProps> = memo(() => {
  const { classes: styles } = useStyles()

  return <p className={styles.title}>Photo_111FGRT357.jpg</p>
})
