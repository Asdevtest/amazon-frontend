/* eslint-disable @typescript-eslint/no-explicit-any */
import { observer } from 'mobx-react'
import React, { FC, useEffect, useMemo } from 'react'

import { Tabs } from '@mui/material'

import { RequestProposalStatus } from '@constants/requests/request-proposal-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { ChatContract } from '@models/chat-model/contracts'
import { ChatMessageContract } from '@models/chat-model/contracts/chat-message.contract'

import { OnTypingMessageResponse } from '@services/websocket-chat-service/interfaces'

import { ITab } from '@components/shared/i-tab'
import { TabPanel } from '@components/shared/tab-panel'

import { t } from '@utils/translations'

import { chatListMapper } from './chats-list-mapper'
import { useClassNames } from './chats-list.styles'

const tabsValues = {
  IN_WORK: 'IN_WORK',
  SOLVED: 'SOLVED',
}

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
          <>
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
                label={t(TranslationKey['In the work'])}
                value={tabsValues.IN_WORK}
                classes={{
                  selected: classNames.selected,
                  root: classNames.tabRoot,
                }}
              />

              <ITab
                label={t(TranslationKey.EXECUTED_IN_PLURAL_KEY)}
                value={tabsValues.SOLVED}
                classes={{
                  selected: classNames.selected,
                  root: classNames.tabRoot,
                }}
              />
            </Tabs>

            <TabPanel value={tabIndex} index={tabsValues.IN_WORK}>
              {chatListMapper(inWorkChats, userId, typingUsers, onClickChat)}
            </TabPanel>

            <TabPanel value={tabIndex} index={tabsValues.SOLVED}>
              {chatListMapper(solvedChats, userId, typingUsers, onClickChat)}
            </TabPanel>
          </>
        ) : (
          chatListMapper(chats, userId, typingUsers, onClickChat)
        )}
      </div>
    )
  },
)
