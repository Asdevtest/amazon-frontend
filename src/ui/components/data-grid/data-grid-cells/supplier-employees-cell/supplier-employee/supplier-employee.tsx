import { FC, memo } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { FaRegEnvelope } from 'react-icons/fa6'
import { SlPhone } from 'react-icons/sl'

import { ISupplierEmployee } from '@typings/models/suppliers/supplier-employee'

import { useStyles } from './supplier-employee.style'

import { SupplierEmployeeContact } from '../supplier-employee-contact'

interface SupplierEmployeProps {
  employee: ISupplierEmployee
}

export const SupplierEmployee: FC<SupplierEmployeProps> = memo(props => {
  const { classes: styles } = useStyles()

  const { employee } = props
  const { name, emails, links, phoneNumbers } = employee

  return (
    <div className={styles.employeeWrapper}>
      <p className={styles.name}>{name}</p>

      <div className={styles.contacts}>
        {phoneNumbers?.length ? <SupplierEmployeeContact Icon={SlPhone} contacts={phoneNumbers} /> : null}
        {emails?.length ? <SupplierEmployeeContact Icon={FaRegEnvelope} contacts={emails} /> : null}
        {links?.length ? <SupplierEmployeeContact Icon={BsThreeDots} contacts={links} /> : null}
      </div>
    </div>
  )
})
