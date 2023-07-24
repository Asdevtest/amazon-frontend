import React, { useState } from 'react'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Avatar, Rating, Typography } from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'

import { RequestProposalStatusColor, RequestProposalStatusTranslate } from '@constants/requests/request-proposal-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { UserLink } from '@components/user/user-link'

import { formatDateDistanceFromNowStrict, formatNormDateTime } from '@utils/date-time'
import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from './deals-of-request.style'

export const DealsOfRequest = ({ requestProposals, onClickReview }) => {
  const { classes: classNames } = useClassNames()

  const [showDetails, setShowDetails] = useState(false)

  const now = new Date()

  // console.log('requestProposals', requestProposals)

  return (
    <div className={classNames.root}>
      <Accordion
        classes={{ root: classNames.accordion }}
        expanded={showDetails}
        // style={{borderRadius: '4px', boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)'}}
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
                  <Avatar src={getUserAvatarSrc(deal?.proposal?.createdBy?._id)} className={classNames.cardImg} />
                  <div className={classNames.userNameWrapper}>
                    <UserLink
                      blackText
                      name={deal?.proposal?.createdBy?.name}
                      userId={deal?.proposal?.createdBy?._id}
                    />

                    {/* <Typography>{t(TranslationKey.Reviews)}</Typography> */}
                    <Typography className={classNames.reviews} onClick={() => onClickReview()}>
                      {t(TranslationKey.Reviews)}
                    </Typography>
                  </div>

                  <div className={classNames.userRatingWrapper}>
                    <Rating disabled className={classNames.userRating} value={deal?.proposal?.createdBy?.rating} />
                  </div>
                </div>

                <div className={classNames.blockInfoStatusWrapper}>
                  <div className={classNames.requestItemInfoWrapper}>
                    <Typography className={classNames.blockText}>{t(TranslationKey.Status)}</Typography>
                    <div className={classNames.requestStatusWrapper}>
                      <Typography className={classNames.requestStatus}>
                        <span style={{ backgroundColor: RequestProposalStatusColor(deal?.proposal?.status) }}></span>
                      </Typography>
                      <Typography className={classNames.standartText}>
                        {RequestProposalStatusTranslate(deal?.proposal?.status)}
                      </Typography>
                    </div>
                  </div>
                </div>

                <div className={classNames.blockInfoWrapper}>
                  <div className={classNames.requestItemInfoWrapper}>
                    <Typography className={classNames.blockText}>{t(TranslationKey.Time)}</Typography>
                    <Typography className={classNames.blockText}>
                      {formatDateDistanceFromNowStrict(deal?.proposal?.timeoutAt, now)}
                    </Typography>
                  </div>
                </div>

                <div className={classNames.blockInfoWrapper}>
                  <div className={classNames.requestItemInfoWrapper}>
                    <Typography className={classNames.blockText}>{t(TranslationKey.Deadline)}</Typography>
                    <Typography className={classNames.blockText}>
                      {formatNormDateTime(deal?.proposal?.timeoutAt)}
                    </Typography>
                  </div>
                </div>

                <div className={classNames.blockInfoWrapper}>
                  <div className={classNames.requestItemInfoWrapper}>
                    <Typography className={classNames.blockText}>{t(TranslationKey['Total price'])}</Typography>
                    <Typography className={classNames.price}>
                      {toFixedWithDollarSign(deal?.proposal?.price, 2)}
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
