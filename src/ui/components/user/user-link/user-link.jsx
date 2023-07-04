import { cx } from '@emotion/css'
import { Link, Typography, Avatar, Tooltip } from '@mui/material'

import React from 'react'

import { observer } from 'mobx-react'

import { UserModel } from '@models/user-model'

import { getUserAvatarSrc } from '@utils/get-user-avatar'

import { useClassNames } from './user-link.style'

export const UserLink = observer(
  ({
    name,
    userId,
    blackText,
    withAvatar,
    notShowName = false,
    maxNameWidth,
    customStyles,
    customClassNames,
    customAvatarStyles = '',
  }) => {
    const { classes: classNames } = useClassNames()

    const curUserId = UserModel.userId

    return (
      <>
        {name || userId ? (
          <Link
            target="_blank"
            href={
              curUserId === userId
                ? `${window.location.origin}/profile`
                : `${window.location.origin}/another-user?${userId}`
            }
            underline={blackText ? 'none' : 'hover'}
            className={classNames.linkWrapper}
            onClick={e => e.stopPropagation()}
          >
            {withAvatar ? (
              <Tooltip title={name}>
                <Avatar
                  src={getUserAvatarSrc(userId)}
                  className={classNames.avatarWrapper}
                  sx={{ width: 28, height: 28, ...(customAvatarStyles && customAvatarStyles) }}
                />
              </Tooltip>
            ) : null}

            {name && !notShowName && (
              <Typography
                className={cx(classNames.linkText, customClassNames, {
                  [classNames.blackLinkText]: blackText,
                })}
                style={customStyles || (maxNameWidth && { maxWidth: maxNameWidth })}
              >
                {name}
              </Typography>
            )}
          </Link>
        ) : (
          <Typography>{'-'}</Typography>
        )}
      </>
    )
  },
)
