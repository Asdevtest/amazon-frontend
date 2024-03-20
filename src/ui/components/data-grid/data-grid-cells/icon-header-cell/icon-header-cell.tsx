import { FC, memo } from 'react'

interface IconHeaderCellProps {
  url: string
}

export const IconHeaderCell: FC<IconHeaderCellProps> = memo(({ url }) => <img src={url} />)
