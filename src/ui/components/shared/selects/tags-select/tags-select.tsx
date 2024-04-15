import { FC, memo } from 'react'

import { Button } from '@components/shared/button'
import { CrossIcon, CustomPlusIcon } from '@components/shared/svg-icons'

import { ITagList } from '@typings/models/generals/tag-list'

import { useSelectsServer } from '@hooks/use-selects-server'

import { useStyles } from './tags-select.style'

interface TagsSelectProps {
  tags: ITagList[]
}

export const TagsSelect: FC<TagsSelectProps> = memo(({ tags }) => {
  const { classes: styles } = useStyles()

  const { selectRef } = useSelectsServer()

  return (
    <div className={styles.container}>
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

      <div ref={selectRef}>{22222}</div>
    </div>
  )
})
