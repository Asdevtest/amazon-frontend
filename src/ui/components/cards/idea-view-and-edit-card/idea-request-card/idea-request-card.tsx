import { TranslationKey } from '@constants/translations/translation-key'
import { useClassNames } from './idea-request-card.styles'
import { t } from '@utils/translations'
import { UserLink } from '@components/user/user-link'
import { MyRequestStatusTranslate } from '@constants/requests/request-proposal-status'
import { colorByStatus, showResultStatuses } from '@constants/requests/request-status'
import { FC } from 'react'
import { freelanceRequestTypeByCode, freelanceRequestTypeTranslate } from '@constants/statuses/freelance-request-type'

interface IdeaRequestCardProps {
  requestType: number
  requestId: string
  requestStatus: string
  executor: {
    _id: string
    name: string
    rating: number
  }
}

export const IdeaRequestCard: FC<IdeaRequestCardProps> = props => {
  const { classes: classNames } = useClassNames()

  const { requestType, requestId, requestStatus, executor } = props

  console.log('requestStatus', requestStatus)

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

      {executor && (
        <UserLink blackText withAvatar name={'executor.name'} userId={'executor._id'} rating={5} ratingSize={'small'} />
      )}
    </div>
  )
}
