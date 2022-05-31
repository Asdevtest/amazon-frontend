import Rating from '@mui/material/Rating'

import React from 'react'

import {Grid, Typography, Avatar, Divider} from '@material-ui/core'
import Carousel from 'react-material-ui-carousel'

import {RequestProposalStatus} from '@constants/request-proposal-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {UserLinkCell} from '@components/data-grid-cells/data-grid-cells'

import {formatNormDateTimeWithParseISO} from '@utils/date-time'
import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {minsToTime, toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './my-proposals-list-card.style'

export const MyProposalsListCard = ({item, onClickEditBtn, onClickDeleteBtn, onClickOpenBtn}) => {
  const classNames = useClassNames()

  const noDisabledEditBtnStatuses = [
    RequestProposalStatus.CREATED,
    RequestProposalStatus.OFFER_CONDITIONS_REJECTED,
    RequestProposalStatus.OFFER_CONDITIONS_CORRECTED,
  ]

  const disabledCancelBtnStatuses = [
    RequestProposalStatus.ACCEPTED_BY_CLIENT,
    RequestProposalStatus.ACCEPTED_BY_CREATOR_OF_REQUEST,
    RequestProposalStatus.CANCELED_BY_SUPERVISOR,
    RequestProposalStatus.CANCELED_BY_EXECUTOR,
    RequestProposalStatus.CANCELED_BY_CREATOR_OF_REQUEST,
    RequestProposalStatus.ACCEPTED_BY_SUPERVISOR,
    RequestProposalStatus.EXPIRED,
  ]

  return (
    <Grid item className={classNames.mainWrapper}>
      <div className={classNames.cardWrapper}>
        <div className={classNames.cardTitleBlockWrapper}>
          <div className={classNames.userInfoWrapper}>
            <Avatar src={getUserAvatarSrc(item.createdBy._id)} className={classNames.cardImg} />

            <div className={classNames.nameWrapper}>
              {/* <Typography>{item.createdBy.name}</Typography> */}
              <UserLinkCell name={item.createdBy.name} userId={item.createdBy._id} />

              <Rating disabled value={item.createdBy.rating} />
            </div>
          </div>

          <Typography className={classNames.cardSubTitle}>{`${t(
            TranslationKey['The number of total successful transactions:'],
          )} 0`}</Typography>

          <Typography className={classNames.cardTitle}>{item.title}</Typography>

          <Typography className={classNames.cardSubTitle}>{item.detailsCustom.conditions}</Typography>

          <Typography>{item.status}</Typography>

          <div className={classNames.updatedAtWrapper}>
            <Typography className={classNames.updatedAtText}>{t(TranslationKey.Updated) + ':'}</Typography>

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
                <Typography className={classNames.cardTitle}>{t(TranslationKey.Proposal)}</Typography>

                <Typography className={classNames.proposalComment}>{proposal.comment}</Typography>

                <div className={classNames.rightSubWrapper}>
                  <div className={classNames.timeWrapper}>
                    <Typography>{t(TranslationKey['Time to complete, min*'])}</Typography>
                    <Typography className={classNames.timeCount}>{minsToTime(proposal.execution_time)}</Typography>
                  </div>

                  <div className={classNames.rightItemSubWrapper}>
                    <Typography>{t(TranslationKey['Total price'])}</Typography>
                    <Typography className={classNames.price}>{toFixedWithDollarSign(proposal.price, 2)}</Typography>
                  </div>
                </div>

                <div className={classNames.proposalFooter}>
                  <Typography>{proposal.status}</Typography>

                  <div className={classNames.btnsWrapper}>
                    <Button
                      disableElevation
                      disabled={disabledCancelBtnStatuses.includes(proposal.status)}
                      color="primary"
                      variant="text"
                      onClick={() => onClickDeleteBtn(proposal)}
                    >
                      {t(TranslationKey.Cancel)}
                    </Button>

                    <Button
                      disableElevation
                      disabled={!noDisabledEditBtnStatuses.includes(proposal.status)}
                      color="primary"
                      variant="contained"
                      onClick={() => onClickEditBtn(item, proposal)}
                    >
                      {t(TranslationKey.Edit)}
                    </Button>

                    <Button disableElevation color="primary" variant="contained" onClick={() => onClickOpenBtn(item)}>
                      {t(TranslationKey['Open a request'])}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </Grid>
  )
}
