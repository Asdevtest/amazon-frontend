import Rating from '@mui/material/Rating'

import React from 'react'

import {Grid, Typography, Avatar} from '@material-ui/core'

import {Button} from '@components/buttons/button'

import {formatNormDateTime} from '@utils/date-time'
import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {toFixed, toFixedWithDollarSign} from '@utils/text'

import {useClassNames} from './vacant-request-list-card.style'

export const VacantRequestListCard = ({item, onClickViewMore}) => {
  const classNames = useClassNames()

  return (
    <Grid item className={classNames.mainWrapper}>
      <div className={classNames.cardWrapper}>
        <div className={classNames.cardTitleBlockWrapper}>
          <div className={classNames.userInfoWrapper}>
            <Avatar src={getUserAvatarSrc(item.createdBy._id)} className={classNames.cardImg} />

            <div className={classNames.nameWrapper}>
              <Typography>{item.createdBy.name}</Typography>

              <Rating disabled value={item.createdBy.rating} />
            </div>
          </div>

          <Typography className={classNames.cardTitle}>{item.title}</Typography>

          <Typography className={classNames.cardSubTitle}>{`Осталось ${0} из ${
            item.maxAmountOfProposals
          } предложений`}</Typography>
        </div>

        <div className={classNames.middleBlockWrapper}>
          <div className={classNames.timeItemInfoWrapper}>
            <Typography>{'Время'}</Typography>

            <Typography>{`${toFixed(item.timeLimitInMinutes / 60, 2)} ч. `}</Typography>
          </div>

          <div className={classNames.timeItemInfoWrapper}>
            <Typography>{'Срок'}</Typography>

            <Typography>{formatNormDateTime(item.timeoutAt)}</Typography>
          </div>

          <div className={classNames.timeItemInfoWrapper}>
            <Typography>{'Статус'}</Typography>

            <Typography className={classNames.statusText}>{item.status}</Typography>
          </div>

          <div className={classNames.timeItemInfoWrapper}>
            <Typography>{'Стоимость'}</Typography>

            <Typography className={classNames.cardPrice}>{toFixedWithDollarSign(item.price, 2)}</Typography>
          </div>
        </div>

        <div className={classNames.rightBlockWrapper}>
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
