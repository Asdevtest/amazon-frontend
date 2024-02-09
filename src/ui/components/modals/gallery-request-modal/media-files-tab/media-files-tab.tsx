import { FC, memo, useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ImageModal } from '@components/modals/image-modal'
import { VideoPreloader } from '@components/shared/video-player/video-preloader'

import { checkIsVideoLink } from '@utils/checks'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'

import { useStyles } from './media-files-tab.style'

import { DEFAULT_SLIDE_HEIGHT } from '../gallery-request-modal.constants'
import { IData } from '../gallery-request-modal.type'

interface MediaFilesTabProps {
  data: IData | undefined
}

export const MediaFilesTab: FC<MediaFilesTabProps> = memo(({ data }) => {
  const { classes: styles } = useStyles()

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [showImageModal, setShowImageModal] = useState(false)
  const [totalFiles, setTotalFiles] = useState<string[]>([])
  const handleChangeCurrentSlideIndex = (slide: string) => {
    const findIndexSlideInTotalFiles = totalFiles.findIndex(file => file === slide)

    if (findIndexSlideInTotalFiles !== -1) {
      setCurrentSlideIndex(findIndexSlideInTotalFiles)
    }

    setShowImageModal(!showImageModal)
  }

  const dataKeys = data ? Object.keys(data) : undefined

  useEffect(() => {
    if (data) {
      setTotalFiles(Object.values(data).flat())
    }
  }, [data])

  const getTitleByObjectkey = (key: string) => {
    if (key === 'productImages') {
      return t(TranslationKey.Product)
    }

    if (key === 'currentSupplierImage"') {
      return t(TranslationKey['Current supplier'])
    }

    if (key === 'currentSupplierImage"') {
      return t(TranslationKey.SEO)
    }

    return t(TranslationKey.Supplier)
  }

  return (
    <>
      <div className={styles.wrapper}>
        {data ? (
          dataKeys?.map(key => {
            const showSection = data[key]?.length > 0

            return showSection ? (
              <div key={key}>
                <p className={styles.title}>{`${getTitleByObjectkey(key)}:`}</p>

                <div className={styles.slides}>
                  {data[key]?.map((slide, index) => (
                    <div key={index} className={styles.slide} onClick={() => handleChangeCurrentSlideIndex(slide)}>
                      {checkIsVideoLink(slide) ? (
                        <VideoPreloader videoSource={getAmazonImageUrl(slide)} height={DEFAULT_SLIDE_HEIGHT} />
                      ) : (
                        <img src={getAmazonImageUrl(slide)} alt={`Slide-${index + 1}`} className={styles.image} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : null
          })
        ) : (
          <p className={styles.noPhotos}>{t(TranslationKey['No photos'])}</p>
        )}
      </div>

      {showImageModal ? (
        <ImageModal
          showPreviews
          files={totalFiles}
          currentFileIndex={currentSlideIndex}
          isOpenModal={showImageModal}
          onOpenModal={() => setShowImageModal(!showImageModal)}
          onCurrentFileIndex={setCurrentSlideIndex}
        />
      ) : null}
    </>
  )
})
