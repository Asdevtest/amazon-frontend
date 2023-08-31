import { cx } from '@emotion/css'
import { FC, useContext } from 'react'

import { RequestProposalStatus } from '@constants/requests/request-proposal-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { ChatMessageDataProposalStatusChangedContract } from '@models/chat-model/contracts/chat-message-data.contract'
import { ChatMessageContract } from '@models/chat-model/contracts/chat-message.contract'
import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'

import { RequestStatusCell } from '@components/data-grid/data-grid-cells/data-grid-cells'
import { Button } from '@components/shared/buttons/button'
import { PhotoAndFilesCarouselTest } from '@components/shared/photo-and-files-carousel-test'

import { formatDateTime, formatDateTimeHourAndMinutes } from '@utils/date-time'
import { minsToTime } from '@utils/text'
import { t } from '@utils/translations'

import { ChatRequestAndRequestProposalContext } from '@contexts/chat-request-and-request-proposal-context'

import { useClassNames } from './chat-message-proposal-status-changed.style'

import { LabelValuePairBlock } from '../label-value-pair-block'

export interface ChatMessageRequestProposalStatusChangedHandlers {
  onClickProposalResultToCorrect: (proposalId: string) => void
  onClickProposalResultAccept: (proposalId: string) => void
  onClickReworkProposal: () => void
}

interface Props {
  isLastMessage: boolean
  message: ChatMessageContract<ChatMessageDataProposalStatusChangedContract>
  handlers: ChatMessageRequestProposalStatusChangedHandlers
}

export const ChatMessageProposalStatusChanged: FC<Props> = ({ message, handlers, isLastMessage }) => {
  const { classes: classNames } = useClassNames()

  const chatRequestAndRequestProposal = useContext(ChatRequestAndRequestProposalContext)

  const curUserId: string | undefined = UserModel.masterUserId || UserModel.userId
  const isShowButton = isLastMessage && curUserId !== chatRequestAndRequestProposal.request?.request?.createdBy?._id
  const isShowFooter = isShowButton || !!message.data.timeLimitInMinutes

  if (message.data.status === RequestProposalStatus.OFFER_CONDITIONS_ACCEPTED) {
    return (
      <div className={classNames.root}>
        <p className={classNames.statusTextDesciption}>
          {`${t(TranslationKey['The proposal is accepted by the Client and taken on work'])} ${formatDateTime(
            message.createdAt,
          )}`}
        </p>
      </div>
    )
  }

  const renderDetails = () => {
    switch (message.data.status) {
      case RequestProposalStatus.TO_CORRECT:
        return (
          <div className={classNames.detailsWrapper}>
            <div className={classNames.headerAndTimeWrapper}>
              <p className={classNames.titleText}>{`${t(TranslationKey['Sent for rework'])}`.toUpperCase()}</p>

              <p className={classNames.timeText}>{formatDateTimeHourAndMinutes(message.createdAt)}</p>
            </div>

            {message?.data?.reason ? <p className={classNames.reasonText}>{message?.data?.reason}</p> : null}

            {message.data?.linksToMediaFiles?.length > 0 && (
              <PhotoAndFilesCarouselTest files={message.data.linksToMediaFiles} customGap={20} customSlideHeight={80} />
            )}

            {isShowFooter ? (
              <div className={classNames.footerWrapper}>
                {message.data.timeLimitInMinutes ? (
                  <div className={classNames.labelValueBlockWrapper}>
                    <p className={classNames.reasonText}>{`${t(TranslationKey['Time for rework'])}: `}</p>

                    <LabelValuePairBlock
                      label={undefined}
                      value={minsToTime(message.data.timeLimitInMinutes)}
                      bgColor="green"
                    />
                  </div>
                ) : null}

                {isShowButton && (
                  <Button
                    className={cx(classNames.actionButton /* , classNames.editBtn */)}
                    onClick={handlers.onClickReworkProposal}
                  >
                    {t(TranslationKey.Refine)}
                  </Button>
                )}
              </div>
            ) : null}
          </div>
        )
      case RequestProposalStatus.CORRECTED:
        return <div></div>
    }
  }

  return (
    <div className={classNames.root}>
      <div className={classNames.statusTextDesciption}>
        {`${t(TranslationKey['New proposal status'])}:`}
        <span className={classNames.statusText}>
          <RequestStatusCell isChat status={message.data.status} languageTag={SettingsModel.languageTag} />
        </span>
      </div>
      {renderDetails()}
    </div>
  )
}
