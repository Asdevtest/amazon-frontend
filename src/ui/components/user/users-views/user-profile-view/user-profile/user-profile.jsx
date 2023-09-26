import { observer } from 'mobx-react'
import React from 'react'

import AutorenewIcon from '@mui/icons-material/Autorenew'
import { Avatar, Box, Button, Paper, Rating, Typography } from '@mui/material'

import { UserRole, UserRoleCodeMap, mapUserRoleEnumToKey } from '@constants/keys/user-roles'
import { freelanceRequestTypeByCode, freelanceRequestTypeTranslate } from '@constants/statuses/freelance-request-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { PurchaseHistory } from '@components/user/users-views/user-profile-view/purchase-history'
import { Reviews } from '@components/user/users-views/user-profile-view/reviews'

import { checkIsAdmin } from '@utils/checks'
import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from './user-profile.style'

import { FeedbackCard } from './feedback-card'
import { Info } from './info'
import { Tested } from './tested'

export const UserProfile = observer(
  ({
    isAnotherUser,
    user,
    curUser,
    headerInfoData,
    onClickChangeAvatar,
    onClickChangeUserInfo,
    tabReview,
    tabHistory,
    setTabHistory,
    setTabReview,
    onClickWriteBtn,
    reviews,
    onClickReview,
  }) => {
    const { classes: classNames } = useClassNames()

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

                  {checkIsAdmin(UserRoleCodeMap[curUser?.role]) || !isAnotherUser ? (
                    <Typography className={classNames.userEmail}>{user?.email}</Typography>
                  ) : null}

                  <div className={classNames.ratingWrapper}>
                    <Typography className={classNames.standartText}>{`Rating ${toFixed(user?.rating, 1)}`}</Typography>

                    <Rating disabled className={classNames.userRating} value={user?.rating} />
                  </div>
                  <div className={classNames.userButtonsWrapper}>
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
                        className={classNames.changeBtn}
                        onClick={onClickChangeUserInfo}
                      >
                        {t(TranslationKey.Edit)}
                      </Button>
                    )}
                  </div>
                </Box>
              </Box>
              <div className={classNames.userButtonsMobileWrapper}>
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
              </div>
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

              {!!user?.allowedSpec?.length && (
                <div className={classNames.rolesWrapper}>
                  <Typography variant="h6" className={classNames.standartText}>
                    {t(TranslationKey.Specialties)}
                  </Typography>
                  <div className={classNames.roles}>
                    {user?.allowedSpec?.map((el, index) => (
                      <Typography key={index} className={classNames.role}>
                        {freelanceRequestTypeTranslate(freelanceRequestTypeByCode[el])}
                      </Typography>
                    ))}
                  </div>
                </div>
              )}

              <Info headerInfoData={headerInfoData} />

              {isAnotherUser || user.allowedRoles?.includes(mapUserRoleEnumToKey[UserRole.RESEARCHER]) ? (
                <Tested user={user} />
              ) : null}
            </div>

            <div className={classNames.rightSideWrapper}>
              <Reviews tabReview={tabReview} setTabReview={setTabReview} reviews={reviews} />
              {isAnotherUser && (
                <div className={classNames.leaveReviewBtnWrapper}>
                  <Button variant="contained" className={classNames.leaveReviewBtn} onClick={onClickReview}>
                    {t(TranslationKey['Leave a review'])}
                  </Button>
                </div>
              )}

              {!isAnotherUser && <PurchaseHistory user={user} tabHistory={tabHistory} setTabHistory={setTabHistory} />}
            </div>
          </Paper>
        )}
      </>
    )
  },
)
