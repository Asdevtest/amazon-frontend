import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomFileIcon } from '@components/shared/custom-file-icon'
import { DownloadRoundIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { isString } from '@typings/guards'
import { UploadFileType } from '@typings/shared/upload-file'

import { useStyles } from './documents-tab.style'

import { Arrows } from '../arrows'

import { useDocumentsTab } from './use-documents-tab'

interface DocumentsTabProps {
  files: UploadFileType[]
}

export const DocumentsTab: FC<DocumentsTabProps> = memo(({ files }) => {
  const { classes: styles, cx } = useStyles()
  const {
    currentPage,
    isTransitioning,
    totalSlides,
    setIsTransitioning,
    checkIsFileOnCurrentPage,
    onChangePage,
    onDownloadFile,
  } = useDocumentsTab(files)

  return (
    <>
      <div className={cx(styles.files, { [styles.slidesTransition]: isTransitioning })}>
        {files.length > 0 ? (
          files.map((file, index) => {
            const currentFile = isString(file) ? file : file?.file?.name
            const fileExtension = currentFile?.split('.')?.slice(-1)?.[0]
            const fileName = currentFile?.split('.')?.slice(-2)?.join('.')

            return (
              <div
                key={index}
                className={cx(styles.fileWrapper, { [styles.showFile]: checkIsFileOnCurrentPage(index) })}
              >
                <div className={styles.file}>
                  <CustomFileIcon fileExtension={fileExtension} />

                  <p className={styles.fileName}>{fileName}</p>
                </div>

                <div className={styles.icons}>
                  <button className={styles.buttonIcon} onClick={() => onDownloadFile(file)}>
                    <DownloadRoundIcon className={cx(styles.icon, styles.downloadIcon)} />
                  </button>
                </div>
              </div>
            )
          })
        ) : (
          <p className={styles.noDocuments}>{t(TranslationKey['No documents'])}</p>
        )}
      </div>

      <Arrows
        currentPage={currentPage}
        pageСount={totalSlides}
        isTransitioning={isTransitioning}
        setIsTransitioning={setIsTransitioning}
        onChangePage={onChangePage}
      />
    </>
  )
})
