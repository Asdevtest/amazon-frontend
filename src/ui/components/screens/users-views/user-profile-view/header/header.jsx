import React from 'react'

import {Box, Paper, Typography, Button} from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility'
import {observer} from 'mobx-react'

import {texts} from '@constants/texts'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {FeedbackCard} from './feedback-card'
import {useClassNames} from './header.style'
import {Info} from './info'
import {Tested} from './tested'

const textConsts = getLocalizedTexts(texts, 'ru').buerUserHeader

export const Header = observer(({user, timer, headerInfoData}) => {
  const classNames = useClassNames()
  return (
    <Paper className={classNames.paper}>
      <Box className={classNames.mainBox}>
        <Box className={classNames.sendOrderBox}>
          <img alt="user avatar" src={user && user.img} className={classNames.avatar} />
          <Button>{textConsts.sendBtn}</Button>
        </Box>
        <Box flexGrow={1}>
          <Typography className={classNames.username}>{user && user.name}</Typography>
          <Box className={classNames.hisGoodsOptionsBox}>
            <Typography className={(classNames.text, classNames.filterGoods)}>{textConsts.filter}</Typography>
            <Typography className={(classNames.text, classNames.ignoreGoods)}>{textConsts.ignore}</Typography>
          </Box>
          <Typography className={classNames.text}>{user && user.status}</Typography>
          <Box className={classNames.normalBox}>
            <VisibilityIcon className={classNames.visibilityIcon} />
            <Typography className={classNames.text}>{`В сети ${timer} назад`}</Typography>
          </Box>
          <Box className={classNames.normalBox}>
            <Box className={classNames.boxFeedbackCard}>
              <FeedbackCard isPositive counter={265} />
            </Box>
            <FeedbackCard isPositive={false} counter={1} />
          </Box>
        </Box>

        <Tested />
      </Box>

      <Info headerInfoData={headerInfoData} />
    </Paper>
  )
})
