import Rating from '@mui/material/Rating'

import React from 'react'

import {Grid, Typography, Avatar, Divider} from '@material-ui/core'

import {
  RequestProposalStatus,
  RequestProposalStatusColor,
  RequestProposalStatusTranslate,
} from '@constants/request-proposal-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {CustomCarousel} from '@components/custom-carousel'
import {Field} from '@components/field/field'
import {UserLink} from '@components/user-link'

import {formatNormDateTimeWithParseISO} from '@utils/date-time'
import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {minsToTime, toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './my-proposals-list-card.style'

export const MyProposalsListCard = ({item, onClickEditBtn, onClickDeleteBtn, onClickOpenBtn, isFirst}) => {
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
              <UserLink blackText name={item.createdBy.name} userId={item.createdBy._id} />
              <div className={classNames.ratingWrapper}>
                <Typography className={classNames.rating}>{t(TranslationKey.Rating)}</Typography>
                <Rating disabled value={item.createdBy.rating} />
              </div>
            </div>
          </div>

          <Typography className={classNames.cardSubTitle}>{`${t(
            TranslationKey['The number of total successful transactions:'],
          )} 0`}</Typography>

          <Typography className={classNames.cardTitle}>{item.title}</Typography>

          <Field
            multiline
            value={item.detailsCustom.conditions}
            inputClasses={classNames.conditionsInput}
            containerClasses={classNames.conditionsField}
          />

          <div className={classNames.updatedAtWrapper}>
            <Typography className={classNames.updatedAtText}>{t(TranslationKey.Updated) + ':'}</Typography>

            <Typography className={classNames.updatedAtText}>
              {formatNormDateTimeWithParseISO(item.updatedAt)}
            </Typography>
          </div>
        </div>

        <Divider flexItem orientation="vertical" classes={{root: classNames.divider}} />
        <div className={classNames.rightBlockWrapper}>
          <CustomCarousel title={t(TranslationKey.Proposal)} view="complex">
            {item.proposals.map((proposal, index) => (
              <div key={index} className={classNames.proposalWrapper}>
                <Typography className={classNames.proposalComment}>{proposal.comment}</Typography>

                <div className={classNames.rightSubWrapper}>
                  <div className={classNames.statusField}>
                    <span
                      className={classNames.circleIndicator}
                      style={{backgroundColor: RequestProposalStatusColor(proposal.status)}}
                    />
                    <Typography>{RequestProposalStatusTranslate(proposal.status)}</Typography>
                  </div>
                  <div className={classNames.timeAndPriceWrapper}>
                    <div className={classNames.timeWrapper}>
                      <Typography>{t(TranslationKey['Time to complete'])}</Typography>
                      <Typography className={classNames.timeCount}>{minsToTime(proposal.execution_time)}</Typography>
                    </div>

                    <div className={classNames.rightItemSubWrapper}>
                      <Typography>{t(TranslationKey['Total price'])}</Typography>
                      <Typography className={classNames.price}>{toFixedWithDollarSign(proposal.price, 2)}</Typography>
                    </div>
                  </div>
                </div>

                <div className={classNames.proposalFooter}>
                  <div className={classNames.btnsWrapper}>
                    <Button
                      disableElevation
                      tooltipInfoContent={isFirst && t(TranslationKey['Cancel current proposal'])}
                      disabled={disabledCancelBtnStatuses.includes(proposal.status)}
                      color="primary"
                      className={classNames.button}
                      variant="text"
                      onClick={() => onClickDeleteBtn(proposal)}
                    >
                      {t(TranslationKey.Cancel)}
                    </Button>
                    <div className={classNames.editAndOpenButtonWrapper}>
                      <Button
                        disableElevation
                        tooltipInfoContent={isFirst && t(TranslationKey['Change the current proposal'])}
                        disabled={!noDisabledEditBtnStatuses.includes(proposal.status)}
                        color="primary"
                        className={classNames.button}
                        variant="contained"
                        onClick={() => onClickEditBtn(item, proposal)}
                      >
                        {t(TranslationKey.Edit)}
                      </Button>

                      <Button
                        disableElevation
                        tooltipInfoContent={isFirst && t(TranslationKey['Open an request for the selected proposal'])}
                        color="primary"
                        variant="contained"
                        className={classNames.button}
                        onClick={() => onClickOpenBtn(item)}
                      >
                        {t(TranslationKey['Open a request'])}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CustomCarousel>
        </div>
      </div>
    </Grid>
  )
}
