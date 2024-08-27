import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { Field } from '@components/shared/field'
import { SlideshowGallery } from '@components/shared/slideshow-gallery'
import { UserLink } from '@components/user/user-link'

import { formatNormDateTime } from '@utils/date-time'
import { throttle } from '@utils/throttle'
import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

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
        inputComponent={<SlideshowGallery slidesToShow={2} files={feedback.media} />}
      />

      <div className={styles.buttonsWrapper}>
        <Button styleType={ButtonStyle.SUCCESS} onClick={throttle(() => onSubmit(feedback.user._id))}>
          {t(TranslationKey.Reply)}
        </Button>

        <Button styleType={ButtonStyle.CASUAL} onClick={onCloseModal}>
          {t(TranslationKey.Close)}
        </Button>
      </div>
    </div>
  )
}
