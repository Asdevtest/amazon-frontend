import { Rate } from 'antd'
import { FC, memo } from 'react'

import { UserRolePrettyMap } from '@constants/keys/user-roles'
import { TranslationKey } from '@constants/translations/translation-key'

import { CustomTextEditor } from '@components/shared/custom-text-editor'
import { UserLink } from '@components/user/user-link'

import { formatShortDateTime } from '@utils/date-time'
import { t } from '@utils/translations'

import { IFeedback } from '@typings/models/administrators/feedback'
import { ISupplierFeedback } from '@typings/models/suppliers/supplier-feedback'

import { useStyles } from './reviews-form.style'

interface ReviewCardProps {
  review: IFeedback | ISupplierFeedback
}

export const ReviewCard: FC<ReviewCardProps> = memo(({ review }) => {
  const { classes: styles } = useStyles()

  const reviewer = review.sub ?? review.createdBy

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <UserLink
          withAvatar
          readOnlyRating
          name={reviewer?.name}
          userId={reviewer?._id}
          rating={reviewer?.rating}
          customRatingClass={{ opacity: 1, fontSize: 14 }}
        />

        {'role' in review ? (
          <div className={styles.flexRow}>
            <p>{`${t(TranslationKey.Role)}:`}</p>
            <p className={styles.textBold}>{UserRolePrettyMap[review.role]}</p>
          </div>
        ) : null}

        <Rate disabled value={review.rating} />

        <p>{formatShortDateTime(review.createdAt)}</p>
      </div>

      <CustomTextEditor readOnly value={review.comment || ''} editorClassName={styles.editor} />
    </div>
  )
})
