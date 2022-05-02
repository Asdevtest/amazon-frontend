/* eslint-disable no-unused-vars */
import AutorenewIcon from '@mui/icons-material/Autorenew'
import {Rating} from '@mui/material'

import React from 'react'

import {Avatar, Box, Paper, Typography, Button, Badge} from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility'
import {observer} from 'mobx-react'

import {texts} from '@constants/texts'
import {UserRoleCodeMap} from '@constants/user-roles'

import {PurchaseHistory} from '@components/screens/users-views/user-profile-view/purchase-history'
import {Reviews} from '@components/screens/users-views/user-profile-view/reviews'

import {checkIsAdmin} from '@utils/checks'
import {getLocalizedTexts} from '@utils/get-localized-texts'
import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {toFixed} from '@utils/text'

import {FeedbackCard} from './feedback-card'
import {Info} from './info'
import {Tested} from './tested'
import {useClassNames} from './user-profile.style'

const textConsts = getLocalizedTexts(texts, 'ru').buerUserHeader

export const UserProfile = observer(
  ({
    isAnotherUser,
    user,
    timer,
    headerInfoData,
    onClickChangeAvatar,
    onClickChangeUserInfo,
    tabReview,
    tabHistory,
    setTabHistory,
    setTabReview,
  }) => {
    const classNames = useClassNames()

    return (
      <Paper className={classNames.paper}>
        <div>
          <Box className={classNames.mainBox}>
            <Box className={classNames.sendOrderBox}>
              {isAnotherUser ? (
                <Avatar src={getUserAvatarSrc(user._id)} className={classNames.avatar} />
              ) : (
                <Badge
                  overlap="circular"
                  anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                  badgeContent={
                    <div className={classNames.badge} onClick={onClickChangeAvatar}>
                      <AutorenewIcon color="primary" />
                    </div>
                  }
                >
                  <Avatar src={getUserAvatarSrc(user._id)} className={classNames.avatar} />
                </Badge>
              )}
            </Box>

            <Box flexGrow={1}>
              <Typography className={classNames.username}>{user?.name}</Typography>

              <Typography className={classNames.userEmail}>{user?.email}</Typography>

              <div className={classNames.ratingWrapper}>
                <Typography>{`Rating ${toFixed(user?.rating, 1)}`}</Typography>

                <Rating disabled className={classNames.userRating} value={user?.rating} />
              </div>

              {!isAnotherUser && !checkIsAdmin(UserRoleCodeMap[user?.role]) && (
                <Button
                  id="user-profile-change-btn"
                  variant="contained"
                  color="primary"
                  className={classNames.changeBtn}
                  onClick={onClickChangeUserInfo}
                >
                  {'Изменить данные'}
                </Button>
              )}
            </Box>
          </Box>

          {!isAnotherUser && (
            <div className={classNames.rolesWrapper}>
              <Typography variant="h6">{'Роли'}</Typography>

              {user?.allowedRoles.length && !user?.masterUser ? (
                <div className={classNames.roles}>
                  {user?.allowedRoles.map((el, index) => (
                    <Typography key={index} className={classNames.role}>
                      {UserRoleCodeMap[el]}
                    </Typography>
                  ))}
                </div>
              ) : (
                <Typography className={classNames.role}>{UserRoleCodeMap[user?.role]}</Typography>
              )}
            </div>
          )}

          <Info headerInfoData={headerInfoData} />

          <Tested />
        </div>

        <div className={classNames.rightSideWrapper}>
          <Reviews tabReview={tabReview} setTabReview={setTabReview} />

          <Box className={classNames.normalBox}>
            <Box className={classNames.boxFeedbackCard}>
              <FeedbackCard isPositive counter={265} />
            </Box>
            <FeedbackCard isPositive={false} counter={1} />
          </Box>

          {!isAnotherUser && <PurchaseHistory user={user} tabHistory={tabHistory} setTabHistory={setTabHistory} />}
        </div>
      </Paper>
    )
  },
)
