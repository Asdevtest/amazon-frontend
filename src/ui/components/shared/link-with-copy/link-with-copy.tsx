import { CopyValue } from '@components/shared/copy-value'
import { useLinkWithCopyStyles } from '@components/shared/link-with-copy/link-with-copy.styles'

interface LinkWithCopyProps {
  url: string
  title: string
  valueToCopy: string
}

export const LinkWithCopy = (props: LinkWithCopyProps) => {
  const { url, title, valueToCopy } = props
  const { classes: styles } = useLinkWithCopyStyles()

  return (
    <div className={styles.wrapper}>
      <a target="_blank" rel="noreferrer" href={url} className={styles.normalizeLink}>
        <span className={styles.linkSpan}>{title}</span>
      </a>

      <CopyValue text={valueToCopy} />
    </div>
  )
}
