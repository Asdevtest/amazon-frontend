/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from 'react'

import { Tooltip } from '@mui/material'

import { Button } from '@components/shared/button'
import { EditIcon } from '@components/shared/svg-icons'

import { IItemWithTitle } from '@hooks/use-select'

import { useStyles } from './tags-cell.style'

interface TagsCellProps {
  tags: IItemWithTitle[]
  onClickTag?: (tag: IItemWithTitle) => void
  onClickEdit?: () => void
}

export const TagsCell: FC<TagsCellProps> = memo(({ tags, onClickTag, onClickEdit }) => {
  const { classes: styles, cx } = useStyles()

  return (
    <div className={styles.tagsWrapper}>
      <div className={cx(styles.tags, { [styles.editMode]: !!onClickEdit })}>
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

      {onClickEdit ? (
        <Button iconButton onClick={onClickEdit}>
          <EditIcon />
        </Button>
      ) : null}
    </div>
  )
})
