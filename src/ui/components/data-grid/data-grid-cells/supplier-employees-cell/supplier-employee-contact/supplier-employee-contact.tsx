import { Tooltip } from 'antd'
import { FC, memo, useMemo } from 'react'
import { IconType } from 'react-icons'

import { CustomButton } from '@components/shared/custom-button'

import { useStyles } from './supplier-employee-contact.style'

interface SupplierEmployeeContactProps {
  Icon: IconType
}

export const SupplierEmployeeContact: FC<SupplierEmployeeContactProps> = memo(({ Icon, contacts }) => {
  const { classes: styles } = useStyles()

  const tooltipMessage = <div></div>

  return (
    <Tooltip className={styles.tooltip}>
      <CustomButton icon={<Icon size={12} />} type="default" size="small" />
    </Tooltip>
  )
})
