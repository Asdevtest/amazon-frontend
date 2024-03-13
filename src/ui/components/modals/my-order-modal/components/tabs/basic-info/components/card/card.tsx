import { FC, PropsWithChildren, memo } from 'react'

import { useStyles } from './card.style'

interface CardProps extends PropsWithChildren {
  wrapperClassName?: string
}

export const Card: FC<CardProps> = memo(({ children, wrapperClassName }) => {
  const { classes: styles, cx } = useStyles()

  return <div className={cx(styles.card, wrapperClassName)}>{children}</div>
})
