/* eslint-disable no-unused-vars */
import { cx } from '@emotion/css'
import { Typography, Paper, Avatar, Rating } from '@mui/material'

import { freelanceRequestTypeByCode, freelanceRequestTypeTranslate } from '@constants/statuses/freelance-request-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { UserLink } from '@components/user/user-link'

import { t } from '@utils/translations'

import { useClassNames } from './my-services.style'
import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { PhotoCarousel } from '@components/shared/photo-carousel'

export const MyServicesInfo = ({ announcementData, onClickEditBtn, onClickBackBtn, onClickCloseAnnouncementBtn }) => {
  const { classes: classNames } = useClassNames()

  return (
    <Paper className={classNames.root}>
      <div className={classNames.userWrapper}>
        <div className={classNames.userInfoAndFooterWrapper}>
          <div className={classNames.userInfoAndMoreInfoWrapper}>
            <div className={classNames.userInfoWrapper}>
              <Avatar src={getUserAvatarSrc(announcementData?.createdBy?._id)} className={classNames.userAvatar} />

              <div className={classNames.userInfoSubWrapper}>
                <UserLink
                  blackText
                  customStyles={{ maxWidth: 500, fontSize: 18 }}
                  name={announcementData?.createdBy?.name}
                  userId={announcementData?.createdBy?._id}
                />
                <div className={classNames.userRatingWrapper}>
                  <Typography className={classNames.reviewText}>{t(TranslationKey.Reviews)}</Typography>
                  <Rating
                    disabled
                    value={announcementData?.createdBy?.rating}
                    size="small"
                    classes={classNames.rating}
                  />
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
              <div className={classNames.descriptionTextWrapper}>
                <Typography className={cx(classNames.regularText, classNames.description)}>
                  {announcementData?.description}
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <div className={classNames.userCarouselWrapper}>
          <div className={classNames.photoWrapper}>
            <PhotoCarousel isAmazonPhoto files={announcementData?.linksToMediaFiles} />
          </div>

          {/* <Carousel
            navButtonsAlwaysInvisible
            autoPlay={false}
            timeout={100}
            animation="fade"
            // index={imgIndex}
          >
            {announcementData?.linksToMediaFiles?.map((el, index) => (
              <div key={index} className={classNames.mainWrapper}>
                <img alt="" className={classNames.imgBox} src={getAmazonImageUrl(el, true)} />
              </div>
            ))}
          </Carousel> */}
        </div>
      </div>
      <div className={classNames.footerWrapper}>
        {/* <div className={classNames.statusWrapper}>
          <FiberManualRecordRoundedIcon className={cx({})} />
          <Typography className={classNames.regularText}>{'Status'}</Typography>
        </div> */}

        <div className={classNames.buttonsWrapper}>
          <Button danger className={classNames.deleteButton} onClick={onClickCloseAnnouncementBtn}>
            {t(TranslationKey['Close the announcement'])}
          </Button>

          <Button className={classNames.editButton} onClick={onClickEditBtn}>
            {t(TranslationKey.Edit)}
          </Button>

          <Button className={classNames.backButton} onClick={onClickBackBtn}>
            {t(TranslationKey.Back)}
          </Button>
        </div>
      </div>
    </Paper>
  )
}
