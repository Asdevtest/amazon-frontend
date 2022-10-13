import {Grid, Typography, Avatar} from '@mui/material'
import Rating from '@mui/material/Rating'

import React from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {RequestStatusCell} from '@components/data-grid-cells/data-grid-cells'
import {UserLink} from '@components/user-link'

import {formatNormDateTime, formatNormDateTimeWithParseISO} from '@utils/date-time'
import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {minsToTime, toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'
import {translateProposalsLeftMessage} from '@utils/validation'

import {useClassNames} from './vacant-request-list-card.style'

export const VacantRequestListCard = ({item, onClickViewMore, isFirst}) => {
  const {classes: classNames} = useClassNames()

  return (
    <Grid item className={classNames.mainWrapper}>
      <div className={classNames.cardWrapper}>
        <div className={classNames.cardTitleBlockWrapper}>
          <div className={classNames.cardTitleBlockHeaderWrapper}>
            <div className={classNames.userInfoWrapper}>
              <Avatar src={getUserAvatarSrc(item.createdBy._id)} className={classNames.cardImg} />

              <div className={classNames.nameWrapper}>
                <UserLink blackText name={item.createdBy.name} userId={item.createdBy._id} />

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
                <Typography className={classNames.standartText}>{t(TranslationKey['Time to complete'])}</Typography>

                <Typography className={classNames.standartText}>{minsToTime(item.timeLimitInMinutes)}</Typography>
              </div>
              <div className={classNames.timeItemInfoWrapper}>
                <Typography className={classNames.standartText}>{t(TranslationKey.Status)}</Typography>

                <div className={classNames.statusText}>{<RequestStatusCell status={item.status} />}</div>
              </div>
            </div>
            <div className={classNames.rightSubBlockWrapper}>
              <div className={classNames.timeItemInfoWrapper}>
                <Typography className={classNames.standartText}>{t(TranslationKey.Deadline)}</Typography>

                <Typography className={classNames.standartText}>{formatNormDateTime(item.timeoutAt)}</Typography>
              </div>
              <div className={classNames.timeItemInfoWrapper}>
                <Typography className={classNames.standartText}>{t(TranslationKey['Total price'])}</Typography>

                <Typography className={classNames.cardPrice}>{toFixedWithDollarSign(item.price, 2)}</Typography>
              </div>
            </div>
          </div>
          <div className={classNames.buttonWrapper}>
            <Button
              tooltipInfoContent={isFirst && t(TranslationKey['Open detailed information about the request'])}
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
