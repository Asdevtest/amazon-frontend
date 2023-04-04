/* eslint-disable no-unused-vars */
import InboxIcon from '@mui/icons-material/Inbox'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import {Link, Typography} from '@mui/material'

import {useEffect, useState} from 'react'

import {observer} from 'mobx-react'

import {NoDocumentIcon} from '@constants/svg-icons'
import {TranslationKey} from '@constants/translations/translation-key'

import {SettingsModel} from '@models/settings-model'

import {CustomCarousel} from '@components/custom-carousel'
import {openPdfFile} from '@components/custom-carousel/custom-carousel'

import {checkIsImageLink} from '@utils/checks'
import {shortenDocumentString} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './files-carousel.style'

export const FilesCarousel = observer(({files}) => {
  const {classes: classNames} = useClassNames()

  const [filesForRender, setFilesForRender] = useState(files)

  useEffect(() => {
    setFilesForRender(files)
  }, [SettingsModel.languageTag, files])

  const notEmptyFiles = filesForRender?.length
    ? filesForRender.filter(el => (el?.file?.name ? !checkIsImageLink(el?.file?.name) : !checkIsImageLink(el)))
    : []

  return filesForRender?.length ? (
    <div className={classNames.imagesCarouselWrapper}>
      <div className={classNames.imageWrapper}>
        {notEmptyFiles?.length ? (
          <CustomCarousel>
            {notEmptyFiles.map((file, index) =>
              file?.data_url ? (
                <div
                  key={index}
                  className={classNames.documentWrapper}
                  onClick={() => file.data_url && openPdfFile(file.data_url)}
                >
                  <InsertDriveFileIcon color="primary" style={{width: '40px', height: '40px'}} />
                  <Typography className={classNames.documentTitle}>
                    {shortenDocumentString(file?.file?.name ? file?.file?.name : file)}
                  </Typography>
                  <span className={classNames.documentHover}>{file?.file?.name || file}</span>
                </div>
              ) : (
                <Link key={index} href={file} className={classNames.documentWrapper} target="__blank">
                  <InsertDriveFileIcon color="primary" style={{width: '40px', height: '40px'}} />
                  <Typography className={classNames.documentTitle}>
                    {shortenDocumentString(file?.file?.name ? file?.file?.name : file)}
                  </Typography>
                  <span className={classNames.documentHover}>{file?.file?.name || file}</span>
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
          {/* <PhotoCameraIcon style={{color: '#C4C4C4', fontSize: '30px'}} /> */}
          <NoDocumentIcon className={classNames.noDocumentIcon} />
        </div>
        <Typography className={classNames.noDocumentText}>{t(TranslationKey['No files'])}</Typography>
      </div>
    </div>
  )
})
