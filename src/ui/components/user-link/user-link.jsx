import React from 'react'

import {Link, Typography} from '@material-ui/core'
import {observer} from 'mobx-react'

import {UserModel} from '@models/user-model'

import {useClassNames} from './user-link.style'

export const UserLink = observer(({name, userId, blackText}) => {
  const classNames = useClassNames()

  const curUserId = UserModel.userId

  return (
    <div>
      {name ? (
        <Link
          target="_blank"
          href={
            curUserId === userId
              ? `${window.location.origin}/profile`
              : `${window.location.origin}/another-user?${userId}`
          }
          underline={blackText ? 'none' : 'hover'}
        >
          <Typography className={blackText ? classNames.blackLinkText : classNames.linkText}>{name}</Typography>
        </Link>
      ) : (
        <Typography>{'-'}</Typography>
      )}
    </div>
  )
})
