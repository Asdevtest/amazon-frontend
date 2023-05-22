import { cx } from '@emotion/css'
import { Typography } from '@mui/material'

import React, { FC, useContext } from 'react'

import { RequestProposalStatus } from '@constants/requests/request-proposal-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { ChatMessageDataProposalStatusChangedContract } from '@models/chat-model/contracts/chat-message-data.contract'
import { ChatMessageContract } from '@models/chat-model/contracts/chat-message.contract'
import { UserModel } from '@models/user-model'

import { RequestStatusCell } from '@components/data-grid/data-grid-cells/data-grid-cells'
import { Button } from '@components/shared/buttons/button'
import { PhotoAndFilesCarousel } from '@components/shared/photo-and-files-carousel'

import { formatDateTime, formatDateTimeHourAndMinutes } from '@utils/date-time'
import { minsToTime } from '@utils/text'
import { t } from '@utils/translations'

import { ChatRequestAndRequestProposalContext } from '@contexts/chat-request-and-request-proposal-context'

import { LabelValuePairBlock } from '../label-value-pair-block'
import { useClassNames } from './chat-message-proposal-status-changed.style'

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
              <div>
                <p className={classNames.titleText}>{`${t(TranslationKey['Sent for rework'])}`.toUpperCase()}</p>
              </div>

              <div className={classNames.timeWrapper}>
                <Typography className={classNames.timeText}>
                  {formatDateTimeHourAndMinutes(message.createdAt)}
                </Typography>
              </div>
            </div>
            <div className={classNames.reasonWrapper}>
              <p className={classNames.reasonText}>{message?.data?.reason}</p>
            </div>

            {message.data?.linksToMediaFiles?.length > 0 && (
              <PhotoAndFilesCarousel
                notToShowEmpty
                small
                files={message.data.linksToMediaFiles}
                width="340px"
                withoutPhotos={undefined}
                whithoutFiles={undefined}
                imagesForLoad={undefined}
                isEditable={undefined}
                withoutMakeMainImage={undefined}
                onChangeImagesForLoad={undefined}
              />
            )}

            <div className={classNames.footerWrapper}>
              <div className={classNames.footerRow}>
                {message.data.timeLimitInMinutes ? (
                  <div className={classNames.labelValueBlockWrapper}>
                    <p className={classNames.reasonText}>{`${t(TranslationKey['Time for rework'])}: `}</p>

                    <LabelValuePairBlock
                      label={undefined}
                      value={minsToTime(message.data.timeLimitInMinutes)}
                      bgColor="green"
                    />
                  </div>
                ) : undefined}

                {isLastMessage && curUserId !== chatRequestAndRequestProposal.request?.request?.createdBy?._id && (
                  <Button
                    className={cx(classNames.actionButton /* , classNames.editBtn */)}
                    onClick={handlers.onClickReworkProposal}
                  >
                    {t(TranslationKey.Refine)}
                  </Button>
                )}
              </div>
            </div>
          </div>
        )
      case RequestProposalStatus.CORRECTED:
        return <div></div>
      // <div className={classNames.detailsWrapper}>
      //   <div className={classNames.headerAndTimeWrapper}>
      //     <div className={classNames.titleWrapper}>
      //       <Typography className={classNames.titleText}>
      //         {`${t(TranslationKey.Corrections)}`.toUpperCase()}
      //       </Typography>
      //     </div>

      //     <div className={classNames.timeWrapper}>
      //       <Typography className={classNames.timeText}>
      //         {formatDateTimeHourAndMinutes(message.createdAt)}
      //       </Typography>
      //     </div>
      //   </div>
      //   <div className={classNames.reasonWrapper}>
      //     <Linkify>
      //       <Typography className={classNames.reasonText}>{message.data.reason}</Typography>
      //     </Linkify>
      //   </div>

      //   <PhotoAndFilesCarousel
      //     notToShowEmpty
      //     small
      //     files={message.data.linksToMediaFiles}
      //     width="340px"
      //     withoutPhotos={undefined}
      //     whithoutFiles={undefined}
      //   />

      //   <div className={classNames.footerWrapper}>
      //     {curUserId === chatRequestAndRequestProposal.request?.request?.createdBy?._id &&
      //     isLastMessage &&
      //     chatRequestAndRequestProposal &&
      //     (chatRequestAndRequestProposal.requestProposal?.proposal?.status === RequestProposalStatus.CORRECTED ||
      //       chatRequestAndRequestProposal.requestProposal?.proposal?.status ===
      //         RequestProposalStatus.OFFER_CONDITIONS_ACCEPTED ||
      //       chatRequestAndRequestProposal.requestProposal?.proposal?.status ===
      //         RequestProposalStatus.READY_TO_VERIFY) &&
      //     curUserId ? (
      //       <div className={classNames.btnsWrapper}>
      //         {chatRequestAndRequestProposal.requestProposal?.proposal?.status !==
      //           RequestProposalStatus.TO_CORRECT && (
      //           <Button
      //             color="primary"
      //             btnWrapperStyle={classNames.actionBtnWrapperStyle}
      //             className={cx(classNames.actionButton, classNames.editBtn)}
      //             onClick={() =>
      //               chatRequestAndRequestProposal.requestProposal &&
      //               handlers.onClickProposalResultToCorrect(
      //                 chatRequestAndRequestProposal.requestProposal.proposal._id,
      //               )
      //             }
      //           >
      //             {t(TranslationKey['Send in for rework'])}
      //           </Button>
      //         )}
      //         <Button
      //           color="primary"
      //           btnWrapperStyle={cx(classNames.actionBtnWrapperStyle, classNames.actionBtnWrapperStyleNotFirst)}
      //           className={cx(classNames.actionButton, classNames.successBtn)}
      //           onClick={() =>
      //             chatRequestAndRequestProposal.requestProposal &&
      //             handlers.onClickProposalResultAccept(chatRequestAndRequestProposal.requestProposal.proposal._id)
      //           }
      //         >
      //           {t(TranslationKey.Receive)}
      //         </Button>
      //       </div>
      //     ) : undefined}
      //   </div>
      // </div>
    }
  }

  return (
    <div className={classNames.root}>
      <div>
        <p className={classNames.statusTextDesciption}>
          {`${t(TranslationKey['New proposal status'])}:`}
          <span className={classNames.statusText}>
            <RequestStatusCell isChat status={message.data.status} />
          </span>
        </p>
      </div>
      {renderDetails()}
    </div>
  )
}
