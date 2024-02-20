/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo, useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { IdeaRequestCard } from '@components/cards/idea-view-and-edit-card/idea-request-card'
import { Button } from '@components/shared/buttons/button'
import { PlusIcon } from '@components/shared/svg-icons'

import { checkIsValidProposalStatusToShowResoult } from '@utils/checks'
import { t } from '@utils/translations'

import { ButtonType } from '@typings/types/button.type'

import { useStyles } from './idea-requests.style'

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
    <div className={styles.ideaRequestsWrapper}>
      {requests?.map((request: any, requestIndex: number) => {
        return (
          <IdeaRequestCard
            key={requestIndex}
            requestTitle={request.spec?.title}
            requestId={request.humanFriendlyId}
            requestStatus={request.status}
            executor={request.executor}
            proposals={request.proposals}
            disableSeeResultButton={
              !request?.proposals?.some((proposal: any) => checkIsValidProposalStatusToShowResoult(proposal.status))
            }
            onClickRequestId={() => onClickRequestId(request._id)}
            onClickResultButton={() => onClickResultButton(request)}
            onClickUnbindButton={() => onClickUnbindButton(request._id)}
          />
        )
      })}
      {!withoutControls && (
        <div className={styles.ideaRequestsControls}>
          <Button styleType={ButtonType.SUCCESS} onClick={onClickCreateRequest}>
            <PlusIcon /> {t(TranslationKey['Create a request'])}
          </Button>
          <Button onClick={onClickLinkRequest}>{t(TranslationKey['Link request'])}</Button>
        </div>
      )}
    </div>
  )
})
