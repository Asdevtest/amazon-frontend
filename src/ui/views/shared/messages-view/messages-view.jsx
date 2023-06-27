/* eslint-disable no-unused-vars */
import { cx } from '@emotion/css'
import { Avatar, Typography, Link } from '@mui/material'

import React, { useEffect, useRef, useState } from 'react'

import { observer } from 'mobx-react'
import { withStyles } from 'tss-react/mui'

import { chatsType } from '@constants/keys/chats'
import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { TranslationKey } from '@constants/translations/translation-key'

import { MultipleChats } from '@components/chat/multiple-chats'
import { SearchResult } from '@components/chat/search-result'
import { AddNewChatByEmailForm } from '@components/forms/add-new-chat-by-email-form'
import { AddUsersToGroupChatForm } from '@components/forms/add-users-to-group-chat-form'
import { EditGroupChatInfoForm } from '@components/forms/edit-group-chat-info-form'
import { MainContent } from '@components/layout/main-content'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { Button } from '@components/shared/buttons/button'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'
import { Modal } from '@components/shared/modal'
import { SearchInput } from '@components/shared/search-input'

import { checkIsResearcher } from '@utils/checks'
import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { t } from '@utils/translations'

import { MessagesViewModel } from './messages-view.model'
import { styles } from './messages-view.style'
import { SoundOffIcon, SoundOnIcon } from '@components/shared/svg-icons'

