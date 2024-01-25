import { FC, memo } from 'react'

import { useStyles } from './text-with-copy.style'

import { CopyValue } from '../copy-value'

interface TextWithCopyProps {
  text: string
}

export const TextWithCopy: FC<TextWithCopyProps> = memo(({ text }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.root}>
      <p>{text}</p>
      <CopyValue text={text} />
    </div>
  )
})
