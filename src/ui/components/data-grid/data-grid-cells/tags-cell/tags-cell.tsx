/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react'

import { Tooltip } from '@mui/material'

import { MAX_LENGTH_TITLE } from '@constants/text'

import { useDataGridCellStyles } from './tags-cell.style'

interface TagsCellProps {
  tags: string[]
}

export const TagsCell: FC<TagsCellProps> = React.memo(({ tags }) => {
  const { classes: styles } = useDataGridCellStyles()

  return (
    <div className={styles.tags}>
      {tags?.map((el: any, index: number) => {
        const createTagText = `#${el.title}`
        const isValidTextLength = createTagText?.length <= MAX_LENGTH_TITLE

        return (
          <React.Fragment key={el._id}>
            <Tooltip title={!isValidTextLength ? createTagText : ''}>
              <p className={styles.tagItem}>
                {createTagText}
                {index !== tags.length - 1 && ', '}
              </p>
            </Tooltip>
          </React.Fragment>
        )
      })}
    </div>
  )
})
