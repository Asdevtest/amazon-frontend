import { FC, memo, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { GalleryModal } from '@components/modals/gallery-modal'
import { Card } from '@components/modals/my-order-modal/components/card'
import { IOrderWithAdditionalFields } from '@components/modals/my-order-modal/my-order-modal.type'
import { EyeIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { IUploadFile } from '@typings/upload-file'

import { useStyles } from './photos-info.style'

import { IFieldConfig } from '../../basic-info-tab.type'

interface PhotosInfoProps {
  order: IOrderWithAdditionalFields
}

export const PhotosInfo: FC<PhotosInfoProps> = memo(({ order }) => {
  const { classes: styles, cx } = useStyles()

  const [showGalleryModal, setShowGalleryModal] = useState(false)
  const [galleryFiles, setGalleryFiles] = useState<Array<string | IUploadFile>>([])

  const handleOpenGalleryModal = (files?: Array<string | IUploadFile>) => {
    if (files && files.length > 0) {
      setGalleryFiles(files)
    } else {
      setGalleryFiles([])
    }

    setShowGalleryModal(!showGalleryModal)
  }

  const photosConfig: IFieldConfig[] = [
    {
      title: t(TranslationKey['Order photos']),
      element: <EyeIcon className={styles.eyeIcon} />,
      files: order?.images,
    },
    {
      title: t(TranslationKey['Photos of current supplier']),
      element: <EyeIcon className={styles.eyeIcon} />,
      files: order?.orderSupplier?.images,
    },
    {
      title: t(TranslationKey['Supplier payment']),
      element: <EyeIcon className={styles.eyeIcon} />,
      files: order?.paymentDetails,
    },
  ]

  return (
    <>
      <div className={styles.wrapper}>
        <p className={styles.title}>{t(TranslationKey.Photos)}</p>

        <div className={styles.cardsWrapper}>
          {photosConfig.map((item, index) => (
            <Card key={index} wrapperClassName={cx(styles.card, styles.photosCard)}>
              <div className={styles.field}>
                <p className={styles.fieldText}>{item.title}</p>
                <button
                  disabled={item.files?.length === 0}
                  className={styles.iconButton}
                  onClick={() => handleOpenGalleryModal(item.files)}
                >
                  {item.element}
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {showGalleryModal ? (
        <GalleryModal
          files={galleryFiles}
          isOpenModal={showGalleryModal}
          onOpenModal={() => setShowGalleryModal(!showGalleryModal)}
        />
      ) : null}
    </>
  )
})
