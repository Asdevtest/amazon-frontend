import { ChangeEvent, FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { IMediaRework } from '@components/modals/main-request-result-modal/main-request-result-modal.type'
import { Checkbox } from '@components/shared/checkbox'
import { CustomPlusIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { useStyles } from './file.style'

import { ClientCommentSection, FreelancerCommentSection } from './components'
import { CommonContent } from './components/common-content'

interface FileProps {
  isClient: boolean
  file: IMediaRework
  fileIndex: number
  checked: boolean
  onCheckFile: (file: IMediaRework) => void
  onToggleImageModal: (fileIndex: number) => void
  onToggleCommentModal: (file: IMediaRework) => void
  onDeleteFile: (fileIndex: number) => void
  onChangeFileName: (fileIndex: number, fileName: string) => void
  onUploadFile: (fileIndex: number, file: ChangeEvent<HTMLInputElement>) => void
  readOnly?: boolean
}

export const File: FC<FileProps> = memo(props => {
  const {
    isClient,
    file,
    fileIndex,
    checked,
    onCheckFile,
    onToggleImageModal,
    onToggleCommentModal,
    onDeleteFile,
    onChangeFileName,
    onUploadFile,
    readOnly,
  } = props

  const { classes: styles, cx } = useStyles()

  const commonContent = <CommonContent file={file} fileIndex={fileIndex} onToggleImageModal={onToggleImageModal} />

  return (
    <div className={styles.fileContainer}>
      {isClient || readOnly ? (
        <Checkbox
          checked={checked}
          className={styles.checkbox}
          wrapperClassName={styles.checkboxWrapper}
          onChange={() => onCheckFile(file)}
        />
      ) : (
        <button
          className={cx(styles.checkboxWrapper, styles.checkbox, styles.button)}
          onClick={() => onDeleteFile(fileIndex)}
        >
          ✕
        </button>
      )}

      {isClient || readOnly ? (
        commonContent
      ) : file.fileLink ? (
        commonContent
      ) : (
        <button className={styles.file}>
          <CustomPlusIcon className={cx(styles.icon, styles.plusIcon)} />
          <span className={styles.commentText}>{t(TranslationKey.Upload)}</span>
          <input
            multiple
            type="file"
            className={styles.pasteInput}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onUploadFile(fileIndex, e)}
          />
        </button>
      )}

      <FreelancerCommentSection isClient={isClient} file={file} onToggleCommentModal={onToggleCommentModal} />

      <ClientCommentSection
        readOnly={readOnly}
        isClient={isClient}
        file={file}
        fileIndex={fileIndex}
        onToggleCommentModal={onToggleCommentModal}
        onChangeFileName={onChangeFileName}
      />
    </div>
  )
})
