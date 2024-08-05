import { Image } from 'antd'
import { FC, memo, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { AnnouncementModal } from '@components/modals/announcement-modal'
import { Button } from '@components/shared/button'
import { UserLink } from '@components/user/user-link'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
import { IAnnoucement } from '@typings/models/announcements/annoucement'

import { useStyles } from './service-exchange-list-card.style'

interface ServiceExchangeCardListProps {
  service: IAnnoucement
  choose: boolean
  order: boolean
  pathname: string
  onClickButton: (data: IAnnoucement) => void
}

export const ServiceExchangeCardList: FC<ServiceExchangeCardListProps> = memo(props => {
  const { classes: styles, cx } = useStyles()
  const { service, choose, order, pathname, onClickButton } = props

  const detailDescription = service.spec?.type === 0 ? t(TranslationKey.Universal) : service.spec?.title
  const buttonContent = choose
    ? t(TranslationKey.Choose)
    : order
    ? t(TranslationKey['To order'])
    : t(TranslationKey.Open)
  const showDetailDescriptionToolip = detailDescription.length > 12
  const isNotMyServices = pathname !== '/freelancer/freelance/my-services'
  const isSuccess = choose || order

  const [isOpenModal, setIsOpenModal] = useState(false)

  const handleToggleModal = () => {
    setIsOpenModal(!isOpenModal)
  }

  return (
    <>
      <div className={styles.wrapper}>
        <div style={{ width: 300 }}>
          <Image
            width={300}
            height={135}
            src={getAmazonImageUrl(service.linksToMediaFiles[0])}
            className={styles.image}
          />
        </div>

        <div className={styles.descriptionWrapper}>
          <p className={styles.cardTitle}>{service.title}</p>

          <p className={styles.cardDescription}>{service.description}</p>

          <div className={styles.buttonContainer}>
            <Button isSmallButton onClick={handleToggleModal}>
              {t(TranslationKey.Details)}
            </Button>
          </div>
        </div>

        <div className={styles.detailsAndButtonWrapper}>
          {isNotMyServices ? (
            <div className={styles.detailsWrapper}>
              <div className={styles.detailsSubWrapper}>
                <p className={styles.detailTitle}>{t(TranslationKey['Service type']) + ':'}</p>
                <p className={styles.detailDescription} title={showDetailDescriptionToolip ? detailDescription : ''}>
                  {detailDescription}
                </p>
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
            <div className={styles.detailsWrapperAll}>
              <div className={styles.detailsSubWrapper}>
                <p className={styles.detailTitle}>{t(TranslationKey['Number of requests']) + ':'}</p>
                <p className={styles.detailDescription}>{service.requests.length}</p>
              </div>
              <div className={styles.detailsSubWrapper}>
                <p className={styles.detailTitle}>{t(TranslationKey['Service type']) + ':'}</p>
                <p className={styles.detailDescription} title={showDetailDescriptionToolip ? detailDescription : ''}>
                  {detailDescription}
                </p>
              </div>
            </div>
          )}

          <div className={styles.buttonWrapper}>
            <Button
              isSmallButton
              styleType={isSuccess ? ButtonStyle.SUCCESS : ButtonStyle.PRIMARY}
              onClick={() => onClickButton(service)}
            >
              {buttonContent}
            </Button>
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
