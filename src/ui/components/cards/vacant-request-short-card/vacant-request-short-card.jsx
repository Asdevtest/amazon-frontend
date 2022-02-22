import React from 'react'

import {Divider, Grid, Typography} from '@material-ui/core'

import {Button} from '@components/buttons/button'

import {formatNormDateTime} from '@utils/date-time'
import {toFixed, toFixedWithDollarSign} from '@utils/text'

import {useClassNames} from './vacant-request-short-card.style'

export const VacantRequestShortCard = ({item, onClickViewMore}) => {
  const classNames = useClassNames()

  return (
    <Grid item>
      <div className={classNames.cardWrapper}>
        <div className={classNames.cardTitleBlockWrapper}>
          <Typography className={classNames.cardTitle}>{item.title}</Typography>

          <Typography className={classNames.cardSubTitle}>{`Осталось ${0} из ${
            item.maxAmountOfProposals
          } предложений`}</Typography>

          <Typography>{`Срок до ${formatNormDateTime(item.timeoutAt)}`}</Typography>
        </div>

        <Divider orientation={'horizontal'} />

        <div className={classNames.cardActionBlockWrapper}>
          <div className={classNames.userInfoWrapper}>
            <img src="/assets/img/no-photo.jpg" className={classNames.cardImg} />

            <Typography>{'Екатерина П.'}</Typography>

            <Typography className={classNames.userRating}>{'4.9'}</Typography>
          </div>

          <Divider orientation={'horizontal'} className={classNames.divider} />

          <div className={classNames.timeInfoWrapper}>
            <Typography className={classNames.cardPrice}>{toFixedWithDollarSign(item.price, 2)}</Typography>

            <Typography className={classNames.cardTime}>{`Время на выполнение: ${toFixed(
              item.timeLimitInMinutes / 60,
              2,
            )} ч. `}</Typography>
          </div>

          <Button
            variant="contained"
            color="primary"
            className={classNames.actionButton}
            onClick={() => onClickViewMore(item._id)}
          >
            {'Подробнее...'}
          </Button>
        </div>
      </div>
    </Grid>
  )
}
