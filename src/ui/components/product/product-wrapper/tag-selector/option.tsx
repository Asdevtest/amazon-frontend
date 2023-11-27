import { FC, memo } from 'react'

import { useStyles } from './tag-selector.styles'

interface OptionProps {
  option: string
  prefix: string
  className?: string
}

export const Option: FC<OptionProps> = memo(({ option, prefix, className }) => {
  const { classes: styles, cx } = useStyles()

  const MAX_CHARS_WITHOUT_TITLE = 28
  const optionTitle = option.length > MAX_CHARS_WITHOUT_TITLE ? option : ''

  return (
    <div title={optionTitle} className={cx(styles.tagWrapper, className)}>
      <p className={styles.textTag}>{prefix}</p>
      <p className={cx(styles.textTag, styles.widthLimitation)}>{option}</p>
    </div>
  )
})
