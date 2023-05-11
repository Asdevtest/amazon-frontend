/* eslint-disable @typescript-eslint/ban-ts-comment */

/* eslint-disable no-unused-vars */
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import {Link, Typography} from '@mui/material'

import {FC, useEffect, useState} from 'react'

import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'

import {SettingsModel} from '@models/settings-model'

import {CustomCarousel, openPdfFile} from '@components/shared/custom-carousel/custom-carousel'
import {NoDocumentIcon} from '@components/shared/svg-icons'

import {checkIsImageLink} from '@utils/checks'
import {shortenDocumentString} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './files-carousel.style'

interface FilesCarouselProps {
  files: Array<string | files>
}

interface files {
  file: {
    name: string
  }
  data_url: string
}

export const FilesCarousel: FC<FilesCarouselProps> = observer(props => {
  const {classes: classNames} = useClassNames()

  const {files} = props

  const [filesForRender, setFilesForRender] = useState(files)

  const isString = (value: unknown): value is string => typeof value === 'string'

  const notEmptyFiles = filesForRender?.length
    ? filesForRender.filter(el =>
        !isString(el) && el?.file?.name ? !checkIsImageLink(el?.file?.name) : !checkIsImageLink(el),
      )
    : []

  useEffect(() => {
    setFilesForRender(files)
  }, [SettingsModel.languageTag, files])

  return filesForRender?.length ? (
    <div className={classNames.imagesCarouselWrapper}>
      <div className={classNames.imageWrapper}>
        {notEmptyFiles?.length ? (
          // @ts-ignore
          <CustomCarousel>
            {notEmptyFiles.map((file, index) =>
              !isString(file) && file?.data_url ? (
                <div key={index} className={classNames.documentWrapper} onClick={() => openPdfFile(file.data_url)}>
                  <InsertDriveFileIcon color="primary" style={{width: '40px', height: '40px'}} />
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
                  <InsertDriveFileIcon color="primary" style={{width: '40px', height: '40px'}} />
                  <Typography className={classNames.documentTitle}>{shortenDocumentString(file)}</Typography>
                  <span className={classNames.documentHover}>{!isString(file) ? file?.file?.name : file}</span>
                </Link>
              ),
            )}
          </CustomCarousel>
        ) : (
          <div className={classNames.emptyProposalsIconWrapper}>
            <div className={classNames.emptyProposalsIcon}>
              <NoDocumentIcon className={classNames.noDocumentIcon} />
            </div>
            <div className={classNames.emptyProposalsDescriptionWrapper}>
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
