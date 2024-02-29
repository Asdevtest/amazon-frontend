import { ChangeEvent, FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { IMediaRework } from '@components/modals/main-request-result-modal/main-request-result-modal.type'
import { Input } from '@components/shared/input'
import { CustomPlusIcon, EyeIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { useStyles } from './client-comment-section.style'

interface ClientCommentSectionProps {
  isClient: boolean
  file: IMediaRework
  fileIndex: number
  onToggleCommentModal: (file: IMediaRework) => void
  onChangeFileName: (fileIndex: number, fileName: string) => void
  readOnly?: boolean
}

export const ClientCommentSection: FC<ClientCommentSectionProps> = memo(props => {
  const { isClient, file, fileIndex, onToggleCommentModal, onChangeFileName, readOnly } = props

  const { classes: styles, cx } = useStyles()

  return isClient ? (
    <button className={styles.commenButton} onClick={() => onToggleCommentModal(file)}>
      {file.commentByClient ? (
        <EyeIcon className={styles.icon} />
      ) : (
        <CustomPlusIcon className={cx(styles.icon, styles.plusIcon)} />
      )}

      <span className={styles.commentText}>{t(TranslationKey.Comment)}</span>
    </button>
  ) : (
    <Input
      readOnly={readOnly}
      value={file.commentByPerformer}
      placeholder={`${t(TranslationKey['File name'])}...`}
      classes={{ root: cx(styles.inputRoot, { [styles.notFocuced]: readOnly }), input: styles.input }}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeFileName(fileIndex, e.target.value)}
    />
  )
})
