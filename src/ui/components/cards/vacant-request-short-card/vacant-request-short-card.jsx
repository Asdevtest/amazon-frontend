import Rating from '@mui/material/Rating'

import React from 'react'

import {Divider, Grid, Typography, Avatar} from '@material-ui/core'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {UserLink} from '@components/user-link'

import {formatNormDateTime, formatNormDateTimeWithParseISO} from '@utils/date-time'
import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {toFixed, toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'
import {translateProposalsLeftMessage} from '@utils/validation'

import {useClassNames} from './vacant-request-short-card.style'

export const VacantRequestShortCard = ({item, onClickViewMore}) => {
  const classNames = useClassNames()

  return (
    <Grid item>
      <div className={classNames.cardWrapper}>
        <div className={classNames.cardTitleBlockWrapper}>
          <Typography className={classNames.cardTitle}>{item.title}</Typography>

          <Typography className={classNames.cardSubTitle}>
            {translateProposalsLeftMessage(
              item.maxAmountOfProposals - item.countProposalsByStatuses.acceptedProposals,
              item.maxAmountOfProposals,
            )}
          </Typography>
        </div>

        <Divider orientation={'horizontal'} />

        <div className={classNames.cardActionBlockWrapper}>
          <div className={classNames.userInfoWrapper}>
            <Avatar src={getUserAvatarSrc(item.createdBy._id)} className={classNames.cardImg} />

            <div className={classNames.nameRatingWrapper}>
              <UserLink blackText name={item.createdBy.name} userId={item.createdBy._id} />

              <Rating disabled value={item.createdBy.rating} />
            </div>
          </div>

          <Divider orientation={'horizontal'} className={classNames.divider} />

          <div className={classNames.timeInfoWrapper}>
            <Typography className={classNames.cardPrice}>{toFixedWithDollarSign(item.price, 2)}</Typography>
            <Typography className={classNames.deadline}>{`${t(TranslationKey.Deadline)} ${formatNormDateTime(
              item.timeoutAt,
            )}`}</Typography>
          </div>
          <div className={classNames.timeWrapper}>
            <div className={classNames.updatedAtWrapper}>
              <Typography className={classNames.updatedAtText}>{t(TranslationKey.Updated)}</Typography>

              <Typography className={classNames.updatedAtText}>
                {formatNormDateTimeWithParseISO(item.updatedAt)}
              </Typography>
            </div>
            <Typography className={classNames.cardTime}>{`${t(TranslationKey.Time)}: ${toFixed(
              item.timeLimitInMinutes / 60,
              2,
            )} ${t(TranslationKey.hour)} `}</Typography>
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
