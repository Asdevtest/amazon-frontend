/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react'

import InboxIcon from '@mui/icons-material/Inbox'
import { Paper } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { OwnerRequestProposalsCard } from '@components/cards/owner-request-proposals-card'

import { t } from '@utils/translations'

import { useStyles } from './request-proposals-card-list.style'

interface RequestProposalsCardListProps {
  requestProposals: any
  request: any
  userInfo: any
  onClickContactWithExecutor?: any
  onClickOrderProposal?: any
  onClickRejectProposal: any
  onClickReview: any
}

export const RequestProposalsCardList: FC<RequestProposalsCardListProps> = React.memo(props => {
  const { classes: styles } = useStyles()

  const {
    requestProposals,
    request,
    userInfo,
    onClickContactWithExecutor,
    onClickOrderProposal,
    onClickRejectProposal,
    onClickReview,
  } = props

  return (
    <>
      {requestProposals?.length ? (
        <div className={styles.proposalsWrapper}>
          <p className={styles.proposalsTitle}>{t(TranslationKey['Proposals for the request'])}</p>
          {requestProposals.map((item: any) => (
            <div key={item?.proposal?._id} className={styles.proposalAndChatWrapper}>
              <Paper>
                <OwnerRequestProposalsCard
                  item={item}
                  request={request}
                  userInfo={userInfo}
                  onClickContactWithExecutor={onClickContactWithExecutor}
                  onClickOrderProposal={onClickOrderProposal}
                  onClickRejectProposal={onClickRejectProposal}
                  onClickReview={onClickReview}
                />
              </Paper>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyProposalsIconWrapper}>
          <div className={styles.emptyProposalsIcon}>
            <InboxIcon style={{ color: '#C4C4C4', fontSize: '76px' }} />
          </div>
          <p className={styles.emptyProposalsDescription}>{t(TranslationKey['No new proposals at the moment'])}</p>
        </div>
      )}
    </>
  )
})
