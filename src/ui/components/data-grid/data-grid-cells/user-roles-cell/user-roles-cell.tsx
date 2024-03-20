import { FC, memo } from 'react'

import { UserRole, UserRolePrettyMap, mapUserRoleEnumToKey } from '@constants/keys/user-roles'

import { IFullUser } from '@typings/shared/full-user'

import { useStyles } from './user-roles-cell.style'

interface UserRolesCellProps {
  user: IFullUser
}

export const UserRolesCell: FC<UserRolesCellProps> = memo(({ user }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.userRolesWrapper}>
      <p className={styles.userRole}>{UserRolePrettyMap[user.role]}</p>

      {user.allowedRoles
        .filter(el => el !== mapUserRoleEnumToKey[UserRole.CANDIDATE] && el !== user.role)
        .map((role, index) => (
          <p key={index} className={styles.userRole}>
            {UserRolePrettyMap[role]}
          </p>
        ))}
    </div>
  )
})
