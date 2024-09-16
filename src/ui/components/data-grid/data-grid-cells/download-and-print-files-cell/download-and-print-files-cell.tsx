import { FC, memo } from 'react'
import { MdLocalPrintshop } from 'react-icons/md'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'

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
              <CustomButton
                type="primary"
                size="small"
                className={styles.button}
                onClick={() => handleClickOpenNewTab(file.fileUrl)}
              >
                {file.fileName}
              </CustomButton>

              <CustomButton
                ghost
                type="primary"
                size="small"
                icon={<MdLocalPrintshop />}
                onClick={() => handleClickOpenNewTab(file.fileUrl)}
              />
            </div>
          ) : (
            <p>{t(TranslationKey['Not added'])}</p>
          )}
        </div>
      ))}
    </div>
  )
})
