import { observer } from 'mobx-react'

import { useStyles } from './request-proposals-details-custom.style'

import { RequestProposalsDetailsCustomItem } from './request-proposals-details-custom-item'

export const RequestProposalsDetailsCustom = observer(({ requestProposals }) => {
  const { classes: styles, cx } = useStyles()
  return (
    <div className={styles.root}>
      <div className={styles.titleWrapper}>
        <h5>Предложения</h5>
      </div>
      <div className={styles.requestProposalsWrappper}>
        {requestProposals.length ? (
          requestProposals.map((requestProposal, index) => (
            <div
              key={`requestProposal_${requestProposal._id}`}
              className={cx(styles.requestProposalWrapper, { [styles.requestProposalWrapperNotFirst]: index })}
            >
              <RequestProposalsDetailsCustomItem requestProposal={requestProposal} />
            </div>
          ))
        ) : (
          <p>Предложений пока нет</p>
        )}
      </div>
    </div>
  )
})
