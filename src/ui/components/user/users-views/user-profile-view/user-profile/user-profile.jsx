import { observer } from 'mobx-react'

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

import { useStyles } from './user-profile.style'

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
    const { classes: styles } = useStyles()

    return (
      <>
        {SettingsModel.languageTag && (
          <Paper className={styles.paper}>
            <div>
              <Box className={styles.mainBox}>
                <Box className={styles.sendOrderBox}>
                  {isAnotherUser ? (
                    <Avatar src={getUserAvatarSrc(user._id)} className={styles.avatar} />
                  ) : (
                    <div className={styles.avatarWrapper} onClick={onClickChangeAvatar}>
                      <Avatar src={getUserAvatarSrc(user._id)} className={styles.avatar} />

                      <AutorenewIcon color="primary" fontSize="large" className={styles.icon} />
                    </div>
                  )}
                </Box>

                <Box flexGrow={1}>
                  <Typography className={styles.username}>{user?.name}</Typography>

                  {checkIsAdmin(UserRoleCodeMap[curUser?.role]) || !isAnotherUser ? (
                    <Typography className={styles.userEmail}>{user?.email}</Typography>
                  ) : null}

                  <div className={styles.ratingWrapper}>
                    <Typography className={styles.standartText}>{`Rating ${toFixed(user?.rating, 1)}`}</Typography>

                    <Rating readOnly className={styles.userRating} value={user?.rating} />
                  </div>
                  <div className={styles.userButtonsWrapper}>
                    {isAnotherUser && (
                      <Button
                        id="user-profile-change-btn"
                        variant="contained"
                        color="primary"
                        className={styles.writeBtn}
                        onClick={() => onClickWriteBtn(user._id)}
                      >
                        {t(TranslationKey.Write)}
                      </Button>
                    )}

                    {!isAnotherUser && !checkIsAdmin(UserRoleCodeMap[user?.role]) && (
                      <Button
                        id="user-profile-change-btn"
                        variant="contained"
                        className={styles.changeBtn}
                        onClick={onClickChangeUserInfo}
                      >
                        {t(TranslationKey.Edit)}
                      </Button>
                    )}
                  </div>
                </Box>
              </Box>
              <div className={styles.userButtonsMobileWrapper}>
                {isAnotherUser && (
                  <Button
                    id="user-profile-change-btn"
                    variant="contained"
                    color="primary"
                    className={styles.writeBtn}
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
                    className={styles.changeBtn}
                    onClick={onClickChangeUserInfo}
                  >
                    {t(TranslationKey.Edit)}
                  </Button>
                )}
              </div>
              {!isAnotherUser && (
                <div className={styles.rolesWrapper}>
                  <Typography variant="h6" className={styles.standartText}>
                    {t(TranslationKey.Roles)}
                  </Typography>

                  {user?.allowedRoles.length && !user?.masterUser ? (
                    <div className={styles.roles}>
                      {user?.allowedRoles.map((el, index) => (
                        <Typography key={index} className={styles.role}>
                          {UserRoleCodeMap[el]}
                        </Typography>
                      ))}
                    </div>
                  ) : (
                    <Typography className={styles.role}>{UserRoleCodeMap[user?.role]}</Typography>
                  )}
                </div>
              )}

              {!!user?.allowedSpec?.length && (
                <div className={styles.rolesWrapper}>
                  <Typography variant="h6" className={styles.standartText}>
                    {t(TranslationKey.Specialties)}
                  </Typography>
                  <div className={styles.roles}>
                    {user?.allowedSpec?.map((el, index) => (
                      <Typography key={index} className={styles.role}>
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

            <div className={styles.rightSideWrapper}>
              <Reviews tabReview={tabReview} setTabReview={setTabReview} reviews={reviews} />
              {isAnotherUser && (
                <div className={styles.leaveReviewBtnWrapper}>
                  <Button variant="contained" className={styles.leaveReviewBtn} onClick={onClickReview}>
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
