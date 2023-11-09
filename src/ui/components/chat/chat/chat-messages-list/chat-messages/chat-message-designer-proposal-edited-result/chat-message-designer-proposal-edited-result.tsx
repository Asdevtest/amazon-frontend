import { cx } from '@emotion/css'
import { FC } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ChatMessageDataDesignerProposalResultEditedContract } from '@models/chat-model/contracts/chat-message-data.contract'
import { ChatMessageContract } from '@models/chat-model/contracts/chat-message.contract'

import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'
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
  isShowChatInfo?: boolean
}

export const ChatMessageDesignerProposalEditedResult: FC<Props> = ({ message, isShowChatInfo, handlers }) => {
  const { classes: classNames } = useClassNames()

  return (
    <div className={classNames.root}>
      <div className={classNames.mainWrapper}>
        <div className={classNames.headerWrapper}>
          <p className={classNames.headerText}>{t(TranslationKey.Result)}</p>

          <p className={classNames.timeText}>{formatDateOnlyTime(message.createdAt)}</p>
        </div>

        <div className={cx(classNames.infosWrapper, { [classNames.infosWrapperIsShowChatInfo]: isShowChatInfo })}>
          <p className={classNames.descriptionText}>{message.data.proposal?.details?.result}</p>

          <div className={cx(classNames.imagesWrapper, { [classNames.imagesWrapperIsShowChatInfo]: isShowChatInfo })}>
            {message.data.proposal.media
              ?.slice(0, 4)
              .map(el => el.fileLink)
              .map((item, index) => (
                <div
                  key={index}
                  className={cx(classNames.imageWrapper, { [classNames.mainImageWrapper]: index === 0 })}
                  // onClick={() => {
                  //   setCurImageId(item._id)
                  //   setShowImageModal(!showImageModal)
                  // }}
                >
                  {index === 0 && <img src="/assets/icons/star-main.svg" className={classNames.mainStarIcon} />}

                  {index === 3 && message.data.proposal.media.length > 4 && (
                    <div className={classNames.moreImagesWrapper}>{message.data.proposal.media.length - 4}</div>
                  )}

                  <img
                    src={checkIsImageLink(item) ? item : '/assets/icons/file.png'}
                    alt={`Image ${index}`}
                    className={classNames.image}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className={cx(classNames.footerWrapper, { [classNames.footerWrapperIsShowChatInfo]: isShowChatInfo })}>
        <div className={cx(classNames.fieldsContainer, { [classNames.fieldsContainerIsShowChatInfo]: isShowChatInfo })}>
          <Field
            labelClasses={classNames.fieldLabel}
            label={t(TranslationKey['Time to check'])}
            containerClasses={classNames.containerField}
            inputComponent={<p className={classNames.simpleSpan}>{minsToTime(1440)}</p>}
          />
          <Field
            labelClasses={classNames.fieldLabel}
            label={t(TranslationKey['Number of illustrations'])}
            containerClasses={classNames.containerField}
            inputComponent={<p className={classNames.simpleSpan}>{message.data.proposal.media?.length}</p>}
          />
          <Field
            labelClasses={classNames.fieldLabel}
            label={'ASIN'}
            containerClasses={classNames.containerField}
            inputComponent={
              <AsinOrSkuLink withCopyValue asin={message?.data?.request?.asin} textStyles={classNames.simpleSpan} />
            }
          />
        </div>

        <Button
          className={classNames.actionButton}
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
