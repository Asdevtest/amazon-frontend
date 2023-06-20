import { cx } from '@emotion/css'
import { Typography } from '@mui/material'

import React, { FC, useContext } from 'react'

import Linkify from 'react-linkify-always-blank'

import { RequestProposalStatus } from '@constants/requests/request-proposal-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { ChatMessageDataProposalResultEditedContract } from '@models/chat-model/contracts/chat-message-data.contract'
import { ChatMessageContract } from '@models/chat-model/contracts/chat-message.contract'
import { UserModel } from '@models/user-model'

import { Button } from '@components/shared/buttons/button'
import { PhotoAndFilesCarousel } from '@components/shared/photo-and-files-carousel'

import { formatDateTimeHourAndMinutes } from '@utils/date-time'
import { t } from '@utils/translations'

import { ChatRequestAndRequestProposalContext } from '@contexts/chat-request-and-request-proposal-context'

import { useClassNames } from './chat-message-request-proposal-result-edited.style'

export interface ChatMessageRequestProposalResultEditedHandlers {
  onClickProposalResultToCorrect: (proposalId: string) => void
  onClickProposalResultAccept: (proposalId: string) => void
}

interface Props {
  isLastMessage: boolean
  message: ChatMessageContract<ChatMessageDataProposalResultEditedContract>
  handlers: ChatMessageRequestProposalResultEditedHandlers
}

export const ChatMessageRequestProposalResultEdited: FC<Props> = ({ message, isLastMessage, handlers }) => {
  const { classes: classNames } = useClassNames()
  const proposal = message.data.proposal

  const chatRequestAndRequestProposal = useContext(ChatRequestAndRequestProposalContext)

  const curUserId: string | undefined = UserModel.masterUserId || UserModel.userId

  return (
    <div className={classNames.root}>
      <div className={classNames.headerAndTimeWrapper}>
        <div>
          <Typography className={classNames.headerText}>{t(TranslationKey.Result)}</Typography>
        </div>
        <div className={classNames.timeWrapper}>
          <Typography className={classNames.timeText}>{formatDateTimeHourAndMinutes(message.createdAt)}</Typography>
        </div>
      </div>
      <div className={classNames.mainInfoWrapper}>
        {/* <div className={classNames.titleWrapper}>
          <p className={classNames.titleText}>{message.data.request.title}</p>
        </div> */}
        <div className={classNames.descriptionWrapper}>
          <Linkify>
            <Typography className={classNames.descriptionText}>{}</Typography>
          </Linkify>
        </div>
      </div>
      <div>
        <Linkify>
          <Typography className={classNames.resultText}>{message.data.edited.result}</Typography>
        </Linkify>
      </div>
      <div className={classNames.resultWrapper}>
        <PhotoAndFilesCarousel
          notToShowEmpty
          small
          // files={message.data.edited.linksToMediaFiles?.map(el => (typeof el === 'object' ? el.fileLink : el))}
          files={message.data?.edited?.media?.map(el => (typeof el === 'object' ? el.fileLink : el))}
          width="340px"
          withoutPhotos={undefined}
          whithoutFiles={undefined}
          imagesForLoad={undefined}
          isEditable={undefined}
          withoutMakeMainImage={undefined}
          onChangeImagesForLoad={undefined}
        />

        <div>
          <div className={classNames.timeToCheckBlockWrapper}>
            <Typography className={classNames.timeToCheckBlockLabelText}>
              {t(TranslationKey['Time to check'])}
            </Typography>
            <div className={classNames.timeToCheckBlockValueWrapper}>
              <Typography className={classNames.timeToCheckBlockValueText}>{`24 ${t(TranslationKey.hour)} 00 ${t(
                TranslationKey.minute,
              )}`}</Typography>
            </div>
          </div>
        </div>
      </div>
      <div className={classNames.footerWrapper}>
        {chatRequestAndRequestProposal &&
        (chatRequestAndRequestProposal.requestProposal?.proposal?.status ===
          RequestProposalStatus.OFFER_CONDITIONS_ACCEPTED ||
          chatRequestAndRequestProposal.requestProposal?.proposal?.status === RequestProposalStatus.READY_TO_VERIFY ||
          chatRequestAndRequestProposal.requestProposal?.proposal?.status !== RequestProposalStatus.TO_CORRECT) &&
        curUserId &&
        isLastMessage &&
        message.data.needApproveBy?.includes(curUserId) ? (
          <div className={classNames.btnsWrapper}>
            {chatRequestAndRequestProposal.requestProposal?.proposal?.status !== RequestProposalStatus.TO_CORRECT && (
              <Button
                variant="contained"
                color="primary"
                className={cx(classNames.actionButton, classNames.editButton)}
                onClick={() => handlers.onClickProposalResultToCorrect(proposal._id)}
              >
                {t(TranslationKey['Send in for rework'])}
              </Button>
            )}
            <Button
              variant="contained"
              color="primary"
              btnWrapperStyle={classNames.actionBtnWrapperStyleNotFirst}
              className={cx(classNames.actionButton, classNames.successBtn)}
              onClick={() => handlers.onClickProposalResultAccept(proposal._id)}
            >
              {t(TranslationKey.Receive)}
            </Button>
          </div>
        ) : undefined}

        {/* {chatRequestAndRequestProposal.requestProposal?.proposal?.status !== 'ACCEPTED_BY_CLIENT' && (
          <div className={classNames.btnEditWrapper}>
            <Button
              variant="contained"
              color="primary"

            >
              Редактировать
            </Button>
          </div>
        )} */}
      </div>
    </div>
  )
}
