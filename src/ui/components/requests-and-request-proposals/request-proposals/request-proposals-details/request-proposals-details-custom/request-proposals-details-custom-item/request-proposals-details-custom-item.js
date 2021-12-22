import {Typography} from '@mui/material'

import {observer} from 'mobx-react'

import {formatDateTime} from '@utils/date-time'

import {useClassNames} from './request-proposals-details-custom-item.style'

export const RequestProposalsDetailsCustomItem = observer(({requestProposal}) => {
  const classNames = useClassNames()
  const {proposal, details} = requestProposal
  const {createdAt, createdById} = proposal
  const {result, comment} = details
  return (
    <div className={classNames.root}>
      <div className={classNames.infoWrapper}>
        <Typography className={classNames.text}>{formatDateTime(createdAt)}</Typography>
      </div>
      <div className={classNames.infoWrapper}>
        <Typography className={classNames.text}>{`User: ${createdById}`}</Typography>
      </div>
      <div className={classNames.resultWrapper}>
        <Typography className={classNames.text}>{result}</Typography>
      </div>
      <div className={classNames.commentWrapper}>
        <Typography className={classNames.text}>{comment}</Typography>
      </div>
    </div>
  )
})
