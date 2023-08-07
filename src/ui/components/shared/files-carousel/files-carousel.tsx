/* eslint-disable @typescript-eslint/ban-ts-comment */

/* eslint-disable no-unused-vars */
import { observer } from 'mobx-react'
import React, { FC, useEffect, useState } from 'react'

import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import { Link, Typography } from '@mui/material'

import { imageTypes } from '@constants/image-types'
import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { NoDocumentIcon } from '@components/shared/svg-icons'

import { checkIsImageLink } from '@utils/checks'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { openPdfFile } from '@utils/open-pdf-file/open-pdf-file'
import { shortenDocumentString } from '@utils/text'
import { t } from '@utils/translations'

import { CustomSlider } from '../custom-slider'

import { useClassNames } from './files-carousel.style'

interface FilesCarouselProps {
  files: Array<string | files>
  withImages?: boolean
  hideNames?: boolean
}

interface files {
  file: {
    name: string
  }
  data_url: string
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
        return 'doc.svg'
      case 'pdf':
        return 'pdf.svg'
      case 'xlsx':
      case 'xls':
        return 'xlsx.svg'
      default:
        return 'default.svg'
    }
  }

  return filesForRender?.length ? (
    <div className={classNames.imagesCarouselWrapper}>
      <div className={classNames.imageWrapper}>
        {notEmptyFiles?.length ? (
          // @ts-ignore
          <CustomSlider>
            {notEmptyFiles.map((file, index) =>
              !isString(file) && file?.data_url ? (
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
                  <img
                    src={
                      imageTypes.includes((isString(file) ? file : file.data_url).split('.').at(-1)!)
                        ? getAmazonImageUrl(file)
                        : `/assets/icons/fileTypes/${getFileTypeIcon(
                            (isString(file) ? file : file.data_url).split('.').at(-1)!,
                          )}`
                    }
                    alt="Img"
                  />
                  {!hideNames && (
                    <>
                      <Typography className={classNames.documentTitle}>{shortenDocumentString(file)}</Typography>
                      <span className={classNames.documentHover}>{!isString(file) ? file?.file?.name : file}</span>
                    </>
                  )}
                </Link>
              ),
            )}
          </CustomSlider>
        ) : (
          <div className={classNames.emptyProposalsIconWrapper}>
            <div className={classNames.emptyProposalsIcon}>
              <NoDocumentIcon className={classNames.noDocumentIcon} />
            </div>
            <div>
              <Typography className={classNames.noDocumentText}>{t(TranslationKey['No files'])}</Typography>
            </div>
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
