import { cx } from '@emotion/css'
import { FC } from 'react'
import Linkify from 'react-linkify-always-blank'

import { Avatar } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { ChatMessageDataDesignerProposalResultEditedContract } from '@models/chat-model/contracts/chat-message-data.contract'
import { ChatMessageContract } from '@models/chat-model/contracts/chat-message.contract'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field'

import { checkIsImageLink } from '@utils/checks'
import { formatDateOnlyTime } from '@utils/date-time'
import { minsToTime } from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from './chat-message-designer-proposal-edited-result.style'

export interface ChatMessageRequestProposalDesignerResultEditedHandlers {
  onClickOpenRequest: (
    media: {
      commentByClient: string | null
      commentByPerformer: string | null
      fileLink: string
      _id: string
    }[],
  ) => void
}

interface Props {
  message: ChatMessageContract<ChatMessageDataDesignerProposalResultEditedContract>
  handlers: ChatMessageRequestProposalDesignerResultEditedHandlers
}

export const ChatMessageDesignerProposalEditedResult: FC<Props> = ({ message, handlers }) => {
  const { classes: classNames } = useClassNames()

  // const chatRequestAndRequestProposal = useContext(ChatRequestAndRequestProposalContext)

  // const curUserId: string | undefined = UserModel.masterUserId || UserModel.userId

  return (
    <div className={classNames.root}>
      <div className={classNames.mainWrapper}>
        <p className={classNames.timeText}>{formatDateOnlyTime(message.createdAt)}</p>

        <p className={classNames.headerText}>{t(TranslationKey.Result).toUpperCase()}</p>

        <div className={classNames.infosWrapper}>
          <Linkify>
            <p className={classNames.descriptionText}>{message.data.proposal?.details?.result}</p>
            {/* <Typography className={classNames.descriptionText}>
              {chatRequestAndRequestProposal?.requestProposal?.details.result}
            </Typography> */}
          </Linkify>

          <div className={classNames.imagesWrapper}>
            {message.data.proposal.media
              ?.slice(0, 4)
              .map(el => el.fileLink)
              .map((item, index) => (
                <div key={index} className={classNames.imageObjWrapper}>
                  <div className={cx(classNames.imageWrapper, { [classNames.mainImageWrapper]: index === 0 })}>
                    {index === 0 && <img src="/assets/icons/star-main.svg" className={classNames.mainStarIcon} />}

                    {index === 3 && message.data.proposal.media.length > 4 && (
                      <div className={classNames.moreImagesWrapper}>
                        <p className={classNames.moreImagesText}>{`${message.data.proposal.media.length - 4}`}</p>
                      </div>
                    )}

                    <div className={classNames.imageListItem}>
                      <Avatar
                        className={classNames.image}
                        classes={{ img: classNames.image }}
                        src={checkIsImageLink(item) ? item : '/assets/icons/file.png'}
                        alt={''}
                        variant="square"
                        // onClick={() => {
                        //   setCurImageId(item._id)
                        //   setShowImageModal(!showImageModal)
                        // }}
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className={classNames.footerWrapper}>
        <div className={classNames.footerSubWrapper}>
          <Field
            labelClasses={classNames.fieldLabel}
            label={t(TranslationKey['Time to check'])}
            containerClasses={classNames.containerField}
            inputComponent={
              <p className={cx(classNames.simpleSpan /* , classNames.textMargin */)}>{minsToTime(1440)}</p>
            }
          />
          <Field
            labelClasses={classNames.fieldLabel}
            label={t(TranslationKey['Number of illustrations'])}
            containerClasses={classNames.containerField}
            inputComponent={
              <p className={cx(classNames.simpleSpan /* , classNames.textMargin */)}>
                {message.data.proposal.media?.length}
              </p>
            }
          />
          <Field
            labelClasses={classNames.fieldLabel}
            label={'ASIN'}
            containerClasses={classNames.containerField}
            inputComponent={
              <p className={cx(classNames.simpleSpan /* , classNames.textMargin */)}>
                <a target="_blank" rel="noreferrer" href={`https://www.amazon.com/dp/${message.data.request.asin}`}>
                  <span className={classNames.linkSpan}>{message.data.request.asin}</span>
                </a>
              </p>
            }
          />
        </div>

        <Button
          className={cx(classNames.actionButton, classNames.editButton)}
          onClick={() => handlers.onClickOpenRequest(message.data.proposal.media)}
        >
          {t(TranslationKey['Open result'])}
        </Button>

        {/* {curUserId === chatRequestAndRequestProposal.request?.request?.createdBy?._id &&
        chatRequestAndRequestProposal &&
        (chatRequestAndRequestProposal.requestProposal?.proposal?.status ===
          RequestProposalStatus.OFFER_CONDITIONS_ACCEPTED ||
          chatRequestAndRequestProposal.requestProposal?.proposal?.status === RequestProposalStatus.READY_TO_VERIFY) &&
        curUserId  ? (
          <div className={classNames.btnsWrapper}>
            {chatRequestAndRequestProposal.requestProposal?.proposal?.status !== RequestProposalStatus.TO_CORRECT && (
              <Button
                btnWrapperStyle={classNames.actionBtnWrapperStyle}
                className={cx(classNames.actionButton, classNames.editButton)}
                onClick={() => handlers.onClickProposalResultToCorrect(message.data.proposal._id)}
              >
                {t(TranslationKey['Send in for rework'])}
              </Button>
            )}
            <Button
              success
              btnWrapperStyle={cx(classNames.actionBtnWrapperStyle, classNames.actionBtnWrapperStyleNotFirst)}
              className={cx(classNames.actionButton, classNames.successBtn)}
              onClick={() => handlers.onClickProposalResultAccept(message.data.proposal._id)}
            >
              {t(TranslationKey.Receive)}
            </Button>
          </div>
        ) : undefined} */}
      </div>
    </div>
  )
}
