import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { ITag } from '@typings/shared/tag'

import { useStyles } from './tag-list.style'

import { CircleSpinner } from '../circle-spinner'
import { CustomTag } from '../custom-tag'

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
          <CustomTag
            key={tag._id}
            title={tag.title}
            color={tag.color}
            tooltipText={tag.title}
            onClick={handleClickTag ? () => handleClickTag(tag) : undefined}
          >
            {tag.title}
          </CustomTag>
        ))
      ) : (
        <p className={styles.noTagsText}>{t(TranslationKey['No data'])}</p>
      )}
    </div>
  )
})
