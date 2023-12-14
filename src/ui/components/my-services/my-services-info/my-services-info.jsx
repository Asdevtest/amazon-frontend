import { useEffect, useRef, useState } from 'react'

import { Avatar, Rating, Typography } from '@mui/material'

import { freelanceRequestTypeByCode, freelanceRequestTypeTranslate } from '@constants/statuses/freelance-request-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'
import { UserLink } from '@components/user/user-link'

import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { t } from '@utils/translations'

import { useClassNames } from './my-services.style'

export const MyServicesInfo = ({
  announcementData,
  onClickEditBtn,
  onClickBackBtn,
  onClickCloseAnnouncementBtn,
  onClickReview,
}) => {
  const { classes: classNames, cx } = useClassNames()
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
    <div className={classNames.root}>
      <div className={classNames.userWrapper}>
        <div className={classNames.userInfoAndFooterWrapper}>
          <div className={classNames.userInfoWrapper}>
            {announcementData?.createdBy?._id && (
              <Avatar src={getUserAvatarSrc(announcementData?.createdBy?._id)} className={classNames.userAvatar} />
            )}

            <div className={classNames.userInfoSubWrapper}>
              <UserLink
                blackText
                customStyles={{ maxWidth: 500, fontSize: 18 }}
                name={announcementData?.createdBy?.name}
                userId={announcementData?.createdBy?._id}
              />
              <div className={classNames.userRatingWrapper}>
                <Button
                  variant="text"
                  className={classNames.reviewText}
                  onClick={() => onClickReview(announcementData?.createdBy)}
                >
                  {t(TranslationKey.Reviews)}
                </Button>
                <Rating readOnly value={Number(announcementData?.createdBy?.rating)} size="small" />
              </div>
            </div>
          </div>

          <div className={classNames.userMoreInfoWrapper}>
            <div className={classNames.titleAndTaksTypeWrapper}>
              <Typography className={classNames.announcementText}>{announcementData?.title}</Typography>
              <div className={classNames.descriptionWrapper}>
                <Typography className={classNames.regularText}>{t(TranslationKey['Service type']) + ':'}</Typography>
                <Typography className={classNames.announcementText}>
                  {freelanceRequestTypeTranslate(freelanceRequestTypeByCode[announcementData?.type])}
                </Typography>
              </div>
            </div>
            <div
              className={cx(classNames.descriptionTextWrapper, {
                [classNames.showFullDescription]: showFullDescription,
              })}
            >
              <p ref={descriptionRef} className={cx(classNames.regularText, classNames.description)}>
                {announcementData?.description}
              </p>
            </div>
          </div>
        </div>
        <div className={classNames.photosWrapper}>
          <PhotoAndFilesSlider withoutFiles customSlideHeight={150} files={announcementData?.linksToMediaFiles} />
        </div>
      </div>

      <div className={classNames.footerWrapper}>
        {shopFullDescriptionButton ? (
          <Button
            variant={'text'}
            className={classNames.detailsButton}
            onClick={() => setShowFullDescription(prev => !prev)}
          >
            {showFullDescription ? t(TranslationKey.Close) : t(TranslationKey.Details)}
          </Button>
        ) : (
          <div />
        )}

        <div className={classNames.buttonsWrapper}>
          <Button danger className={classNames.deleteButton} onClick={onClickCloseAnnouncementBtn}>
            {t(TranslationKey['Delete ad'])}
          </Button>

          <Button className={classNames.editButton} onClick={onClickEditBtn}>
            {t(TranslationKey.Edit)}
          </Button>

          <Button className={classNames.backButton} onClick={onClickBackBtn}>
            {t(TranslationKey.Back)}
          </Button>
        </div>
      </div>
    </div>
  )
}
