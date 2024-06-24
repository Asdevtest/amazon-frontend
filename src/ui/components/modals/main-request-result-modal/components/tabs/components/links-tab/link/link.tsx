import { ChangeEvent, FC, memo } from 'react'

import { MIDDLE_COMMENT_VALUE } from '@constants/text'

import { CopyValue } from '@components/shared/copy-value'
import { Input } from '@components/shared/input'
import { BasketIcon } from '@components/shared/svg-icons'

import { checkAndMakeAbsoluteUrl } from '@utils/text'

import { useStyles } from './link.style'

interface LinkProps {
  isClient: boolean
  link: string
  linkIndex: number
  readOnly?: boolean
  onChangeLink: (linkIndex: number, value: string) => void
  onRemoveLink: (linkIndex: number) => void
}

export const Link: FC<LinkProps> = memo(props => {
  const { isClient, link, linkIndex, onChangeLink, onRemoveLink, readOnly } = props

  const { classes: styles, cx } = useStyles()

  const notClientAndNotReadOnly = !isClient && !readOnly

  return (
    <div className={styles.linkContainer}>
      {notClientAndNotReadOnly ? (
        <Input
          readOnly={isClient}
          value={link}
          inputProps={{
            maxLength: MIDDLE_COMMENT_VALUE,
          }}
          classes={{
            root: cx(styles.inputRoot, { [styles.notFocuced]: isClient }),
            input: styles.input,
          }}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeLink(linkIndex, e.target.value)}
        />
      ) : (
        <a
          href={checkAndMakeAbsoluteUrl(link)}
          target="_blank"
          rel="noreferrer noopener"
          className={cx(styles.inputRoot, styles.input, styles.link)}
        >
          {link}
        </a>
      )}

      <CopyValue text={link} />

      {notClientAndNotReadOnly ? (
        <button className={styles.button} onClick={() => onRemoveLink(linkIndex)}>
          <BasketIcon className={styles.iconBasket} />
        </button>
      ) : null}
    </div>
  )
})
