import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { IMediaRework } from '@components/modals/main-request-result-modal/main-request-result-modal.type'
import { EyeIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { useStyles } from './freelancer-comment-section.style'

interface FreelancerCommentSectionProps {
  isClient: boolean
  file: IMediaRework
  onToggleCommentModal: (file: IMediaRework) => void
}

export const FreelancerCommentSection: FC<FreelancerCommentSectionProps> = memo(props => {
  const { isClient, file, onToggleCommentModal } = props

  const { classes: styles, cx } = useStyles()

  if (isClient) {
    return (
      <p title={file.commentByPerformer} className={styles.fileName}>
        {file.commentByPerformer}
      </p>
    )
  } else {
    return file.commentByClient ? (
      <button className={styles.commenButton} onClick={() => onToggleCommentModal(file)}>
        <EyeIcon className={styles.icon} />

        <span className={styles.commentText}>{t(TranslationKey.Comment)}</span>
      </button>
    ) : (
      <p className={cx(styles.fileName, styles.notCommentText)}>{t(TranslationKey['No comment'])}</p>
    )
  }
})
