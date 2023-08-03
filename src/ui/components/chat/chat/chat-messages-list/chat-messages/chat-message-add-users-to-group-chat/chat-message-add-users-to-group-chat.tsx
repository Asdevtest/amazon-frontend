import React, { FC } from 'react'

import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { ChatMessageDataAddUsersToGroupChatContract } from '@models/chat-model/contracts/chat-message-data.contract'
import { ChatMessageContract } from '@models/chat-model/contracts/chat-message.contract'

import { UserLink } from '@components/user/user-link'

import { t } from '@utils/translations'

import { useClassNames } from './chat-message-add-users-to-group-chat.style'

interface Props {
  message: ChatMessageContract<ChatMessageDataAddUsersToGroupChatContract>
}

export const ChatMessageAddUsersToGroupChat: FC<Props> = ({ message }) => {
  const { classes: classNames } = useClassNames()

  return (
    <div className={classNames.root}>
      <UserLink
        name={message.user?.name}
        userId={message.user?._id}
        blackText={undefined}
        withAvatar={undefined}
        maxNameWidth={undefined}
        customClassNames={undefined}
      />

      <Typography className={classNames.groupText}>{t(TranslationKey['added to the group chat'])}</Typography>

      <Typography className={classNames.groupTitle}>{`${message.data?.title} :`}</Typography>

      <div className={classNames.usersWrapper}>
        {message.data.users.map((el: { _id: string; name: string }, index: number) => (
          <UserLink
            key={index}
            name={el.name}
            userId={el._id}
            blackText={undefined}
            withAvatar={undefined}
            maxNameWidth={undefined}
            customClassNames={undefined}
          />
        ))}
      </div>
    </div>
  )
}
