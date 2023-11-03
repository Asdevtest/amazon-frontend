import { cx } from '@emotion/css'
import { FC, useState } from 'react'

import { freelanceRequestTypeByCode, freelanceRequestTypeTranslate } from '@constants/statuses/freelance-request-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { AnnouncementModal } from '@components/modals/announcement-modal'
import { CustomSlider } from '@components/shared/custom-slider'
import { RadioButtons } from '@components/shared/radio-buttons'
import { UserLink } from '@components/user/user-link'

import { checkIsImageLink } from '@utils/checks'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'

import { IService, IShortUser } from '@typings/master-user'
import { IUploadFile } from '@typings/upload-file'

import { useClassNames } from './announcement-card.styles'

interface onClickThumbnailArguments {
  images: Array<string | IUploadFile>
  imgIndex: number
}

interface AnnouncementCardProps {
  announcementData: IService
  selectedCard?: IService
  onClickThumbnail: (images: onClickThumbnailArguments) => void
  onClickSelectCard: (value: IService) => void
  onClickSelectButton?: (selectedService?: IService, chosenExecutor?: IShortUser) => void
}

export const AnnouncementCard: FC<AnnouncementCardProps> = props => {
  const { classes: classNames } = useClassNames()

  const { announcementData, selectedCard, onClickThumbnail, onClickSelectCard, onClickSelectButton } = props

  const imagesForRender = announcementData?.linksToMediaFiles?.filter(el =>
    checkIsImageLink(typeof el !== 'string' ? el?.file?.name : el),
  )

  const radioBottonsSettings = [
    {
      label: () => '',
      value: announcementData?._id,
    },
  ]

  const [isOpenModal, setIsOpenModal] = useState(false)

  const handleToggleModal = () => {
    setIsOpenModal(!isOpenModal)
  }

  return (
    <>
      <div
        className={cx(classNames.root, { [classNames.selectedCard]: selectedCard?._id === announcementData?._id })}
        onClick={e => {
          e.stopPropagation()
          onClickSelectCard(announcementData)
        }}
      >
        <div className={classNames.header}>
          <div className={classNames.titleWrapper}>
            <p className={classNames.title}>{announcementData?.title}</p>
            <RadioButtons
              currentValue={selectedCard?._id}
              radioBottonsSettings={radioBottonsSettings}
              onClickRadioButton={() => onClickSelectCard(announcementData)}
            />
          </div>

          <p className={classNames.description}>{announcementData?.description}</p>
        </div>

        <div className={classNames.detailedDescriptionWrapper}>
          <button className={classNames.detailedDescription} onClick={handleToggleModal}>
            {t(TranslationKey.Details)}
          </button>
        </div>

        <div className={classNames.cardCarouselWrapper}>
          <CustomSlider>
            {imagesForRender.map((imageHash, index) => (
              <img
                key={index}
                alt=""
                className={classNames.carouselImage}
                src={getAmazonImageUrl(imageHash, true)}
                onClick={e => {
                  e.stopPropagation()
                  onClickThumbnail({
                    images: imagesForRender,
                    imgIndex: index,
                  })
                }}
              />
            ))}
          </CustomSlider>
        </div>

        <div className={classNames.detailsWrapper}>
          <div className={classNames.detailsSubWrapper}>
            <p className={classNames.detailTitle}>{t(TranslationKey['Service type']) + ':'}</p>
            <p className={classNames.detailDescription}>
              {announcementData.type === 0
                ? t(TranslationKey.Universal)
                : freelanceRequestTypeTranslate(freelanceRequestTypeByCode[announcementData.type])}
            </p>
          </div>

          <div className={classNames.detailsSubWrapper}>
            <p className={classNames.detailTitle}>{t(TranslationKey.Performer) + ':'}</p>

            <UserLink
              withAvatar
              name={announcementData?.createdBy?.name}
              userId={announcementData?.createdBy?._id}
              rating={announcementData?.createdBy?.rating || 5}
              customClassNames={classNames.userLinkCustomClassNames}
              ratingSize="small"
              customRatingClass={{ fontSize: 13, opacity: 1 }}
            />
          </div>
        </div>
      </div>

      <AnnouncementModal
        select
        isOpenModal={isOpenModal}
        service={announcementData}
        onOpenModal={handleToggleModal}
        onClickSelectButton={onClickSelectButton}
      />
    </>
  )
}
