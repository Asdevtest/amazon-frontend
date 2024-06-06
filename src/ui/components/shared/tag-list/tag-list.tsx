import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { ITagList } from '@typings/models/generals/tag-list'

import { useStyles } from './tag-list.style'

import { CircleSpinner } from '../circle-spinner'
import { TagItem } from '../tag-item'

interface TagListProps {
  isLoading: boolean
  selectedTags: ITagList[]
  handleClickTag: (tag: ITagList) => void
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
          <TagItem
            key={tag._id}
            option={tag.title}
            onClickRemove={handleClickTag ? () => handleClickTag(tag) : undefined}
          />
        ))
      ) : (
        <p className={styles.noTagsText}>{t(TranslationKey['No data'])}</p>
      )}
    </div>
  )
})
