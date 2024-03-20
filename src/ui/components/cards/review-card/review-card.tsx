import { FC, memo } from 'react'

import Rating from '@mui/material/Rating'

import { UserRolePrettyMap } from '@constants/keys/user-roles'
import { TranslationKey } from '@constants/translations/translation-key'

import { CustomTextEditor } from '@components/shared/custom-text-editor'
import { UserLink } from '@components/user/user-link'

import { formatShortDateTime } from '@utils/date-time'
import { t } from '@utils/translations'

import { IFeedback } from '@typings/models/feedbacks/feedback'

import { useStyles } from './review-card.style'

interface ReviewCardProps {
  review: IFeedback
}

export const ReviewCard: FC<ReviewCardProps> = memo(({ review }) => {
  const { classes: styles, cx } = useStyles()

  const reviewer = review.sub ?? review.createdBy

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.userLinkContainer}>
          <UserLink
            withAvatar
            name={reviewer?.name}
            userId={reviewer?._id}
            rating={reviewer?.rating}
            customRatingClass={{ opacity: 1, fontSize: 14 }}
          />
        </div>

        <div className={styles.headerItem}>
          <p className={styles.headerItemTitle}>{`${t(TranslationKey.Role)}:`}</p>
          <p className={cx(styles.headerItemTitle, styles.headerItemTitleBold)}>{UserRolePrettyMap[review.role]}</p>
        </div>

        <div className={styles.headerItem}>
          <p className={styles.headerItemTitle}>{formatShortDateTime(review.createdAt)}</p>
          <Rating readOnly value={review.rating} size={'small'} className={styles.rating} />
        </div>
      </div>

      <CustomTextEditor readOnly value={review.comment} />
    </div>
  )
})
