import { FC, memo } from 'react'

import { UserRole, UserRolePrettyMap, mapUserRoleEnumToKey } from '@constants/keys/user-roles'

import { IFullUser } from '@typings/shared/full-user'

import { useStyles } from './user-roles-cell.style'

interface UserRolesCellProps {
  user: IFullUser
}

export const UserRolesCell: FC<UserRolesCellProps> = memo(({ user }) => {
  const { classes: styles, cx } = useStyles()

  const allowedRoles =
    user?.allowedRoles?.filter(el => el !== mapUserRoleEnumToKey[UserRole.CANDIDATE] && el !== user.role) || []

  return (
    <div className={cx(styles.wrapper, { [styles.columnCenter]: allowedRoles.length <= 2 })}>
      <p className={styles.userRole}>{UserRolePrettyMap[user.role]}</p>
      {allowedRoles.map((role, index) => (
        <p key={index} className={styles.userRole}>
          {UserRolePrettyMap[role]}
        </p>
      ))}
    </div>
  )
})
