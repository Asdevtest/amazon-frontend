import { useEffect, useRef, useState } from 'react'

import { Avatar, Rating, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { SlideshowGallery } from '@components/shared/slideshow-gallery'
import { UserLink } from '@components/user/user-link'

import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { t } from '@utils/translations'

import { ButtonStyle, ButtonVariant } from '@typings/enums/button-style'

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
                <Button variant={ButtonVariant.OUTLINED} onClick={() => onClickReview(announcementData?.createdBy)}>
                  {t(TranslationKey.Reviews)}
                </Button>
                <Rating readOnly value={Number(announcementData?.createdBy?.rating)} size="small" />
              </div>
            </div>
          </div>

          <div className={styles.userMoreInfoWrapper}>
            <div className={styles.titleAndTaksTypeWrapper}>
              <Typography className={styles.announcementText}>{announcementData?.title}</Typography>
              <div className={styles.descriptionWrapper}>
                <Typography className={styles.regularText}>{t(TranslationKey['Service type']) + ':'}</Typography>
                <Typography className={styles.announcementText}>{announcementData?.spec?.title}</Typography>
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
          <Button
            variant={ButtonVariant.OUTLINED}
            className={styles.detailsButton}
            onClick={() => setShowFullDescription(prev => !prev)}
          >
            {showFullDescription ? t(TranslationKey.Close) : t(TranslationKey.Details)}
          </Button>
        ) : (
          <div />
        )}

        <div className={styles.buttonsWrapper}>
          <Button styleType={ButtonStyle.DANGER} className={styles.deleteButton} onClick={onClickCloseAnnouncementBtn}>
            {t(TranslationKey['Delete ad'])}
          </Button>

          <Button className={styles.editButton} onClick={onClickEditBtn}>
            {t(TranslationKey.Edit)}
          </Button>

          <Button className={styles.backButton} onClick={onClickBackBtn}>
            {t(TranslationKey.Back)}
          </Button>
        </div>
      </div>
    </div>
  )
}
