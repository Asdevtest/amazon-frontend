import { FC, memo, useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { DEFAULT_SLIDE_HEIGHT } from '@components/modals/gallery-modal/gallery-modal.constants'
import { ImageModal } from '@components/modals/image-modal'
import { Checkbox } from '@components/shared/checkbox'
import { VideoPreloader } from '@components/shared/video-player/video-preloader'

import { checkIsVideoLink } from '@utils/checks'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'

import { useStyles } from './request-media-files-tab.style'

import { IState } from '../../../gallery-request-modal/gallery-request-modal.type'
import { getSupplierTitleByObjectkey } from '../../../gallery-request-modal/helpers/get-supplier-title-by-object-key'
import { hasNonEmptyStringArray } from '../../../gallery-request-modal/helpers/has-non-empty-string-array'

interface ReqestMediaFilesTabProps {
  data: IState | undefined
  getCheckboxState: (file: string) => boolean
  getDisabledCheckbox: (file: string) => boolean
  onToggleFile: (file: string) => void
}

export const ReqestMediaFilesTab: FC<ReqestMediaFilesTabProps> = memo(props => {
  const { data, getCheckboxState, getDisabledCheckbox, onToggleFile } = props

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

  useEffect(() => {
    if (data) {
      setTotalFiles(Object.values(data).flat())
    }
  }, [data])

  return (
    <>
      <div className={styles.wrapper}>
        {hasNonEmptyStringArray(data) && data ? (
          Object.keys(data)?.map(key => {
            const showSection = data[key]?.length > 0

            return showSection ? (
              <div key={key}>
                <p className={styles.title}>{`${getSupplierTitleByObjectkey(key)}:`}</p>

                <div className={styles.files}>
                  {data[key]?.map((file, index) => (
                    <div key={index} className={styles.file} onClick={() => handleChangeCurrentSlideIndex(file)}>
                      {checkIsVideoLink(file) ? (
                        <VideoPreloader
                          videoSource={getAmazonImageUrl(file)}
                          height={DEFAULT_SLIDE_HEIGHT}
                          preloaderClassName={styles.video}
                        />
                      ) : (
                        <img src={getAmazonImageUrl(file)} alt={`Slide-${index + 1}`} className={styles.image} />
                      )}

                      <Checkbox
                        checked={getCheckboxState(file)}
                        disabled={getDisabledCheckbox(file)}
                        className={styles.checkbox}
                        onClick={e => e.stopPropagation()}
                        onChange={() => onToggleFile(file)}
                      />
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
