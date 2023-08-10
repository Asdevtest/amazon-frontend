import { observer } from 'mobx-react'
import { FC, useEffect, useState } from 'react'

import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import { Link, Typography } from '@mui/material'

import { imageTypes } from '@constants/image-types'
import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import {
  DefaultFileTypeIcon,
  DocFileTypeIcon,
  NoDocumentIcon,
  PdfFileTypeIcon,
  XlsxFileTypeIcon,
} from '@components/shared/svg-icons'

import { checkIsImageLink } from '@utils/checks'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { openPdfFile } from '@utils/open-pdf-file/open-pdf-file'
import { shortenDocumentString } from '@utils/text'
import { t } from '@utils/translations'

import { CustomSlider } from '../custom-slider'

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

  const isString = (value: unknown): value is string => typeof value === 'string'

  const notEmptyFiles = filesForRender?.length
    ? filesForRender.filter(el =>
        !isString(el) && el?.file?.name
          ? withImages || !checkIsImageLink(el?.file?.name)
          : withImages || !checkIsImageLink(el),
      )
    : []

  useEffect(() => {
    setFilesForRender(files)
  }, [SettingsModel.languageTag, files])

  const getFileTypeIcon = (type: string) => {
    switch (type) {
      case 'doc':
      case 'docx':
        return <DocFileTypeIcon className={classNames.fileTypeIcon} />
      case 'pdf':
        return <PdfFileTypeIcon className={classNames.fileTypeIcon} />
      case 'xlsx':
      case 'xls':
        return <XlsxFileTypeIcon className={classNames.fileTypeIcon} />
      default:
        return <DefaultFileTypeIcon className={classNames.fileTypeIcon} />
    }
  }

  return filesForRender?.length ? (
    <div className={classNames.imagesCarouselWrapper}>
      <div className={classNames.imageWrapper}>
        {notEmptyFiles?.length ? (
          <CustomSlider>
            {notEmptyFiles.map((file, index) => {
              const fileExtension = (isString(file) ? file : file.data_url).split('.').slice(-1)[0]
              const isImageType = imageTypes.includes(fileExtension)

              return !isString(file) && file?.data_url ? (
                <div key={index} className={classNames.documentWrapper} onClick={() => openPdfFile(file.data_url)}>
                  <InsertDriveFileIcon color="primary" style={{ width: '40px', height: '40px' }} />
                  <Typography className={classNames.documentTitle}>
                    {shortenDocumentString(file?.file?.name)}
                  </Typography>
                  <span className={classNames.documentHover}>{file?.file?.name}</span>
                </div>
              ) : (
                <Link
                  key={index}
                  href={isString(file) ? file : undefined}
                  className={classNames.documentWrapper}
                  target="__blank"
                >
                  {/* <InsertDriveFileIcon color="primary" style={{ width: '40px', height: '40px' }} />*/}

                  {isImageType ? <img src={getAmazonImageUrl(file)} alt="picture" /> : getFileTypeIcon(fileExtension)}

                  {!hideNames && (
                    <>
                      <Typography className={classNames.documentTitle}>{shortenDocumentString(file)}</Typography>
                      <span className={classNames.documentHover}>{!isString(file) ? file?.file?.name : file}</span>
                    </>
                  )}
                </Link>
              )
            })}
          </CustomSlider>
        ) : (
          <div className={classNames.emptyProposalsIconWrapper}>
            <div className={classNames.emptyProposalsIcon}>
              <NoDocumentIcon className={classNames.noDocumentIcon} />
            </div>
            <Typography className={classNames.noDocumentText}>{t(TranslationKey['No files'])}</Typography>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className={classNames.emptyIconWrapper}>
      <div className={classNames.emptyWrapper}>
        <div className={classNames.emptyIcon}>
          <NoDocumentIcon className={classNames.noDocumentIcon} />
        </div>
        <Typography className={classNames.noDocumentText}>{t(TranslationKey['No files'])}</Typography>
      </div>
    </div>
  )
})
