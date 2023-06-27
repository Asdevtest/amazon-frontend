import { useChatInfoStyles } from '@components/chat/chat/chat-info/chat-info.styles'
import { ChatContract } from '@models/chat-model/contracts'
import { CurrentOpponent } from '@components/chat/multiple-chats'
import { ChatInfoHeader } from '@components/chat/chat/chat-info/chat-info-header/chat-info-header'
import { Box, Tabs, Typography } from '@mui/material'
import { ITab } from '@components/shared/i-tab'
import { t } from '@utils/translations'
import { TranslationKey } from '@constants/translations/translation-key'
import React, { useEffect, useState } from 'react'
import { ChatGroupUsers } from '@components/chat/chat/chat-info/chat-group-users/chat-group-users'
import { ChatsModel } from '@models/chats-model'

interface ChatFileRequestTypes {
  files: string[]
  _id: string
}

interface ChatFileTypes {
  file: string
  _id: string
}

interface ChatInfoProps {
  chat: ChatContract
  userId: string
  currentOpponent?: CurrentOpponent
  isGroupChat?: boolean
  onClickAddUsersToGroupChat: () => void
  onRemoveUsersFromGroupChat: (usersIds: string[]) => void
  onClickEditGroupChatInfo: () => void
}

const tab = {
  groupChatUsers: 'groupChatUsers',
  media: 'media',
  links: 'links',
  photos: 'photos',
  videos: 'videos',
}

const TabPanel = ({ children, value, index, ...other }: React.PropsWithChildren<{ value: string; index: string }>) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    {...other}
  >
    {value === index && <Box paddingTop={3}>{children}</Box>}
  </div>
)

export const ChatInfo = (props: ChatInfoProps) => {
  const {
    chat,
    currentOpponent,
    isGroupChat,
    onClickEditGroupChatInfo,
    onRemoveUsersFromGroupChat,
    userId,
    onClickAddUsersToGroupChat,
  } = props
  const { classes: styles } = useChatInfoStyles()
  const [currentTab, setCurrentTab] = useState(isGroupChat ? tab.groupChatUsers : tab.media)
  const [files, setFiles] = useState<ChatFileTypes[]>()
  const [isFilesLoading, setIsFilesLoading] = useState(true)

  useEffect(() => {
    ChatsModel.getChatMedia(chat._id)
      .then((res: { allFiles: ChatFileRequestTypes[] }) => {
        const fileList: ChatFileTypes[] = res.allFiles.reduce((acc: ChatFileTypes[], file) => {
          file.files.forEach(el => acc.push({ file: el, _id: file._id }))
          return acc
        }, [])
        setFiles(fileList)
        console.log(fileList)
      })
      .finally(() => setIsFilesLoading(false))
  }, [])

  return (
    <div className={styles.wrapper}>
      <ChatInfoHeader
        chat={chat}
        currentOpponent={currentOpponent}
        isGroupChat={isGroupChat}
        userId={userId}
        onClickEditGroupChatInfo={onClickEditGroupChatInfo}
      />
      <Tabs
        variant={'fullWidth'}
        classes={{
          root: styles.tabs,
          indicator: styles.tabBtn,
        }}
        value={currentTab}
        onChange={(e, value) => setCurrentTab(value)}
      >
        {isGroupChat && (
          <ITab
            tooltipInfoContent={''}
            value={tab.groupChatUsers}
            label={t(TranslationKey.Members)}
            tooltipAttentionContent={''}
            withIcon={false}
          />
        )}
        <ITab
          tooltipInfoContent={''}
          value={tab.media}
          label={t(TranslationKey['Photo and Video'])}
          tooltipAttentionContent={''}
          withIcon={false}
        />
      </Tabs>

      <TabPanel value={currentTab} index={tab.groupChatUsers}>
        <ChatGroupUsers
          chat={chat}
          userId={userId}
          onClickEditGroupChatInfo={onClickEditGroupChatInfo}
          onRemoveUsersFromGroupChat={onRemoveUsersFromGroupChat}
          onClickAddUsersToGroupChat={onClickAddUsersToGroupChat}
        />
      </TabPanel>

      <TabPanel value={currentTab} index={tab.media}>
        {!!files?.length && (
          <div className={styles.fileList}>
            {files?.map((el, index) => (
              <img key={index} src={el.file} alt={el._id} />
            ))}
          </div>
        )}

        {!files?.length && !isFilesLoading && (
          <Typography className={styles.noData}>{t(TranslationKey['No files'])}</Typography>
        )}

        {isFilesLoading && <Typography className={styles.noData}>{t(TranslationKey['Loading data'])}...</Typography>}
      </TabPanel>
    </div>
  )
}
