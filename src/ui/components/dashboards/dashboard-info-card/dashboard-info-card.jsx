/* eslint-disable no-unused-vars */
import {Paper, Typography} from '@material-ui/core'
import {observer} from 'mobx-react'

import {texts} from '@constants/texts'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './dashboard-info-card.style'

// import Translator , { translate } from '@kotlia/react-i18n-auto'

// const T = Translator({from: "ru", to: 'en'})

// import {Translate} from 'react-auto-translate'

const textConsts = getLocalizedTexts(texts, 'ru').dashboardInfoCard

export const DashboardInfoCard = observer(({color, title, value, route, onClickViewMore}) => {
  const classNames = useClassNames()

  // console.log('translate(title, { from: "ru", to: "en" })', translate(title, { from: "ru", to: "en" }))

  return (
    <Paper className={classNames.root}>
      <div className={classNames.circle} style={{borderColor: color}}>
        <Typography className={classNames.circleTitle}>{value || 0}</Typography>
      </div>
      <div className={classNames.titleWrapper}>
        <Typography className={classNames.title}>{title}</Typography>
        {/* <Typography className={classNames.title}><T>{title}</T></Typography> */}
        {/* <Typography className={classNames.title}>{translate(title, { from: "ru", to: "en" })}</Typography> */}
      </div>
      {route ? (
        <div className={classNames.subTitleWrapper}>
          <Typography className={classNames.subTitle} onClick={() => onClickViewMore(route)}>
            {textConsts.viewMoreBtn}
          </Typography>
        </div>
      ) : undefined}
    </Paper>
  )
})
