import { Avatar } from 'antd'
import { useEffect, useRef, useState } from 'react'

import { Rating } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { SlideshowGallery } from '@components/shared/slideshow-gallery'
import { UserLink } from '@components/user/user-link'

import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { t } from '@utils/translations'

import { useStyles } from './my-services.style'

export const MyServicesInfo = ({
  announcementData,
  onClickEditBtn,
  onClickBackBtn,
  onClickCloseAnnouncementBtn,
  onClickReview,
}) => {
  const { classes: styles, cx } = useStyles()
  const descriptionRef = useRef()

  const [showFullDescription, setShowFullDescription] = useState(false)
  const [shopFullDescriptionButton, setShopFullDescriptionButton] = useState(false)

  useEffect(() => {
    const containerElement = descriptionRef?.current
    const componentHeight = containerElement?.scrollHeight

    if (componentHeight > 76) {
      setShopFullDescriptionButton(componentHeight)
    }
  }, [announcementData])

  return (
    <div className={styles.root}>
      <div className={styles.userWrapper}>
        <div className={styles.userInfoAndFooterWrapper}>
          <div className={styles.userInfoWrapper}>
            {announcementData?.createdBy?._id && (
              <Avatar src={getUserAvatarSrc(announcementData?.createdBy?._id)} className={styles.userAvatar} />
            )}

            <div className={styles.userInfoSubWrapper}>
              <UserLink
                blackText
                customStyles={{ maxWidth: 500, fontSize: 18 }}
                name={announcementData?.createdBy?.name}
                userId={announcementData?.createdBy?._id}
              />
              <div className={styles.userRatingWrapper}>
                <CustomButton onClick={() => onClickReview(announcementData?.createdBy)}>
                  {t(TranslationKey.Reviews)}
                </CustomButton>
                <Rating readOnly value={Number(announcementData?.createdBy?.rating)} size="small" />
              </div>
            </div>
          </div>

          <div className={styles.userMoreInfoWrapper}>
            <div className={styles.titleAndTaksTypeWrapper}>
              <p className={styles.announcementText}>{announcementData?.title}</p>
              <div className={styles.descriptionWrapper}>
                <p className={styles.regularText}>{t(TranslationKey['Service type']) + ':'}</p>
                <p className={styles.announcementText}>{announcementData?.spec?.title}</p>
              </div>
            </div>
            <div
              className={cx(styles.descriptionTextWrapper, {
                [styles.showFullDescription]: showFullDescription,
              })}
            >
              <p ref={descriptionRef} className={cx(styles.regularText, styles.description)}>
                {announcementData?.description}
              </p>
            </div>
          </div>
        </div>

        <SlideshowGallery slidesToShow={3} files={announcementData?.linksToMediaFiles} />
      </div>

      <div className={styles.footerWrapper}>
        {shopFullDescriptionButton ? (
          <CustomButton onClick={() => setShowFullDescription(prev => !prev)}>{t(TranslationKey.Close)}</CustomButton>
        ) : (
          <div />
        )}

        <div className={styles.buttonsWrapper}>
          <CustomButton danger type="primary" onClick={onClickCloseAnnouncementBtn}>
            {t(TranslationKey['Delete ad'])}
          </CustomButton>

          <CustomButton onClick={onClickEditBtn}>{t(TranslationKey.Edit)}</CustomButton>

          <CustomButton onClick={onClickBackBtn}>{t(TranslationKey.Back)}</CustomButton>
        </div>
      </div>
    </div>
  )
}
