import { FC, memo } from 'react'

import { useStyles } from './string-list-cell.style'

import { StringItem } from './string-item'

interface StringListCellProps {
  data: string[]
  asin?: boolean
  fixedHeight?: boolean
}

export const StringListCell: FC<StringListCellProps> = memo(({ data = [], asin, fixedHeight = true }) => {
  const { cx, classes: styles } = useStyles()

  return (
    <div className={cx(styles.root, { [styles.fixedHeight]: fixedHeight })}>
      {data?.map((item, index) => (
        <StringItem key={index} item={item} asin={asin} />
      ))}
    </div>
  )
})
