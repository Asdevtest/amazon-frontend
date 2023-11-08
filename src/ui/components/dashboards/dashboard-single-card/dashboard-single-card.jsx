import { memo } from 'react'

import { CircularProgress } from '@mui/material'

import { useStyles } from './dashboard-single-card.style'

export const DashboardSingleCard = memo(({ item, valuesData, onClickViewMore }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.cardWrapper} onClick={() => onClickViewMore(item.route, item.dataGridFilter)}>
      <div className={styles.imagesWrapper}>
        <img src="/assets/img/box.png" />
        <img src={item.icon} />
        <img src={item.subIcon} />
      </div>
      <div className={styles.textWrapper}>
        <p className={styles.cardTitle}>{item.title}</p>
        {valuesData[item.dataKey] === 0 || valuesData[item.dataKey] === '-' || !valuesData[item.dataKey] ? (
          <p className={styles.cardValueTitle}>{0}</p>
        ) : valuesData[item.dataKey] ? (
          <p className={styles.cardValueTitle}>{valuesData[item.dataKey]}</p>
        ) : (
          <CircularProgress color="primary" thickness={2} />
        )}
      </div>
    </div>
  )
})
