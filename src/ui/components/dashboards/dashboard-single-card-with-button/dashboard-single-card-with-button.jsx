import { observer } from 'mobx-react'

import { CustomButton } from '@components/shared/custom-button'

import { useStyles } from './dashboard-single-card-with-button.style'

export const DashboardSingleCardWithButton = observer(
  ({ horizontal, config, valuesData, buttonText, configSubTitle, onClickViewMore }) => {
    const { classes: styles, cx } = useStyles()

    return (
      <div>
        <p className={styles.cardListTitle}>{config.title}</p>
        <p className={styles.cardListSubTitle}>{configSubTitle}</p>
        <div className={cx(styles.cardWrapper, { [styles.cardWrapperHorizontal]: horizontal })}>
          {config.items.map(item => (
            <div
              key={item.dataKey}
              className={cx(styles.cardTitleWrapper, { [styles.cardTitleWrapperHorizontal]: horizontal })}
            >
              <p className={styles.cardTitle}>{item.title}</p>
              <p className={styles.cardValueTitle}>{valuesData[item.dataKey] && valuesData[item.dataKey]}</p>
            </div>
          ))}
          <div className={styles.buttonWrapper}>
            <CustomButton onClick={() => onClickViewMore(config.route)}>{buttonText}</CustomButton>
          </div>
        </div>
      </div>
    )
  },
)
