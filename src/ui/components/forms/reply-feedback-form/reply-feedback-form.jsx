import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field'
import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'
import { UserLink } from '@components/user/user-link'

import { formatNormDateTime } from '@utils/date-time'
import { t } from '@utils/translations'

import { useStyles } from './reply-feedback-form.style'

export const ReplyFeedbackForm = ({ feedback, onCloseModal, onSubmit }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.root}>
      <p className={styles.modalText}>{t(TranslationKey['Reply to a User Feedback'])}</p>

      <div className={styles.userWrapper}>
        <UserLink withAvatar name={feedback.user?.name} userId={feedback.user?._id} />

        <p className={styles.date}>{formatNormDateTime(feedback.updatedAt)}</p>
      </div>

      <p className={styles.feedbackText}>{feedback.text}</p>

      <Field
        containerClasses={styles.filesWrapper}
        labelClasses={styles.label}
        label={t(TranslationKey.Files)}
        inputComponent={<PhotoAndFilesSlider alignLeft smallSlider showPreviews files={feedback.media} />}
      />

      <div className={styles.buttonsWrapper}>
        <Button success onClick={() => onSubmit(feedback.user._id)}>
          {t(TranslationKey.Reply)}
        </Button>

        <Button variant="text" className={styles.closeBtn} onClick={onCloseModal}>
          {t(TranslationKey.Close)}
        </Button>
      </div>
    </div>
  )
}
