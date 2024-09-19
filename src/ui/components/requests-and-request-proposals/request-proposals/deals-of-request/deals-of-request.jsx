import { Avatar } from 'antd'
import { memo, useState } from 'react'
import { MdExpandMore } from 'react-icons/md'

import { Rating } from '@mui/material'
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
        <AccordionSummary expandIcon={<MdExpandMore size={20} />}>
          <p className={styles.title}>{`${t(TranslationKey['Transactions on the request'])} (${
            requestProposals.length
          })`}</p>
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

                    <p className={styles.reviews} onClick={() => onClickReview(deal?.proposal?.createdBy)}>
                      {t(TranslationKey.Reviews)}
                    </p>
                  </div>

                  <div className={styles.userRatingWrapper}>
                    <Rating readOnly className={styles.userRating} value={deal?.proposal?.createdBy?.rating} />
                  </div>
                </div>

                <div className={styles.blockInfoStatusWrapper}>
                  <div className={styles.requestItemInfoWrapper}>
                    <p className={styles.blockText}>{t(TranslationKey.Status)}</p>
                    <div className={styles.requestStatusWrapper}>
                      <p className={styles.requestStatus}>
                        <span style={{ backgroundColor: RequestProposalStatusColor(deal?.proposal?.status) }}></span>
                      </p>
                      <p className={styles.standartText}>{RequestProposalStatusTranslate(deal?.proposal?.status)}</p>
                    </div>
                  </div>
                </div>

                <div className={styles.blockInfoWrapper}>
                  <div className={styles.requestItemInfoWrapper}>
                    <p className={styles.blockText}>{t(TranslationKey.Time)}</p>
                    <p className={styles.blockText}>
                      {formatDateDistanceFromNowStrict(deal?.proposal?.timeoutAt, new Date())}
                    </p>
                  </div>
                </div>

                <div className={styles.blockInfoWrapper}>
                  <div className={styles.requestItemInfoWrapper}>
                    <p className={styles.blockText}>{t(TranslationKey.Deadline)}</p>
                    <p className={styles.blockText}>{formatNormDateTime(deal?.proposal?.timeoutAt)}</p>
                  </div>
                </div>

                <div className={styles.blockInfoWrapper}>
                  <div className={styles.requestItemInfoWrapper}>
                    <p className={styles.blockText}>{t(TranslationKey['Total price'])}</p>
                    <p className={styles.price}>{toFixedWithDollarSign(deal?.proposal?.price, 2)}</p>
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
