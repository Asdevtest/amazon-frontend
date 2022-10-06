import {Avatar} from '@mui/material'
import {Link, Typography} from '@mui/material'

import React from 'react'

import {observer} from 'mobx-react'

import {UserModel} from '@models/user-model'

import {getUserAvatarSrc} from '@utils/get-user-avatar'

import {useClassNames} from './user-link.style'

export const UserLink = observer(({name, userId, blackText, withAvatar}) => {
  const {classes: classNames} = useClassNames()

  const curUserId = UserModel.userId

  return (
    <>
      {name ? (
        <Link
          target="_blank"
          href={
            curUserId === userId
              ? `${window.location.origin}/profile`
              : `${window.location.origin}/another-user?${userId}`
          }
          underline={blackText ? 'none' : 'hover'}
          className={classNames.linkWrapper}
        >
          {withAvatar ? (
            <Avatar src={getUserAvatarSrc(userId)} className={classNames.avatarWrapper} sx={{width: 28, height: 28}} />
          ) : null}

          <Typography className={blackText ? classNames.blackLinkText : classNames.linkText}>{name}</Typography>
        </Link>
      ) : (
        <Typography>{'-'}</Typography>
      )}
    </>
  )
})
