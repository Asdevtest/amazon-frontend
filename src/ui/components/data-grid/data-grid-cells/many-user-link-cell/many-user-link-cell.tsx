import { FC, memo } from 'react'

import { UserLink } from '@components/user/user-link'

import { IFullUser } from '@typings/shared/full-user'

import { useStyles } from './many-user-link-cell.style'

interface ManyUserLinkCellProps {
  usersData: IFullUser[]
}

export const ManyUserLinkCell: FC<ManyUserLinkCellProps> = memo(props => {
  const { classes: styles, cx } = useStyles()
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
