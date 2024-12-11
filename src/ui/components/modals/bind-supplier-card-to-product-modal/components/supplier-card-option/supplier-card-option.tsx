import { FC, memo } from 'react'

import { CustomImage } from '@components/shared/custom-image'

import { useStyles } from './supplier-card-option.style'

interface SupplierCardOptionProps {
  image: string
  title?: string
}

export const SupplierCardOption: FC<SupplierCardOptionProps> = memo(({ image, title }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.cardOption}>
      <CustomImage width={32} height={32} src={image} />
      <div className={styles.cardName}>{title}</div>
    </div>
  )
})
