import { FC, PropsWithChildren, memo } from 'react'

import { useStyles } from './badge.style'

export const Badge: FC<PropsWithChildren> = memo(({ children }) => {
  const { classes: styles } = useStyles()

  return <span className={styles.badge}>{children}</span>
})
