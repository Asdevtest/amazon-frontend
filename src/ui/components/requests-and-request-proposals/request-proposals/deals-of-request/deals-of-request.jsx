import { memo, useState } from 'react'

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

import { useStyles } from './deals-of-request.style'

export const DealsOfRequest = memo(({ requestProposals, onClickReview }) => {
  const { classes: styles } = useStyles()

  const [showDetails, setShowDetails] = useState(false)

  return (
    <div className={styles.root}>
      <Accordion
        classes={{ root: styles.accordion }}
        expanded={showDetails}
        disabled={!requestProposals.length}
        onChange={() => setShowDetails(!showDetails)}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={styles.title}>{`${t(TranslationKey['Transactions on the request'])} (${
            requestProposals.length
          })`}</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <div className={styles.mainWrapper}>
            {requestProposals.map(deal => (
              <div key={deal.proposal._id} className={styles.dealWrapper}>
                <div className={styles.userInfoWrapper}>
                  <Avatar src={getUserAvatarSrc(deal?.proposal?.createdBy?._id)} className={styles.cardImg} />
                  <div className={styles.userNameWrapper}>
                    <UserLink
                      blackText
                      name={deal?.proposal?.createdBy?.name}
                      userId={deal?.proposal?.createdBy?._id}
                    />

                    <Typography className={styles.reviews} onClick={() => onClickReview(deal?.proposal?.createdBy)}>
                      {t(TranslationKey.Reviews)}
                    </Typography>
                  </div>

                  <div className={styles.userRatingWrapper}>
                    <Rating readOnly className={styles.userRating} value={deal?.proposal?.createdBy?.rating} />
                  </div>
                </div>

                <div className={styles.blockInfoStatusWrapper}>
                  <div className={styles.requestItemInfoWrapper}>
                    <Typography className={styles.blockText}>{t(TranslationKey.Status)}</Typography>
                    <div className={styles.requestStatusWrapper}>
                      <Typography className={styles.requestStatus}>
                        <span style={{ backgroundColor: RequestProposalStatusColor(deal?.proposal?.status) }}></span>
                      </Typography>
                      <Typography className={styles.standartText}>
                        {RequestProposalStatusTranslate(deal?.proposal?.status)}
                      </Typography>
                    </div>
                  </div>
                </div>

                <div className={styles.blockInfoWrapper}>
                  <div className={styles.requestItemInfoWrapper}>
                    <Typography className={styles.blockText}>{t(TranslationKey.Time)}</Typography>
                    <Typography className={styles.blockText}>
                      {formatDateDistanceFromNowStrict(deal?.proposal?.timeoutAt, new Date())}
                    </Typography>
                  </div>
                </div>

                <div className={styles.blockInfoWrapper}>
                  <div className={styles.requestItemInfoWrapper}>
                    <Typography className={styles.blockText}>{t(TranslationKey.Deadline)}</Typography>
                    <Typography className={styles.blockText}>
                      {formatNormDateTime(deal?.proposal?.timeoutAt)}
                    </Typography>
                  </div>
                </div>

                <div className={styles.blockInfoWrapper}>
                  <div className={styles.requestItemInfoWrapper}>
                    <Typography className={styles.blockText}>{t(TranslationKey['Total price'])}</Typography>
                    <Typography className={styles.price}>{toFixedWithDollarSign(deal?.proposal?.price, 2)}</Typography>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  )
})
