import { cx } from '@emotion/css'
import { Typography, Paper, Avatar, Rating, Divider } from '@mui/material'

import React from 'react'

import {
  MyRequestStatusTranslate,
  RequestProposalStatus,
  RequestProposalStatusColor,
  RequestProposalStatusTranslate,
} from '@constants/requests/request-proposal-status'
import { colorByRequestStatus, RequestStatus } from '@constants/requests/request-status'
import {
  freelanceRequestType,
  freelanceRequestTypeByCode,
  freelanceRequestTypeByKey,
  freelanceRequestTypeTranslate,
} from '@constants/statuses/freelance-request-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { VacantRequestPriceCell } from '@components/data-grid/data-grid-cells/data-grid-cells'
import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field'
import { UserLink } from '@components/user/user-link'

import { formatNormDateTime, formatNormDateTimeWithParseISO } from '@utils/date-time'
import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { toFixed, toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'
import { translateProposalsLeftMessage } from '@utils/validation'

import { useClassNames } from './servant-general-request-info.style'
import { CustomSlider } from '@components/shared/custom-slider'

export const ServantGeneralRequestInfo = ({ request, onSubmit, requestProposals }) => {
  const { classes: classNames } = useClassNames()

  const buttonDisabled =
    (request?.request.restrictMoreThanOneProposalFromOneAssignee && requestProposals.length) ||
    requestProposals.some(
      el =>
        el.proposal?.status === RequestProposalStatus?.CREATED ||
        el.proposal?.status === RequestProposalStatus?.CORRECTED ||
        el.proposal?.status === RequestProposalStatus?.VERIFYING_BY_SUPERVISOR ||
        el.proposal?.status === RequestProposalStatus?.EXPIRED ||
        el.proposal?.status === RequestProposalStatus?.TO_CORRECT ||
        el.proposal?.status === RequestProposalStatus?.READY_TO_VERIFY ||
        el.proposal?.status === RequestProposalStatus?.PROPOSAL_EDITED ||
        el.proposal?.status === RequestProposalStatus?.OFFER_CONDITIONS_CORRECTED ||
        el.proposal?.status === RequestProposalStatus?.OFFER_CONDITIONS_ACCEPTED ||
        el.proposal?.status === RequestProposalStatus?.OFFER_CONDITIONS_REJECTED,
    )

  const getMainInfos = () => (
    <div className={classNames.mainInfosWrapper}>
      <div className={classNames.headerWrapper}>
        {requestProposals.length === 0 ? null : (
          <Typography className={classNames.cardTitle}>{request?.request.title}</Typography>
        )}

        {requestProposals.length === 0 ? null : (
          <div className={classNames.idTitleWrapper}>
            <Typography className={classNames.idText}>{t(TranslationKey.ID) + ':'}</Typography>
            <Typography className={cx(classNames.idText, classNames.idTextDark)}>
              {request?.request?.humanFriendlyId || t(TranslationKey.Missing)}
            </Typography>
          </div>
        )}
      </div>
      <div className={classNames.mainInfosSubWrapper}>
        {request?.request.typeTask === freelanceRequestTypeByKey[freelanceRequestType.BLOGGER] ? (
          <div>
            <Field
              labelClasses={classNames.fieldLabel}
              containerClasses={classNames.fieldContainer}
              label={t(TranslationKey['Product price'])}
              inputComponent={
                <VacantRequestPriceCell
                  AlignLeft
                  price={request?.request.priceAmazon}
                  cashBackInPercent={request?.request.cashBackInPercent}
                />
              }
            />

            <Field
              labelClasses={classNames.fieldLabel}
              containerClasses={classNames.fieldContainer}
              label={'CashBack'}
              inputComponent={
                <Typography className={classNames.accentText}>
                  {toFixed(request?.request.cashBackInPercent, 2) + '%'}
                </Typography>
              }
            />
          </div>
        ) : null}
        <div>
          <Field
            labelClasses={classNames.fieldLabel}
            containerClasses={classNames.fieldContainer}
            label={t(TranslationKey['Request price'])}
            inputComponent={
              <Typography className={classNames.accentText}>
                {toFixedWithDollarSign(request?.request.price, 2)}
              </Typography>
            }
          />

          <Field
            labelClasses={classNames.fieldLabel}
            containerClasses={classNames.fieldContainer}
            label={t(TranslationKey.Status)}
            inputComponent={
              <Typography
                className={classNames.deadline}
                style={{ color: colorByRequestStatus(request?.request.status) }}
              >
                {MyRequestStatusTranslate(request?.request.status)}
              </Typography>
            }
          />
        </div>
        <div>
          <Field
            labelClasses={classNames.fieldLabel}
            containerClasses={classNames.fieldContainer}
            label={t(TranslationKey.Time)}
            inputComponent={
              <Typography className={classNames.accentText}>{`${toFixed(
                request?.request.timeLimitInMinutes / 60,
                2,
              )} ${t(TranslationKey.hour)} `}</Typography>
            }
          />

          <Field
            labelClasses={classNames.fieldLabel}
            containerClasses={classNames.fieldContainer}
            label={t(TranslationKey['Request type'])}
            inputComponent={
              <Typography className={classNames.accentText}>
                {freelanceRequestTypeTranslate(freelanceRequestTypeByCode[request?.request.typeTask])}
              </Typography>
            }
          />
        </div>

        <div>
          <Field
            labelClasses={classNames.fieldLabel}
            containerClasses={classNames.fieldContainer}
            label={t(TranslationKey.Updated)}
            inputComponent={
              <Typography className={classNames.accentText}>
                {formatNormDateTimeWithParseISO(request?.request.updatedAt)}
              </Typography>
            }
          />
          <Field
            labelClasses={classNames.fieldLabel}
            containerClasses={classNames.fieldContainer}
            label={t(TranslationKey.Deadline)}
            inputComponent={
              <Typography className={classNames.accentText}>{`${t(TranslationKey.Deadline)} ${formatNormDateTime(
                request?.request.timeoutAt,
              )}`}</Typography>
            }
          />
        </div>
      </div>
    </div>
  )

  // console.log('request', request)

  return requestProposals.length === 0 ? (
    <Paper className={classNames.root}>
      <div className={classNames.mainBlockWrapper}>
        <div className={classNames.mainWrapper}>
          <div className={classNames.mainHeaderWrapper}>
            <div className={classNames.personInfoWrapper}>
              <Avatar src={getUserAvatarSrc(request?.request?.createdById)} className={classNames.userPhoto} />
              <div className={classNames.personWrapper}>
                <UserLink
                  blackText
                  name={request?.request?.createdBy?.name}
                  userId={request?.request?.createdBy?._id}
                />
                <Rating disabled value={request?.request?.createdBy?.rating} />
              </div>
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
          </div>
        </div>

        <div>
          <div className={classNames.titleAndIdWrapper}>
            <Typography className={classNames.title}>{request?.request.title}</Typography>

            <div className={classNames.idTitleWrapper}>
              <Typography className={classNames.idText}>{t(TranslationKey.ID) + ':'}</Typography>
              <Typography className={cx(classNames.idText, classNames.idTextDark)}>
                {request?.request?.humanFriendlyId || t(TranslationKey.Missing)}
              </Typography>
            </div>
          </div>

          <div className={classNames.titleWrapper}>
            <Typography className={classNames.standartText}>
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
          </div>
        </div>

        {getMainInfos()}
      </div>
    </Paper>
  ) : (
    <Paper className={classNames.root}>
      <div className={classNames.mainBlockWrapper}>
        <div className={classNames.leftSideWrapper}>
          <div className={classNames.personInfoWrapper}>
            <Avatar src={getUserAvatarSrc(request?.request.createdById)} className={classNames.userPhoto} />
            <div className={classNames.personWrapper}>
              <UserLink blackText name={request?.request?.createdBy?.name} userId={request?.request?.createdBy?._id} />
              <Rating disabled value={request?.request?.createdBy?.rating} />
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
          </div>
        </div>

        {getMainInfos()}

        <div className={classNames.proposalsWrapper}>
          <Divider orientation={'vertical'} />

          <CustomSlider view="complex" title={t(TranslationKey.Proposal)}>
            {requestProposals.map((proposal, index) => (
              <div key={index} className={classNames.proposalWrapper}>
                <Field
                  oneLine
                  labelClasses={classNames.fieldLabel}
                  containerClasses={classNames.subNameContainer}
                  label={t(TranslationKey.Performer) + ':'}
                  inputComponent={
                    // <Typography className={classNames.subName}>
                    //   {proposal.proposal.sub?.name || proposal.proposal.createdBy?.name}
                    // </Typography>

                    <UserLink
                      blackText
                      name={proposal.proposal.sub?.name || proposal.proposal.createdBy?.name}
                      userId={proposal.proposal.sub?._id || proposal.proposal.createdBy?._id}
                    />
                  }
                />

                <Typography className={classNames.proposalComment}>{proposal.proposal.comment}</Typography>

                <div className={classNames.rightSubWrapper}>
                  <div className={classNames.statusField}>
                    <span
                      className={classNames.circleIndicator}
                      style={{ backgroundColor: RequestProposalStatusColor(proposal.proposal.status) }}
                    />
                    <Typography className={classNames.status}>
                      {RequestProposalStatusTranslate(proposal.proposal.status)}
                    </Typography>
                  </div>
                </div>
              </div>
            ))}
          </CustomSlider>
        </div>
      </div>
    </Paper>
  )
}
