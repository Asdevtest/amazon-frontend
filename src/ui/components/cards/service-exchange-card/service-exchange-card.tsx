import { FC, memo, useState } from 'react'

import { freelanceRequestTypeByCode, freelanceRequestTypeTranslate } from '@constants/statuses/freelance-request-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { AnnouncementModal } from '@components/modals/announcement-modal'
import { Button } from '@components/shared/buttons/button'
import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'
import { UserLink } from '@components/user/user-link'

import { t } from '@utils/translations'

import { IService } from '@typings/master-user'

import { useStyles } from './service-exchange-card.style'

interface ServiceExchangeCardProps {
  service: IService
  choose?: boolean
  order?: boolean
  pathname?: string
  onClickButton: (service: IService) => void
}

export const ServiceExchangeCard: FC<ServiceExchangeCardProps> = memo(props => {
  const { classes: styles, cx } = useStyles()
  const { service, choose, order, pathname, onClickButton } = props

  const detailDescription =
    service.specType === 0
      ? t(TranslationKey.Universal)
      : freelanceRequestTypeTranslate(freelanceRequestTypeByCode[service.specType])
  const buttonContent = choose
    ? t(TranslationKey.Choose)
    : order
    ? t(TranslationKey['To order'])
    : t(TranslationKey.Open)

  const isNotMyServices = pathname !== '/freelancer/freelance/my-services'

  const [isOpenModal, setIsOpenModal] = useState(false)

  const handleToggleModal = () => {
    setIsOpenModal(!isOpenModal)
  }

  return (
    <div className={styles.cardWrapper}>
      <p className={styles.cardTitle}>{service.title}</p>

      <p className={styles.cardDescription}>{service.description}</p>

      <button className={styles.detailedDescription} onClick={handleToggleModal}>
        {t(TranslationKey.Details)}
      </button>

      <PhotoAndFilesSlider withoutFiles smallPhotos showPreviews mediumSlider files={service?.linksToMediaFiles} />

      {isNotMyServices ? (
        <div className={styles.detailsWrapper}>
          <div className={styles.detailsSubWrapper}>
            <p className={styles.detailTitle}>{t(TranslationKey['Service type']) + ':'}</p>
            <p className={styles.detailDescription}>{detailDescription}</p>
          </div>

          <div className={styles.detailsSubWrapper}>
            <p className={styles.detailTitle}>{t(TranslationKey.Performer) + ':'}</p>
            <UserLink
              blackText
              withAvatar
              ratingSize="small"
              name={service.createdBy.name}
              userId={service.createdBy._id}
              rating={service.createdBy.rating}
              customAvatarStyles={{ width: 30, height: 30 }}
              customStyles={{ fontSize: 14, lineHeight: '17px' }}
              customRatingClass={{ fontSize: 13, opacity: 1 }}
            />
          </div>
        </div>
      ) : (
        <div className={cx(styles.detailsWrapper, styles.detailsWrapperAll)}>
          <div className={styles.detailsSubWrapperAll}>
            <p className={styles.detailTitle}>{t(TranslationKey['Number of requests']) + ':'}</p>
            <p className={styles.detailDescription}>{service.requests.length}</p>
          </div>
          <div className={styles.detailsSubWrapperAll}>
            <p className={styles.detailTitle}>{t(TranslationKey['Service type']) + ':'}</p>
            <p className={styles.detailDescription}>{detailDescription}</p>
          </div>
        </div>
      )}

      <div className={styles.buttonWrapper}>
        <Button success={choose || order} className={styles.openBtn} onClick={() => onClickButton(service)}>
          {buttonContent}
        </Button>
      </div>

      {isOpenModal && (
        <AnnouncementModal
          isOpenModal={isOpenModal}
          service={service}
          choose={choose}
          order={order}
          onOpenModal={handleToggleModal}
          onClickButton={() => onClickButton(service)}
        />
      )}
    </div>
  )
})
