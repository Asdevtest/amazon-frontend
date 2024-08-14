import Link from 'antd/es/typography/Link'
import { FC, memo } from 'react'
import { LuExternalLink } from 'react-icons/lu'

import { checkIsHasHttp } from '@utils/checks'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'

import { useHover } from '@hooks/use-hover'

import { useStyles } from './link-cell.style'

interface LinkCellProps {
  value: string
}

export const LinkCell: FC<LinkCellProps> = memo(({ value }) => {
  const { classes: styles } = useStyles()
  const [isHover, onMouseFunctions] = useHover()

  const validLink = checkIsHasHttp(value) ? value : getAmazonImageUrl(value, true)
  const copyable = isHover ? { text: validLink, tooltips: isHover } : false

  return value ? (
    <Link
      {...onMouseFunctions}
      copyable={copyable}
      target="_blank"
      href={validLink}
      className={styles.link}
      onClick={e => e.stopPropagation()}
    >
      <LuExternalLink size={28} className={styles.icon} />
    </Link>
  ) : null
})
