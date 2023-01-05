import CloseIcon from '@mui/icons-material/Close'
import {Avatar, Typography} from '@mui/material'

import {forwardRef, useCallback} from 'react'

import {useSnackbar, SnackbarContent, SnackbarKey} from 'notistack'

import {TranslationKey} from '@constants/translations/translation-key'

import {ChatMessageContract} from '@models/chat-model/contracts/chat-message.contract'

import {UserLink} from '@components/user-link'

import {formatDateTimeHourAndMinutes} from '@utils/date-time'
import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {t} from '@utils/translations'

import {useClassNames} from './simple-messages-snack.style'

interface SimpleMessagesSnackProps {
  snackBarMessageLast: ChatMessageContract | null
  id: SnackbarKey
  autoHideDuration?: number
  onClickMessage: (anotherUserId: string) => void
}

export const SimpleMessagesSnack = forwardRef<HTMLDivElement, SimpleMessagesSnackProps>(
  ({id, snackBarMessageLast, autoHideDuration, onClickMessage /* , ...props*/}, ref) => {
    const {classes: classNames} = useClassNames()

    const {closeSnackbar} = useSnackbar()

    const handleDismiss = useCallback(() => {
      closeSnackbar(id)
    }, [id, closeSnackbar])

    // console.log('snackBarMessageLast22', snackBarMessageLast)

    setTimeout(() => closeSnackbar(id), autoHideDuration)

    return (
      <SnackbarContent ref={ref}>
        <div
          className={classNames.mainWrapper}
          onClick={() => {
            onClickMessage(snackBarMessageLast?.userId || '')
            closeSnackbar(id)
          }}
        >
          <Avatar src={getUserAvatarSrc(snackBarMessageLast?.userId)} className={classNames.avatarWrapper} />
          <div className={classNames.centerWrapper}>
            <UserLink
              // name={snackBarMessageLast?.user?.name}
              // userId={snackBarMessageLast?.user?._id}
              name={'Аноним'}
              userId={snackBarMessageLast?.userId}
              blackText={undefined}
              withAvatar={undefined}
              maxNameWidth={undefined}
              customStyles={undefined}
            />

            {snackBarMessageLast?.text ? (
              <Typography className={classNames.messageText}>
                {snackBarMessageLast.text?.length > 50
                  ? snackBarMessageLast.text.slice(0, 47) + '...'
                  : snackBarMessageLast.text}
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
