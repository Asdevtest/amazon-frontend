import { FC, memo } from 'react'

import { useStyles } from './info-item.style'

interface InfoItemProps {
  icon: JSX.Element
  title: string
  value: string
}

export const InfoItem: FC<InfoItemProps> = memo(({ icon, title, value }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.wrapper}>
      <div className={styles.item}>
        <div className={styles.icon}>{icon}</div>

        <p className={styles.title}>{title}</p>
      </div>

      <p className={styles.value}>{value}</p>
    </div>
  )
})
