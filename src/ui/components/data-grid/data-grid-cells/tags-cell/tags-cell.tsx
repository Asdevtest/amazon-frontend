/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from 'react'

import { Tooltip } from '@mui/material'

import { IItemWithTitle } from '@hooks/use-select'

import { useStyles } from './tags-cell.style'

interface TagsCellProps {
  tags: IItemWithTitle[]
  onClickTag: (tag: IItemWithTitle) => void
}

export const TagsCell: FC<TagsCellProps> = memo(({ tags, onClickTag }) => {
  const { classes: styles, cx } = useStyles()

  return (
    <div className={styles.tags}>
      {tags?.map((el, index: number) => {
        const createTagText = `#${el.title}`

        return (
          <Tooltip key={el._id} placement="top" title={createTagText}>
            <button
              className={cx(styles.tagItem, { [styles.activeButton]: !!onClickTag })}
              onClick={() => onClickTag?.(el)}
            >
              {createTagText}
              {index !== tags.length - 1 && ', '}
            </button>
          </Tooltip>
        )
      })}
    </div>
  )
})
