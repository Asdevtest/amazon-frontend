import { FC, memo } from 'react'

import { useStyles } from './text-with-copy.style'

import { CopyValue } from '../copy-value'

interface TextWithCopyProps {
  text: string
  justifyContent: string
}

export const TextWithCopy: FC<TextWithCopyProps> = memo(({ text, justifyContent = 'center' }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.root} style={{ justifyContent }}>
      <p>{text}</p>
      <CopyValue text={text} />
    </div>
  )
})
