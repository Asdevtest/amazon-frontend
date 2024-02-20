import { FC } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { CustomTextEditor } from '@components/shared/custom-text-editor'
import { Modal } from '@components/shared/modal'
import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'
import { UserLink } from '@components/user/user-link'

import { t } from '@utils/translations'

import { IAnnoucement } from '@typings/models/announcements/annoucement'
import { ICreatedBy } from '@typings/shared/created-by'
import { ButtonType } from '@typings/types/button.type'

import { useStyles } from './announcement-modal.style'

interface AnnouncementModalProps {
  isOpenModal: boolean
  service: IAnnoucement
  onOpenModal: () => void
  choose?: boolean
  order?: boolean
  select?: boolean
  onClickButton?: (service: IAnnoucement) => void
  onClickSelectButton?: (selectedService?: IAnnoucement, chosenExecutor?: ICreatedBy) => void
}

export const AnnouncementModal: FC<AnnouncementModalProps> = props => {
  const { isOpenModal, service, choose, order, select, onOpenModal, onClickButton, onClickSelectButton } = props
  const { classes: styles, cx } = useStyles()

  const serviceType = service.spec?.type === 0 ? t(TranslationKey.Universal) : service.spec?.title
  const textBold = cx(styles.text, styles.bold)
  const textMediumBold = cx(styles.textMedium, styles.bold)
  const files = service.linksToMediaFiles as string[]

  const translationButtonKey = choose ? TranslationKey.Choose : order ? TranslationKey['To order'] : TranslationKey.Open

  const isSuccess = choose || order

  return (
    <Modal openModal={isOpenModal} setOpenModal={onOpenModal}>
      <div className={styles.modalWrapper}>
        <div className={styles.header}>
          <p className={styles.mainTitle}>{service.title}</p>

          <div className={styles.flexRowContainer}>
            <p className={styles.text}>{t(TranslationKey['Service type'])}</p>
            <p className={cx(textBold, styles.capitalize)}>{serviceType}</p>
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
          <div className={styles.descriptionContainer}>
            <p className={textMediumBold}>{t(TranslationKey.Files)}</p>

            <div>
              <div className={styles.flexColumnContainer}>
                <p className={styles.textMedium}>{t(TranslationKey.Photos)}</p>
                <PhotoAndFilesSlider withoutFiles showPreviews files={files} customSlideHeight={210} />
              </div>

              <div className={styles.flexColumnContainer}>
                <p className={styles.textMedium}>{t(TranslationKey.Documents)}</p>
                <PhotoAndFilesSlider alignLeft withoutPhotos files={files} customSlideHeight={67} />
              </div>
            </div>
          </div>

          <div className={styles.content}>
            <div className={styles.descriptionContainer}>
              <p className={textMediumBold}>{t(TranslationKey.Description)}</p>
              <div className={styles.description}>
                <CustomTextEditor readOnly value={service.description} editorWrapperClassName={styles.editorWrapper} />
              </div>
            </div>

            {onClickButton && isSuccess ? (
              <div className={styles.buttonWrapper}>
                <Button
                  styleType={isSuccess ? ButtonType.SUCCESS : ButtonType.PRIMARY}
                  className={styles.button}
                  onClick={() => onClickButton(service)}
                >
                  {t(translationButtonKey)}
                </Button>
              </div>
            ) : null}

            {onClickSelectButton && select ? (
              <div className={styles.buttonWrapper}>
                <Button
                  styleType={select ? ButtonType.SUCCESS : ButtonType.PRIMARY}
                  className={styles.button}
                  onClick={() => onClickSelectButton()}
                >
                  {t(TranslationKey.Select)}
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </Modal>
  )
}
