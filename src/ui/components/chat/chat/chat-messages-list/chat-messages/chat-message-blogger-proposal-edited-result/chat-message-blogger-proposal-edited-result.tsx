import { cx } from '@emotion/css'
import { FC, useContext } from 'react'
import Linkify from 'react-linkify-always-blank'

import { Link } from '@mui/material'

import { RequestProposalStatus } from '@constants/requests/request-proposal-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { ChatMessageDataBloggerProposalResultEditedContract } from '@models/chat-model/contracts/chat-message-data.contract'
import { ChatMessageContract } from '@models/chat-model/contracts/chat-message.contract'
import { UserModel } from '@models/user-model'

import { Button } from '@components/shared/buttons/button'
import { CopyValue } from '@components/shared/copy-value'
import { Field } from '@components/shared/field'
import { PhotoAndFilesCarouselTest } from '@components/shared/photo-and-files-carousel-test'

import { formatDateOnlyTime } from '@utils/date-time'
import { checkAndMakeAbsoluteUrl } from '@utils/text'
import { t } from '@utils/translations'

import { ChatRequestAndRequestProposalContext } from '@contexts/chat-request-and-request-proposal-context'

import { useClassNames } from './chat-message-blogger-proposal-edited-result.style'

export interface ChatMessageRequestProposalResultEditedHandlers {
  onClickProposalResultToCorrect: (proposalId: string) => void
  onClickProposalResultAccept: (proposalId: string) => void
}

interface Props {
  message: ChatMessageContract<ChatMessageDataBloggerProposalResultEditedContract>
  handlers: ChatMessageRequestProposalResultEditedHandlers
}

export const ChatMessageBloggerProposalEditedResult: FC<Props> = ({ message, handlers }) => {
  const { classes: classNames } = useClassNames()

  const chatRequestAndRequestProposal = useContext(ChatRequestAndRequestProposalContext)

  const curUserId: string | undefined = UserModel.masterUserId || UserModel.userId

  const files = chatRequestAndRequestProposal.requestProposal?.proposal?.media.map(el => el.fileLink)

  return (
    <div className={classNames.root}>
      <div className={classNames.mainWrapper}>
        <p className={classNames.timeText}>{formatDateOnlyTime(message.createdAt)}</p>

        <p className={classNames.headerText}>{t(TranslationKey.Result)}</p>

        <Linkify>
          <p className={classNames.descriptionText}>{message.data.proposal.details.result}</p>
        </Linkify>

        <div className={classNames.infosWrapper}>
          <div className={classNames.infosSubWrapper}>
            <Field
              labelClasses={classNames.fieldLabel}
              containerClasses={classNames.fieldContainer}
              label={t(TranslationKey['Photos and documents'])}
              inputComponent={
                <PhotoAndFilesCarouselTest directionColumn files={files} customGap={20} customSlideHeight={80} />
              }
            />
          </div>

          <div className={cx(classNames.infosSubWrapper, classNames.rightInfosSubWrapper)}>
            <Field
              labelClasses={classNames.fieldLabel}
              containerClasses={classNames.fieldContainer}
              label={'Amazon order ID'}
              inputComponent={
                <div className={cx(classNames.infoItemWrapper, classNames.amazonOrder)}>
                  <p className={cx(classNames.infoItemText, classNames.amazonOrderText)}>
                    {message.data.proposal.details.amazonOrderId || t(TranslationKey.Missing)}
                  </p>

                  {message.data.proposal.details.amazonOrderId && (
                    <CopyValue text={message.data.proposal.details.amazonOrderId} />
                  )}
                </div>
              }
            />

            <Field
              labelClasses={classNames.fieldLabel}
              containerClasses={classNames.fieldContainer}
              label={t(TranslationKey['Time to check'])}
              inputComponent={
                <div className={cx(classNames.infoItemWrapper, classNames.timeInfoItemWrapper)}>
                  <p className={classNames.infoItemText}>{'24 ч 00 м'}</p>
                </div>
              }
            />

            <Field
              labelClasses={classNames.fieldLabel}
              containerClasses={classNames.fieldContainer}
              label={t(TranslationKey['Link to publication'])}
              inputComponent={
                <>
                  {message.data.proposal.details.publicationLinks.length ? (
                    <div className={cx(classNames.infoItemList, classNames.linkInfoItemList)}>
                      {message.data.proposal.details.publicationLinks.map((el, index) => (
                        <div key={index} className={classNames.infoLinksItemWrapper}>
                          <Link
                            target="_blank"
                            href={checkAndMakeAbsoluteUrl(el)}
                            rel="noreferrer"
                            className={cx(classNames.infoItemText, classNames.infoLinkText)}
                          >
                            {el}
                          </Link>

                          <CopyValue text={el} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className={cx(classNames.infoLinksItemWrapper, classNames.linkInfoItemList)}>
                      <p className={classNames.infoItemText}>{t(TranslationKey.Missing)}</p>
                    </div>
                  )}
                </>
              }
            />
          </div>
        </div>
      </div>
      <div className={classNames.footerWrapper}>
        {curUserId === chatRequestAndRequestProposal.request?.request?.createdBy?._id &&
        chatRequestAndRequestProposal &&
        (chatRequestAndRequestProposal.requestProposal?.proposal?.status ===
          RequestProposalStatus.OFFER_CONDITIONS_ACCEPTED ||
          chatRequestAndRequestProposal.requestProposal?.proposal?.status === RequestProposalStatus.READY_TO_VERIFY ||
          chatRequestAndRequestProposal.requestProposal?.proposal?.status === RequestProposalStatus.CORRECTED) &&
        curUserId /* &&
        message.data.needApproveBy?.includes(curUserId)  */ ? (
          <div className={classNames.btnsWrapper}>
            {chatRequestAndRequestProposal.requestProposal?.proposal?.status !== RequestProposalStatus.TO_CORRECT && (
              <Button
                className={cx(classNames.actionButton, classNames.editButton)}
                onClick={() => handlers.onClickProposalResultToCorrect(message.data.proposal._id)}
              >
                {t(TranslationKey['Send in for rework'])}
              </Button>
            )}
            <Button
              success
              btnWrapperStyle={cx(classNames.actionBtnWrapperStyleNotFirst)}
              className={cx(classNames.actionButton, classNames.successBtn)}
              onClick={() => handlers.onClickProposalResultAccept(message.data.proposal._id)}
            >
              {t(TranslationKey.Receive)}
            </Button>
          </div>
        ) : undefined}
      </div>
    </div>
  )
}
