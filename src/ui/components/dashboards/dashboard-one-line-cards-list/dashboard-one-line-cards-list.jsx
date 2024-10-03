import { memo } from 'react'

import { CircularProgress } from '@mui/material'

import { useStyles } from '@components/dashboards/dashboard-one-line-cards-list/dashboard-one-line-cards-list.style'
import { ComponentSlider } from '@components/shared/component-slider'

export const DashboardOneLineCardsList = memo(props => {
  const { config, valuesData, onClickViewMore } = props

  const { classes: styles, cx } = useStyles()

  return (
    <div className={styles.wrapper}>
      <div className={styles.cardHeader}>
        <p className={styles.cardTitle}>{config.title}</p>
        <p className={styles.cardSubTitle}>{config.subTitle}</p>
      </div>

      <ComponentSlider
        slides={config.items.map(item => (
          <div
            key={item.dataKey}
            className={cx(styles.cardWrapper, {
              [styles.cardErrorWrapper]: item.isNegative,
            })}
            onClick={() => onClickViewMore(item.route, item.dataGridFilter)}
          >
            <div className={styles.cardSubWrapper}>
              <p className={styles.cardSubTitle}>{item.title}</p>

              {valuesData[item.dataKey] === 0 || valuesData[item.dataKey] === '-' || !valuesData[item.dataKey] ? (
                <p className={styles.cardValueTitle}>{0}</p>
              ) : valuesData[item.dataKey] ? (
                <p className={styles.cardValueTitle}>{valuesData[item.dataKey]}</p>
              ) : (
                <CircularProgress color="primary" thickness={2} />
              )}
            </div>
          </div>
        ))}
      />
    </div>
  )
})
