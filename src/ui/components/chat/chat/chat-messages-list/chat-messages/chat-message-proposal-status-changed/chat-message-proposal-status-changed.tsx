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

import { useStyles } from './chat-message-proposal-status-changed.style'

import { LabelValuePairBlock } from '../label-value-pair-block'

interface Props {
  message: ChatMessageContract<ChatMessageDataProposalStatusChangedContract>
  isShowChatInfo?: boolean
}

export const ChatMessageProposalStatusChanged: FC<Props> = ({ message, isShowChatInfo }) => {
  const { classes: styles, cx } = useStyles()
  const { isMobileResolution } = useCreateBreakpointResolutions()

  if (message.data.status === RequestProposalStatus.OFFER_CONDITIONS_ACCEPTED) {
    return (
      <div className={styles.root}>
        <p className={styles.statusTextDesciption}>
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
          <div className={styles.detailsWrapper}>
            <div className={styles.headerAndTimeWrapper}>
              <p className={styles.titleText}>{`${t(TranslationKey['Sent for rework'])}`.toUpperCase()}</p>

              <p className={styles.timeText}>{formatDateTimeHourAndMinutes(message.createdAt)}</p>
            </div>

            {message?.data?.reason ? <p className={styles.reasonText}>{message?.data?.reason}</p> : null}

            {message.data?.linksToMediaFiles?.length > 0 && (
              <PhotoAndFilesSlider
                alignLeft
                smallSlider
                column={isShowChatInfo || isMobileResolution}
                files={message.data.linksToMediaFiles}
              />
            )}

            <div className={cx(styles.footerWrapper, { [styles.footerWrapperShowChatInfo]: isShowChatInfo })}>
              <div className={styles.labelValueBlockWrapper}>
                <p className={styles.reasonText}>{`${t(TranslationKey['Time for rework'])}: `}</p>

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
    <div className={styles.root}>
      <div className={styles.statusTextDesciption}>
        {`${t(TranslationKey['New proposal status'])}:`}
        <span className={styles.statusText} style={{ color: colorByStatus(message.data.status) }}>
          {MyRequestStatusTranslate(message.data.status)}
        </span>
      </div>

      {renderDetails()}
    </div>
  )
}
