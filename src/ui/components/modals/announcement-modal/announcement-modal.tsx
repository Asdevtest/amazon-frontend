import { cx } from '@emotion/css'
import { FC } from 'react'

import { freelanceRequestTypeByCode, freelanceRequestTypeTranslate } from '@constants/statuses/freelance-request-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Modal } from '@components/shared/modal'
import { PhotoAndFilesCarouselTest } from '@components/shared/photo-and-files-carousel-test'
import { UserLink } from '@components/user/user-link'

import { t } from '@utils/translations'

import { IService } from '@typings/master-user'

import { useClassNames } from './announcement-modal.styles'

interface Props {
  isOpenModal: boolean
  service: IService
  onOpenModal: VoidFunction
  onClickButton?: (service: IService) => void
  choose?: boolean
  order?: boolean
}

export const AnnouncementModal: FC<Props> = ({ isOpenModal, service, onOpenModal, onClickButton, choose, order }) => {
  const { classes: styles } = useClassNames()

  const serviceType =
    service.type === 0
      ? t(TranslationKey.Universal)
      : freelanceRequestTypeTranslate(freelanceRequestTypeByCode[service.type])
  const textBold = cx(styles.text, styles.bold)
  const textMediumBold = cx(styles.textMedium, styles.bold)
  const files = service.linksToMediaFiles as string[]

  return (
    <Modal openModal={isOpenModal} setOpenModal={onOpenModal} dialogContextClassName={styles.modalWrapper}>
      <div className={styles.header}>
        <p className={styles.mainTitle}>{service.title}</p>

        <div className={styles.flexRowContainer}>
          <p className={styles.text}>{t(TranslationKey['Service type'])}</p>
          <p className={textBold}>{serviceType}</p>
        </div>

        <div className={styles.flexRowContainer}>
          <p className={styles.text}>{t(TranslationKey.Performer)}</p>

          <UserLink
            blueText
            withAvatar
            ratingSize="small"
            name={service.createdBy.name}
            userId={service.createdBy._id}
            rating={service.createdBy.rating}
            customStyles={{ fontSize: 14, lineHeight: '19px' }}
            customRatingClass={styles.rating}
          />
        </div>
      </div>

      <div className={styles.main}>
        <div className={styles.files}>
          <p className={textMediumBold}>{t(TranslationKey.Files)}</p>

          <div className={styles.flexColumnContainer}>
            <p className={styles.textMedium}>{t(TranslationKey.Photos)}</p>
            <PhotoAndFilesCarouselTest withoutFiles isHideCounter files={files} customGap={0} customSlideHeight={210} />
          </div>

          <div className={styles.flexColumnContainer}>
            <p className={styles.textMedium}>{t(TranslationKey.Documents)}</p>
            <PhotoAndFilesCarouselTest
              alignLeft
              withoutPhotos
              isHideCounter
              files={files}
              customGap={0}
              customSlideHeight={85}
            />
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.descriptionContainer}>
            <p className={textMediumBold}>{t(TranslationKey.Description)}</p>
            <p className={styles.description}>{service.description}</p>
          </div>

          {onClickButton ? (
            <div className={styles.buttonWrapper}>
              <Button success={choose || order} className={styles.button} onClick={() => onClickButton(service)}>
                {choose ? t(TranslationKey.Choose) : order ? t(TranslationKey['To order']) : t(TranslationKey.Open)}
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </Modal>
  )
}
