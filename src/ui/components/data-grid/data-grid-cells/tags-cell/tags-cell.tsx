/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from 'react'

import { Button } from '@components/shared/button'
import { CustomTag } from '@components/shared/custom-tag'
import { EditIcon } from '@components/shared/svg-icons'

import { ITag } from '@typings/shared/tag'

import { IItemWithTitle } from '@hooks/use-select'

import { useStyles } from './tags-cell.style'

interface TagsCellProps {
  tags: ITag[]
  onClickTag?: (tag: IItemWithTitle) => void
  onClickEdit?: () => void
}

export const TagsCell: FC<TagsCellProps> = memo(({ tags, onClickTag, onClickEdit }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.tagsWrapper}>
      <div className={styles.tags}>
        {tags?.map(el => (
          <CustomTag key={el._id} tag={el} prefix="#" onClickTag={onClickTag} />
        ))}
      </div>

      {onClickEdit ? (
        <Button iconButton onClick={onClickEdit}>
          <EditIcon />
        </Button>
      ) : null}
    </div>
  )
})
