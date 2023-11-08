import React, { FC } from 'react'

import { UserLink } from '@components/user/user-link'

import { IUser } from '@typings/user'

import { useDataGridCellStyles } from './many-user-link-cell.style'

interface ManyUserLinkCellProps {
  usersData: IUser[]
}

export const ManyUserLinkCell: FC<ManyUserLinkCellProps> = React.memo(props => {
  const { classes: styles, cx } = useDataGridCellStyles()
  const { usersData } = props

  return (
    <div
      className={cx(styles.manyUserLinkWrapper, {
        [styles.manyUserLinkWrapperStart]: usersData?.length >= 5,
      })}
    >
      {usersData?.map(user => (
        <UserLink
          key={user?._id}
          notShowName
          blackText
          withAvatar
          name={user?.name}
          userId={user?._id}
          customStyles={{ fontWeight: 400, fontSize: 14 }}
          customRatingClass={{ opacity: 1 }}
        />
      ))}
    </div>
  )
})
