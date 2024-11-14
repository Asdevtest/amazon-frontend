import { Rate } from 'antd'
import { FC, memo } from 'react'

import { CustomImage } from '@components/shared/custom-image'
import { Text } from '@components/shared/text'

import { useStyles } from './supplier-details.style'

interface SupplierDitailsProps {
  xid?: number
  rate?: number
  image?: string
}

export const SupplierDitails: FC<SupplierDitailsProps> = memo(porps => {
  const { image, xid, rate = 0 } = porps

  const { classes: styles } = useStyles()

  const xidText = `ID: ${xid}`

  return (
    <div className={styles.root}>
      {image ? <CustomImage preview={false} src={image} height={20} width={30} /> : null}
      {xid ? <Text copyable={false} text={xidText} rows={1} /> : null}
      <Rate disabled allowHalf value={rate} />
    </div>
  )
})
