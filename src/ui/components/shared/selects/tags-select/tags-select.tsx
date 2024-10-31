import { FC, MouseEvent, memo } from 'react'
import { FiPlus } from 'react-icons/fi'

import { TranslationKey } from '@constants/translations/translation-key'

import { CircleSpinner } from '@components/shared/circle-spinner'
import { CustomButton } from '@components/shared/custom-button'
import { CrossIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { ITagList } from '@typings/models/generals/tag-list'

import { useSelectsServer } from '@hooks/use-selects-server'

import { useStyles } from './tags-select.style'

interface TagsSelectProps {
  isloadingTags: boolean
  tags: ITagList[]
  selectedTags: ITagList[]
  getTagsAll: () => void
  loadMoreDataHadler: (scrollEvent: MouseEvent<HTMLDivElement>) => void
  handleResetTags: () => void
  onClickTag: (tag: ITagList) => void
  onClickSubmitSearch: (searchValue: string) => void
  onClickCreateTag: (tagTitle: string) => void
}

export const TagsSelect: FC<TagsSelectProps> = memo(props => {
  const { classes: styles, cx } = useStyles()

  const {
    isloadingTags,
    tags,
    selectedTags,
    onClickTag,
    onClickSubmitSearch,
    getTagsAll,
    loadMoreDataHadler,
    onClickCreateTag,
    handleResetTags,
  } = props

  const { selectRef, isOpen, setIsOpen, searchValue, setSearchValue } = useSelectsServer(
    onClickSubmitSearch,
    handleResetTags,
  )

  return (
    <div ref={selectRef} className={styles.container}>
      <form className={styles.form}>
        <input
          type="text"
          maxLength={255}
          placeholder={t(TranslationKey['Tag name'])}
          className={styles.input}
          value={searchValue}
          onChange={event => setSearchValue(event?.target?.value)}
          onFocus={() => {
            getTagsAll()
            setIsOpen(true)
          }}
        />

        {searchValue ? (
          <div className={styles.buttonsWrapper}>
            <CustomButton
              icon={<CrossIcon className={styles.crossIcon} />}
              onClick={() => {
                setSearchValue('')
              }}
            />

            <CustomButton
              icon={<FiPlus style={{ width: 16, height: 16 }} />}
              onClick={() => {
                onClickCreateTag(searchValue)
                setSearchValue('')
              }}
            />
          </div>
        ) : null}
      </form>

      {isOpen ? (
        <div className={styles.menuContainer}>
          <div className={styles.menuItems} onScroll={loadMoreDataHadler}>
            {tags?.length
              ? tags.map((item, index) => (
                  <CustomButton
                    key={index}
                    className={cx(styles.button, {
                      [styles.buttonSelected]: selectedTags?.some(tag => tag._id === item._id),
                    })}
                    onClick={() => onClickTag(item)}
                  >
                    {item.title}
                  </CustomButton>
                ))
              : isloadingTags
              ? null
              : t(TranslationKey['Not found'])}

            {isloadingTags ? (
              <div className={styles.loadingWrapper}>
                <CircleSpinner size={20} />
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  )
})
