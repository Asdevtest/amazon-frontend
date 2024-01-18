import { observer } from 'mobx-react'

import { Typography } from '@mui/material'

import { Button } from '@components/shared/buttons/button'

import { useStyles } from './dashboard-single-card-with-button.style'

export const DashboardSingleCardWithButton = observer(
  ({ horizontal, config, valuesData, buttonText, configSubTitle, onClickViewMore }) => {
    const { classes: styles, cx } = useStyles()

    return (
      <div>
        <Typography className={styles.cardListTitle}>{config.title}</Typography>
        <Typography className={styles.cardListSubTitle}>{configSubTitle}</Typography>
        <div className={cx(styles.cardWrapper, { [styles.cardWrapperHorizontal]: horizontal })}>
          {config.items.map(item => (
            <div
              key={item.dataKey}
              className={cx(styles.cardTitleWrapper, { [styles.cardTitleWrapperHorizontal]: horizontal })}
            >
              <Typography className={styles.cardTitle}>{item.title}</Typography>
              <Typography className={styles.cardValueTitle}>
                {valuesData[item.dataKey] && valuesData[item.dataKey]}
              </Typography>
            </div>
          ))}
          <div className={styles.buttonWrapper}>
            <Button onClick={() => onClickViewMore(config.route)}>{buttonText}</Button>
          </div>
        </div>
      </div>
    )
  },
)
