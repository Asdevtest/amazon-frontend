import { observer } from 'mobx-react'

import { CustomButton } from '@components/shared/custom-button'

import { formatDateTime } from '@utils/date-time'

import { useStyles } from './request-proposals-details-custom-item.style'

export const RequestProposalsDetailsCustomItem = observer(({ requestProposal }) => {
  const { classes: styles } = useStyles()
  const { proposal, details } = requestProposal
  const { createdAt, createdById } = proposal
  const { result, comment } = details
  return (
    <div className={styles.root}>
      <div className={styles.infoWrapper}>
        <p className={styles.text}>{formatDateTime(createdAt)}</p>
      </div>
      <div className={styles.infoWrapper}>
        <p className={styles.text}>{`User: ${createdById}`}</p>
      </div>
      <div className={styles.resultWrapper}>
        <p className={styles.text}>{result}</p>
      </div>
      <div className={styles.commentWrapper}>
        <p className={styles.text}>{comment}</p>
      </div>

      <CustomButton disabled>{'Открыть'}</CustomButton>
    </div>
  )
})
