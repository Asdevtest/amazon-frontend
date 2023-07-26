import { observer } from 'mobx-react'

import { CircularProgress, Typography } from '@mui/material'

// import {TranslationKey} from '@constants/translations/translation-key'
// import {t} from '@utils/translations'
import { useClassNames } from './dashboard-single-card.style'

export const DashboardSingleCard = observer(({ item, valuesData, onClickViewMore }) => {
  const { classes: classNames } = useClassNames()

  return (
    <div className={classNames.cardWrapper} onClick={() => onClickViewMore(item.route)}>
      <div className={classNames.imagesWrapper}>
        <img src="/assets/img/box.png" />
        <img src={item.icon} />
        <img src={item.subIcon} />
      </div>
      <div className={classNames.textWrapper}>
        {/* cardValueTitle */}
        <Typography className={classNames.cardTitle}>{item.title}</Typography>
        {valuesData[item.dataKey] === 0 || valuesData[item.dataKey] === '-' || !valuesData[item.dataKey] ? (
          <Typography className={classNames.cardValueTitle}>{0}</Typography>
        ) : valuesData[item.dataKey] ? (
          <Typography className={classNames.cardValueTitle}>{valuesData[item.dataKey]}</Typography>
        ) : (
          <CircularProgress color="primary" thickness={2} />
        )}
      </div>
    </div>
  )
})
