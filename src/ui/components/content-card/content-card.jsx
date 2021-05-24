import {React} from 'react'

import {Box, Paper, Typography} from '@material-ui/core'

import {texts} from '@constants/texts'

import {useClassNames} from './content-card.style'

export const ContentCard = props => {
  const classNames = useClassNames()
  return (
    <Paper className={classNames.paper}>
      <div className={classNames.circle}>
        <Typography className={classNames.circleTitle}>{props.count}</Typography>
      </div>
      <Box className={classNames.boxContainer}>
        <Typography className={classNames.paperTitle}>{props.title}</Typography>
        {!!props.timer && (
          <Box className={classNames.boxWrapper}>
            <Typography className={classNames.paperTimer}>{props.timer}</Typography>
            <Typography className={classNames.paperSubTitle}>{texts.ru.contentCardComponent.time}</Typography>
          </Box>
        )}
      </Box>
    </Paper>
  )
}
