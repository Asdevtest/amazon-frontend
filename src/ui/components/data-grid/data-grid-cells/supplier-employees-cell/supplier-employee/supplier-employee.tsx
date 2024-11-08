import { Avatar } from 'antd'
import { FC, memo } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { FaRegEnvelope } from 'react-icons/fa6'
import { SlPhone } from 'react-icons/sl'

import { CustomButton } from '@components/shared/custom-button'

import { ISupplierEmployee } from '@typings/models/suppliers/supplier-employee'

import { useStyles } from './supplier-employee.style'

interface SupplierEmployeProps {
  employee: ISupplierEmployee
}

export const SupplierEmployee: FC<SupplierEmployeProps> = memo(props => {
  const { classes: styles } = useStyles()

  const { employee } = props
  const { name, emails, links, phoneNumbers } = employee

  return (
    <div className={styles.employeeWrapper}>
      <p>{name}</p>

      <div className={styles.contacts}>
        <CustomButton icon={<SlPhone size={12} />} type="default" size="small" />
        <CustomButton icon={<FaRegEnvelope size={12} />} type="default" size="small" />
        <CustomButton icon={<BsThreeDots size={12} />} type="default" size="small" />
      </div>
    </div>
  )
})
