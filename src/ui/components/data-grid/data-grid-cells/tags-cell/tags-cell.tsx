/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from 'react'
import { MdOutlineEdit } from 'react-icons/md'

import { CustomButton } from '@components/shared/custom-button'
import { CustomTag } from '@components/shared/custom-tag'

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

      {onClickEdit ? <CustomButton icon={<MdOutlineEdit size={18} />} onClick={onClickEdit} /> : null}
    </div>
  )
})
