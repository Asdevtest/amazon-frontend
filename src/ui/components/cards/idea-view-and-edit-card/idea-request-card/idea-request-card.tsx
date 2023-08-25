import { cx } from '@emotion/css'
import { FC } from 'react'

import ClearIcon from '@mui/icons-material/Clear'

import { MyRequestStatusTranslate } from '@constants/requests/request-proposal-status'
import { RequestStatus, colorByStatus } from '@constants/requests/request-status'
import { freelanceRequestTypeByCode, freelanceRequestTypeTranslate } from '@constants/statuses/freelance-request-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { UserLink } from '@components/user/user-link'

import { t } from '@utils/translations'

import { useClassNames } from './idea-request-card.styles'

interface IdeaRequestCardProps {
  requestType: number
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
  const { classes: classNames } = useClassNames()

  const {
    proposals,
    requestType,
    requestId,
    requestStatus,
    executor,
    disableSeeResultButton,
    onClickRequestId,
    onClickResultButton,
    onClickUnbindButton,
  } = props

  return (
    <div className={classNames.root}>
      <div className={classNames.requestWrapper}>
        <div className={classNames.categoresWrapper}>
          <p className={classNames.categoryTitle}>
            {`${t(TranslationKey['Request type'])}:`}{' '}
            <span className={classNames.categoryText}>
              {freelanceRequestTypeTranslate(freelanceRequestTypeByCode[requestType])}
            </span>
          </p>
          <p className={classNames.categoryTitle}>
            {`${t(TranslationKey.ID)}:`}{' '}
            <button className={cx(classNames.categoryText, classNames.linkStyles)} onClick={onClickRequestId}>
              {requestId}
            </button>
          </p>
          <p className={classNames.categoryTitle}>
            {`${t(TranslationKey.Status)}: `}
            <span
              className={cx(classNames.categoryText, {
                [classNames.draftStatus]: requestStatus === RequestStatus.DRAFT,
              })}
              style={{ color: colorByStatus(requestStatus) }}
            >
              {MyRequestStatusTranslate(requestStatus)}
            </span>
          </p>
        </div>

        <ClearIcon className={classNames.clearIcon} onClick={onClickUnbindButton} />
      </div>

      <div className={classNames.resultWrapper}>
        {executor && (
          <UserLink
            blackText
            withAvatar
            name={executor?.name}
            userId={executor?._id}
            rating={executor?.rating}
            ratingSize={'small'}
          />
        )}

        <Button
          disabled={disableSeeResultButton /* || !proposals?.length */}
          className={classNames.resultButton}
          onClick={onClickResultButton}
        >
          {t(TranslationKey['See result'])}
        </Button>
      </div>
    </div>
  )
}
