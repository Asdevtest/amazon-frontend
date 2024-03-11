import { FC, memo, useEffect, useState } from 'react'

import { CircularProgress } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { SearchInput } from '@components/shared/search-input'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

import { IItemWithTitle, useSelect } from '@hooks/use-select'

import { useStyles } from './tag-search.style'

interface TagSearchProps {
  tagList: IItemWithTitle[]
  activeTags: IItemWithTitle[]
  isLoading: boolean
  getTags: () => void
  setActiveProductsTag: (tags: IItemWithTitle[]) => void
}

export const TagSearch: FC<TagSearchProps> = memo(props => {
  const { classes: styles, cx } = useStyles()

  const { tagList, activeTags, isLoading, getTags, setActiveProductsTag } = props

  const { selectRef, isOpen, onToggleSelect, filteredItems, searchValue, setSearchValue } =
    useSelect<IItemWithTitle>(tagList)

  const [tagsWithoutActiveTags, setTagsWithoutActiveTags] = useState<IItemWithTitle[]>([])

  const handleGetTags = () => {
    getTags()
    onToggleSelect()
  }

  useEffect(() => {
    setTagsWithoutActiveTags(tagList.filter(item => !activeTags.some(el => el?._id === item?._id)))
  }, [filteredItems, activeTags])

  return (
    <div ref={selectRef} className={styles.root}>
      <SearchInput
        hideButton
        inputClasses={styles.searchInput}
        placeholder={`#${t(TranslationKey['Search by tags'])}`}
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        onFocus={handleGetTags}
      />

      <div className={cx(styles.menuContainer, { [styles.menuContainerAnimation]: isOpen })}>
        {isLoading ? (
          <div className={styles.loadingWrapper}>
            <CircularProgress />
          </div>
        ) : (
          <div className={styles.menuItems}>
            {tagsWithoutActiveTags?.length
              ? tagsWithoutActiveTags.map((item, index) => (
                  <Button
                    key={index}
                    className={styles.button}
                    styleType={ButtonStyle.DEFAULT}
                    onClick={() => setActiveProductsTag([...activeTags, item])}
                  >
                    {item.title}
                  </Button>
                ))
              : t(TranslationKey['Not found'])}
          </div>
        )}
      </div>
    </div>
  )
})
