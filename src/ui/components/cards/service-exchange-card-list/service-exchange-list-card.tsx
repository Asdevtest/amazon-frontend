/* eslint-disable @typescript-eslint/ban-ts-comment */

/* eslint-disable react/no-children-prop */

/* eslint-disable no-unused-vars */
import { cx } from '@emotion/css'
import React, { FC, useState } from 'react'

import { Avatar, Typography } from '@mui/material'
import Rating from '@mui/material/Rating'

import { freelanceRequestTypeByCode, freelanceRequestTypeTranslate } from '@constants/statuses/freelance-request-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { AnnouncementModal } from '@components/modals/announcement-modal/announcement-modal'
import { Button } from '@components/shared/buttons/button'
import { CustomSlider } from '@components/shared/custom-slider'
import { UserLink } from '@components/user/user-link'

import { checkIsImageLink } from '@utils/checks'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { t } from '@utils/translations'

import { IService, linksToMediaFilesInterface } from '@typings/master-user'

import { useClassNames } from './service-exchange-list-card.style'

interface Props {
  service: IService
  choose: boolean
  order: boolean
  pathname: string
  onClickThumbnail: (data: { images: Array<string | linksToMediaFilesInterface>; imgIndex: number }) => void
  onClickButton: (data: IService) => void
}

export const ServiceExchangeCardList: FC<Props> = props => {
  const { service, choose, order, pathname, onClickThumbnail, onClickButton } = props

  const { classes: classNames } = useClassNames()

  const [isOpenModal, setIsOpenModal] = useState(false)

  const handleToggleModal = () => {
    setIsOpenModal(!isOpenModal)
  }

  return (
    <>
      <div className={classNames.cardWrapper}>
        <div className={classNames.cardCarouselWrapper}>
          {/*  @ts-ignore */}
          <CustomSlider>
            {service.linksToMediaFiles
              .filter(el => checkIsImageLink(typeof el === 'string' ? el : el?.file?.name))
              .map((imageHash, index) => (
                <img
                  key={index}
                  alt=""
                  className={classNames.carouselImage}
                  src={getAmazonImageUrl(imageHash, true)}
                  onClick={() => {
                    onClickThumbnail({
                      images: service.linksToMediaFiles.filter(el =>
                        checkIsImageLink(typeof el === 'string' ? el : el?.file?.name),
                      ),
                      imgIndex: index,
                    })
                  }}
                />
              ))}
          </CustomSlider>
        </div>

        <div className={classNames.titleAndDescriptionWrapper}>
          <p className={classNames.cardTitle}>{service.title}</p>

          <p className={classNames.cardDescription}>{service.description}</p>

          <button className={classNames.detailedDescription} onClick={handleToggleModal}>
            {t(TranslationKey.Details)}
          </button>
        </div>

        <div className={classNames.detailsAndButtonWrapper}>
          {pathname !== '/freelancer/freelance/my-services' ? (
            <div className={classNames.detailsWrapper}>
              <div className={classNames.detailsSubWrapper}>
                <Typography className={classNames.detailTitle}>{t(TranslationKey['Service type']) + ':'}</Typography>
                <Typography className={classNames.detailDescription}>
                  {service.type === 0
                    ? t(TranslationKey.Universal)
                    : freelanceRequestTypeTranslate(freelanceRequestTypeByCode[service.type])}
                </Typography>
              </div>

              <div className={classNames.detailsSubWrapper}>
                <Typography className={classNames.detailTitle}>{t(TranslationKey.Performer) + ':'}</Typography>
                <div className={classNames.userInfo}>
                  <Avatar src={getUserAvatarSrc(service.createdBy._id)} className={classNames.cardImg} />

                  <div>
                    <UserLink
                      blackText
                      name={service.createdBy.name}
                      userId={service.createdBy._id}
                      customStyles={{ fontSize: 14 }}
                      withAvatar={undefined}
                      maxNameWidth={undefined}
                      customClassNames={undefined}
                    />
                    <Rating disabled value={5} size="small" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={classNames.detailsWrapperAll}>
              <div className={classNames.detailsSubWrapperAll}>
                <Typography className={classNames.detailTitle}>
                  {t(TranslationKey['Number of requests']) + ':'}
                </Typography>
                <Typography className={classNames.detailDescription}>{service.requests.length}</Typography>
              </div>
              <div className={classNames.detailsSubWrapperAll}>
                <Typography className={classNames.detailTitle}>{t(TranslationKey['Service type']) + ':'}</Typography>
                <Typography className={classNames.detailDescription}>
                  {service.type === 0
                    ? t(TranslationKey.Universal)
                    : freelanceRequestTypeTranslate(freelanceRequestTypeByCode[service.type])}
                </Typography>
              </div>
            </div>
          )}

          <div className={classNames.buttonWrapper}>
            <Button success={choose || order} className={cx(classNames.openBtn)} onClick={() => onClickButton(service)}>
              {choose ? t(TranslationKey.Choose) : order ? t(TranslationKey['To order']) : t(TranslationKey.Open)}
            </Button>
          </div>
        </div>
      </div>

      <AnnouncementModal
        isOpenModal={isOpenModal}
        service={service}
        onOpenModal={handleToggleModal}
        onClickButton={() => onClickButton(service)}
      />
    </>
  )
}
