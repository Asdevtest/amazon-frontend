/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from 'react'

import { Tooltip } from '@mui/material'

import { MAX_LENGTH_TITLE } from '@constants/text'

import { IItemWithTitle } from '@hooks/use-select'

import { useStyles } from './tags-cell.style'

interface TagsCellProps {
  tags: IItemWithTitle[]
  onClickTag: (tag: IItemWithTitle) => void
}

export const TagsCell: FC<TagsCellProps> = memo(({ tags, onClickTag }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.tags}>
      {tags?.map((el, index: number) => {
        const createTagText = `#${el.title}`
        const isValidTextLength = createTagText?.length <= MAX_LENGTH_TITLE

        return (
          <button key={el._id} onClick={() => onClickTag?.(el)}>
            <Tooltip title={!isValidTextLength ? createTagText : ''}>
              <p className={styles.tagItem}>
                {createTagText}
                {index !== tags.length - 1 && ', '}
              </p>
            </Tooltip>
          </button>
        )
      })}
    </div>
  )
})
