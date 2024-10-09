import { Avatar } from 'antd'
import { observer } from 'mobx-react'
import { FC, useMemo } from 'react'

import { ChatsType } from '@constants/keys/chats'
import { TranslationKey } from '@constants/translations/translation-key'

import { Chat } from '@models/chat-model-new/types/chat.type'

import { CustomAvatar } from '@components/shared/custom-avatar'
import { CustomButton } from '@components/shared/custom-button'
import { CustomInput } from '@components/shared/custom-input'
import { CustomSelect } from '@components/shared/custom-select'

import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './create-new-chat-modal.style'

import { CreateNewChatModalModel } from './create-new-chat-modal.model'

export interface CreateNewChatModalProps {
  chatToEdit?: Chat
  closeModal: () => void
}

export const CreateNewChatModal: FC<CreateNewChatModalProps> = observer(props => {
  const { chatToEdit, closeModal } = props

  const { classes: styles } = useStyles()

  const viewModel = useMemo(() => new CreateNewChatModalModel({ chatToEdit, closeModal }), [])
  const isLoading = viewModel.requestStatus === loadingStatus.IS_LOADING
  const isDisabled =
    viewModel.disableCreateButton ||
    (viewModel.isChatNameNotChanged && viewModel.isChatImageNotChanged && viewModel.isChatUsersNotChanged) ||
    (!viewModel.chatName?.trim() && (viewModel.selectedUsersId?.length > 1 || !!viewModel.chatToEdit))

  return (
    <div className={styles.root}>
      <p className={styles.title}>{t(TranslationKey[chatToEdit ? 'Change group chat info' : 'Create a new dialog'])}</p>

      <div id="create-new-chat">
        <CustomSelect
          required={!chatToEdit}
          virtual={false}
          mode="multiple"
          maxTagCount="responsive"
          label="Users"
          maxLength={32}
          placeholder="Choose your speaker"
          className={styles.userSelect}
          options={viewModel.currentData}
          loading={isLoading}
          value={isLoading ? [] : viewModel.selectedUsersId}
          fieldNames={{ label: 'name', value: '_id' }}
          filterOption={(inputValue, option) => option?.name?.toLowerCase().includes(inputValue.toLowerCase())}
          getPopupContainer={() => document.getElementById('create-new-chat') as HTMLElement}
          optionRender={option => (
            <div className={styles.userOption}>
              <Avatar src={getUserAvatarSrc(option?.data?._id)} />
              {option?.data?.name}
            </div>
          )}
          onSelect={viewModel.onSelectUser}
          onDeselect={viewModel.onDeselectUser}
        />
      </div>

      {viewModel.selectedUsersId?.length > 1 || viewModel.chatToEdit?.type === ChatsType.GROUP ? (
        <>
          <CustomInput
            required
            label="Chat name"
            placeholder="Enter chat name"
            wrapperClassName={styles.userSelect}
            value={viewModel.chatName}
            onChange={event => viewModel.onChangeChatName(event.target.value)}
          />
          <div className={styles.avatarContainer}>
            <CustomAvatar
              isEditable
              initialUrl={viewModel.chatImage as string}
              onSubmit={viewModel.onChangeChatImage}
            />
          </div>
        </>
      ) : null}

      <CustomButton
        size="large"
        type="primary"
        className={styles.createButton}
        loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
        disabled={isDisabled}
        onClick={chatToEdit ? viewModel.onSubmitPatchInfoGroupChat : viewModel.onClickCreateChat}
      >
        {t(TranslationKey[chatToEdit ? 'Save' : 'Create'])}
      </CustomButton>
    </div>
  )
})
