import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomFileIcon } from '@components/shared/custom-file-icon'
import { BasketIcon, DownloadRoundIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'
import { downloadFile, downloadFileByLink } from '@utils/upload-files'

import { isString } from '@typings/type-guards'
import { IUploadFile } from '@typings/upload-file'

import { useStyles } from './documents-tab.style'

interface DocumentsTabProps {
  files: Array<string | IUploadFile>
  isTransitioning: boolean
}

export const DocumentsTab: FC<DocumentsTabProps> = memo(({ files, isTransitioning }) => {
  const { classes: styles, cx } = useStyles()

  const onDownloadFile = (file: string | IUploadFile) =>
    isString(file) ? downloadFileByLink(file) : downloadFile(file?.file)

  return (
    <div className={cx(styles.files, { [styles.slidesTransition]: isTransitioning })}>
      {files.length > 0 ? (
        files.map((file, index) => {
          const currentFile = isString(file) ? file : file?.file?.name
          const fileExtension = currentFile?.split('.')?.slice(-1)?.[0]
          const fileName = currentFile?.split('.')?.slice(-2)?.join('.')

          return (
            <div key={index} className={styles.fileWrapper}>
              <div className={styles.file}>
                <CustomFileIcon fileExtension={fileExtension} />

                <div>
                  <p className={styles.fileName}>{fileName}</p>
                  <p></p>
                </div>
              </div>

              <div className={styles.icons}>
                <button className={styles.buttonIcon} onClick={() => onDownloadFile(file)}>
                  <DownloadRoundIcon className={cx(styles.icon, styles.downloadIcon)} />
                </button>
                <button className={styles.buttonIcon}>
                  <BasketIcon className={styles.icon} />
                </button>
              </div>
            </div>
          )
        })
      ) : (
        <p className={styles.noDocuments}>{t(TranslationKey['No documents'])}</p>
      )}
    </div>
  )
})
