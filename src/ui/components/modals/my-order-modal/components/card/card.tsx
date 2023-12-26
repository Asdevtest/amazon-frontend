import { FC, PropsWithChildren, memo } from 'react'

import { useStyles } from './card.style'

export const Card: FC<PropsWithChildren> = memo(({ children }) => {
  const { classes: styles } = useStyles()

  return <div className={styles.card}>{children}</div>
})
