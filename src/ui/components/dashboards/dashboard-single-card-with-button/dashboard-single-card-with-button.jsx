import { cx } from '@emotion/css'
import { Typography } from '@mui/material'

import { observer } from 'mobx-react'

import { Button } from '@components/shared/buttons/button'

// import {TranslationKey} from '@constants/translations/translation-key'
// import {t} from '@utils/translations'
import { useClassNames } from './dashboard-single-card-with-button.style'

export const DashboardSingleCardWithButton = observer(
  ({ horizontal, config, valuesData, buttonText, configSubTitle, onClickViewMore }) => {
    const { classes: classNames } = useClassNames()

    return (
      <div>
        <Typography className={classNames.cardListTitle}>{config.title}</Typography>
        <Typography className={classNames.cardListSubTitle}>{configSubTitle}</Typography>
        <div className={cx(classNames.cardWrapper, { [classNames.cardWrapperHorizontal]: horizontal })}>
          {config.items.map(item => (
            <div
              key={item.dataKey}
              className={cx(classNames.cardTitleWrapper, { [classNames.cardTitleWrapperHorizontal]: horizontal })}
            >
              <Typography className={classNames.cardTitle}>{item.title}</Typography>
              <Typography className={classNames.cardValueTitle}>
                {valuesData[item.dataKey] && valuesData[item.dataKey]}
              </Typography>
            </div>
          ))}
          <div className={classNames.buttonWrapper}>
            <Button onClick={() => onClickViewMore(config.route)}>{buttonText}</Button>
          </div>
        </div>
      </div>
    )
  },
)
