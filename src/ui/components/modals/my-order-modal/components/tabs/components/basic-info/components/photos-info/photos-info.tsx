import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { GalleryModal } from '@components/modals/gallery-modal'
import { Card } from '@components/modals/my-order-modal/components/tabs/components/basic-info/components/card'

import { t } from '@utils/translations'

import { useStyles } from './photos-info.style'

import { PhotosInfoProps } from './photos-info.type'
import { usePhotosInfo } from './use-photos-info'

export const PhotosInfo: FC<PhotosInfoProps> = memo(props => {
  const { classes: styles } = useStyles()

  const { photosConfig, galleryFiles, showGalleryModal, onToggleGalleryModal, onOpenGalleryModal } =
    usePhotosInfo(props)

  return (
    <>
      <div className={styles.wrapper}>
        <p className={styles.title}>{t(TranslationKey.Photos)}</p>

        <div className={styles.cardsWrapper}>
          {photosConfig.map((item, index) => (
            <Card key={index} wrapperClassName={styles.photosCard}>
              <div className={styles.field}>
                <p className={styles.fieldText}>{item.title}</p>
                <button
                  disabled={item.files?.length === 0}
                  className={styles.iconButton}
                  onClick={() => onOpenGalleryModal(item.files)}
                >
                  {item.element}
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {showGalleryModal ? (
        <GalleryModal files={galleryFiles} isOpenModal={showGalleryModal} onOpenModal={onToggleGalleryModal} />
      ) : null}
    </>
  )
})
