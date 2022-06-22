import Rating from '@mui/material/Rating'

import React from 'react'

import {Grid, Typography, Avatar} from '@material-ui/core'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {RequestStatusCell, UserLinkCell} from '@components/data-grid-cells/data-grid-cells'

import {formatNormDateTime, formatNormDateTimeWithParseISO} from '@utils/date-time'
import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {minsToTime, toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'
import {translateProposalsLeftMessage} from '@utils/validation'

import {useClassNames} from './vacant-request-list-card.style'

export const VacantRequestListCard = ({item, onClickViewMore}) => {
  const classNames = useClassNames()

  return (
    <Grid item className={classNames.mainWrapper}>
      <div className={classNames.cardWrapper}>
        <div className={classNames.cardTitleBlockWrapper}>
          <div className={classNames.cardTitleBlockHeaderWrapper}>
            <div className={classNames.userInfoWrapper}>
              <Avatar src={getUserAvatarSrc(item.createdBy._id)} className={classNames.cardImg} />

              <div className={classNames.nameWrapper}>
                <UserLinkCell name={item.createdBy.name} userId={item.createdBy._id} />

                <Rating disabled value={item.createdBy.rating} />
              </div>
            </div>
            <Typography className={classNames.cardTitle}>{item.title}</Typography>
          </div>
          <div className={classNames.cardTitleBlockFooterWrapper}>
            <Typography className={classNames.cardSubTitle}>
              {translateProposalsLeftMessage(
                item.maxAmountOfProposals - item.countProposalsByStatuses.acceptedProposals,
                item.maxAmountOfProposals,
              )}
            </Typography>

            <div className={classNames.updatedAtWrapper}>
              <Typography className={classNames.updatedAtText}>{t(TranslationKey.Updated) + ': '}</Typography>

              <Typography className={classNames.updatedAtText}>
                {formatNormDateTimeWithParseISO(item.updatedAt)}
              </Typography>
            </div>
          </div>
        </div>

        <div className={classNames.middleBlockWrapper}>
          <div className={classNames.subBlockWrapper}>
            <div className={classNames.leftSubBlockWrapper}>
              <div className={classNames.timeItemInfoWrapper}>
                <Typography>{t(TranslationKey['Time to complete'])}</Typography>

                <Typography>{minsToTime(item.timeLimitInMinutes)}</Typography>
              </div>
              <div className={classNames.timeItemInfoWrapper}>
                <Typography>{t(TranslationKey.Status)}</Typography>

                <Typography className={classNames.statusText}>{<RequestStatusCell status={item.status} />}</Typography>
              </div>
            </div>
            <div className={classNames.rightSubBlockWrapper}>
              <div className={classNames.timeItemInfoWrapper}>
                <Typography>{t(TranslationKey.Deadline)}</Typography>

                <Typography>{formatNormDateTime(item.timeoutAt)}</Typography>
              </div>
              <div className={classNames.timeItemInfoWrapper}>
                <Typography>{t(TranslationKey['Total price'])}</Typography>

                <Typography className={classNames.cardPrice}>{toFixedWithDollarSign(item.price, 2)}</Typography>
              </div>
            </div>
          </div>
          <div className={classNames.buttonWrapper}>
            <Button
              variant="contained"
              color="primary"
              className={classNames.actionButton}
              onClick={() => onClickViewMore(item._id)}
            >
              {t(TranslationKey.Details)}
            </Button>
          </div>
        </div>
      </div>
    </Grid>
  )
}
