import { Typography } from 'antd'
import { FC, memo } from 'react'

import { useHover } from '@hooks/use-hover'

import { useStyles } from './string-list-cell.style'

const { Text: AntText, Link } = Typography

interface StringItemProps {
  item: string
  asin?: boolean
}

export const StringItem: FC<StringItemProps> = memo(({ item, asin }) => {
  const { classes: styles } = useStyles()
  const [isHover, onMouseFunctions] = useHover()

  return asin ? (
    <Link
      {...onMouseFunctions}
      ellipsis
      copyable={isHover && !!item}
      target="_blank"
      href={`https://www.amazon.com/dp/${item}`}
      className={styles.text}
      onClick={e => e.stopPropagation()}
    >
      {item}
    </Link>
  ) : (
    <AntText {...onMouseFunctions} ellipsis copyable={isHover && !!item} onClick={e => e.stopPropagation()}>
      {item}
    </AntText>
  )
})
