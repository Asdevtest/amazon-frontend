import { FC, memo } from 'react'

import { CrossIcon } from '@components/shared/svg-icons'

import { useStyles } from './tag-item.style'

interface TagItemProps {
  option: string
  prefix?: string
  className?: string
  onClickRemove?: () => void
}

export const TagItem: FC<TagItemProps> = memo(({ option, prefix = '#', onClickRemove, className }) => {
  const { classes: styles, cx } = useStyles()

  return (
    <div title={option} className={cx(styles.tagListItem, className)}>
      <div className={cx(styles.tagWrapper, className)}>
        <p className={styles.textTag}>{prefix}</p>
        <p className={cx(styles.textTag, styles.widthLimitation)}>{option}</p>
      </div>

      {onClickRemove ? (
        <button className={styles.removeTeg} onClick={onClickRemove}>
          <CrossIcon />
        </button>
      ) : null}
    </div>
  )
})
