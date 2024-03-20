import { FC, memo } from 'react'

import { TagItem } from '@components/shared/tag-item'

import { IItemWithTitle } from '@hooks/use-select'

import { useStyles } from './selected-tags.style'

interface SelectedTagsProps {
  activeTags: IItemWithTitle[]
  setActiveProductsTag: (tags: IItemWithTitle[]) => void
}

export const SelectedTags: FC<SelectedTagsProps> = memo(({ activeTags, setActiveProductsTag }) => {
  const { classes: styles } = useStyles()

  const handleRemoveTags = (tag: IItemWithTitle) => {
    const newTags = activeTags.filter(el => el?._id !== tag?._id)

    setActiveProductsTag(newTags)
  }

  return (
    <div className={styles.activeTagsWrapper}>
      {activeTags?.map(tag => (
        <TagItem key={tag._id} option={tag.title} onClickRemove={() => handleRemoveTags(tag)} />
      ))}
    </div>
  )
})
