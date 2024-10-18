import { FC, memo } from 'react'

import { useStyles } from './string-list-cell.style'

import { StringItem } from './string-item'

interface StringListCellProps {
  data: string[]
  asin?: boolean
}

export const StringListCell: FC<StringListCellProps> = memo(({ data = [], asin }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.root}>
      {data?.map((item, index) => (
        <StringItem key={index} item={item} asin={asin} />
      ))}
    </div>
  )
})
