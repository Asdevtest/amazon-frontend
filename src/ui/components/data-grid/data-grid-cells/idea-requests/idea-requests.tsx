/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo, useEffect, useState } from 'react'
import { FiPlus } from 'react-icons/fi'

import { TranslationKey } from '@constants/translations/translation-key'

import { IdeaRequestCard } from '@components/cards/idea-view-and-edit-card/idea-request-card'

import { checkIsValidProposalStatusToShowResoult } from '@utils/checks'
import { t } from '@utils/translations'

import { useStyles } from './idea-requests.style'

import { ActionButtonsCell } from '../action-buttons-cell/action-buttons-cell'

interface IdeaRequestsProps {
  row: any
  onFinishedOnly: boolean
  withoutControls: boolean
  onClickLinkRequest: () => void
  onClickCreateRequest: () => void
  onClickResultButton: (request: any) => void
  onClickRequestId: (requestId: string) => void
  onClickUnbindButton: (requestId: string) => void
}

export const IdeaRequestsCell: FC<IdeaRequestsProps> = memo(props => {
  const {
    onFinishedOnly,
    onClickCreateRequest,
    onClickLinkRequest,
    onClickResultButton,
    onClickRequestId,
    onClickUnbindButton,
    withoutControls,
    row,
  } = props
  const { classes: styles } = useStyles()

  const [requests, setRequests] = useState<any>([])

  useEffect(() => {
    if (onFinishedOnly) {
      setRequests([...(row?.requestsOnFinished || [])])
    } else {
      setRequests([...(row?.requestsOnCheck || []), ...(row?.requestsOnFinished || [])])
    }
  }, [row?.requestsOnCheck, row?.requestsOnFinished])

  return (
    <div className={styles.root}>
      {requests?.map((request: any, requestIndex: number) => (
        <IdeaRequestCard
          key={requestIndex}
          requestTitle={request.spec?.title}
          requestId={request.xid}
          requestStatus={request.status}
          executor={request.executor}
          disableSeeResultButton={
            !request?.proposals?.some((proposal: any) => checkIsValidProposalStatusToShowResoult(proposal.status))
          }
          onClickRequestId={() => onClickRequestId(request._id)}
          onClickResultButton={() => onClickResultButton(request)}
          onClickUnbindButton={() => onClickUnbindButton(request._id)}
        />
      ))}

      {!withoutControls && (
        <ActionButtonsCell
          showFirst
          showSecond
          block={false}
          firstContent={t(TranslationKey['Create request'])}
          firstIcon={<FiPlus size={16} />}
          secondContent={t(TranslationKey['Link request'])}
          onClickFirst={onClickCreateRequest}
          onClickSecond={onClickLinkRequest}
        />
      )}
    </div>
  )
})
