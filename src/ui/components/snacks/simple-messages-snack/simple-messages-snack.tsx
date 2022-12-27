/* eslint-disable no-unused-vars */
// import CloseIcon from '@mui/icons-material/Close'
// import {SnackbarContent, Typography} from '@mui/material'
// import IconButton from '@mui/material/IconButton'
// import {forwardRef} from 'react'
// import {useClassNames} from './simple-messages-snack.style'
// export const SimpleMessagesSnack = forwardRef(({message}, ref) => {
//   const {classes: classNames} = useClassNames()
//   // const handleDismiss = useCallback(() => {
//   //   closeSnackbar(id)
//   // }, [id, closeSnackbar])
//   // console.log('props', props)
//   return (
//     <SnackbarContent ref={ref} className={classNames.root}>
//       <Typography>{message.text}</Typography>
//       <IconButton size="small" className={classNames.expand} /* onClick={handleDismiss}*/>
//         <CloseIcon fontSize="small" />
//       </IconButton>
//     </SnackbarContent>
//   )
// })
import CloseIcon from '@mui/icons-material/Close'
import {Avatar, Typography} from '@mui/material'
import IconButton from '@mui/material/IconButton'

import {forwardRef, useCallback} from 'react'

import {useSnackbar, SnackbarContent, SnackbarKey} from 'notistack'

import {TranslationKey} from '@constants/translations/translation-key'

import {ChatMessageContract} from '@models/chat-model/contracts/chat-message.contract'

import {UserLink} from '@components/user-link'

import {formatDateTimeHourAndMinutes} from '@utils/date-time'
import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {t} from '@utils/translations'

import {useClassNames} from './simple-messages-snack.style'

interface ReportCompleteProps {
  snackBarMessageLast: ChatMessageContract
  id: any
  autoHideDuration?: number
}

export const SimpleMessagesSnack = forwardRef<HTMLDivElement, ReportCompleteProps>(
  ({id, /* style,*/ snackBarMessageLast, autoHideDuration /* , ...props*/}, ref) => {
    const {classes: classNames} = useClassNames()

    const {closeSnackbar} = useSnackbar()

    const handleDismiss = useCallback(() => {
      closeSnackbar(id)
    }, [id, closeSnackbar])

    // console.log('props', props)

    // console.log('snackBarMessageLast22', snackBarMessageLast)

    // const noticeSound = new Audio('/assets/sounds/notice3.mp3')

    // noticeSound.play()

    setTimeout(() => closeSnackbar(id), autoHideDuration)

    return (
      <SnackbarContent ref={ref} /* style={style}*/>
        <div className={classNames.mainWrapper}>
          <Avatar src={getUserAvatarSrc(snackBarMessageLast?.userId)} className={classNames.avatarWrapper} />

          <div className={classNames.centerWrapper}>
            <UserLink
              name={'Аноним'}
              userId={snackBarMessageLast?.userId}
              blackText={undefined}
              withAvatar={undefined}
              maxNameWidth={undefined}
            />

            <Typography>{snackBarMessageLast?.text}</Typography>

            {snackBarMessageLast?.files?.length ? (
              <Typography /* className={classNames.lastMessageText}*/>
                {snackBarMessageLast?.files?.length ? `*${t(TranslationKey.Files)}*` : ''}
              </Typography>
            ) : null}
          </div>

          <div className={classNames.rightSiteWrapper}>
            <IconButton size="small" onClick={handleDismiss}>
              <CloseIcon fontSize="small" />
            </IconButton>

            <Typography /* className={classNames.messageDate}*/>
              {formatDateTimeHourAndMinutes(snackBarMessageLast?.createdAt)}
            </Typography>
          </div>
        </div>
      </SnackbarContent>
    )
  },
)
