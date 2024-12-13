import { FC, memo, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { AnnouncementModal } from '@components/modals/announcement-modal'
import { CustomButton } from '@components/shared/custom-button'
import { CustomImage } from '@components/shared/custom-image'
import { CustomTag } from '@components/shared/custom-tag'
import { Text } from '@components/shared/text'
import { UserLink } from '@components/user/user-link'

import { t } from '@utils/translations'

import { IAnnoucement } from '@typings/models/announcements/annoucement'

import { useStyles } from './service-exchange-card.style'

interface ServiceExchangeCardProps {
  service: IAnnoucement
  onClickButton: (service: IAnnoucement) => void
  choose?: boolean
  order?: boolean
  variant?: 'list' | 'card'
  freelancer?: boolean
}

export const ServiceExchangeCard: FC<ServiceExchangeCardProps> = memo(props => {
  const { service, onClickButton, choose, order, variant = 'list', freelancer } = props

  const { classes: styles, cx } = useStyles()
  const [isOpenModal, setIsOpenModal] = useState(false)

  const handleToggleModal = () => {
    setIsOpenModal(!isOpenModal)
  }

  const detailDescription = service.spec?.type === 0 ? t(TranslationKey.Universal) : service.spec?.title
  const buttonContent = choose
    ? t(TranslationKey.Choose)
    : order
    ? t(TranslationKey['To order'])
    : t(TranslationKey.Open)
  const isCard = variant === 'card'

  return (
    <>
      <div className={cx(styles.wrapper, { [styles.cardWrapper]: isCard })} onClick={handleToggleModal}>
        <div className={styles.serviceWrapper}>
          <CustomImage width={240} height={160} wrapperClassName={styles.image} src={service.linksToMediaFiles?.[0]} />

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
          <Text strong rows={2} copyable={false} text={service.title} />

          <Text copyable={false} text={service.description} />

          {freelancer ? (
            <p className={styles.detailsText}>
              <span className={styles.detailTitle}>{t(TranslationKey['Number of requests']) + ':'}</span>
              <span className={styles.detailDescription}>{service.requests.length}</span>
            </p>
          ) : null}

          <div className={styles.actionButton}>
            <CustomButton type="primary" onClick={() => onClickButton(service)}>
              {buttonContent}
            </CustomButton>
          </div>
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
