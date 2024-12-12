import { FC, memo, useMemo } from 'react'

import { CustomTag } from '@components/shared/custom-tag'

import { ITag } from '@typings/shared/tag'

import { useStyles } from './selected-tags.style'

interface SelectedTagsProps {
  activeTags: (string | ITag)[]
  tagList: ITag[]
  setActiveProductsTag: (tags: (string | ITag)[]) => void
}

export const SelectedTags: FC<SelectedTagsProps> = memo(({ activeTags, tagList, setActiveProductsTag }) => {
  const { classes: styles } = useStyles()

  const tagListMap = useMemo(() => {
    return tagList?.reduce((acc: { [key: string]: ITag }, item) => {
      acc[item._id] = item

      return acc
    }, {})
  }, [tagList])

  const handleRemoveTags = (tag: ITag) => {
    const newTags = activeTags.filter(el => {
      return typeof el === 'string' ? el !== tag._id : el._id !== tag._id
    })

    setActiveProductsTag(newTags)
  }

  return (
    <>
      {tagList?.length ? (
        <div className={styles.activeTagsWrapper}>
          {activeTags?.map(tag => {
            // @ts-ignore
            const currentTag = tagListMap[tag?._id || tag]

            return (
              <CustomTag
                key={currentTag?._id}
                closable
                title={currentTag?.title}
                color={currentTag?.color}
                tooltipText={currentTag?.title}
                onClose={() => handleRemoveTags(currentTag as ITag)}
              />
            )
          })}
        </div>
      ) : null}
    </>
  )
})
