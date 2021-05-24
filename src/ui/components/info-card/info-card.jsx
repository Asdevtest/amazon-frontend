import {Paper, Typography} from '@material-ui/core'

import {useClassNames} from './info-card.style'

export const InfoCard = ({color, title, value, viewMore, handlerRedirectClick}) => {
  const classNames = useClassNames()
  return (
    <Paper className={classNames.root}>
      <div className={classNames.circle} style={{borderColor: color}}>
        <Typography className={classNames.circleTitle}>{value}</Typography>
      </div>
      <div className={classNames.titleWrapper} style={{position: 'relative', minWidth: '100px'}}>
        <Typography className={classNames.title}>{title}</Typography>
      </div>
      <div className={classNames.subTitleWrapper}>
        <Typography className={classNames.subTitle} onClick={handlerRedirectClick}>
          {viewMore}
        </Typography>
      </div>
    </Paper>
  )
}
