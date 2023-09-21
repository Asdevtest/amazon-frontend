import { cx } from '@emotion/css'
import { FC } from 'react'

import { freelanceRequestTypeByCode, freelanceRequestTypeTranslate } from '@constants/statuses/freelance-request-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Modal } from '@components/shared/modal'
import { PhotoAndFilesCarousel } from '@components/shared/photo-and-files-carousel'
import { UserLink } from '@components/user/user-link'

import { t } from '@utils/translations'

import { IMasterUser, IService } from '@typings/master-user'

import { useClassNames } from './announcement-modal.styles'

interface Props {
  isOpenModal: boolean
  service: IService
  onOpenModal: VoidFunction
  choose?: boolean
  order?: boolean
  select?: boolean
  onClickButton?: (service: IService) => void
  onClickSelectButton?: (selectedService?: IService, chosenExecutor?: IMasterUser) => void
}

export const AnnouncementModal: FC<Props> = ({
  isOpenModal,
  service,
  choose,
  order,
  select,
  onOpenModal,
  onClickButton,
  onClickSelectButton,
}) => {
  const { classes: styles } = useClassNames()

  const serviceType =
    service.type === 0
      ? t(TranslationKey.Universal)
      : freelanceRequestTypeTranslate(freelanceRequestTypeByCode[service.type])
  const textBold = cx(styles.text, styles.bold)
  const textMediumBold = cx(styles.textMedium, styles.bold)
  const files = service.linksToMediaFiles as string[]
  const translationButtonKey = choose ? TranslationKey.Choose : order ? TranslationKey['To order'] : TranslationKey.Open

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

      <div className={styles.main}>
        <div className={styles.files}>
          <p className={textMediumBold}>{t(TranslationKey.Files)}</p>

          <div className={styles.flexColumnContainer}>
            <p className={styles.textMedium}>{t(TranslationKey.Photos)}</p>
            <PhotoAndFilesCarousel withoutFiles isHideCounter files={files} customGap={0} customSlideHeight={210} />
          </div>

          <div className={styles.flexColumnContainer}>
            <p className={styles.textMedium}>{t(TranslationKey.Documents)}</p>
            <PhotoAndFilesCarousel
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

          {onClickButton && (choose || order) ? (
            <div className={styles.buttonWrapper}>
              <Button success={choose || order} className={styles.button} onClick={() => onClickButton(service)}>
                {t(translationButtonKey)}
              </Button>
            </div>
          ) : null}

          {onClickSelectButton && select ? (
            <div className={styles.buttonWrapper}>
              <Button success={select} className={styles.button} onClick={() => onClickSelectButton()}>
                {t(TranslationKey.Select)}
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </Modal>
  )
}
