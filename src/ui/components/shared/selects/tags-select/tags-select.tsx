import { FC, memo } from 'react'

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
  tags: ITagList[]
}

export const TagsSelect: FC<TagsSelectProps> = memo(({ tags }) => {
  const { classes: styles, cx } = useStyles()

  const { selectRef, isOpen } = useSelectsServer()

  return (
    <div ref={selectRef} className={styles.container}>
      <form className={styles.form}>
        <input type="text" className={styles.input} />

        <div className={styles.buttonsWrapper}>
          <Button iconButton>
            <CrossIcon className={styles.crossIcon} />
          </Button>

          <Button iconButton>
            <CustomPlusIcon />
          </Button>
        </div>
      </form>

      <div className={cx(styles.menuContainer, { [styles.menuContainerAnimation]: isOpen })}>
        {isLoading ? (
          <div className={styles.loadingWrapper}>
            <CircleSpinner size={20} />
          </div>
        ) : (
          <div className={styles.menuItems}>
            {tags?.length
              ? tags.map((item, index) => (
                  <Button
                    key={index}
                    className={styles.button}
                    styleType={ButtonStyle.DEFAULT}
                    // onClick={() => setActiveProductsTag([...activeTags, item])}
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
