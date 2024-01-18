import { observer } from 'mobx-react'

import { Typography } from '@mui/material'

import { Button } from '@components/shared/buttons/button'

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
        <Typography className={styles.text}>{formatDateTime(createdAt)}</Typography>
      </div>
      <div className={styles.infoWrapper}>
        <Typography className={styles.text}>{`User: ${createdById}`}</Typography>
      </div>
      <div className={styles.resultWrapper}>
        <Typography className={styles.text}>{result}</Typography>
      </div>
      <div className={styles.commentWrapper}>
        <Typography className={styles.text}>{comment}</Typography>
      </div>

      <Button disabled variant="contained" color="primary" className={styles.button}>
        {'Открыть'}
      </Button>
    </div>
  )
})
