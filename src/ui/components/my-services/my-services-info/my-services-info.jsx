/* eslint-disable no-unused-vars */
import {cx} from '@emotion/css'
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded'
import {Typography, Paper, Avatar, Rating} from '@mui/material'

import React from 'react'

import {freelanceRequestTypeByCode, freelanceRequestTypeTranslate} from '@constants/freelance-request-type'
import {RequestProposalStatus} from '@constants/request-proposal-status'
import {RequestStatus} from '@constants/request-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {CustomCarousel} from '@components/custom-carousel'
import {RequestStatusCell} from '@components/data-grid-cells/data-grid-cells'
import {UserLink} from '@components/user-link'

import {formatDateDistanceFromNowStrict, formatNormDateTime} from '@utils/date-time'
import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'
import {translateProposalsLeftMessage} from '@utils/validation'

import {useClassNames} from './my-services.style'

export const MyServicesInfo = ({announcementData, onClickEditBtn, onClickBackBtn}) => {
  const {classes: classNames} = useClassNames()

  return (
    <Paper className={classNames.root}>
      <div className={classNames.userWrapper}>
        <div className={classNames.userInfoAndFooterWrapper}>
          <div className={classNames.userInfoAndMoreInfoWrapper}>
            <div className={classNames.userInfoWrapper}>
              <Avatar src={getUserAvatarSrc(announcementData._id)} className={classNames.userAvatar} />

              <div className={classNames.userInfoSubWrapper}>
                <UserLink
                  blackText
                  customStyles={{maxWidth: 500, fontSize: 18}}
                  name={announcementData.title}
                  userId={announcementData._id}
                />
                <div className={classNames.userRatingWrapper}>
                  <Typography className={classNames.reviewText}>{t(TranslationKey.Reviews)}</Typography>
                  <Rating disabled value={5} size="small" classes={classNames.rating} />
                </div>
              </div>
            </div>

            <div className={classNames.userMoreInfoWrapper}>
              <div className={classNames.titleAndTaksTypeWrapper}>
                <Typography className={classNames.announcementText}>{announcementData.title}</Typography>
                <div className={classNames.descriptionWrapper}>
                  <Typography className={classNames.regularText}>{t(TranslationKey['Service type']) + ':'}</Typography>
                  <Typography className={classNames.announcementText}>
                    {freelanceRequestTypeTranslate(freelanceRequestTypeByCode[announcementData.type])}
                  </Typography>
                </div>
              </div>
              <div className={classNames.descriptionTextWrapper}>
                <Typography className={cx(classNames.regularText, classNames.description)}>
                  {announcementData.description}
                </Typography>
              </div>
            </div>
          </div>

          <div className={classNames.footerWrapper}>
            <div className={classNames.statusWrapper}>
              <FiberManualRecordRoundedIcon className={cx({})} />
              <Typography className={classNames.regularText}>{'Status'}</Typography>
            </div>

            <div className={classNames.buttonsWrapper}>
              <Button className={classNames.editButton} onClick={onClickEditBtn}>
                {t(TranslationKey.Edit)}
              </Button>

              <Button className={classNames.backButton} onClick={onClickBackBtn}>
                {t(TranslationKey.Back)}
              </Button>
            </div>
          </div>
        </div>
        <div className={classNames.userCarouselWrapper}>
          <CustomCarousel>
            {announcementData.linksToMediaFiles.map((imageHash, index) => (
              <img
                key={index}
                alt=""
                className={classNames.carouselImage}
                src={getAmazonImageUrl(imageHash, true)}
                onClick={() => {
                  // onClickThumbnail({images: announcementData.linksToMediaFiles, imgIndex: index})
                }}
              />
            ))}
          </CustomCarousel>
        </div>
      </div>
    </Paper>
  )
}
