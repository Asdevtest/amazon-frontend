import { observer } from 'mobx-react'
import { FC, useMemo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomAvatar } from '@components/shared/custom-avatar'
import { CustomButton } from '@components/shared/custom-button'
import { CustomInput } from '@components/shared/custom-input'
import { CustomSelect } from '@components/shared/custom-select'

import { t } from '@utils/translations'

import { useStyles } from './create-new-chat-modal.style'

import { CreateNewChatModalModel } from './create-new-chat-modal.model'

interface CreateNewChatModalProps {
  closeModal: () => void
}

export const CreateNewChatModal: FC<CreateNewChatModalProps> = observer(props => {
  const { closeModal } = props

  const { classes: styles, cx } = useStyles()

  const viewModel = useMemo(() => new CreateNewChatModalModel(), [])

  return (
    <div className={styles.root}>
      <p className={styles.title}>{t(TranslationKey['Create a new dialog'])}</p>

      <CustomSelect
        required
        mode="multiple"
        maxTagCount="responsive"
        label="Users"
        placeholder="Choose your speaker"
        className={styles.userSelect}
        options={viewModel.currentData}
        value={viewModel.selectedUsersId}
        fieldNames={{ label: 'name', value: '_id' }}
        filterOption={(inputValue, option) => option?.name?.toLowerCase().includes(inputValue.toLowerCase())}
        onSelect={viewModel.onSelectUser}
        onDeselect={viewModel.onDeselectUser}
      />

      {viewModel.selectedUsersId?.length > 1 ? (
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
        disabled={viewModel.disableCreateButton}
        wrapperClassName={styles.createButton}
        onClick={viewModel.onClickCreateChat}
      >
        {t(TranslationKey.Create)}
      </CustomButton>
    </div>
  )
})
