import { Tooltip } from 'antd'
import { FC, memo } from 'react'

import { CustomImage } from '@components/shared/custom-image'
import { Text } from '@components/shared/text'

import { toFixedWithDollarSign } from '@utils/text'

import { ISupplierCard } from '@typings/models/suppliers/supplier-exchange'

import { useStyles } from './supplier-card.style'

interface SupplierCardProps {
  supplierCard: ISupplierCard
}

export const SupplierCard: FC<SupplierCardProps> = memo(({ supplierCard }) => {
  const { classes: styles } = useStyles()

  const price = `${toFixedWithDollarSign(supplierCard?.priceInUsd)}`
  const minlot = `MOQ ${supplierCard?.minlot} pcs`

  return (
    <Tooltip title={supplierCard.cardName || ''} className={styles.root}>
      <CustomImage preview={false} src={supplierCard?.images?.[0]} width={72} height={72} />
      <Text copyable={false} rows={1} text={price} />
      <Text copyable={false} rows={1} text={minlot} />
    </Tooltip>
  )
})
