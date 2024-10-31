/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from 'react'

import { CustomButton } from '@components/shared/custom-button'
import { CustomTag } from '@components/shared/custom-tag'
import { EditIcon } from '@components/shared/svg-icons'

import { ITag } from '@typings/shared/tag'

import { useStyles } from './tags-cell.style'

interface TagsCellProps {
  tags: ITag[]
  onClickTag?: (tag: ITag) => void
  onClickEdit?: () => void
}

export const TagsCell: FC<TagsCellProps> = memo(({ tags, onClickTag, onClickEdit }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.tagsWrapper}>
      <div className={styles.tags}>
        {tags?.map(el => (
          <CustomTag
            key={el._id}
            prefix="#"
            title={el.title}
            color={el.color}
            tooltipText={el.title}
            onClickTag={() => onClickTag?.(el)}
          />
        ))}
      </div>

      {onClickEdit ? <CustomButton icon={<EditIcon />} onClick={onClickEdit} /> : null}
    </div>
  )
})
