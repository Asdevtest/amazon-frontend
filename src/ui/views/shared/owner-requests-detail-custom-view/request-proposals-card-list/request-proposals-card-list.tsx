import { FC, memo } from 'react'
import { MdInbox } from 'react-icons/md'

import { TranslationKey } from '@constants/translations/translation-key'

import { OwnerRequestProposalsCard } from '@components/cards/owner-request-proposals-card'

import { t } from '@utils/translations'

import { ICustomProposal } from '@typings/models/proposals/custom-proposal'
import { IRequest } from '@typings/models/requests/request'
import { IFullUser } from '@typings/shared/full-user'

import { useStyles } from './request-proposals-card-list.style'

interface RequestProposalsCardListProps {
  requestProposals: ICustomProposal[]
  request: IRequest
  userInfo: IFullUser
  onJoinChat: () => void
  onClickRejectProposal: () => void
  onClickReview: () => void
  onSendInForRework: () => void
  onClickContactWithExecutor?: () => void
  onClickOrderProposal?: () => void
  onReceiveCustomProposal?: () => void
}

export const RequestProposalsCardList: FC<RequestProposalsCardListProps> = memo(props => {
  const { classes: styles } = useStyles()

  const {
    requestProposals,
    request,
    userInfo,
    onJoinChat,
    onClickContactWithExecutor,
    onClickOrderProposal,
    onClickRejectProposal,
    onClickReview,
    onSendInForRework,
    onReceiveCustomProposal,
  } = props

  return (
    <>
      {requestProposals?.length ? (
        <div className={styles.proposalsWrapper}>
          <p className={styles.proposalsTitle}>{t(TranslationKey['Proposals for the request'])}</p>
          {requestProposals.map((item: ICustomProposal) => (
            <div key={item?.proposal?._id} className={styles.proposalAndChatWrapper}>
              <OwnerRequestProposalsCard
                item={item}
                request={request}
                userInfo={userInfo}
                onJoinChat={onJoinChat}
                onClickContactWithExecutor={onClickContactWithExecutor}
                onClickOrderProposal={onClickOrderProposal}
                onClickRejectProposal={onClickRejectProposal}
                onClickReview={onClickReview}
                onSendInForRework={onSendInForRework}
                onReceiveCustomProposal={onReceiveCustomProposal}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyProposalsIconWrapper}>
          <div className={styles.emptyProposalsIcon}>
            <MdInbox style={{ color: '#C4C4C4', fontSize: '76px' }} />
          </div>
          <p className={styles.emptyProposalsDescription}>{t(TranslationKey['No new proposals at the moment'])}</p>
        </div>
      )}
    </>
  )
})
