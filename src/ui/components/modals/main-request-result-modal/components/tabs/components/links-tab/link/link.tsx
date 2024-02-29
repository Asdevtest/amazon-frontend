import { ChangeEvent, FC, memo } from 'react'

import { MAX_DEFAULT_INPUT_VALUE } from '@constants/text'

import { CopyValue } from '@components/shared/copy-value'
import { Input } from '@components/shared/input'
import { BasketIcon } from '@components/shared/svg-icons'

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

  return (
    <div className={styles.linkContainer}>
      {!isClient && !readOnly ? (
        <Input
          readOnly={isClient}
          value={link}
          maxLength={MAX_DEFAULT_INPUT_VALUE}
          classes={{
            root: cx(styles.inputRoot, { [styles.notFocuced]: isClient, [styles.error]: link.length === 0 }),
            input: styles.input,
          }}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeLink(linkIndex, e.target.value)}
        />
      ) : (
        <a
          href={link}
          target="_blank"
          rel="noreferrer noopener"
          className={cx(styles.inputRoot, styles.input, styles.link)}
        >
          {link}
        </a>
      )}

      <CopyValue text={link} />

      {!isClient && !readOnly ? (
        <button className={styles.button} onClick={() => onRemoveLink(linkIndex)}>
          <BasketIcon className={styles.iconBasket} />
        </button>
      ) : null}
    </div>
  )
})
