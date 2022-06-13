import InboxIcon from '@mui/icons-material/Inbox'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'

import React, {useState, FC, ReactElement, useContext} from 'react'

import {Grid, Link, Typography} from '@material-ui/core'
import clsx from 'clsx'
import Carousel from 'react-material-ui-carousel'

import {RequestProposalStatus} from '@constants/request-proposal-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {ChatMessageDataProposalResultEditedContract} from '@models/chat-model/contracts/chat-message-data.contract'
import {ChatMessageContract} from '@models/chat-model/contracts/chat-message.contract'
import {UserModel} from '@models/user-model'

import {Button} from '@components/buttons/button'
import {CustomCarousel} from '@components/custom-carousel'
import {PhotoAndFilesCarousel} from '@components/custom-carousel/custom-carousel'
import {BigImagesModal} from '@components/modals/big-images-modal'

import {checkIsImageLink} from '@utils/checks'
import {formatDateTimeHourAndMinutes} from '@utils/date-time'
import {t} from '@utils/translations'

import {ChatRequestAndRequestProposalContext} from '@contexts/chat-request-and-request-proposal-context'

import {useClassNames} from './chat-message-request-proposal-result-edited.style'

export interface ChatMessageRequestProposalResultEditedHandlers {
  onClickProposalResultToCorrect: (proposalId: string) => void
  onClickProposalResultAccept: (proposalId: string) => void
}

interface Props {
  message: ChatMessageContract<ChatMessageDataProposalResultEditedContract>
  handlers: ChatMessageRequestProposalResultEditedHandlers
}

export const ChatMessageRequestProposalResultEdited: FC<Props> = ({message, handlers}) => {
  const classNames = useClassNames()
  const proposal = message.data.proposal

  const chatRequestAndRequestProposal = useContext(ChatRequestAndRequestProposalContext)

  const curUserId: string | undefined = UserModel.userId

  const [showImageModal, setShowImageModal] = useState(false)

  const [bigImagesOptions, setBigImagesOptions] = useState({images: [] as string[], imgIndex: 0})

  const notIsEmptyFile = message.data.edited.linksToMediaFiles?.filter(el => !checkIsImageLink(el))

  console.log(chatRequestAndRequestProposal.requestProposal?.proposal?.status)
  return (
    <div className={classNames.root}>
      <div className={classNames.headerAndTimeWrapper}>
        <div className={classNames.headerWrapper}>
          <p className={classNames.headerText}>Результат</p>
        </div>
        <div className={classNames.timeWrapper}>
          <p className={classNames.timeText}>{formatDateTimeHourAndMinutes(message.updatedAt)}</p>
        </div>
      </div>
      <div className={classNames.mainInfoWrapper}>
        {/* <div className={classNames.titleWrapper}>
          <p className={classNames.titleText}>{message.data.request.title}</p>
        </div> */}
        <div className={classNames.descriptionWrapper}>
          <p className={classNames.descriptionText}>{}</p>
        </div>
      </div>
      <div className={classNames.resultTextWrapper}>
        <p className={classNames.resultText}>{message.data.edited.result}</p>
      </div>
      <div className={classNames.resultWrapper}>
        <PhotoAndFilesCarousel files={message.data.edited.linksToMediaFiles} width="40%" />

        <div className={classNames.resultRightSide}>
          <div className={classNames.timeToCheckBlockWrapper}>
            <p className={classNames.timeToCheckBlockLabelText}>Время на проверку</p>
            <div className={classNames.timeToCheckBlockValueWrapper}>
              <p className={classNames.timeToCheckBlockValueText}>24 ч 00м</p>
            </div>
          </div>
        </div>
      </div>
      <div className={classNames.footerWrapper}>
        {chatRequestAndRequestProposal &&
        (chatRequestAndRequestProposal.requestProposal?.proposal?.status === RequestProposalStatus.CORRECTED ||
          chatRequestAndRequestProposal.requestProposal?.proposal?.status ===
            RequestProposalStatus.OFFER_CONDITIONS_ACCEPTED ||
          chatRequestAndRequestProposal.requestProposal?.proposal?.status === RequestProposalStatus.READY_TO_VERIFY) &&
        curUserId &&
        message.data.needApproveBy?.includes(curUserId) ? (
          <div className={classNames.btnsWrapper}>
            {chatRequestAndRequestProposal.requestProposal?.proposal?.status !== RequestProposalStatus.TO_CORRECT && (
              <Button
                variant="contained"
                color="primary"
                btnWrapperStyle={classNames.actionBtnWrapperStyle}
                className={clsx(classNames.actionButton, classNames.editButton)}
                onClick={() => handlers.onClickProposalResultToCorrect(proposal._id)}
              >
                Отправить на доработку
              </Button>
            )}
            <Button
              variant="contained"
              color="primary"
              btnWrapperStyle={clsx(classNames.actionBtnWrapperStyle, classNames.actionBtnWrapperStyleNotFirst)}
              className={clsx(classNames.actionButton, classNames.successBtn)}
              onClick={() => handlers.onClickProposalResultAccept(proposal._id)}
            >
              Принять
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

      <BigImagesModal
        isAmazone
        openModal={showImageModal}
        setOpenModal={() => setShowImageModal(!showImageModal)}
        images={bigImagesOptions.images}
        imgIndex={bigImagesOptions.imgIndex}
      />
    </div>
  )
}
