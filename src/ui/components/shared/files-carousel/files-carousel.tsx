import { observer } from 'mobx-react'
import { FC, useEffect, useState } from 'react'

import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import { Link } from '@mui/material'

import { imageTypes } from '@constants/image-types'
import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { ImageModal } from '@components/modals/image-modal/image-modal'
import { NoDocumentIcon } from '@components/shared/svg-icons'

import { checkIsImageLink } from '@utils/checks'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { openPdfFile } from '@utils/open-pdf-file/open-pdf-file'
import { shortenDocumentString } from '@utils/text'
import { t } from '@utils/translations'

import { isString, isStringArray } from '@typings/type-guards'

import { CustomSlider } from '../custom-slider'

import { FileIcon } from './file-icon'
import { useClassNames } from './files-carousel.style'

interface File {
  name: string
}

interface Files {
  file: File
  data_url: string
}
interface FilesCarouselProps {
  files: Array<string | Files>
  withImages?: boolean
  hideNames?: boolean
}

export const FilesCarousel: FC<FilesCarouselProps> = observer(props => {
  const { classes: classNames } = useClassNames()

  const { files, hideNames, withImages } = props

  const [filesForRender, setFilesForRender] = useState(files)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)

  const notEmptyFiles = filesForRender?.length
    ? filesForRender.filter(el =>
        !isString(el) && el?.file?.name
          ? withImages || !checkIsImageLink(el?.file?.name)
          : withImages || !checkIsImageLink(el),
      )
    : []

  const imageList = isStringArray(notEmptyFiles) ? notEmptyFiles : []

  useEffect(() => {
    setFilesForRender(files)
  }, [SettingsModel.languageTag, files])

  return (
    <>
      {filesForRender?.length ? (
        <div className={classNames.imagesCarouselWrapper}>
          {notEmptyFiles?.length ? (
            <CustomSlider>
              {notEmptyFiles.map((file, index) => {
                const fileExtension = (isString(file) ? file : file.data_url).split('.').slice(-1)[0]
                const isImageType = imageTypes.includes(fileExtension)

                return !isString(file) && file?.data_url ? (
                  <div key={index} className={classNames.documentWrapper} onClick={() => openPdfFile(file.data_url)}>
                    <InsertDriveFileIcon color="primary" style={{ width: '40px', height: '40px' }} />
                    <p className={classNames.documentTitle}>{shortenDocumentString(file?.file?.name)}</p>
                    <span className={classNames.documentHover}>{file?.file?.name}</span>
                  </div>
                ) : (
                  <div key={index} className={classNames.documentWrapper}>
                    {isImageType ? (
                      <img
                        src={getAmazonImageUrl(file)}
                        alt="picture"
                        onClick={() => {
                          setCurrentImageIndex(index)
                          setIsImageModalOpen(true)
                        }}
                      />
                    ) : (
                      <Link
                        href={isString(file) ? file : undefined}
                        className={classNames.documentWrapper}
                        target="__blank"
                      >
                        <FileIcon fileExtension={fileExtension} />
                      </Link>
                    )}

                    {!hideNames && (
                      <>
                        <p className={classNames.documentTitle}>{shortenDocumentString(file)}</p>
                        <span className={classNames.documentHover}>{!isString(file) ? file?.file?.name : file}</span>
                      </>
                    )}
                  </div>
                )
              })}
            </CustomSlider>
          ) : (
            <div className={classNames.emptyProposalsIconWrapper}>
              <div className={classNames.emptyProposalsIcon}>
                <NoDocumentIcon className={classNames.noDocumentIcon} />
              </div>
              <p className={classNames.noDocumentText}>{t(TranslationKey['No files'])}</p>
            </div>
          )}
        </div>
      ) : (
        <div className={classNames.emptyIconWrapper}>
          <div className={classNames.emptyWrapper}>
            <div className={classNames.emptyIcon}>
              <NoDocumentIcon className={classNames.noDocumentIcon} />
            </div>
            <p className={classNames.noDocumentText}>{t(TranslationKey['No files'])}</p>
          </div>
        </div>
      )}

      <ImageModal
        showPreviews
        isOpenModal={isImageModalOpen}
        handleOpenModal={() => setIsImageModalOpen(!isImageModalOpen)}
        imageList={imageList}
        currentImageIndex={currentImageIndex}
        handleCurrentImageIndex={index => setCurrentImageIndex(index)}
      />
    </>
  )
})
