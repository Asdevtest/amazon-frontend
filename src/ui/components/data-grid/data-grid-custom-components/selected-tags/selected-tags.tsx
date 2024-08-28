import { FC, memo } from 'react'

import { CustomTag } from '@components/shared/custom-tag'

import { ITag } from '@typings/shared/tag'

import { useStyles } from './selected-tags.style'

interface SelectedTagsProps {
  activeTags: ITag[]
  setActiveProductsTag: (tags: ITag[]) => void
}

export const SelectedTags: FC<SelectedTagsProps> = memo(({ activeTags, setActiveProductsTag }) => {
  const { classes: styles } = useStyles()

  const handleRemoveTags = (tag: ITag) => {
    const newTags = activeTags.filter(el => el?._id !== tag?._id)

    setActiveProductsTag(newTags)
  }

  return (
    <div className={styles.activeTagsWrapper}>
      {activeTags?.map(tag => (
        <CustomTag key={tag._id} closable tag={tag} onClose={() => handleRemoveTags(tag)} />
      ))}
    </div>
  )
})
