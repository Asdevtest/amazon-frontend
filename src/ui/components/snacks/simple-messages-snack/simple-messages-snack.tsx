import CloseIcon from '@mui/icons-material/Close'
import {Avatar, Typography} from '@mui/material'

import {forwardRef, useCallback} from 'react'

import {useSnackbar, SnackbarContent, SnackbarKey} from 'notistack'

import {TranslationKey} from '@constants/translations/translation-key'

import {ChatMessageContract} from '@models/chat-model/contracts/chat-message.contract'

import {ChatMessageTextType} from '@services/websocket-chat-service/interfaces'

import {UserLink} from '@components/user-link'

import {formatDateTimeHourAndMinutes} from '@utils/date-time'
import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {t} from '@utils/translations'

import {useClassNames} from './simple-messages-snack.style'

interface SimpleMessagesSnackProps {
  snackBarMessageLast: ChatMessageContract | null
  id: SnackbarKey
  autoHideDuration?: number
  onClickMessage: (chatId: string) => void
}

export const SimpleMessagesSnack = forwardRef<HTMLDivElement, SimpleMessagesSnackProps>(
  ({id, snackBarMessageLast, autoHideDuration, onClickMessage /* , ...props*/}, ref) => {
    const {classes: classNames} = useClassNames()

    const {closeSnackbar} = useSnackbar()

    const handleDismiss = useCallback(() => {
      closeSnackbar(id)
    }, [id, closeSnackbar])

    console.log('snackBarMessageLast22', snackBarMessageLast)

    setTimeout(() => closeSnackbar(id), autoHideDuration)

    const message = snackBarMessageLast?.text
      ? (() => {
          switch (snackBarMessageLast.text) {
            case ChatMessageTextType.ADD_USERS_TO_GROUP_CHAT_BY_ADMIN:
              return t(TranslationKey['added to the group chat']) + '...'
            case ChatMessageTextType.REMOVE_USERS_FROM_GROUP_CHAT_BY_ADMIN:
              return t(TranslationKey['deleted from group chat']) + '...'
            case ChatMessageTextType.PATCH_INFO:
              return t(TranslationKey['changed the chat info'])
            default:
              return snackBarMessageLast.text
          }
        })()
      : ''

    return (
      <SnackbarContent ref={ref}>
        <div
          className={classNames.mainWrapper}
          onClick={() => {
            onClickMessage(snackBarMessageLast?.chatId || '')
            closeSnackbar(id)
          }}
        >
          <Avatar src={getUserAvatarSrc(snackBarMessageLast?.user?._id)} className={classNames.avatarWrapper} />
          <div className={classNames.centerWrapper}>
            <UserLink
              name={snackBarMessageLast?.user?.name}
              userId={snackBarMessageLast?.user?._id}
              blackText={undefined}
              withAvatar={undefined}
              maxNameWidth={undefined}
              customStyles={undefined}
            />

            {/* {snackBarMessageLast?.text ? (
              <Typography className={classNames.messageText}>
                {snackBarMessageLast.text?.length > 40
                  ? snackBarMessageLast.text.slice(0, 37) + '...'
                  : snackBarMessageLast.text}
              </Typography>
            ) : null} */}

            {message ? (
              <Typography className={classNames.messageText}>
                {message?.length > 40 ? message.slice(0, 37) + '...' : message}
              </Typography>
            ) : null}

            {snackBarMessageLast?.files?.length ? (
              <Typography className={classNames.filesText}>
                {`*${snackBarMessageLast?.files?.length} ${t(TranslationKey.Files)}*`}
              </Typography>
            ) : null}
          </div>

          <div className={classNames.rightSiteWrapper}>
            <CloseIcon
              fontSize="small"
              className={classNames.closeIcon}
              onClick={e => {
                e.stopPropagation()

                handleDismiss()
              }}
            />

            <Typography className={classNames.messageDate}>
              {formatDateTimeHourAndMinutes(snackBarMessageLast?.createdAt)}
            </Typography>
          </div>
        </div>
      </SnackbarContent>
    )
  },
)
