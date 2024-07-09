import { FC, memo } from 'react'

import { Tooltip } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { PrintIcon } from '@components/shared/svg-icons'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'

import { UploadFileType } from '@typings/shared/upload-file'

import { useStyles } from './download-and-print-files-cell.style'

interface IFile {
  fileName: string
  fileType: string
  fileUrl: UploadFileType
  title: string
}

interface DownloadAndPrintFilesCellProps {
  files: IFile[]
}

export const DownloadAndPrintFilesCell: FC<DownloadAndPrintFilesCellProps> = memo(({ files }) => {
  const { classes: styles } = useStyles()

  const handleClickOpenNewTab = (file: UploadFileType) => {
    const newTab = window.open(getAmazonImageUrl(file, true), '_blank')

    if (newTab) {
      newTab.focus()
    }
  }

  return (
    <div className={styles.wrapper}>
      {files.map((file, index) => (
        <div key={index} className={styles.file}>
          <p className={styles.title}>{file.title}</p>

          {file.fileUrl ? (
            <div className={styles.buttons}>
              <Tooltip title={file.fileName}>
                <Button isSmallButton fullWidth isTableButton onClick={() => handleClickOpenNewTab(file.fileUrl)}>
                  <p className={styles.text}>{file.fileName}</p>
                </Button>
              </Tooltip>

              <div>
                <Button iconButton onClick={() => handleClickOpenNewTab(file.fileUrl)}>
                  <PrintIcon />
                </Button>
              </div>
            </div>
          ) : (
            <p>{t(TranslationKey['Not added'])}</p>
          )}
        </div>
      ))}
    </div>
  )
})