export const MessagesViewRaw = props => {
  const [viewModel] = useState(() => new MessagesViewModel({ history: props.history, location: props.location }))
  const chatRef = useRef()
  const { classes: classNames } = props

  useEffect(() => {
    viewModel.loadData()
  }, [])

  const currentOpponent = viewModel.simpleChats
    .find(el => el._id === viewModel.chatSelectedId)
    ?.users.find(el => el._id !== viewModel.user._id)

  const currentChat = viewModel.simpleChats.find(el => el._id === viewModel.chatSelectedId)

  const curFoundedMessageIndex = viewModel.messagesFound?.findIndex(el => viewModel.curFoundedMessage?._id === el._id)

  return (
    <React.Fragment>
      <MainContent>
        <div
          className={cx(classNames.chatHeaderWrapper, { [classNames.hideChatHeaderWrapper]: viewModel.chatSelectedId })}
        >
          <div className={classNames.leftSide}>
            <SearchInput
              inputClasses={classNames.searchInput}
              value={viewModel.nameSearchValue}
              onChange={viewModel.onChangeNameSearchValue}
            />

            {viewModel.chatSelectedId && viewModel.simpleChats.length ? (
              <div className={classNames.chatSelectedWrapper}>
                {currentChat?.type === chatsType.DEFAULT ? (
                  <Link
                    target="_blank"
                    href={`${window.location.origin}/another-user?${currentOpponent?._id}`}
                    underline="none"
                  >
                    <div className={classNames.opponentWrapper}>
                      <Avatar src={getUserAvatarSrc(currentOpponent?._id)} className={classNames.avatarWrapper} />
                      <Typography className={classNames.opponentName}>{currentOpponent?.name}</Typography>
                    </div>
                  </Link>
                ) : (
                  <div className={classNames.opponentWrapper}>
                    <Avatar src={currentChat?.info.image} className={classNames.avatarWrapper} />
                    <div>
                      <Typography className={classNames.opponentName}>{currentChat?.info.title}</Typography>
                      <Typography className={classNames.usersCount}>{`${currentChat?.users.length} ${t(
                        TranslationKey.Members,
                      ).toLocaleLowerCase()}`}</Typography>
                    </div>
                  </div>
                )}

                <SearchInput
                  inputClasses={classNames.searchInput}
                  placeholder={t(TranslationKey['Message Search'])}
                  value={viewModel.mesSearchValue}
                  onChange={viewModel.onChangeMesSearchValue}
                  onKeyPress={e => console.log('e', e)}
                />

                {viewModel.messagesFound.length ? (
                  <SearchResult
                    curFoundedMessageIndex={curFoundedMessageIndex}
                    messagesFound={viewModel.messagesFound}
                    onClose={() => viewModel.onChangeMesSearchValue({ target: { value: '' } })}
                    onChangeCurFoundedMessage={viewModel.onChangeCurFoundedMessage}
                  />
                ) : (
                  <>
                    {viewModel.mesSearchValue && (
                      <div className={classNames.searchResultWrapper}>
                        <Typography className={classNames.searchResult}>{t(TranslationKey['Not found'])}</Typography>
                      </div>
                    )}
                  </>
                )}
              </div>
            ) : null}
          </div>

          <div className={classNames.rightSide}>
            <div className={classNames.tooltipWrapper} onClick={viewModel.onTriggerNoticeOfSimpleChats}>
              {viewModel.noticeOfSimpleChats ? (
                <Typography className={classNames.noticesTextActive}>
                  {t(TranslationKey['Notices included'])}
                </Typography>
              ) : (
                <Typography className={classNames.noticesTextNoActive}>
                  {t(TranslationKey['Notices are off'])}
                </Typography>
              )}

              {viewModel.noticeOfSimpleChats ? <SoundOnIcon /> : <SoundOffIcon />}
            </div>

            <Button
              disabled={checkIsResearcher(UserRoleCodeMap[viewModel.user.role])}
              className={classNames.newDialogBtn}
              onClick={viewModel.onClickAddNewChatByEmail}
            >
              {t(TranslationKey['New Dialogue'])}
            </Button>
          </div>
        </div>
        <div className={classNames.chatWrapper}>
          <MultipleChats
            ref={chatRef}
            toScrollMesId={viewModel.curFoundedMessage?._id}
            searchPhrase={viewModel.mesSearchValue}
            messagesFound={viewModel.messagesFound}
            typingUsers={viewModel.typingUsers}
            searchFilter={viewModel.nameSearchValue}
            currentOpponent={currentOpponent}
            chats={viewModel.simpleChats}
            userId={viewModel.user._id}
            chatSelectedId={viewModel.chatSelectedId}
            updateData={viewModel.loadData}
            onTypingMessage={viewModel.onTypingMessage}
            onSubmitMessage={viewModel.onSubmitMessage}
            onClickChat={viewModel.onClickChat}
            onClickBackButton={viewModel.onClickBackButton}
            onClickAddUsersToGroupChat={viewModel.onClickAddUsersToGroupChat}
            onRemoveUsersFromGroupChat={viewModel.onRemoveUsersFromGroupChat}
            onClickEditGroupChatInfo={viewModel.onClickEditGroupChatInfo}
          />
        </div>
        {viewModel.showProgress && (
          <CircularProgressWithLabel title={/* t(TranslationKey['Creating a Chat']) +*/ '...'} />
        )}

        <Modal
          openModal={viewModel.showAddNewChatByEmailModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showAddNewChatByEmailModal')}
        >
          <AddNewChatByEmailForm
            closeModal={() => viewModel.onTriggerOpenModal('showAddNewChatByEmailModal')}
            usersData={viewModel.usersData}
            onSubmit={viewModel.onSubmitAddNewChat}
          />
        </Modal>

        <Modal
          openModal={viewModel.showAddUsersToGroupChatModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showAddUsersToGroupChatModal')}
        >
          <AddUsersToGroupChatForm
            closeModal={() => viewModel.onTriggerOpenModal('showAddUsersToGroupChatModal')}
            usersData={viewModel.usersData}
            onSubmit={viewModel.onSubmitAddUsersToGroupChat}
          />
        </Modal>

        <Modal
          openModal={viewModel.showEditGroupChatInfoModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showEditGroupChatInfoModal')}
        >
          <EditGroupChatInfoForm
            chat={viewModel.simpleChats.find(el => el._id === viewModel.chatSelectedId)}
            onSubmit={viewModel.onSubmitPatchInfoGroupChat}
            onCloseModal={() => viewModel.onTriggerOpenModal('showEditGroupChatInfoModal')}
          />
        </Modal>

        <WarningInfoModal
          isWarning={viewModel.warningInfoModalSettings.isWarning}
          openModal={viewModel.showWarningInfoModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showWarningInfoModal')}
          title={viewModel.warningInfoModalSettings.title}
          btnText={t(TranslationKey.Ok)}
          onClickBtn={() => {
            viewModel.onTriggerOpenModal('showWarningInfoModal')
          }}
        />
      </MainContent>
    </React.Fragment>
  )
}

export const MessagesView = withStyles(observer(MessagesViewRaw), styles)
