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

import { useStyles } from './service-card.style'

interface ServiceCardProps {
  service: IAnnoucement
  listMode: boolean
  onClickButton: (service: IAnnoucement) => void
  isClient?: boolean
}

export const ServiceCard: FC<ServiceCardProps> = memo(props => {
  const { service, listMode, onClickButton, isClient } = props

  const { classes: styles, cx } = useStyles()
  const [isOpenModal, setIsOpenModal] = useState(false)

  const handleToggleModal = () => setIsOpenModal(!isOpenModal)

  const detailDescription = service.spec?.type === 0 ? t(TranslationKey.Universal) : service.spec?.title
  const buttonContent = isClient ? t(TranslationKey['To order']) : t(TranslationKey.Open)

  return (
    <>
      <div className={cx(styles.wrapper, { [styles.cardWrapper]: !listMode })} onDoubleClick={handleToggleModal}>
        <div className={styles.serviceWrapper}>
          <CustomImage width={240} height={160} rootClassName={styles.image} src={service.linksToMediaFiles?.[0]} />

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

        <div className={styles.descriptionWrapper}>
          <Text strong rows={2} copyable={false} text={service.title} />

          <Text copyable={false} text={service.description} />

          {!isClient ? (
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
          order={isClient}
          onOpenModal={handleToggleModal}
          onClickButton={() => onClickButton(service)}
        />
      ) : null}
    </>
  )
})
