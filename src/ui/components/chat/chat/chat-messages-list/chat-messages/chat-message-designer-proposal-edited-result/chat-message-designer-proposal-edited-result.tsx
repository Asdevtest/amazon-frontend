import {cx} from '@emotion/css'
import {Avatar, Link, Typography} from '@mui/material'

import React, {FC, useContext} from 'react'

import Linkify from 'react-linkify-always-blank'

import {RequestProposalStatus} from '@constants/request-proposal-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {ChatMessageDataDesignerProposalResultEditedContract} from '@models/chat-model/contracts/chat-message-data.contract'
import {ChatMessageContract} from '@models/chat-model/contracts/chat-message.contract'
import {UserModel} from '@models/user-model'

import {Button} from '@components/buttons/button'
import {CopyValue} from '@components/copy-value'
import {PhotoAndFilesCarousel} from '@components/custom-carousel/custom-carousel'
import {Field} from '@components/field'

import {formatDateOnlyTime} from '@utils/date-time'
import {checkAndMakeAbsoluteUrl, minsToTime} from '@utils/text'
import {t} from '@utils/translations'

import {ChatRequestAndRequestProposalContext} from '@contexts/chat-request-and-request-proposal-context'

import {useClassNames} from './chat-message-designer-proposal-edited-result.style'

export interface ChatMessageRequestProposalDesignerResultEditedHandlers {
  onClickOpenRequest: () => void
}

interface Props {
  message: ChatMessageContract<ChatMessageDataDesignerProposalResultEditedContract>
  handlers: ChatMessageRequestProposalDesignerResultEditedHandlers
}

export const ChatMessageDesignerProposalEditedResult: FC<Props> = ({message, handlers}) => {
  const {classes: classNames} = useClassNames()

  const chatRequestAndRequestProposal = useContext(ChatRequestAndRequestProposalContext)

  const curUserId: string | undefined = UserModel.userId

  // console.log('message.data', message.data)

  console.log('chatRequestAndRequestProposal', chatRequestAndRequestProposal)

  return (
    <div className={classNames.root}>
      <div className={classNames.mainWrapper}>
        <Typography className={classNames.timeText}>{formatDateOnlyTime(message.createdAt)}</Typography>

        <Typography className={classNames.headerText}>{t(TranslationKey.Result).toUpperCase()}</Typography>

        <div className={classNames.infosWrapper}>
          <Linkify>
            <Typography className={classNames.descriptionText}>{message.data.proposal.comment}</Typography>
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
                  <div className={cx(classNames.imageWrapper, {[classNames.mainImageWrapper]: index === 0})}>
                    {index === 0 && <img src="/assets/icons/star-main.svg" className={classNames.mainStarIcon} />}

                    {index === 3 && message.data.proposal.media.length > 4 && (
                      <div className={classNames.moreImagesWrapper}>
                        <Typography className={classNames.moreImagesText}>
                          {`${message.data.proposal.media.length - 4}`}
                        </Typography>
                      </div>
                    )}

                    <div className={classNames.imageListItem}>
                      <Avatar
                        className={classNames.image}
                        classes={{img: classNames.image}}
                        src={
                          item
                          // : '/assets/icons/file.png'
                        }
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
              <Typography className={cx(classNames.simpleSpan /* , classNames.textMargin */)}>
                {minsToTime(1440)}
              </Typography>
            }
          />
          <Field
            labelClasses={classNames.fieldLabel}
            label={t(TranslationKey['Number of illustrations'])}
            containerClasses={classNames.containerField}
            inputComponent={
              <Typography className={cx(classNames.simpleSpan /* , classNames.textMargin */)}>
                {message.data.proposal.media?.length}
              </Typography>
            }
          />
          <Field
            labelClasses={classNames.fieldLabel}
            label={'ASIN'}
            containerClasses={classNames.containerField}
            inputComponent={
              <Typography className={cx(classNames.simpleSpan /* , classNames.textMargin */)}>
                <a target="_blank" rel="noreferrer" href={`https://www.amazon.com/dp/${message.data.request.asin}`}>
                  <span className={classNames.linkSpan}>{message.data.request.asin}</span>
                </a>
              </Typography>
            }
          />
        </div>

        <Button
          btnWrapperStyle={classNames.actionBtnWrapperStyle}
          className={cx(classNames.actionButton, classNames.editButton)}
          onClick={() => handlers.onClickOpenRequest()}
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
