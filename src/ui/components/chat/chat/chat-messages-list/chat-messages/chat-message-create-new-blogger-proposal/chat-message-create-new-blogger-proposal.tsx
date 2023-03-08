import {cx} from '@emotion/css'
import {Divider, Typography} from '@mui/material'

import React, {FC, useContext} from 'react'

import Linkify from 'react-linkify-always-blank'

import {RequestProposalStatus} from '@constants/request-proposal-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {ChatMessageDataCreateNewBloggerProposalContract} from '@models/chat-model/contracts/chat-message-data.contract'
import {ChatMessageContract} from '@models/chat-model/contracts/chat-message.contract'
import {UserModel} from '@models/user-model'

import {Button} from '@components/buttons/button'
import {PhotoAndFilesCarousel} from '@components/custom-carousel/custom-carousel'

import {formatDateOnlyTime, formatNormDateTime} from '@utils/date-time'
import {toFixed, toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'

import {ChatRequestAndRequestProposalContext} from '@contexts/chat-request-and-request-proposal-context'

import {LabelValuePairBlock} from '../label-value-pair-block'
import {useClassNames} from './chat-message-create-new-blogger-proposal.style'

export interface ChatMessageProposalHandlers {
  onClickProposalAccept: (proposalId: string, price: number) => void
  onClickProposalRegect: (proposalId: string) => void
}

interface Props {
  message: ChatMessageContract<ChatMessageDataCreateNewBloggerProposalContract>
  handlers: ChatMessageProposalHandlers
}

export const ChatMessageCreateNewBloggerProposal: FC<Props> = ({message, handlers}) => {
  const {classes: classNames} = useClassNames()
  const proposal = message.data.proposal

  const chatRequestAndRequestProposal = useContext(ChatRequestAndRequestProposalContext)

  // const curUserId: string | undefined = UserModel.userId

  return (
    <div className={classNames.root}>
      <div className={classNames.mainWrapper}>
        <Typography className={classNames.timeText}>{formatDateOnlyTime(message.createdAt)}</Typography>

        <div className={classNames.mainSubWrapper}>
          <Typography className={classNames.headerText}>{t(TranslationKey.Result)}</Typography>

          <Linkify>
            <Typography className={classNames.descriptionText}>{message.data.request.details.conditions}</Typography>
          </Linkify>

          <div className={classNames.infosWrapper}>
            <div className={classNames.labelValueBlockWrapper}>
              <LabelValuePairBlock
                label={t(TranslationKey.Deadline)}
                value={formatNormDateTime(message.data.request.timeoutAt)}
                bgColor="green"
              />
            </div>

            <div className={cx(classNames.labelValueBlockWrapper /* , classNames.labelValueBlockWrapperNotFirst */)}>
              <LabelValuePairBlock
                label={t(TranslationKey['Request price'])}
                value={
                  <Typography className={classNames.accentText}>
                    {toFixedWithDollarSign(message.data.request.price, 2)}
                  </Typography>
                }
                bgColor="green"
              />
            </div>

            <div className={cx(classNames.labelValueBlockWrapper /* , classNames.labelValueBlockWrapperNotFirst */)}>
              <LabelValuePairBlock
                label={t(TranslationKey['Product price'])}
                value={
                  <div className={classNames.priceAmazonWrapper}>
                    <Typography className={classNames.redText}>
                      {`$ ${toFixed(
                        message.data.request.priceAmazon -
                          (message.data.request.priceAmazon * message.data.request.cashBackInPercent) / 100,
                        2,
                      )}`}
                    </Typography>

                    <Typography className={classNames.cashBackPrice}>{`$ ${toFixed(
                      message.data.request.priceAmazon,
                      2,
                    )}`}</Typography>
                  </div>
                }
                bgColor="green"
              />
            </div>

            <div className={classNames.labelValueBlockWrapper}>
              <LabelValuePairBlock
                label={'CashBack'}
                value={
                  <Typography className={classNames.accentText}>
                    {`${toFixed(message.data.request.cashBackInPercent, 2)} %`}
                  </Typography>
                }
                bgColor="green"
              />
            </div>
          </div>

          <Typography className={classNames.fieldLabel}>{t(TranslationKey['Photos and documents']) + ':'}</Typography>

          <PhotoAndFilesCarousel
            notToShowEmpty
            small
            files={message.data.request.details.linksToMediaFiles}
            width="340px"
          />
        </div>

        <Divider orientation="vertical" className={classNames.divider} />
        <div className={classNames.mainSubWrapper}>
          <Typography className={classNames.headerText}>{t(TranslationKey.Proposal)}</Typography>

          <Linkify>
            <Typography className={classNames.descriptionText}>{message.data.proposal.comment}</Typography>
          </Linkify>

          <div className={classNames.infosProposalWrapper}>
            <div className={classNames.labelValueBlockWrapper}>
              <LabelValuePairBlock
                label={t(TranslationKey.Time)}
                value={
                  <Typography className={classNames.accentText}>{`${toFixed(
                    message.data.proposal.execution_time / 60,
                    2,
                  )} ${t(TranslationKey.hour)} `}</Typography>
                }
                bgColor="green"
              />
            </div>

            <div className={cx(classNames.labelValueBlockWrapper /* , classNames.labelValueBlockWrapperNotFirst */)}>
              <LabelValuePairBlock
                label={t(TranslationKey['Request price'])}
                value={
                  <Typography className={classNames.accentText}>
                    {toFixedWithDollarSign(message.data.proposal.price, 2)}
                  </Typography>
                }
                bgColor="yellow"
              />
            </div>
          </div>

          <Typography className={classNames.fieldLabel}>{t(TranslationKey['Photos and documents']) + ':'}</Typography>

          <PhotoAndFilesCarousel
            notToShowEmpty
            small
            files={message.data.proposal.details.linksToMediaFiles}
            width="340px"
          />
        </div>
      </div>

      {/* {chatRequestAndRequestProposal.requestProposal?.proposal?.status === RequestProposalStatus.CREATED ||
      chatRequestAndRequestProposal.requestProposal?.proposal?.status ===
        RequestProposalStatus.OFFER_CONDITIONS_REJECTED ||
      chatRequestAndRequestProposal.requestProposal?.proposal?.status ===
        RequestProposalStatus.OFFER_CONDITIONS_CORRECTED ? (
        <div className={classNames.rightSide}>
          {chatRequestAndRequestProposal.requestProposal?.proposal?.status !==
          RequestProposalStatus.OFFER_CONDITIONS_REJECTED ? (
            <Button
              variant="contained"
              color="primary"
              className={cx(classNames.actionButton, classNames.cancelBtn)}
              onClick={() => handlers.onClickProposalRegect(message.data._id)}
            >
              {t(TranslationKey.Reject)}
            </Button>
          ) : null}
          <Button
            variant="contained"
            color="primary"
            className={cx(classNames.actionButton, classNames.successBtn)}
            onClick={() => handlers.onClickProposalAccept(message.data._id, message.data.price)}
          >
            {`${t(TranslationKey['Order for'])} ${toFixedWithDollarSign(message.data.price, 2)}`}
          </Button>
        </div>
      ) : undefined} */}

      <div className={classNames.footerWrapper}>
        {chatRequestAndRequestProposal.requestProposal?.proposal?.status === RequestProposalStatus.CREATED ||
        chatRequestAndRequestProposal.requestProposal?.proposal?.status ===
          RequestProposalStatus.OFFER_CONDITIONS_REJECTED ||
        chatRequestAndRequestProposal.requestProposal?.proposal?.status ===
          RequestProposalStatus.OFFER_CONDITIONS_CORRECTED ? (
          <div className={classNames.btnsWrapper}>
            {chatRequestAndRequestProposal.requestProposal?.proposal?.status !== RequestProposalStatus.TO_CORRECT && (
              <Button
                danger
                // btnWrapperStyle={classNames.actionBtnWrapperStyle}
                className={cx(classNames.actionButton /* , classNames.editButton */)}
                onClick={() => handlers.onClickProposalRegect(message.data.request._id)}
              >
                {t(TranslationKey.Reject)}
              </Button>
            )}
            <Button
              success
              // btnWrapperStyle={cx(classNames.actionBtnWrapperStyle, classNames.actionBtnWrapperStyleNotFirst)}
              className={cx(classNames.actionButton /* , classNames.successBtn */)}
              onClick={() => handlers.onClickProposalAccept(message.data.proposal._id, message.data.proposal.price)}
            >
              {`${t(TranslationKey['Order for'])} ${toFixedWithDollarSign(message.data.proposal.price, 2)}`}
            </Button>
          </div>
        ) : undefined}
      </div>
    </div>
  )
}
