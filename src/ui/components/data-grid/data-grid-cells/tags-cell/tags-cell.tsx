/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, Fragment, memo } from 'react'

import { Tooltip } from '@mui/material'

import { MAX_LENGTH_TITLE } from '@constants/text'

import { useStyles } from './tags-cell.style'

interface TagsCellProps {
  tags: string[]
}

export const TagsCell: FC<TagsCellProps> = memo(({ tags }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.tags}>
      {tags?.map((el: any, index: number) => {
        const createTagText = `#${el.title}`
        const isValidTextLength = createTagText?.length <= MAX_LENGTH_TITLE

        return (
          <Fragment key={el._id}>
            <Tooltip title={!isValidTextLength ? createTagText : ''}>
              <p className={styles.tagItem}>
                {createTagText}
                {index !== tags.length - 1 && ', '}
              </p>
            </Tooltip>
          </Fragment>
        )
      })}
    </div>
  )
})
