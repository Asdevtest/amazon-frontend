import { FC, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { AnnouncementModal } from '@components/modals/announcement-modal'
import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'
import { RadioButtons } from '@components/shared/radio-buttons'
import { UserLink } from '@components/user/user-link'

import { checkIsMediaFileLink } from '@utils/checks'
import { t } from '@utils/translations'

import { IAnnoucement } from '@typings/models/announcements/annoucement'
import { ICreatedBy } from '@typings/shared/created-by'
import { UploadFileType } from '@typings/shared/upload-file'

import { useStyles } from './announcement-card.style'

interface onClickThumbnailArguments {
  images: UploadFileType[]
  imgIndex: number
}

interface AnnouncementCardProps {
  announcementData: IAnnoucement
  selectedCard?: IAnnoucement
  onClickThumbnail: (images: onClickThumbnailArguments) => void
  onClickSelectCard: (value: IAnnoucement) => void
  onClickSelectButton?: (selectedService?: IAnnoucement, chosenExecutor?: ICreatedBy) => void
}

export const AnnouncementCard: FC<AnnouncementCardProps> = props => {
  const { classes: styles, cx } = useStyles()

  const { announcementData, selectedCard, /* onClickThumbnail, */ onClickSelectCard, onClickSelectButton } = props

  const imagesForRender = announcementData?.linksToMediaFiles?.filter(el =>
    checkIsMediaFileLink(typeof el !== 'string' ? el?.file?.name : el),
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
        className={cx(styles.root, { [styles.selectedCard]: selectedCard?._id === announcementData?._id })}
        onClick={e => {
          e.stopPropagation()
          onClickSelectCard(announcementData)
        }}
      >
        <div className={styles.header}>
          <div className={styles.titleWrapper}>
            <p className={styles.title}>{announcementData?.title}</p>
            <RadioButtons
              currentValue={selectedCard?._id}
              radioBottonsSettings={radioBottonsSettings}
              onClickRadioButton={() => onClickSelectCard(announcementData)}
            />
          </div>

          <p className={styles.description}>{announcementData?.description}</p>
        </div>

        <div className={styles.detailedDescriptionWrapper}>
          <button className={styles.detailedDescription} onClick={handleToggleModal}>
            {t(TranslationKey.Details)}
          </button>
        </div>

        <PhotoAndFilesSlider showPreviews isHideCounter withoutFiles mediumSlider files={imagesForRender} />

        <div className={styles.detailsWrapper}>
          <div className={styles.detailsSubWrapper}>
            <p className={styles.detailTitle}>{t(TranslationKey['Service type']) + ':'}</p>
            <p className={styles.detailDescription}>
              {announcementData.spec?.type === 0 ? t(TranslationKey.Universal) : announcementData.spec?.title}
            </p>
          </div>

          <div className={styles.detailsSubWrapper}>
            <p className={styles.detailTitle}>{t(TranslationKey.Performer) + ':'}</p>

            <UserLink
              withAvatar
              name={announcementData?.createdBy?.name}
              userId={announcementData?.createdBy?._id}
              rating={announcementData?.createdBy?.rating || 5}
              customClassNames={styles.userLinkCustomClassNames}
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
