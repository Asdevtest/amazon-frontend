import { cx } from '@emotion/css'
import { FC, useContext } from 'react'

import { Divider } from '@mui/material'

import { isMobileResolution } from '@constants/configs/sizes-settings'
import { RequestProposalStatus } from '@constants/requests/request-proposal-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { ChatMessageDataCreateNewBloggerProposalContract } from '@models/chat-model/contracts/chat-message-data.contract'
import { ChatMessageContract } from '@models/chat-model/contracts/chat-message.contract'
import { UserModel } from '@models/user-model'

import { Button } from '@components/shared/buttons/button'
import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'

import { formatDateOnlyTime, formatNormDateTime } from '@utils/date-time'
import { minsToTime, toFixed, toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { ChatRequestAndRequestProposalContext } from '@contexts/chat-request-and-request-proposal-context'

import { useClassNames } from './chat-message-create-new-blogger-proposal.style'

import { LabelValuePairBlock } from '../label-value-pair-block'

export interface ChatMessageProposalHandlers {
  onClickProposalAccept: (proposalId: string, price: number) => void
  onClickProposalRegect: (proposalId: string | undefined) => void
}

interface Props {
  message: ChatMessageContract<ChatMessageDataCreateNewBloggerProposalContract>
  handlers: ChatMessageProposalHandlers
  isShowChatInfo?: boolean
}

export const ChatMessageCreateNewBloggerProposal: FC<Props> = ({ message, handlers, isShowChatInfo }) => {
  const { classes: classNames } = useClassNames()

  const chatRequestAndRequestProposal = useContext(ChatRequestAndRequestProposalContext)

  const curUserId: string | undefined = UserModel.masterUserId || UserModel.userId
  const proposalStatus = chatRequestAndRequestProposal.requestProposal?.proposal?.status
  const isShowButtons =
    curUserId === chatRequestAndRequestProposal.request?.request?.createdBy?._id &&
    (proposalStatus === RequestProposalStatus.CREATED ||
      proposalStatus === // этого условия не было
        RequestProposalStatus.OFFER_CONDITIONS_REJECTED ||
      proposalStatus === RequestProposalStatus.OFFER_CONDITIONS_CORRECTED)
  const isRejectButton =
    proposalStatus !== RequestProposalStatus.TO_CORRECT &&
    proposalStatus !== // этого условия не было
      RequestProposalStatus.OFFER_CONDITIONS_REJECTED

  return (
    <div className={classNames.root}>
      <div className={cx(classNames.mainWrapper, { [classNames.mainWrapperShowChatInfo]: isShowChatInfo })}>
        <div className={cx(classNames.mainSubWrapper, { [classNames.mainSubWrapperShowChatInfo]: isShowChatInfo })}>
          <div className={classNames.header}>
            <p className={classNames.headerText}>{t(TranslationKey.Request)}</p>

            {message.humanFriendlyId ? (
              <div className={classNames.idWrapper}>
                <p className={cx(classNames.idText, classNames.idTitle)}>{t(TranslationKey.ID)}</p>
                <p className={classNames.idText}>{message.humanFriendlyId}</p>
              </div>
            ) : null}
          </div>

          <p className={classNames.descriptionText}>{message.data.request?.title}</p>

          {/* <Typography className={classNames.descriptionText}>{message.data.request.details.conditions}</Typography> */}

          {/* <CustomTextEditor
                readOnly
                conditions={message.data.request?.details?.conditions}
                changeConditions={undefined}
                editorMaxHeight={undefined}
                verticalResize={undefined}
                textToCheck={undefined}
              /> */}

          <div className={classNames.infosWrapper}>
            <LabelValuePairBlock
              label={t(TranslationKey.Deadline)}
              value={formatNormDateTime(message.data.request.timeoutAt)}
              bgColor="green"
              rootClasses={cx(classNames.labelValueBlock, { [classNames.labelValueBlockShowChatInfo]: isShowChatInfo })}
            />

            <LabelValuePairBlock
              label={t(TranslationKey['Request price'])}
              value={<p className={classNames.accentText}>{toFixedWithDollarSign(message.data.request.price, 2)}</p>}
              bgColor="green"
              rootClasses={cx(classNames.labelValueBlock, { [classNames.labelValueBlockShowChatInfo]: isShowChatInfo })}
            />

            <LabelValuePairBlock
              label={t(TranslationKey['Product price'])}
              value={
                <div className={classNames.priceAmazonWrapper}>
                  <p className={classNames.cashBackPrice}>
                    {`$ ${toFixed(
                      message.data.request.priceAmazon -
                        (message.data.request.priceAmazon * message.data.request.cashBackInPercent) / 100,
                      2,
                    )}`}
                  </p>

                  <p className={classNames.redText}>{`$ ${toFixed(message.data.request.priceAmazon, 2)}`}</p>
                </div>
              }
              bgColor="green"
              rootClasses={cx(classNames.labelValueBlock, { [classNames.labelValueBlockShowChatInfo]: isShowChatInfo })}
            />

            <LabelValuePairBlock
              label={'CashBack'}
              value={
                <p className={classNames.accentText}>
                  {`$ ${toFixed((message.data.request.priceAmazon * message.data.request.cashBackInPercent) / 100, 2)}`}
                </p>
              }
              bgColor="green"
              rootClasses={cx(classNames.labelValueBlock, { [classNames.labelValueBlockShowChatInfo]: isShowChatInfo })}
            />
          </div>

          <p className={classNames.fieldLabel}>{t(TranslationKey['Photos and documents']) + ':'}</p>

          <PhotoAndFilesSlider
            smallSlider={!isMobileResolution}
            column={isShowChatInfo || isMobileResolution}
            files={message.data.request?.media?.map(el => el.fileLink)}
          />
        </div>

        <Divider
          orientation={isShowChatInfo ? 'horizontal' : 'vertical'}
          className={cx(classNames.divider, { [classNames.dividerShowChatInfo]: isShowChatInfo })}
        />

        <div className={cx(classNames.mainSubWrapper, { [classNames.mainSubWrapperShowChatInfo]: isShowChatInfo })}>
          <div className={classNames.header}>
            <p className={classNames.headerText}>{t(TranslationKey.Proposal)}</p>
            <p className={classNames.timeText}>{formatDateOnlyTime(message.createdAt)}</p>
          </div>

          <p className={classNames.descriptionText}>{message.data.proposal.comment}</p>

          <div className={classNames.infosWrapper}>
            <LabelValuePairBlock
              label={t(TranslationKey.Time)}
              value={<p className={classNames.accentText}>{minsToTime(message.data.proposal.execution_time)}</p>}
              bgColor="green"
              rootClasses={cx(classNames.labelValueBlock, { [classNames.labelValueBlockShowChatInfo]: isShowChatInfo })}
            />

            <LabelValuePairBlock
              label={t(TranslationKey['Request price'])}
              labelClasses={classNames.blackText}
              value={
                <p className={cx(classNames.accentText, classNames.blackText)}>
                  {toFixedWithDollarSign(message.data.proposal.price, 2)}
                </p>
              }
              bgColor="yellow"
              rootClasses={cx(classNames.labelValueBlock, { [classNames.labelValueBlockShowChatInfo]: isShowChatInfo })}
            />
          </div>

          <p className={classNames.fieldLabel}>{t(TranslationKey['Photos and documents']) + ':'}</p>

          <PhotoAndFilesSlider
            smallSlider={!isMobileResolution}
            column={isShowChatInfo || isMobileResolution}
            files={message.data.proposal.linksToMediaFiles}
          />
        </div>
      </div>

      {isShowButtons ? (
        <div className={classNames.btnsWrapper}>
          {isRejectButton && (
            <Button
              danger
              className={cx(classNames.actionButton /* , classNames.editButton */)}
              onClick={() =>
                handlers.onClickProposalRegect(
                  chatRequestAndRequestProposal.requestProposal?.proposal
                    ._id /* handlers.onClickProposalRegect(message.data.proposal._id */,
                )
              }
            >
              {t(TranslationKey.Reject)}
            </Button>
          )}
          <Button
            success
            className={cx(classNames.actionButton /* , classNames.successBtn */)}
            onClick={() => handlers.onClickProposalAccept(message.data.proposal._id, message.data.proposal.price)}
          >
            {`${t(TranslationKey['Order for'])} ${toFixedWithDollarSign(message.data.proposal.price, 2)}`}
          </Button>
        </div>
      ) : null}
    </div>
  )
}
