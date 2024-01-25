import { FC, memo } from 'react'

import { UserLink } from '@components/user/user-link'

interface UserLinkCellProps {
  name: string
  userId: string
  blackText?: boolean
  customStyles?: object
}

export const UserLinkCell: FC<UserLinkCellProps> = memo(props => {
  const { name, userId, blackText, customStyles } = props

  return (
    <UserLink
      withAvatar
      name={name}
      userId={userId}
      blackText={blackText}
      customStyles={{ fontWeight: 400, fontSize: 14, ...customStyles }}
    />
  )
})
