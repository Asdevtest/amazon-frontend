import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field'
import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'
import { UserLink } from '@components/user/user-link'

import { formatNormDateTime } from '@utils/date-time'
import { t } from '@utils/translations'

import { useClassNames } from './reply-feedback-form.style'

export const ReplyFeedbackForm = ({ feedback, onCloseModal, onSubmit }) => {
  const { classes: classNames } = useClassNames()

  return (
    <div className={classNames.root}>
      <p className={classNames.modalText}>{t(TranslationKey['Reply to a User Feedback'])}</p>

      <div className={classNames.userWrapper}>
        <UserLink withAvatar name={feedback.user?.name} userId={feedback.user?._id} />

        <p className={classNames.date}>{formatNormDateTime(feedback.updatedAt)}</p>
      </div>

      <p className={classNames.feedbackText}>{feedback.text}</p>

      <Field
        containerClasses={classNames.filesWrapper}
        labelClasses={classNames.label}
        label={t(TranslationKey.Files)}
        inputComponent={<PhotoAndFilesSlider alignLeft smallSlider showPreviews files={feedback.media} />}
      />

      <div className={classNames.buttonsWrapper}>
        <Button success onClick={() => onSubmit(feedback.user._id)}>
          {t(TranslationKey.Reply)}
        </Button>

        <Button variant="text" className={classNames.closeBtn} onClick={onCloseModal}>
          {t(TranslationKey.Close)}
        </Button>
      </div>
    </div>
  )
}
