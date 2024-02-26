import { FC } from 'react'

import ClearIcon from '@mui/icons-material/Clear'

import { MyRequestStatusTranslate } from '@constants/requests/request-proposal-status'
import { RequestStatus, colorByStatus } from '@constants/requests/request-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { UserLink } from '@components/user/user-link'

import { t } from '@utils/translations'

import { useStyles } from './idea-request-card.style'

interface IdeaRequestCardProps {
  requestTitle: string
  requestId: string
  requestStatus: string
  proposals: Array<{ _id: string }>
  executor: {
    _id: string
    name: string
    rating: number
  }
  disableSeeResultButton?: boolean
  onClickRequestId: () => void
  onClickResultButton: () => void
  onClickUnbindButton: () => void
}

export const IdeaRequestCard: FC<IdeaRequestCardProps> = props => {
  const { classes: styles, cx } = useStyles()

  const {
    // proposals,
    requestTitle,
    requestId,
    requestStatus,
    executor,
    disableSeeResultButton,
    onClickRequestId,
    onClickResultButton,
    onClickUnbindButton,
  } = props

  return (
    <div className={styles.root}>
      <div className={styles.requestWrapper}>
        <div className={styles.categoresWrapper}>
          <div className={styles.categoryContainer}>
            <p className={styles.categoryText}>{`${t(TranslationKey['Request type'])}:`}</p>
            <p className={styles.categoryTitle}>{requestTitle}</p>
          </div>
          <div className={styles.categoryContainer}>
            <p className={styles.categoryText}>{`${t(TranslationKey.ID)}:`}</p>
            <button className={cx(styles.categoryTitle, styles.linkStyles)} onClick={onClickRequestId}>
              {requestId}
            </button>
          </div>
          <div className={styles.categoryContainer}>
            <p className={styles.categoryText}>{`${t(TranslationKey.Status)}:`}</p>
            <p
              className={cx(styles.categoryTitle, {
                [styles.draftStatus]: requestStatus === RequestStatus.DRAFT,
              })}
              style={{ color: colorByStatus(requestStatus) }}
            >
              {MyRequestStatusTranslate(requestStatus)}
            </p>
          </div>
        </div>

        <ClearIcon className={styles.clearIcon} onClick={onClickUnbindButton} />
      </div>

      <div className={styles.resultWrapper}>
        {executor && (
          <UserLink
            blackText
            withAvatar
            name={executor?.name}
            userId={executor?._id}
            rating={executor?.rating}
            ratingSize={'small'}
            customRatingClass={{ opacity: 1 }}
          />
        )}

        <Button
          disabled={disableSeeResultButton /* || !proposals?.length */}
          className={styles.resultButton}
          onClick={onClickResultButton}
        >
          {t(TranslationKey['See result'])}
        </Button>
      </div>
    </div>
  )
}
