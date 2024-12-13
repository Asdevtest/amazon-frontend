import { Empty } from 'antd'
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { UserCell } from '@components/data-grid/data-grid-cells'

import { t } from '@utils/translations'

import { ICreatedBy } from '@typings/shared/created-by'

import { useStyles } from './users-list.style'

interface UsersListProps {
  users: ICreatedBy[]
  title?: string
  wrapperClassName?: string
}

export const UsersList: FC<UsersListProps> = memo(props => {
  const { users, title, wrapperClassName } = props

  const { classes: styles, cx } = useStyles()

  return (
    <div className={cx(styles.root, wrapperClassName)}>
      {title ? <p className={styles.text}>{t(TranslationKey[title as TranslationKey])}</p> : null}

      <div className={cx(styles.items, { [styles.empty]: !users?.length })}>
        {users?.length ? (
          users?.map((user, index) => <UserCell key={index} isCell={false} name={user?.name} id={user?._id} />)
        ) : (
          <Empty />
        )}
      </div>
    </div>
  )
})
