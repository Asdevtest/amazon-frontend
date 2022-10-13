import {CircularProgress, Typography} from '@mui/material'

import {observer} from 'mobx-react'

// import {TranslationKey} from '@constants/translations/translation-key'
// import {t} from '@utils/translations'
import {useClassNames} from './dashboard-single-card.style'

export const DashboardSingleCard = observer(({item, valuesData, onClickViewMore}) => {
  const {classes: classNames} = useClassNames()

  return (
    <div className={classNames.cardWrapper} onClick={() => onClickViewMore(item.route)}>
      <div className={classNames.imagesWrapper}>
        <img src="/assets/img/box.png" />
        <img src={item.icon} />
        <img src={item.subIcon} />
      </div>
      <div className={classNames.textWrapper}>
        <Typography className={classNames.cardTitle}>{item.title}</Typography>
        <Typography className={classNames.cardValueTitle}>
          {valuesData[item.dataKey] ? valuesData[item.dataKey] : null}
        </Typography>
        {!valuesData[item.dataKey] ? <CircularProgress color="primary" thickness={2} size={30} /> : null}
      </div>
    </div>
  )
})
