import { Tooltip } from 'antd'
import { FC, memo, useMemo } from 'react'
import { IconType } from 'react-icons'

import { CustomButton } from '@components/shared/custom-button'

import { useStyles } from './supplier-employee-contact.style'

interface SupplierEmployeeContactProps {
  Icon: IconType
  contacts: string[]
}

export const SupplierEmployeeContact: FC<SupplierEmployeeContactProps> = memo(({ Icon, contacts }) => {
  const { classes: styles } = useStyles()

  const tooltipMessage = useMemo(() => {
    return (
      <ul>
        {contacts?.map((contact, index) => (
          <li key={index}>{contact}</li>
        ))}
      </ul>
    )
  }, [contacts])

  return (
    <Tooltip className={styles.tooltip} title={tooltipMessage}>
      <CustomButton icon={<Icon size={12} />} type="default" size="small" />
    </Tooltip>
  )
})
