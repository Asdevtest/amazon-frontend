import { Image } from 'antd'
import { FC, memo, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { AnnouncementModal } from '@components/modals/announcement-modal'
import { Button } from '@components/shared/button'
import { CustomTag } from '@components/shared/custom-tag'
import { UserLink } from '@components/user/user-link'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
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
  const isSuccess = choose || order
  const isCard = variant === 'card'

  const [isOpenModal, setIsOpenModal] = useState(false)

  const handleToggleModal = () => {
    setIsOpenModal(!isOpenModal)
  }

  return (
    <>
      <div className={cx(styles.wrapper, { [styles.cardWrapper]: isCard })}>
        <div className={!isCard ? styles.serviceWrapper : ''}>
          <div className={styles.image}>
            <Image
              width={isCard ? '100%' : 250}
              height={isCard ? 150 : 135}
              src={getAmazonImageUrl(service.linksToMediaFiles[0])}
            />
          </div>

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
          <p className={styles.cardTitle}>{service.title}</p>

          <p className={styles.cardDescription}>{service.description}</p>

          {!isNotMyServices ? (
            <div className={styles.detailsWrapperAll}>
              <div className={styles.detailsSubWrapper}>
                <p className={styles.detailTitle}>{t(TranslationKey['Number of requests']) + ':'}</p>
                <p className={styles.detailDescription}>{service.requests.length}</p>
              </div>
            </div>
          ) : null}

          <Button
            className={styles.actionButton}
            styleType={isSuccess ? ButtonStyle.SUCCESS : ButtonStyle.PRIMARY}
            onClick={() => onClickButton(service)}
          >
            {buttonContent}
          </Button>
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
