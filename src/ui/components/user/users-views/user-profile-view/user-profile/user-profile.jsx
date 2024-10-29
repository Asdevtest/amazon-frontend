import { Rate } from 'antd'
import { memo } from 'react'

import { UserRole, UserRoleCodeMap, mapUserRoleEnumToKey } from '@constants/keys/user-roles'
import { TranslationKey } from '@constants/translations/translation-key'

import { Reviews } from '@components/forms/reviews-form'
import { CustomAvatar } from '@components/shared/custom-avatar'
import { CustomButton } from '@components/shared/custom-button'
import { PurchaseHistory } from '@components/user/users-views/user-profile-view/purchase-history'

import { checkIsAdmin } from '@utils/checks'
import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './user-profile.style'

import { Info } from './info'
import { Tested } from './tested'

export const UserProfile = memo(props => {
  const {
    isAnotherUser,
    user,
    curUser,
    headerInfoData,
    onSubmitAvatarEdit,
    onClickChangeUserInfo,
    tabHistory,
    setTabHistory,
    onClickWriteBtn,
    reviews,
    onClickReview,
  } = props

  const { classes: styles } = useStyles()

  return (
    <div className={styles.wrapper}>
      <div className={styles.flexColumnContainer}>
        <div className={styles.userInfoConatiner}>
          <div className={styles.avatarWrapper}>
            <CustomAvatar
              initialUrl={getUserAvatarSrc(user._id)}
              isEditable={!isAnotherUser}
              onSubmit={onSubmitAvatarEdit}
            />
          </div>

          <div className={styles.userInfo}>
            <p className={styles.username}>{user?.name}</p>

            {checkIsAdmin(UserRoleCodeMap[curUser?.role]) || !isAnotherUser ? (
              <p className={styles.userEmail}>{user?.email}</p>
            ) : null}

            <div className={styles.ratingWrapper}>
              <p>{`Rating ${toFixed(user?.rating, 1)}`}</p>

              <Rate disabled className={styles.userRating} value={user?.rating} />
            </div>

            <div className={styles.userInfoButtons}>
              {isAnotherUser && (
                <CustomButton onClick={() => onClickWriteBtn(user._id)}>{t(TranslationKey.Write)}</CustomButton>
              )}

              {!isAnotherUser && !checkIsAdmin(UserRoleCodeMap[user?.role]) && (
                <CustomButton onClick={onClickChangeUserInfo}>{t(TranslationKey.Edit)}</CustomButton>
              )}
            </div>
          </div>
        </div>

        {!isAnotherUser && (
          <div className={styles.flexColumnContainer}>
            <p className={styles.title}>{t(TranslationKey.Roles)}</p>

            {user?.allowedRoles.length && !user?.masterUser ? (
              <div className={styles.roles}>
                {user?.allowedRoles.map(spec => (
                  <p key={spec}>{UserRoleCodeMap[spec]}</p>
                ))}
              </div>
            ) : (
              <p>{UserRoleCodeMap[user?.role]}</p>
            )}
          </div>
        )}

        {user?.allowedSpec?.length > 0 && (
          <div className={styles.flexColumnContainer}>
            <p className={styles.title}>{t(TranslationKey.Specialties)}</p>

            <div className={styles.roles}>
              {user?.allowedSpec?.map(spec => (
                <p key={spec?._id}>{spec?.title}</p>
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
        <p className={styles.title}>{t(TranslationKey.Reviews)}</p>

        <Reviews reviews={reviews} />

        {isAnotherUser && (
          <div className={styles.leaveReviewBtnWrapper}>
            <CustomButton onClick={onClickReview}>{t(TranslationKey['Leave a review'])}</CustomButton>
          </div>
        )}

        {!isAnotherUser && <PurchaseHistory user={user} tabHistory={tabHistory} setTabHistory={setTabHistory} />}
      </div>
    </div>
  )
})
