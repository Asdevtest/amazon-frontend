import { cx } from '@emotion/css'
import { observer } from 'mobx-react'

import { Typography } from '@mui/material'

import { useClassNames } from './request-proposals-details-custom.style'

import { RequestProposalsDetailsCustomItem } from './request-proposals-details-custom-item'

export const RequestProposalsDetailsCustom = observer(({ requestProposals }) => {
  const { classes: classNames } = useClassNames()
  return (
    <div className={classNames.root}>
      <div className={classNames.titleWrapper}>
        <Typography variant="h5">Предложения</Typography>
      </div>
      <div className={classNames.requestProposalsWrappper}>
        {requestProposals.length ? (
          requestProposals.map((requestProposal, index) => (
            <div
              key={`requestProposal_${requestProposal._id}`}
              className={cx(classNames.requestProposalWrapper, { [classNames.requestProposalWrapperNotFirst]: index })}
            >
              <RequestProposalsDetailsCustomItem requestProposal={requestProposal} />
            </div>
          ))
        ) : (
          <Typography variant="p">Предложений пока нет</Typography>
        )}
      </div>
    </div>
  )
})
