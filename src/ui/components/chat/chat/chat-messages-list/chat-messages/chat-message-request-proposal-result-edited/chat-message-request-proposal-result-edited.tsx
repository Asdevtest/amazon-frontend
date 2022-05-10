import React, {FC, ReactElement} from 'react'

import {ChatMessageDataProposalResultEditedDetailsContract} from '@models/chat-model/contracts/chat-message-data.contract'
import {ChatMessageContract} from '@models/chat-model/contracts/chat-message.contract'

import {formatNormDateTime} from '@utils/date-time'

import {useClassNames} from './chat-message-request-proposal-result-edited.style'

interface Props {
  message: ChatMessageContract<ChatMessageDataProposalResultEditedDetailsContract>
}

export const ChatMessageRequestProposalResultEdited: FC<Props> = ({message}) => {
  const classNames = useClassNames()
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
          <p className={classNames.titleText}>Тут должен быть тайтл заявка, но его пока нет в этом типе сообщения</p>
        </div>
        <div className={classNames.descriptionWrapper}>
          <p className={classNames.descriptionText}>
            Тут должно быть описание, но его нет, потому что не прикреплены детали заявки
          </p>
        </div>
      </div>
      <div className={classNames.resultWrapper}>
        <div className={classNames.resultLeftSide}>
          <div className={classNames.resultTextWrapper}>
            <p className={classNames.resultText}>{message.data.result}</p>
          </div>
          <div className={classNames.resultLinksWrapper}>
            {message.data.linksToMediaFiles.map(
              (link: string, index: number): ReactElement => (
                <div key={`${message.createdAt}_resultLink_${index}`} className={classNames.linkWrapper}>
                  <a href={link}>{`Ссылка №${index}`}</a>
                </div>
              ),
            )}
          </div>
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
    </div>
  )
}
