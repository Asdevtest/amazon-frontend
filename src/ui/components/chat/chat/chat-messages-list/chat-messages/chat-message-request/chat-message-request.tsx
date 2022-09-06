import React, {FC} from 'react'

import {TextareaAutosize} from '@material-ui/core'
import clsx from 'clsx'

import {TranslationKey} from '@constants/translations/translation-key'

import {ChatMessageDataCreatedNewProposalRequestDescriptionContract} from '@models/chat-model/contracts/chat-message-data.contract'
import {ChatMessageContract} from '@models/chat-model/contracts/chat-message.contract'

import {PhotoAndFilesCarousel} from '@components/custom-carousel/custom-carousel'
import {RequestStatusCell} from '@components/data-grid-cells/data-grid-cells'
import {Field} from '@components/field/field'

import {formatDateTimeHourAndMinutes, formatNormDateTime} from '@utils/date-time'
import {toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'

import {LabelValuePairBlock} from '../label-value-pair-block'
import {useClassNames} from './chat-message-request.style'

interface Props {
  message: ChatMessageContract<ChatMessageDataCreatedNewProposalRequestDescriptionContract>
}

export const ChatMessageRequest: FC<Props> = ({message}) => {
  const classNames = useClassNames()

  return (
    <div className={classNames.root}>
      <div className={classNames.headerAndTimeWrapper}>
        <div className={classNames.headerWrapper}>
          <p className={classNames.headerText}>{message.data?.title}</p>
        </div>
        <div className={classNames.timeWrapper}>
          <p className={classNames.timeText}>{formatDateTimeHourAndMinutes(message.updatedAt)}</p>
        </div>
      </div>
      <div className={classNames.mainInfoWrapper}>
        <div className={classNames.descriptionWrapper}>
          <TextareaAutosize
            disabled
            value={message?.data?.details?.conditions}
            className={classNames.conditionsField}
          />
        </div>
        <PhotoAndFilesCarousel notToShowEmpty small files={message?.data.details?.linksToMediaFiles} width="352px" />
      </div>
      <div className={classNames.footerWrapper}>
        <div className={classNames.footerRow}>
          <div className={classNames.labelValueBlockWrapper}>
            <LabelValuePairBlock
              label={t(TranslationKey.Deadline)}
              value={formatNormDateTime(message.data?.timeoutAt)}
              bgColor="green"
            />
          </div>
          <div className={clsx(classNames.labelValueBlockWrapper, classNames.labelValueBlockWrapperNotFirst)}>
            <LabelValuePairBlock
              label={t(TranslationKey.Status)}
              value={<RequestStatusCell status={message.data?.status} />}
              bgColor="green"
            />
          </div>

          <div className={clsx(classNames.labelValueBlockWrapper, classNames.labelValueBlockWrapperNotFirst)}>
            <LabelValuePairBlock
              label={t(TranslationKey['Total price'])}
              value={toFixedWithDollarSign(message.data?.price, 2)}
              bgColor="green"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
