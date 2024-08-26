/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tag } from 'antd'
import { FC, memo } from 'react'

import { Tooltip } from '@mui/material'

import { Button } from '@components/shared/button'
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
  const { classes: styles, cx } = useStyles()

  return (
    <div className={styles.tagsWrapper}>
      <div className={styles.tags}>
        {tags?.map(el => {
          const createTagText = `#${el.title}`

          return (
            <Tooltip key={el._id} placement="top" title={createTagText}>
              <Tag
                color={el?.color}
                className={cx(styles.tagItem, { [styles.activeButton]: !!onClickTag })}
                onClick={() => onClickTag?.(el)}
              >
                {createTagText}
              </Tag>
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
