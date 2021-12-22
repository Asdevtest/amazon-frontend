import React from 'react'

import {Typography, Paper} from '@material-ui/core'

import {texts} from '@constants/texts'

import {formatNormDateTime} from '@utils/date-time'
import {getLocalizedTexts} from '@utils/get-localized-texts'
import {toFixedWithDollarSign} from '@utils/text'

import {useClassNames} from './general-request-info.style'

const textConsts = getLocalizedTexts(texts, 'en').productSearchRequestContent

export const GeneralRequestInfo = ({request}) => {
  const classNames = useClassNames()

  return (
    <Paper>
      <div className={classNames.root}>
        <div className={classNames.requestDataWrapper}>
          <div className={classNames.row}>
            <div className={classNames.leftColumn}>
              <Typography className={classNames.columnHead}>{textConsts.parameterFieldTypo}</Typography>
            </div>
            <div className={classNames.rightHeadColumn}>
              <Typography className={classNames.columnHead}>{textConsts.valueFieldTypo}</Typography>
            </div>
          </div>

          <div className={classNames.defaultBlock}>
            <div className={classNames.row}>
              <div className={classNames.leftColumn}>
                <Typography>{textConsts.deadline}</Typography>
              </div>
              <div className={classNames.rightColumn}>
                <Typography>{formatNormDateTime(request.timeoutAt)}</Typography>
              </div>
            </div>

            <div className={classNames.row}>
              <div className={classNames.leftColumn}>
                <Typography>{textConsts.requestType}</Typography>
              </div>
              <div className={classNames.rightColumn}>
                <Typography>{request.type}</Typography>
              </div>
            </div>

            <div className={classNames.row}>
              <div className={classNames.leftColumn}>
                <Typography>{textConsts.proposalPrice}</Typography>
              </div>
              <div className={classNames.rightColumn}>
                <Typography>{toFixedWithDollarSign(request.price, 2)}</Typography>
              </div>
            </div>

            <div className={classNames.row}>
              <div className={classNames.leftColumn}>
                <Typography>{textConsts.maxProposalCount}</Typography>
              </div>
              <div className={classNames.rightColumn}>
                <Typography>{request.maxAmountOfProposals || 0}</Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Paper>
  )
}
