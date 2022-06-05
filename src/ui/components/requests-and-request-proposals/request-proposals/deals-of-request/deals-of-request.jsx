import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {Rating} from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'

import React, {useState} from 'react'

import {Avatar, Typography} from '@material-ui/core'

import {RequestProposalStatusColor, RequestProposalStatusTranslate} from '@constants/request-proposal-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {UserLinkCell} from '@components/data-grid-cells/data-grid-cells'

import {formatDateDistanceFromNowStrict, formatNormDateTime} from '@utils/date-time'
import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './deals-of-request.style'

export const DealsOfRequest = ({requestProposals}) => {
  const classNames = useClassNames()

  const [showDetails, setShowDetails] = useState(false)

  const now = new Date()

  return (
    <div className={classNames.root}>
      <Accordion
        classes={{root: classNames.accordion}}
        expanded={showDetails}
        disabled={!requestProposals.length}
        onChange={() => setShowDetails(!showDetails)}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classNames.title}>{`${t(TranslationKey['Transactions on the request'])} (${
            requestProposals.length
          })`}</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <div className={classNames.mainWrapper}>
            {requestProposals.map(deal => (
              <div key={deal.proposal._id} className={classNames.dealWrapper}>
                <div className={classNames.userInfoWrapper}>
                  <Avatar src={getUserAvatarSrc(deal.proposal.createdBy._id)} className={classNames.cardImg} />
                  <div className={classNames.userNameWrapper}>
                    <UserLinkCell name={deal.proposal.createdBy.name} userId={deal.proposal.createdBy._id} />

                    <Typography>{t(TranslationKey.Reviews)}</Typography>
                  </div>

                  <div className={classNames.userRatingWrapper}>
                    <Typography>{deal.proposal.createdBy.rating}</Typography>
                    <Rating disabled className={classNames.userRating} value={deal.proposal.createdBy.rating} />
                  </div>
                </div>

                <div className={classNames.blockInfoWrapper}>
                  <div className={classNames.requestItemInfoWrapper}>
                    <Typography>{t(TranslationKey.Status)}</Typography>
                    <div className={classNames.requestStatusWrapper}>
                      <Typography className={classNames.requestStatus}>
                        <span style={{backgroundColor: RequestProposalStatusColor(deal.proposal.status)}}></span>
                      </Typography>
                      <Typography>{RequestProposalStatusTranslate(deal.proposal.status)}</Typography>
                    </div>
                  </div>
                </div>

                <div className={classNames.blockInfoWrapper}>
                  <div className={classNames.requestItemInfoWrapper}>
                    <Typography>{t(TranslationKey.Time)}</Typography>
                    <Typography>{formatDateDistanceFromNowStrict(deal.proposal.timeoutAt, now)}</Typography>
                  </div>
                </div>

                <div className={classNames.blockInfoWrapper}>
                  <div className={classNames.requestItemInfoWrapper}>
                    <Typography>{t(TranslationKey.Deadline)}</Typography>
                    <Typography>{formatNormDateTime(deal.proposal.timeoutAt)}</Typography>
                  </div>
                </div>

                <div className={classNames.blockInfoWrapper}>
                  <div className={classNames.requestItemInfoWrapper}>
                    <Typography>{t(TranslationKey['Total price'])}</Typography>
                    <Typography className={classNames.price}>
                      {toFixedWithDollarSign(deal.proposal.price, 2)}
                    </Typography>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
