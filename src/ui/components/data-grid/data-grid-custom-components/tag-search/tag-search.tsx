import { memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { SearchInput } from '@components/shared/search-input'

import { t } from '@utils/translations'

import { useStyles } from './tag-search.style'

export const TagSearch = memo(props => {
  const { classes: styles } = useStyles()

  const { tagList, getProductsTags } = props

  console.log('props :>> ', props)
  console.log('tagList :>> ', tagList)

  return (
    <div className={styles.root}>
      <SearchInput
        hideButton
        inputClasses={styles.searchInput}
        placeholder={`#${t(TranslationKey['Search by tags'])}`}
        onFocus={() => getProductsTags()}
        // onSubmit={onSearchSubmit}
      />

      {/* <div className={cx(styles.menuContainer, { [styles.menuContainerAnimation]: isOpen })}>
        

        <div className={styles.menuItems}>
          {filteredItems.map((item, index) => (
            <Button
              key={index}
              className={styles.button}
              styleType={ButtonStyle.DEFAULT}
              onClick={() => {
                onClickField(item._id)
                onToggleSelect()
              }}
            >
              {item.name}
            </Button>
          ))}
        </div>
      </div> */}
    </div>
  )
})
