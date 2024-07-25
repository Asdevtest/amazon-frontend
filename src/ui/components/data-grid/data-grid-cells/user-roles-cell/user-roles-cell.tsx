import { FC, memo } from 'react'

import { Roles } from '@typings/enums/roles'
import { IFullUser } from '@typings/shared/full-user'

import { useStyles } from './user-roles-cell.style'

interface UserRolesCellProps {
  user: IFullUser
}

export const UserRolesCell: FC<UserRolesCellProps> = memo(({ user }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.userRolesWrapper}>
      <p className={styles.userRole}>{Roles[user.role]}</p>

      {user.allowedRoles
        .filter(el => el !== Roles.CANDIDATE && el !== user.role)
        .map((role, index) => (
          <p key={index} className={styles.userRole}>
            {Roles[role]}
          </p>
        ))}
    </div>
  )
})
