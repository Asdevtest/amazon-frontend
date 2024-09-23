import { FC, memo, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { AnnouncementModal } from '@components/modals/announcement-modal'
import { CustomButton } from '@components/shared/custom-button'
import { CustomImage } from '@components/shared/custom-image'
import { CustomTag } from '@components/shared/custom-tag'
import { Text } from '@components/shared/text'
import { UserLink } from '@components/user/user-link'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'

import { IAnnoucement } from '@typings/models/announcements/annoucement'

import { useStyles } from './service-exchange-card.style'

interface ServiceExchangeCardProps {
  service: IAnnoucement
  choose?: boolean
  order?: boolean
  pathname?: string
  variant?: 'list' | 'card'
  onClickButton: (service: IAnnoucement) => void
}

export const ServiceExchangeCard: FC<ServiceExchangeCardProps> = memo(props => {
  const { classes: styles, cx } = useStyles()
  const { service, choose, order, pathname, variant = 'list', onClickButton } = props

  const detailDescription = service.spec?.type === 0 ? t(TranslationKey.Universal) : service.spec?.title
  const buttonContent = choose
    ? t(TranslationKey.Choose)
    : order
    ? t(TranslationKey['To order'])
    : t(TranslationKey.Open)

  const isNotMyServices = pathname !== '/freelancer/freelance/my-services'
  const isCard = variant === 'card'
  const isNoImage = !service?.linksToMediaFiles?.[0]

  const [isOpenModal, setIsOpenModal] = useState(false)

  const handleToggleModal = () => {
    setIsOpenModal(!isOpenModal)
  }

  return (
    <>
      <div className={cx(styles.wrapper, { [styles.cardWrapper]: isCard })} onClick={handleToggleModal}>
        <div className={cx(styles.serviceWrapper, { [styles.serviceListWrapper]: !isCard })}>
          <CustomImage
            width="100%"
            height={isCard ? 150 : 135}
            wrapperClassName={cx(styles.image, { [styles.noImage]: isNoImage })}
            imageUrl={getAmazonImageUrl(service.linksToMediaFiles[0])}
          />

          <div className={styles.serviceInfo}>
            <CustomTag title={detailDescription} className={styles.serviceType} />
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

        <div className={styles.descriptionWrapper} onClick={handleToggleModal}>
          <Text className={styles.cardTitle} textRows={2} copyable={false} text={service.title} />

          <Text className={styles.cardDescription} copyable={false} text={service.description} />

          {!isNotMyServices ? (
            <p className={styles.detailsText}>
              <span className={styles.detailTitle}>{t(TranslationKey['Number of requests']) + ':'}</span>
              <span className={styles.detailDescription}>{service.requests.length}</span>
            </p>
          ) : null}

          <CustomButton type="primary" wrapperClassName={styles.actionButton} onClick={() => onClickButton(service)}>
            {buttonContent}
          </CustomButton>
        </div>
      </div>

      {isOpenModal ? (
        <AnnouncementModal
          openModal={isOpenModal}
          service={service}
          choose={choose}
          order={order}
          onOpenModal={handleToggleModal}
          onClickButton={() => onClickButton(service)}
        />
      ) : null}
    </>
  )
})
