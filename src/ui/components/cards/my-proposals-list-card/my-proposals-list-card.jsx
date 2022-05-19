import Rating from '@mui/material/Rating'

import React from 'react'

import {Grid, Typography, Avatar, Divider} from '@material-ui/core'
import Carousel from 'react-material-ui-carousel'

import {Button} from '@components/buttons/button'

import {formatNormDateTimeWithParseISO} from '@utils/date-time'
import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {minsToTimeRus, toFixedWithDollarSign} from '@utils/text'

import {useClassNames} from './my-proposals-list-card.style'

export const MyProposalsListCard = ({item, onClickEditBtn, onClickDeleteBtn}) => {
  const classNames = useClassNames()
  console.log('item', item)

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

          <Typography>{item.status}</Typography>

          <div className={classNames.updatedAtWrapper}>
            <Typography className={classNames.updatedAtText}>{'Обновлено:'}</Typography>

            <Typography className={classNames.updatedAtText}>
              {formatNormDateTimeWithParseISO(item.updatedAt)}
            </Typography>
          </div>
        </div>

        <Divider flexItem orientation="vertical" />
        <div className={classNames.rightBlockWrapper}>
          <Carousel autoPlay={false} timeout={100} animation="fade" fullHeightHover={false}>
            {item.proposals.map((proposal, index) => (
              <div key={index} className={classNames.proposalWrapper}>
                <Typography className={classNames.cardTitle}>{'Предложение'}</Typography>

                <Typography className={classNames.proposalComment}>{proposal.comment}</Typography>

                <div className={classNames.rightSubWrapper}>
                  <div className={classNames.timeWrapper}>
                    <Typography>{'Время на выполнение в мин.'}</Typography>
                    <Typography className={classNames.timeCount}>{minsToTimeRus(proposal.execution_time)}</Typography>
                  </div>

                  <div className={classNames.rightItemSubWrapper}>
                    <Typography>{'Стоимость'}</Typography>
                    <Typography className={classNames.price}>{toFixedWithDollarSign(proposal.price, 2)}</Typography>
                  </div>
                </div>

                <div className={classNames.proposalFooter}>
                  <Typography>{proposal.status}</Typography>

                  <div className={classNames.btnsWrapper}>
                    <Button disableElevation color="primary" variant="text" onClick={() => onClickDeleteBtn(proposal)}>
                      {'Отменить'}
                    </Button>

                    <Button
                      disableElevation
                      color="primary"
                      variant="contained"
                      onClick={() => onClickEditBtn(item, proposal)}
                    >
                      {'Редактировать'}
                    </Button>

                    <Button disableElevation color="primary" variant="contained">
                      {'Открыть заявку'}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>

        {/* <div className={classNames.rightBlockWrapper}>
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

          <div className={classNames.proposalFooter}>
            <Typography>{item.proposals[0].status}</Typography>

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
          
        </div> */}
      </div>
    </Grid>
  )
}
