import Rating from '@mui/material/Rating'

import React from 'react'

import {Divider, Grid, Typography, Avatar} from '@material-ui/core'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {UserLinkCell} from '@components/data-grid-cells/data-grid-cells'

import {formatNormDateTime, formatNormDateTimeWithParseISO} from '@utils/date-time'
import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {toFixed, toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './vacant-request-short-card.style'

export const VacantRequestShortCard = ({item, onClickViewMore}) => {
  const classNames = useClassNames()

  return (
    <Grid item>
      <div className={classNames.cardWrapper}>
        <div className={classNames.cardTitleBlockWrapper}>
          <Typography className={classNames.cardTitle}>{item.title}</Typography>

          <Typography className={classNames.cardSubTitle}>{`${
            item.maxAmountOfProposals - item.countProposalsByStatuses.acceptedProposals
          } ${t(TranslationKey['out of'])} ${item.maxAmountOfProposals} ${t(
            TranslationKey['suggestions left'],
          )}`}</Typography>

          <Typography>{`${t(TranslationKey.Deadline)} ${formatNormDateTime(item.timeoutAt)}`}</Typography>
        </div>

        <Divider orientation={'horizontal'} />

        <div className={classNames.cardActionBlockWrapper}>
          <div className={classNames.userInfoWrapper}>
            <Avatar src={getUserAvatarSrc(item.createdBy._id)} className={classNames.cardImg} />

            <div className={classNames.nameRatingWrapper}>
              <UserLinkCell name={item.createdBy.name} userId={item.createdBy._id} />

              <Rating disabled value={item.createdBy.rating} />
            </div>
          </div>

          <Divider orientation={'horizontal'} className={classNames.divider} />

          <div className={classNames.timeInfoWrapper}>
            <Typography className={classNames.cardPrice}>{toFixedWithDollarSign(item.price, 2)}</Typography>

            <Typography className={classNames.cardTime}>{`${t(TranslationKey.Time)}: ${toFixed(
              item.timeLimitInMinutes / 60,
              2,
            )} ч. `}</Typography>
          </div>

          <div className={classNames.updatedAtWrapper}>
            <Typography className={classNames.updatedAtText}>{'Обновлено:'}</Typography>

            <Typography className={classNames.updatedAtText}>
              {formatNormDateTimeWithParseISO(item.updatedAt)}
            </Typography>
          </div>

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
    </Grid>
  )
}
