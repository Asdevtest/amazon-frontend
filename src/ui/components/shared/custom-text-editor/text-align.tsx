import { FC, PropsWithChildren, memo } from 'react'

interface TextAlignProps extends PropsWithChildren {
  textAlign: 'start' | 'end' | 'center' | 'justify'
}

export const TextAlign: FC<TextAlignProps> = memo(({ children, textAlign }) => (
  <span style={{ textAlign: `${textAlign}` }}>{children}</span>
))
