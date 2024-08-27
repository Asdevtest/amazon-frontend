import { Tag } from 'antd'
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { ITagList } from '@typings/models/generals/tag-list'
import { ITag } from '@typings/shared/tag'

import { useStyles } from './tag-list.style'

import { CircleSpinner } from '../circle-spinner'
import { TagItem } from '../tag-item'

interface TagListProps {
  isLoading: boolean
  selectedTags: ITag[]
  handleClickTag: (tag: ITag) => void
}

export const TagList: FC<TagListProps> = memo(({ isLoading, selectedTags, handleClickTag }) => {
  const { classes: styles, cx } = useStyles()

  if (isLoading) {
    return (
      <div className={cx(styles.tagsList, styles.noTagsWrapper)}>
        <CircleSpinner size={50} />
      </div>
    )
  }

  return (
    <div className={cx(styles.tagsList, { [styles.noTagsWrapper]: !selectedTags?.length })}>
      {selectedTags?.length ? (
        selectedTags?.map(tag => (
          <Tag key={tag._id} color={tag?.color} onClick={handleClickTag ? () => handleClickTag(tag) : undefined}>
            {tag.title}
          </Tag>
        ))
      ) : (
        <p className={styles.noTagsText}>{t(TranslationKey['No data'])}</p>
      )}
    </div>
  )
})
