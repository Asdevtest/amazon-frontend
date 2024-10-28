import { FC, forwardRef, memo } from 'react'

import { useStyles } from './string-list-cell.style'

import { StringItem } from './string-item'

interface StringListCellProps {
  data: string[]
  asin?: boolean
  maxVisibleLines?: number
  onScroll?: () => void
}

const LINE_HEIGHT_PX = 16

export const StringListCell: FC<StringListCellProps> = memo(
  forwardRef<HTMLDivElement, StringListCellProps>((props, ref) => {
    const { data, asin, maxVisibleLines = 3, onScroll } = props

    const { classes: styles } = useStyles()

    const calculatedHeight = maxVisibleLines * LINE_HEIGHT_PX

    return (
      <div ref={ref} className={styles.root} style={{ maxHeight: calculatedHeight }} onScroll={onScroll}>
        {data?.map((item, index) => (
          <StringItem key={index} item={String(item)} asin={asin} />
        ))}
      </div>
    )
  }),
)
