/* eslint-disable @typescript-eslint/no-explicit-any */
import { cx } from '@emotion/css'
import { Box, Tabs } from '@mui/material'

import React, { FC, ReactElement, useEffect, useMemo } from 'react'

import { observer } from 'mobx-react'

import { RequestProposalStatus } from '@constants/requests/request-proposal-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { ChatContract } from '@models/chat-model/contracts'
import { ChatMessageContract } from '@models/chat-model/contracts/chat-message.contract'

import { OnTypingMessageResponse } from '@services/websocket-chat-service/interfaces'

import { ITab } from '@components/shared/i-tab/i-tab'

import { t } from '@utils/translations'

import { ChatListItem } from './chat-list-item'
import { useClassNames } from './chats-list.style'

interface TabPanelProps {
  children: ReactElement
  value?: string
  index?: string
}

const tabsValues = {
  IN_WORK: 'IN_WORK',
  SOLVED: 'SOLVED',
}

const TabPanel = ({ children, value, index, ...other }: TabPanelProps) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    {...other}
  >
    {value === index && <Box /* paddingTop={3} */>{children}</Box>}
  </div>
)

interface Props {
  isFreelanceOwner: boolean
  chats: ChatContract[]
  chatSelectedId?: string
  typingUsers?: OnTypingMessageResponse[]
  userId: string
  onClickChat: (chat: ChatContract) => void
}

export const ChatsList: FC<Props> = observer(
  ({ chats, userId, chatSelectedId, onClickChat, typingUsers, isFreelanceOwner }) => {
    const { classes: classNames } = useClassNames()

    // console.log('chats', chats)

    const solvedChats = isFreelanceOwner
      ? useMemo(
          () =>
            chats.filter(el =>
              el.messages.some(
                (mes: ChatMessageContract<any>) =>
                  mes.text === 'PROPOSAL_STATUS_CHANGED' &&
                  (mes.data?.status === RequestProposalStatus.ACCEPTED_BY_CLIENT ||
                    mes.data?.status === RequestProposalStatus.ACCEPTED_BY_CREATOR_OF_REQUEST ||
                    mes.data?.status === RequestProposalStatus.ACCEPTED_BY_SUPERVISOR),
              ),
            ),
          [chats],
        )
      : []
    const inWorkChats = useMemo(() => chats.filter(el => !solvedChats.find(chat => chat._id === el._id)), [solvedChats])

    const [tabIndex, setTabIndex] = React.useState(tabsValues.IN_WORK)

    useEffect(() => {
      setTabIndex(() => (inWorkChats.some(el => el._id === chatSelectedId) ? tabsValues.IN_WORK : tabsValues.SOLVED))
    }, [chatSelectedId])

    return (
      <div className={classNames.root}>
        {isFreelanceOwner ? (
          <React.Fragment>
            <Tabs
              variant={'fullWidth'}
              classes={{
                root: classNames.row,
                indicator: classNames.indicator,
              }}
              textColor="primary"
              value={tabIndex}
              onChange={(e, value) => {
                setTabIndex(value)
              }}
            >
              <ITab
                value={tabsValues.IN_WORK}
                label={t(TranslationKey['In the work'])}
                tooltipAttentionContent={undefined}
                tooltipInfoContent={undefined}
                withIcon={undefined}
                classes={{
                  selected: classNames.selected,
                  root: classNames.tabRoot,
                }}
                textColor="primary"
              />

              {
                <ITab
                  label={t(TranslationKey.EXECUTED_IN_PLURAL_KEY)}
                  value={tabsValues.SOLVED}
                  tooltipAttentionContent={undefined}
                  tooltipInfoContent={undefined}
                  withIcon={undefined}
                  classes={{
                    selected: classNames.selected,
                    root: classNames.tabRoot,
                  }}
                  textColor="primary"
                />
              }
            </Tabs>

            <TabPanel value={tabIndex} index={tabsValues.IN_WORK}>
              <>
                {inWorkChats.map((chat: ChatContract) => {
                  const isSelected = chatSelectedId === chat._id

                  return (
                    <div
                      key={`chat_${chat._id}`}
                      className={cx(classNames.chatWrapper, { [classNames.chatWrapperIsSelected]: isSelected })}
                    >
                      <ChatListItem
                        typingUsers={typingUsers}
                        userId={userId}
                        chat={chat}
                        isSelected={isSelected}
                        onClick={() => onClickChat(chat)}
                      />
                    </div>
                  )
                })}
              </>
            </TabPanel>

            <TabPanel value={tabIndex} index={tabsValues.SOLVED}>
              <>
                {solvedChats.map((chat: ChatContract) => {
                  const isSelected = chatSelectedId === chat._id

                  return (
                    <div
                      key={`chat_${chat._id}`}
                      className={cx(classNames.chatWrapper, { [classNames.chatWrapperIsSelected]: isSelected })}
                    >
                      <ChatListItem
                        typingUsers={typingUsers}
                        userId={userId}
                        chat={chat}
                        isSelected={isSelected}
                        onClick={() => onClickChat(chat)}
                      />
                    </div>
                  )
                })}
              </>
            </TabPanel>
          </React.Fragment>
        ) : (
          <div className={classNames.root}>
            {chats.map((chat: ChatContract) => {
              const isSelected = chatSelectedId === chat._id

              return (
                <div
                  key={`chat_${chat._id}`}
                  className={cx(classNames.chatWrapper, { [classNames.chatWrapperIsSelected]: isSelected })}
                >
                  <ChatListItem
                    typingUsers={typingUsers}
                    userId={userId}
                    chat={chat}
                    isSelected={isSelected}
                    onClick={() => onClickChat(chat)}
                  />
                </div>
              )
            })}
          </div>
        )}
      </div>
    )
  },
)
