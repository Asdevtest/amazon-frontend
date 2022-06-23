import React from 'react'

import {Link, Typography} from '@material-ui/core'
import {observer} from 'mobx-react'

import {useClassNames} from './user-link.style'

export const UserLink = observer(({name, userId}) => {
  const classNames = useClassNames()

  return (
    <div>
      {name ? (
        <Link target="_blank" href={`${window.location.origin}/another-user?${userId}`}>
          <Typography className={classNames.linkText}>{name}</Typography>
        </Link>
      ) : (
        <Typography>{'-'}</Typography>
      )}
    </div>
  )
})
