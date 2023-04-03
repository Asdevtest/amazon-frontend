/* eslint-disable no-unused-vars */
import {cx} from '@emotion/css'
import {Grid, Typography, Avatar, Divider} from '@mui/material'
import Rating from '@mui/material/Rating'

import React from 'react'

import {freelanceRequestTypeByCode, freelanceRequestTypeTranslate} from '@constants/freelance-request-type'
import {
  RequestProposalStatus,
  RequestProposalStatusColor,
  RequestProposalStatusTranslate,
} from '@constants/request-proposal-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {AsinLink} from '@components/asin-link'
import {Button} from '@components/buttons/button'
import {CustomCarousel} from '@components/custom-carousel'
import {Field} from '@components/field/field'
import {UserLink} from '@components/user-link'

import {formatNormDateTime, formatNormDateTimeWithParseISO} from '@utils/date-time'
import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {minsToTime, toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './my-proposals-list-card.style'

export const MyProposalsListCard = ({item, onClickEditBtn, onClickDeleteBtn, onClickOpenBtn, isFirst}) => {
  const {classes: classNames} = useClassNames()

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
            <div className={classNames.nameWrapper}>
              <Avatar src={getUserAvatarSrc(item.createdBy._id)} className={classNames.cardImg} />

              <div className={classNames.ratingWrapper}>
                <UserLink
                  blackText
                  name={item.createdBy.name}
                  userId={item.createdBy._id}
                  customClassNames={classNames.customUserLink}
                />
                <Rating disabled size="small" value={item.createdBy.rating} />
              </div>
            </div>

            <div className={classNames.cardSubTitleWrapper}>
              <Typography className={classNames.cardSubTitle}>{`${t(
                TranslationKey['The number of total successful transactions:'],
              )} 0`}</Typography>

              {item.withoutConfirmation && (
                <Typography className={classNames.withoutСonfirmation}>
                  {t(TranslationKey['Available to work without confirmation'])}
                </Typography>
              )}
            </div>
          </div>

          <div className={classNames.moreInfoBlockWrapper}>
            <Typography className={classNames.cardTitle}>{item.title}</Typography>
            <div className={classNames.moreInfoWrapper}>
              <div className={classNames.blockInfoCell}>
                <Typography className={classNames.blockInfoCellTitle}>
                  {t(TranslationKey['Task type']) + ':'}
                </Typography>
                <Typography className={cx(classNames.blockInfoCellText)}>
                  {freelanceRequestTypeTranslate(freelanceRequestTypeByCode[item?.typeTask]) ??
                    t(TranslationKey.Missing)}
                </Typography>
              </div>

              <div className={classNames.blockInfoCell}>
                <Typography className={classNames.blockInfoCellTitle}>{t(TranslationKey.ASIN) + ':'}</Typography>
                <AsinLink asin={item.asin} />
              </div>

              <div className={classNames.blockInfoCell}>
                <Typography className={classNames.blockInfoCellTitle}>{t(TranslationKey.ID) + ':'}</Typography>
                <Typography className={cx(classNames.blockInfoCellText)}>
                  {item.humanFriendlyId ?? t(TranslationKey.Missing)}
                </Typography>
              </div>

              <div className={classNames.blockInfoCell}>
                <Typography className={classNames.blockInfoCellTitle}>{t(TranslationKey.Updated) + ':'}</Typography>
                <Typography className={classNames.blockInfoCellText}>{formatNormDateTime(item?.updatedAt)}</Typography>
              </div>
            </div>
          </div>
        </div>

        <Divider flexItem orientation="vertical" classes={{root: classNames.divider}} />
        <div className={classNames.rightBlockWrapper}>
          <CustomCarousel title={t(TranslationKey.Proposal)} view="complex">
            {item.proposals.map((proposal, index) => (
              <div key={index} className={classNames.proposalWrapper}>
                <div className={classNames.performerInfoCell}>
                  <Typography className={classNames.blockInfoCellTitle}>{t(TranslationKey.Performer)}</Typography>
                  <UserLink
                    name={proposal.createdBy.name}
                    userId={proposal.createdBy._id}
                    customClassNames={classNames.customPerformerLink}
                  />
                </div>

                <div className={classNames.rightBlockSubWrapper}>
                  <div className={classNames.rightSubWrapper}>
                    <div className={classNames.statusField}>
                      <span
                        className={classNames.circleIndicator}
                        style={{backgroundColor: RequestProposalStatusColor(proposal.status)}}
                      />
                      <Typography className={classNames.standartText}>
                        {RequestProposalStatusTranslate(proposal.status)}
                      </Typography>
                    </div>
                  </div>

                  <div className={classNames.proposalFooter}>
                    <Button
                      danger
                      disableElevation
                      tooltipInfoContent={isFirst && t(TranslationKey['Cancel current proposal'])}
                      disabled={disabledCancelBtnStatuses.includes(proposal.status)}
                      className={[classNames.button, classNames.cancelBtn]}
                      onClick={() => onClickDeleteBtn(proposal)}
                    >
                      {t(TranslationKey.Cancel)}
                    </Button>
                    <div className={classNames.editAndOpenButtonWrapper}>
                      <Button
                        disableElevation
                        tooltipInfoContent={isFirst && t(TranslationKey['Change the current proposal'])}
                        disabled={!noDisabledEditBtnStatuses.includes(proposal.status)}
                        className={classNames.button}
                        variant="contained"
                        onClick={() => onClickEditBtn(item, proposal)}
                      >
                        {t(TranslationKey.Edit)}
                      </Button>

                      <Button
                        disableElevation
                        tooltipInfoContent={isFirst && t(TranslationKey['Open an request for the selected proposal'])}
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
