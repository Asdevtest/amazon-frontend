/* eslint-disable no-unused-vars */
import Rating from '@mui/material/Rating'

import React from 'react'

import {Grid, Typography, Avatar, Divider} from '@material-ui/core'

import {Button} from '@components/buttons/button'

import {formatNormDateTime} from '@utils/date-time'
import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {minsToTimeRus, toFixed, toFixedWithDollarSign} from '@utils/text'

import {useClassNames} from './my-proposals-list-card.style'

export const MyProposalsListCard = ({item, onClickEditBtn, onClickDeleteBtn}) => {
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

          <Typography className={classNames.cardSubTitle}>{`Кол-во общих успешных сделок: 0`}</Typography>

          <Typography className={classNames.cardTitle}>{item.title}</Typography>

          <Typography className={classNames.cardSubTitle}>{item.detailsCustom.conditions}</Typography>

          <Typography>{'Ожидает выбора'}</Typography>
        </div>

        <Divider flexItem orientation="vertical" />

        <div className={classNames.rightBlockWrapper}>
          <Typography className={classNames.cardTitle}>{'Предложение'}</Typography>

          <Typography className={classNames.proposalComment}>{item.proposals[0].comment}</Typography>

          <div className={classNames.rightSubWrapper}>
            <div className={classNames.timeWrapper}>
              <Typography>{'Время на выполнение в мин.'}</Typography>
              <Typography className={classNames.timeCount}>
                {minsToTimeRus(item.proposals[0].execution_time)}
              </Typography>
            </div>

            <div className={classNames.rightItemSubWrapper}>
              <Typography>{'Стоимость'}</Typography>
              <Typography className={classNames.price}>{toFixedWithDollarSign(item.proposals[0].price, 2)}</Typography>
            </div>
          </div>

          <div className={classNames.btnsWrapper}>
            <Button disableElevation color="primary" variant="text" onClick={() => onClickDeleteBtn(item.proposals[0])}>
              {'Отменить'}
            </Button>

            <Button
              disableElevation
              color="primary"
              variant="contained"
              onClick={() => onClickEditBtn(item, item.proposals[0])}
            >
              {'Редактировать'}
            </Button>

            <Button disableElevation color="primary" variant="contained">
              {'Открыть заявку'}
            </Button>
          </div>
        </div>
      </div>
    </Grid>
  )
}
