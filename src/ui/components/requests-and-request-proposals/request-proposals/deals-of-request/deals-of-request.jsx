/* eslint-disable no-unused-vars */
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {Rating} from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'

import React, {useState} from 'react'

import {Avatar, Paper, Typography} from '@material-ui/core'

import {texts} from '@constants/texts'

import {formatDateDistanceFromNowStrict, formatNormDateTime} from '@utils/date-time'
import {getLocalizedTexts} from '@utils/get-localized-texts'
import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {toFixedWithDollarSign} from '@utils/text'

import {useClassNames} from './deals-of-request.style'

const textConsts = getLocalizedTexts(texts, 'en').productSearchRequestContent

export const DealsOfRequest = ({requestProposals}) => {
  const classNames = useClassNames()

  const [showDetails, setShowDetails] = useState(false)

  const now = new Date()

  return (
    <Paper className={classNames.root}>
      <Accordion
        classes={{root: classNames.accordion}}
        expanded={showDetails}
        onChange={() => setShowDetails(!showDetails)}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classNames.title}>{'Сделки по заявке'}</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <div className={classNames.mainWrapper}>
            {requestProposals.map(deal => (
              <div key={deal.proposal._id} className={classNames.dealWrapper}>
                <div className={classNames.userInfoWrapper}>
                  <Avatar src={getUserAvatarSrc(deal.proposal.createdBy._id)} className={classNames.cardImg} />
                  <div className={classNames.userNameWrapper}>
                    <Typography>{deal.proposal.createdBy.name}</Typography>

                    <Typography>{'Отзывы'}</Typography>
                  </div>

                  <div className={classNames.userRatingWrapper}>
                    <Typography>{deal.proposal.createdBy.rating}</Typography>
                    <Rating disabled className={classNames.userRating} value={deal.proposal.createdBy.rating} />
                  </div>
                </div>

                <div className={classNames.blockInfoWrapper}>
                  <div className={classNames.requestItemInfoWrapper}>
                    <Typography>{'Статус'}</Typography>
                    <Typography className={classNames.requestStatus}>{deal.proposal.status}</Typography>
                  </div>
                </div>

                <div className={classNames.blockInfoWrapper}>
                  <div className={classNames.requestItemInfoWrapper}>
                    <Typography>{'Время'}</Typography>
                    <Typography>{formatDateDistanceFromNowStrict(deal.proposal.timeoutAt, now)}</Typography>
                  </div>
                </div>

                <div className={classNames.blockInfoWrapper}>
                  <div className={classNames.requestItemInfoWrapper}>
                    <Typography>{'Срок'}</Typography>
                    <Typography>{formatNormDateTime(deal.proposal.timeoutAt)}</Typography>
                  </div>
                </div>

                <div className={classNames.blockInfoWrapper}>
                  <div className={classNames.requestItemInfoWrapper}>
                    <Typography>{'Стоимость'}</Typography>
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
    </Paper>
  )
}
