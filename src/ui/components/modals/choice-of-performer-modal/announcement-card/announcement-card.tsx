import { FC, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { AnnouncementModal } from '@components/modals/announcement-modal'
import { RadioButtons } from '@components/shared/radio-buttons'
import { SlideshowGallery } from '@components/shared/slideshow-gallery'
import { UserLink } from '@components/user/user-link'

import { t } from '@utils/translations'

import { IAnnoucement } from '@typings/models/announcements/annoucement'

import { useStyles } from './announcement-card.style'

interface AnnouncementCardProps {
  announcementData: IAnnoucement
  selectedCard?: IAnnoucement
  onClickSelectCard: (value: IAnnoucement) => void
}

export const AnnouncementCard: FC<AnnouncementCardProps> = props => {
  const { announcementData, selectedCard, onClickSelectCard } = props

  const { classes: styles, cx } = useStyles()

  const radioBottonsSettings = [
    {
      value: announcementData?._id,
    },
  ]

  const [isOpenModal, setIsOpenModal] = useState(false)

  const handleToggleModal = () => {
    setIsOpenModal(!isOpenModal)
  }

  return (
    <>
      <div className={cx(styles.root, { [styles.selectedCard]: selectedCard?._id === announcementData?._id })}>
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

        <div className={styles.galleryWrapper}>
          <SlideshowGallery hiddenPreviews files={announcementData?.linksToMediaFiles} />
        </div>

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

      {isOpenModal ? (
        <AnnouncementModal
          select={!!selectedCard}
          openModal={isOpenModal}
          service={announcementData}
          onOpenModal={handleToggleModal}
          onClickSelectButton={() => {
            onClickSelectCard(announcementData)
            handleToggleModal()
          }}
        />
      ) : null}
    </>
  )
}
