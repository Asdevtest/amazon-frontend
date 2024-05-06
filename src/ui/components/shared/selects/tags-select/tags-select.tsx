import { FC, MouseEvent, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { CircleSpinner } from '@components/shared/circle-spinner'
import { CrossIcon, CustomPlusIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
import { ITagList } from '@typings/models/generals/tag-list'

import { useSelectsServer } from '@hooks/use-selects-server'

import { useStyles } from './tags-select.style'

interface TagsSelectProps {
  isloadingTags: boolean
  tags: ITagList[]
  getTagsAll: () => void
  loadMoreDataHadler: (scrollEvent: MouseEvent<HTMLDivElement>) => void
  onClickTag: (tag: ITagList) => void
  onClickSubmitSearch: (searchValue: string) => void
  onClickCreateTag: (tagTitle: string) => void
}

export const TagsSelect: FC<TagsSelectProps> = memo(props => {
  const { classes: styles, cx } = useStyles()

  const { isloadingTags, tags, onClickTag, onClickSubmitSearch, getTagsAll, loadMoreDataHadler, onClickCreateTag } =
    props

  const { selectRef, isOpen, setIsOpen, searchValue, setSearchValue } = useSelectsServer(
    onClickSubmitSearch,
    getTagsAll,
  )

  return (
    <div ref={selectRef} className={styles.container}>
      <form className={styles.form}>
        <input
          type="text"
          placeholder={t(TranslationKey['Tag name'])}
          className={styles.input}
          value={searchValue}
          onChange={event => setSearchValue(event?.target?.value)}
          onFocus={() => setIsOpen(true)}
        />

        {searchValue ? (
          <div className={styles.buttonsWrapper}>
            <Button
              iconButton
              onClick={() => {
                setSearchValue('')
              }}
            >
              <CrossIcon className={styles.crossIcon} />
            </Button>

            <Button
              iconButton
              onClick={() => {
                onClickCreateTag(searchValue)
                setSearchValue('')
              }}
            >
              <CustomPlusIcon />
            </Button>
          </div>
        ) : null}
      </form>

      <div className={cx(styles.menuContainer, { [styles.menuContainerAnimation]: isOpen })}>
        <div className={styles.menuItems} onScroll={loadMoreDataHadler}>
          {tags?.length
            ? tags.map((item, index) => (
                <Button
                  key={index}
                  className={styles.button}
                  styleType={ButtonStyle.DEFAULT}
                  onClick={() => onClickTag(item)}
                >
                  {item.title}
                </Button>
              ))
            : t(TranslationKey['Not found'])}

          {isloadingTags ? (
            <div className={styles.loadingWrapper}>
              <CircleSpinner size={20} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
})
