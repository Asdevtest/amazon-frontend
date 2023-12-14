import { FC } from 'react'

import { MyRequestStatusTranslate, RequestProposalStatus } from '@constants/requests/request-proposal-status'
import { colorByStatus } from '@constants/requests/request-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { ChatMessageDataProposalStatusChangedContract } from '@models/chat-model/contracts/chat-message-data.contract'
import { ChatMessageContract } from '@models/chat-model/contracts/chat-message.contract'

import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'

import { formatDateTimeHourAndMinutes, formatNormDateTime } from '@utils/date-time'
import { minsToTime } from '@utils/text'
import { t } from '@utils/translations'

import { useCreateBreakpointResolutions } from '@hooks/use-create-breakpoint-resolutions'

import { useClassNames } from './chat-message-proposal-status-changed.style'

import { LabelValuePairBlock } from '../label-value-pair-block'

interface Props {
  message: ChatMessageContract<ChatMessageDataProposalStatusChangedContract>
  isShowChatInfo?: boolean
}

export const ChatMessageProposalStatusChanged: FC<Props> = ({ message, isShowChatInfo }) => {
  const { classes: classNames, cx } = useClassNames()
  const { isMobileResolution } = useCreateBreakpointResolutions()

  if (message.data.status === RequestProposalStatus.OFFER_CONDITIONS_ACCEPTED) {
    return (
      <div className={classNames.root}>
        <p className={classNames.statusTextDesciption}>
          {`${t(TranslationKey['The proposal is accepted by the Client and taken on work'])} ${formatNormDateTime(
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
              <PhotoAndFilesSlider
                alignLeft
                smallSlider
                column={isShowChatInfo || isMobileResolution}
                files={message.data.linksToMediaFiles}
              />
            )}

            <div className={cx(classNames.footerWrapper, { [classNames.footerWrapperShowChatInfo]: isShowChatInfo })}>
              <div className={classNames.labelValueBlockWrapper}>
                <p className={classNames.reasonText}>{`${t(TranslationKey['Time for rework'])}: `}</p>

                <LabelValuePairBlock
                  label={undefined}
                  value={minsToTime(message.data.timeLimitInMinutes)}
                  bgColor="green"
                />
              </div>
            </div>
          </div>
        )
      case RequestProposalStatus.CORRECTED:
        return null
    }
  }

  return (
    <div className={classNames.root}>
      <div className={classNames.statusTextDesciption}>
        {`${t(TranslationKey['New proposal status'])}:`}
        <span className={classNames.statusText} style={{ color: colorByStatus(message.data.status) }}>
          {MyRequestStatusTranslate(message.data.status)}
        </span>
      </div>

      {renderDetails()}
    </div>
  )
}
