import {CircularProgress, Typography} from '@material-ui/core'
import {observer} from 'mobx-react'

// import {TranslationKey} from '@constants/translations/translation-key'
// import {t} from '@utils/translations'
import {useClassNames} from './dashboard-single-card.style'

export const DashboardSingleCard = observer(({item, valuesData, onClickViewMore}) => {
  const classNames = useClassNames()
  console.log(valuesData[item.dataKey].toString())
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
          {valuesData[item.dataKey] ? (
            valuesData[item.dataKey]
          ) : (
            <CircularProgress color="success" thickness={2} size={30} />
          )}
        </Typography>
      </div>
    </div>
  )
})
