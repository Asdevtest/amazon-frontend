import AutorenewIcon from '@mui/icons-material/Autorenew'
import {Avatar, Box, Paper, Typography, Button, Rating} from '@mui/material'

import React from 'react'

import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'
import {mapUserRoleEnumToKey, UserRole, UserRoleCodeMap} from '@constants/user-roles'

import {SettingsModel} from '@models/settings-model'

import {PurchaseHistory} from '@components/screens/users-views/user-profile-view/purchase-history'
import {Reviews} from '@components/screens/users-views/user-profile-view/reviews'

import {checkIsAdmin} from '@utils/checks'
import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {toFixed} from '@utils/text'
import {t} from '@utils/translations'

import {FeedbackCard} from './feedback-card'
import {Info} from './info'
import {Tested} from './tested'
import {useClassNames} from './user-profile.style'

export const UserProfile = observer(
  ({
    isAnotherUser,
    user,
    headerInfoData,
    onClickChangeAvatar,
    onClickChangeUserInfo,
    tabReview,
    tabHistory,
    setTabHistory,
    setTabReview,
    onClickWriteBtn,
  }) => {
    const {classes: classNames} = useClassNames()

    return (
      <>
        {SettingsModel.languageTag && (
          <Paper className={classNames.paper}>
            <div>
              <Box className={classNames.mainBox}>
                <Box className={classNames.sendOrderBox}>
                  {isAnotherUser ? (
                    <Avatar src={getUserAvatarSrc(user._id)} className={classNames.avatar} />
                  ) : (
                    <div className={classNames.avatarWrapper} onClick={onClickChangeAvatar}>
                      <Avatar src={getUserAvatarSrc(user._id)} className={classNames.avatar} />

                      <AutorenewIcon color="primary" fontSize="large" className={classNames.icon} />
                    </div>
                  )}
                </Box>

                <Box flexGrow={1}>
                  <Typography className={classNames.username}>{user?.name}</Typography>

                  <Typography className={classNames.userEmail}>{user?.email}</Typography>

                  <div className={classNames.ratingWrapper}>
                    <Typography className={classNames.standartText}>{`Rating ${toFixed(user?.rating, 1)}`}</Typography>

                    <Rating disabled className={classNames.userRating} value={user?.rating} />
                  </div>

                  {isAnotherUser && (
                    <Button
                      id="user-profile-change-btn"
                      variant="contained"
                      color="primary"
                      className={classNames.writeBtn}
                      onClick={() => onClickWriteBtn(user._id)}
                    >
                      {t(TranslationKey.Write)}
                    </Button>
                  )}

                  {!isAnotherUser && !checkIsAdmin(UserRoleCodeMap[user?.role]) && (
                    <Button
                      id="user-profile-change-btn"
                      variant="contained"
                      color="primary"
                      className={classNames.changeBtn}
                      onClick={onClickChangeUserInfo}
                    >
                      {t(TranslationKey.Edit)}
                    </Button>
                  )}
                </Box>
              </Box>

              {!isAnotherUser && (
                <div className={classNames.rolesWrapper}>
                  <Typography variant="h6" className={classNames.standartText}>
                    {t(TranslationKey.Roles)}
                  </Typography>

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

              {isAnotherUser || user.allowedRoles?.includes(mapUserRoleEnumToKey[UserRole.RESEARCHER]) ? (
                <Tested user={user} />
              ) : null}
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
        )}
      </>
    )
  },
)
