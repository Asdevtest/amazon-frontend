import { cx } from '@emotion/css'
import { FC, useContext } from 'react'
import Linkify from 'react-linkify-always-blank'

import { Divider } from '@mui/material'

import { RequestProposalStatus } from '@constants/requests/request-proposal-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { ChatMessageDataCreateNewBloggerProposalContract } from '@models/chat-model/contracts/chat-message-data.contract'
import { ChatMessageContract } from '@models/chat-model/contracts/chat-message.contract'
import { UserModel } from '@models/user-model'

import { Button } from '@components/shared/buttons/button'
import { CustomTextEditor } from '@components/shared/custom-text-editor'
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
}

export const ChatMessageCreateNewBloggerProposal: FC<Props> = ({ message, handlers }) => {
  const { classes: classNames } = useClassNames()

  const chatRequestAndRequestProposal = useContext(ChatRequestAndRequestProposalContext)

  const curUserId: string | undefined = UserModel.masterUserId || UserModel.userId

  return (
    <div className={classNames.root}>
      <div className={classNames.mainWrapper}>
        <p className={classNames.timeText}>{formatDateOnlyTime(message.createdAt)}</p>

        <div className={classNames.mainSubWrapper}>
          <div className={classNames.massageHeaderWrapper}>
            <p className={classNames.headerText}>{t(TranslationKey.Request)}</p>

            {!!message.humanFriendlyId && (
              <div className={classNames.idWrapper}>
                <p className={cx(classNames.idText, classNames.idTitle)}>{t(TranslationKey.ID)}</p>
                <p className={classNames.idText}>{message.humanFriendlyId}</p>
              </div>
            )}
          </div>

          <div className={classNames.paragraphWrapper}>
            <Linkify>
              {/* <Typography className={classNames.descriptionText}>{message.data.request.details.conditions}</Typography> */}

              <CustomTextEditor
                readOnly
                conditions={message.data.request.details.conditions}
                changeConditions={undefined}
                editorMaxHeight={undefined /* classNames.editorMaxHeight */}
                verticalResize={undefined}
                textToCheck={undefined}
              />
            </Linkify>
          </div>

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
                value={<p className={classNames.accentText}>{toFixedWithDollarSign(message.data.request.price, 2)}</p>}
                bgColor="green"
              />
            </div>

            <div className={cx(classNames.labelValueBlockWrapper /* , classNames.labelValueBlockWrapperNotFirst */)}>
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
              />
            </div>

            <div className={classNames.labelValueBlockWrapper}>
              <LabelValuePairBlock
                label={'CashBack'}
                value={
                  <p className={classNames.accentText}>
                    {`$ ${toFixed(
                      (message.data.request.priceAmazon * message.data.request.cashBackInPercent) / 100,
                      2,
                    )}`}
                  </p>
                }
                bgColor="green"
              />
            </div>
          </div>

          <p className={classNames.fieldLabel}>{t(TranslationKey['Photos and documents']) + ':'}</p>

          <PhotoAndFilesSlider
            column
            files={message.data.request?.media?.map(el => el.fileLink)}
            customGap={20}
            customSlideHeight={80}
          />
        </div>

        <Divider orientation="vertical" className={classNames.divider} />

        <div className={classNames.mainSubWrapper}>
          <p className={classNames.headerText}>{t(TranslationKey.Proposal)}</p>

          <div className={classNames.paragraphWrapper}>
            <Linkify>
              <p className={classNames.descriptionText}>{message.data.proposal.comment}</p>
            </Linkify>
          </div>

          <div className={classNames.infosWrapper}>
            <div className={classNames.labelValueBlockWrapper}>
              <LabelValuePairBlock
                label={t(TranslationKey.Time)}
                value={<p className={classNames.accentText}>{minsToTime(message.data.proposal.execution_time)}</p>}
                bgColor="green"
              />
            </div>

            <div className={cx(classNames.labelValueBlockWrapper /* , classNames.labelValueBlockWrapperNotFirst */)}>
              <LabelValuePairBlock
                label={t(TranslationKey['Request price'])}
                labelClasses={classNames.blackText}
                value={
                  <p className={cx(classNames.accentText, classNames.blackText)}>
                    {toFixedWithDollarSign(message.data.proposal.price, 2)}
                  </p>
                }
                bgColor="yellow"
              />
            </div>
          </div>

          <p className={classNames.fieldLabel}>{t(TranslationKey['Photos and documents']) + ':'}</p>

          <PhotoAndFilesSlider
            column
            files={message.data.proposal.linksToMediaFiles}
            customGap={20}
            customSlideHeight={80}
          />
        </div>
      </div>

      <div className={classNames.footerWrapper}>
        {curUserId === chatRequestAndRequestProposal.request?.request?.createdBy?._id &&
        (chatRequestAndRequestProposal.requestProposal?.proposal?.status === RequestProposalStatus.CREATED ||
          chatRequestAndRequestProposal.requestProposal?.proposal?.status === // этого условия не было
            RequestProposalStatus.OFFER_CONDITIONS_REJECTED ||
          chatRequestAndRequestProposal.requestProposal?.proposal?.status ===
            RequestProposalStatus.OFFER_CONDITIONS_CORRECTED) ? (
          <div className={classNames.btnsWrapper}>
            {chatRequestAndRequestProposal.requestProposal?.proposal?.status !== RequestProposalStatus.TO_CORRECT &&
              chatRequestAndRequestProposal.requestProposal?.proposal?.status !== // этого условия не было
                RequestProposalStatus.OFFER_CONDITIONS_REJECTED && (
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
        ) : undefined}
      </div>
    </div>
  )
}
