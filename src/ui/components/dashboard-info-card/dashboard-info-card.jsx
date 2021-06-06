import {Paper, Typography} from '@material-ui/core'

import {texts} from '@constants/texts'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './dashboard-info-card.style'

const textConsts = getLocalizedTexts(texts, 'ru').dashboardInfoCard

export const DashboardInfoCard = ({color, title, value, onClickViewMore}) => {
  const classNames = useClassNames()
  return (
    <Paper className={classNames.root}>
      <div className={classNames.circle} style={{borderColor: color}}>
        <Typography className={classNames.circleTitle}>{value}</Typography>
      </div>
      <div className={classNames.titleWrapper}>
        <Typography className={classNames.title}>{title}</Typography>
      </div>
      {onClickViewMore ? (
        <div className={classNames.subTitleWrapper}>
          <Typography className={classNames.subTitle} onClick={onClickViewMore}>
            {textConsts.viewMoreBtn}
          </Typography>
        </div>
      ) : undefined}
    </Paper>
  )
}
