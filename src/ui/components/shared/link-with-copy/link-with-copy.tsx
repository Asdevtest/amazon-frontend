import { FC, memo } from 'react'

import { CopyValue } from '@components/shared/copy-value'
import { useStyles } from '@components/shared/link-with-copy/link-with-copy.style'

interface LinkWithCopyProps {
  url: string
  title: string
  valueToCopy: string
  linkTextSize?: 'medium'
}

export const LinkWithCopy: FC<LinkWithCopyProps> = memo(props => {
  const { url, title, valueToCopy, linkTextSize } = props
  const { classes: styles, cx } = useStyles()

  return (
    <div className={styles.wrapper}>
      <a
        target="_blank"
        rel="noreferrer"
        href={url}
        className={cx(styles.normalizeLink, { [styles.mediumSizeLinkText]: linkTextSize === 'medium' })}
      >
        {title}
      </a>

      <CopyValue text={valueToCopy} />
    </div>
  )
})
