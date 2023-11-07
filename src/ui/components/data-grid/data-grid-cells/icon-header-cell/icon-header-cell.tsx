import React, { FC } from 'react'

interface IconHeaderCellProps {
  url: string
}

export const IconHeaderCell: FC<IconHeaderCellProps> = React.memo(({ url }) => <img src={url} />)
