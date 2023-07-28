import { TranslationKey } from '@constants/translations/translation-key'
import { useClassNames } from './idea-request-card.styles'
import { t } from '@utils/translations'
import { UserLink } from '@components/user/user-link'
import { MyRequestStatusTranslate } from '@constants/requests/request-proposal-status'
import { colorByStatus } from '@constants/requests/request-status'
import { FC } from 'react'
import { freelanceRequestTypeByCode, freelanceRequestTypeTranslate } from '@constants/statuses/freelance-request-type'
import { Button } from '@components/shared/buttons/button'

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
  onClickResultButton: (requestType: number, proposalId: string) => void
}

export const IdeaRequestCard: FC<IdeaRequestCardProps> = props => {
  const { classes: classNames } = useClassNames()

  const { requestType, requestId, requestStatus, executor, proposals, onClickResultButton } = props

  return (
    <div className={classNames.root}>
      <div className={classNames.categoresWrapper}>
        <p className={classNames.categoryTitle}>
          {`${t(TranslationKey['Request type'])}:`}{' '}
          <span className={classNames.categoryText}>
            {freelanceRequestTypeTranslate(freelanceRequestTypeByCode[requestType])}
          </span>
        </p>

        <p className={classNames.categoryTitle}>
          {`${t(TranslationKey.ID)}:`} <span className={classNames.categoryText}>{requestId}</span>
        </p>

        <p className={classNames.categoryTitle}>
          {`${t(TranslationKey.Status)}: `}
          <span className={classNames.categoryText} style={{ color: colorByStatus(requestStatus) }}>
            {MyRequestStatusTranslate(requestStatus)}
          </span>
        </p>
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
          disabled={!proposals?.length}
          className={classNames.resultButton}
          onClick={() => onClickResultButton(requestType, proposals[0]?._id)}
        >
          {t(TranslationKey['See result'])}
        </Button>
      </div>
    </div>
  )
}
