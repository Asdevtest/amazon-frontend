import {React} from 'react'

import {Paper, Typography} from '@material-ui/core'

import {useClassNames} from './dashboard-card.style'

export const DashboardCard = props => {
  const classNames = useClassNames()
  return (
    <Paper className={classNames.paper}>
      <div className={classNames.circle} style={{borderColor: props.color}}>
        <Typography className={classNames.circleTitle}>{props.value}</Typography>
      </div>
      <div className={classNames.paperTitleWrapper}>
        <Typography className={classNames.paperTitle}>{props.title}</Typography>
      </div>
      <div className={classNames.paperSubTitleWrapper}>
        <Typography className={classNames.paperSubTitle} onClick={() => props.pushHistory}>
          {'View more'}
        </Typography>
      </div>
    </Paper>
  )
}
