import React, {useState, FC, ReactElement} from 'react'

import {Grid} from '@material-ui/core'
import clsx from 'clsx'

import {RequestProposalStatus} from '@constants/request-proposal-status'

import {ChatMessageDataProposalResultEditedContract} from '@models/chat-model/contracts/chat-message-data.contract'
import {ChatMessageContract} from '@models/chat-model/contracts/chat-message.contract'
import {UserModel} from '@models/user-model'

import {Button} from '@components/buttons/button'
import {BigImagesModal} from '@components/modals/big-images-modal'

import {formatNormDateTime} from '@utils/date-time'

import {useClassNames} from './chat-message-request-proposal-result-edited.style'

export interface ChatMessageRequestProposalResultEditedHandlers {
  onClickProposalResultToCorrect: (proposalId: string) => void
  onClickProposalResultAccept: (proposalId: string) => void
}

interface Props {
  message: ChatMessageContract<ChatMessageDataProposalResultEditedContract>
  handlers: ChatMessageRequestProposalResultEditedHandlers
}

const showBtnsAllowedProposalStatuses = [
  RequestProposalStatus.CORRECTED,
  RequestProposalStatus.OFFER_CONDITIONS_ACCEPTED,
  RequestProposalStatus.READY_TO_VERIFY,
]

export const ChatMessageRequestProposalResultEdited: FC<Props> = ({message, handlers}) => {
  const classNames = useClassNames()
  const proposal = message.data.proposal

  const curUserId: string | undefined = UserModel.userId

  const [showImageModal, setShowImageModal] = useState(false)

  const [bigImagesOptions, setBigImagesOptions] = useState({images: [] as string[], imgIndex: 0})

  return (
    <div className={classNames.root}>
      <div className={classNames.headerAndTimeWrapper}>
        <div className={classNames.headerWrapper}>
          <p className={classNames.headerText}>РЕЗУЛЬТАТ</p>
        </div>
        <div className={classNames.timeWrapper}>
          <p className={classNames.timeText}>{formatNormDateTime(message.updatedAt)}</p>
        </div>
      </div>
      <div className={classNames.mainInfoWrapper}>
        <div className={classNames.titleWrapper}>
          <p className={classNames.titleText}>{message.data.request.title}</p>
        </div>
        <div className={classNames.descriptionWrapper}>
          <p className={classNames.descriptionText}>{}</p>
        </div>
      </div>
      <div className={classNames.resultWrapper}>
        <div className={classNames.resultLeftSide}>
          <div className={classNames.resultTextWrapper}>
            <p className={classNames.resultText}>{message.data.edited.result}</p>
          </div>
          <div className={classNames.resultLinksWrapper}>
            {message.data.edited.linksToMediaFiles?.map(
              (link: string, index: number): ReactElement => (
                <div key={`${message.createdAt}_resultLink_${index}`} className={classNames.linkWrapper}>
                  <a href={link}>{`Ссылка №${index}`}</a>
                </div>
              ),
            )}
          </div>

          <Grid container className={classNames.filesWrapper}>
            {message.images.map((file, fileIndex) => (
              <Grid key={fileIndex} item className={classNames.imageWrapper}>
                <img
                  className={classNames.image}
                  src={file}
                  onClick={() => {
                    setShowImageModal(!showImageModal)
                    setBigImagesOptions({images: message.images, imgIndex: fileIndex})
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </div>
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
        {proposal &&
        showBtnsAllowedProposalStatuses.includes(proposal.status) &&
        curUserId &&
        message.data.needApproveBy?.includes(curUserId) ? (
          <div className={classNames.btnsWrapper}>
            <Button
              variant="contained"
              color="primary"
              btnWrapperStyle={classNames.actionBtnWrapperStyle}
              className={clsx(classNames.actionButton, classNames.cancelBtn)}
              onClick={() => handlers.onClickProposalResultToCorrect(proposal._id)}
            >
              Отправить на доработку
            </Button>
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
