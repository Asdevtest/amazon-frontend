import {Rating} from '@mui/material'

import React from 'react'

import {Typography, Paper, Avatar} from '@material-ui/core'

import {
  RequestProposalStatus,
  RequestProposalStatusColor,
  RequestProposalStatusTranslate,
} from '@constants/request-proposal-status'
import {RequestStatus} from '@constants/request-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {CustomCarousel} from '@components/custom-carousel'
import {RequestStatusCell} from '@components/data-grid-cells/data-grid-cells'
import {UserLink} from '@components/user-link'

import {formatNormDateTime, formatNormDateTimeWithParseISO} from '@utils/date-time'
import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {minsToTime, toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'
import {translateProposalsLeftMessage} from '@utils/validation'

import {useClassNames} from './servant-general-request-info.style'

export const ServantGeneralRequestInfo = ({request, onSubmit, requestProposals}) => {
  const classNames = useClassNames()

  const buttonDisabled =
    request.request.status === RequestStatus.FORBID_NEW_PROPOSALS ||
    requestProposals?.length ||
    request?.request.restrictMoreThanOneProposalFromOneAssignee

  return requestProposals.length === 0 ? (
    <Paper className={classNames.root}>
      <div className={classNames.mainBlockWrapper}>
        <div className={classNames.mainWrapper}>
          <div className={classNames.mainHeaderWrapper}>
            <div className={classNames.personInfoWrapper}>
              <Avatar src={getUserAvatarSrc(request?.request.createdById)} className={classNames.userPhoto} />
              <div className={classNames.personWrapper}>
                <UserLink blackText name={request?.request.createdBy.name} userId={request?.request.createdBy._id} />
                <Rating disabled value={request?.request.createdBy.rating} />
              </div>
            </div>
            <Typography className={classNames.title}>{request?.request.title}</Typography>
          </div>
          <div className={classNames.titleWrapper}>
            <Typography className={classNames.subTitle}>
              {translateProposalsLeftMessage(
                request?.request.maxAmountOfProposals -
                  (requestProposals?.filter(
                    el =>
                      el.proposal.status === RequestProposalStatus.ACCEPTED_BY_CLIENT ||
                      el.proposal.status === RequestProposalStatus.ACCEPTED_BY_CREATOR_OF_REQUEST ||
                      el.proposal.status === RequestProposalStatus.ACCEPTED_BY_SUPERVISOR,
                  ).length || 0),
                request?.request.maxAmountOfProposals,
              )}
            </Typography>
            <div className={classNames.updatedWrapper}>
              <Typography className={classNames.updatedText}>{t(TranslationKey.Updated) + ':'}</Typography>

              <Typography className={classNames.updatedText}>
                {formatNormDateTimeWithParseISO(request?.request.updatedAt)}
              </Typography>
            </div>
          </div>
        </div>
        <div className={classNames.mainBlockFooterWrapper}>
          <div className={classNames.requestInfoWrapper}>
            <div className={classNames.blockInfoWrapper}>
              <div className={classNames.requestItemInfoWrapper}>
                <Typography>{t(TranslationKey.Time)}</Typography>
                <Typography>{minsToTime(request?.request.timeLimitInMinutes)}</Typography>
              </div>

              <div className={classNames.requestItemInfoWrapper}>
                <Typography>{t(TranslationKey.Status)}</Typography>
                <Typography className={classNames.requestStatus}>
                  {<RequestStatusCell status={request?.request.status} />}
                </Typography>
              </div>
            </div>

            <div className={classNames.blockInfoWrapper}>
              <div className={classNames.requestItemInfoWrapper}>
                <Typography>{t(TranslationKey.Deadline)}</Typography>
                <Typography>{formatNormDateTime(request?.request.timeoutAt)}</Typography>
              </div>

              <div className={classNames.requestItemInfoWrapper}>
                <Typography>{t(TranslationKey['Total price'])}</Typography>
                <Typography className={classNames.price}>{toFixedWithDollarSign(request?.request.price, 2)}</Typography>
              </div>
            </div>
          </div>
          {(request.request.status === RequestStatus.PUBLISHED ||
            request.request.status === RequestStatus.IN_PROCESS) && (
            <div className={classNames.btnsBlockWrapper}>
              <Button
                tooltipInfoContent={t(TranslationKey['Make a proposal for the selected request'])}
                variant="contained"
                color="primary"
                className={classNames.actionBtn}
                onClick={onSubmit}
              >
                {t(TranslationKey['Suggest a deal'])}
              </Button>
            </div>
          )}
        </div>
      </div>
    </Paper>
  ) : (
    <Paper className={classNames.root}>
      <div className={classNames.mainBlockWrapper}>
        <div className={classNames.leftSideWrapper}>
          <div className={classNames.personInfoWrapper}>
            <Avatar src={getUserAvatarSrc(request?.request.createdById)} className={classNames.userPhoto} />
            <div className={classNames.personWrapper}>
              <UserLink blackText name={request?.request.createdBy.name} userId={request?.request.createdBy._id} />
              <Rating disabled value={request?.request.createdBy.rating} />
            </div>
          </div>
          <Typography className={classNames.transactions}>{`${t(
            TranslationKey['The number of total successful transactions:'],
          )} 0`}</Typography>

          <div className={classNames.leftSideFooterWrapper}>
            {(request.request.status === RequestStatus.PUBLISHED ||
              request.request.status === RequestStatus.IN_PROCESS) && (
              <div className={classNames.btnsBlockWrapper}>
                <Button
                  disabled={buttonDisabled}
                  tooltipInfoContent={t(TranslationKey['Make a proposal for the selected request'])}
                  variant="contained"
                  color="primary"
                  className={classNames.actionBtn}
                  onClick={onSubmit}
                >
                  {t(TranslationKey['Suggest a deal'])}
                </Button>
              </div>
            )}

            <div className={classNames.updatedAtWrapper}>
              <Typography className={classNames.updatedAtText}>{t(TranslationKey.Updated) + ':'}</Typography>

              <Typography className={classNames.updatedAtText}>
                {formatNormDateTimeWithParseISO(request?.request.updatedAt)}
              </Typography>
            </div>
          </div>
        </div>
        <div className={classNames.middleSideWrapper}>
          <div className={classNames.requestItemInfoProposalsWrapper}>
            <Typography>{t(TranslationKey.Time)}</Typography>
            <Typography>{minsToTime(request?.request.timeLimitInMinutes)}</Typography>
          </div>

          <div className={classNames.requestItemInfoProposalsWrapper}>
            <Typography>{t(TranslationKey.Status)}</Typography>
            <Typography className={classNames.requestStatus}>
              {<RequestStatusCell status={request?.request.status} />}
            </Typography>
          </div>
          <div className={classNames.requestItemInfoProposalsWrapper}>
            <Typography>{t(TranslationKey.Deadline)}</Typography>
            <Typography>{formatNormDateTime(request?.request.timeoutAt)}</Typography>
          </div>

          <div className={classNames.requestItemInfoProposalsWrapper}>
            <Typography>{t(TranslationKey['Total price'])}</Typography>
            <Typography className={classNames.price}>{toFixedWithDollarSign(request?.request.price, 2)}</Typography>
          </div>
        </div>
        <div className={classNames.proposalsWrapper}>
          <CustomCarousel view="complex" title={t(TranslationKey.Proposal)}>
            {requestProposals.map((proposal, index) => (
              <div key={index} className={classNames.proposalWrapper}>
                <Typography className={classNames.proposalComment}>{proposal.proposal.comment}</Typography>

                <div className={classNames.rightSubWrapper}>
                  <div className={classNames.statusField}>
                    <span
                      className={classNames.circleIndicator}
                      style={{backgroundColor: RequestProposalStatusColor(proposal.proposal.status)}}
                    />
                    <Typography className={classNames.status}>
                      {RequestProposalStatusTranslate(proposal.proposal.status)}
                    </Typography>
                  </div>
                  <div className={classNames.timeAndPriceWrapper}>
                    <div className={classNames.timeWrapper}>
                      <Typography>{t(TranslationKey['Time to complete'])}</Typography>
                      <Typography className={classNames.timeCount}>
                        {minsToTime(proposal.proposal.execution_time)}
                      </Typography>
                    </div>

                    <div className={classNames.rightItemSubWrapper}>
                      <Typography>{t(TranslationKey['Total price'])}</Typography>
                      <Typography className={classNames.price}>
                        {toFixedWithDollarSign(proposal.proposal.price, 2)}
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CustomCarousel>
        </div>
      </div>
    </Paper>
  )
}
