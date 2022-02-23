import React from 'react'

import {Avatar, Box, Paper, Typography, Button} from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility'
import {observer} from 'mobx-react'

import {texts} from '@constants/texts'

import {getLocalizedTexts} from '@utils/get-localized-texts'
import {getUserAvatarSrc} from '@utils/get-user-avatar'

import {FeedbackCard} from './feedback-card'
import {useClassNames} from './header.style'
import {Info} from './info'
import {Tested} from './tested'

const textConsts = getLocalizedTexts(texts, 'ru').buerUserHeader

export const Header = observer(({user, timer, headerInfoData, onClickChangeAvatar}) => {
  const classNames = useClassNames()
  return (
    <Paper className={classNames.paper}>
      <Box className={classNames.mainBox}>
        <Box className={classNames.sendOrderBox}>
          <Avatar src={getUserAvatarSrc(user._id)} className={classNames.avatar} />

          <Button variant="contained" color="primary" onClick={onClickChangeAvatar}>
            {'Изменить аватар'}
          </Button>

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
