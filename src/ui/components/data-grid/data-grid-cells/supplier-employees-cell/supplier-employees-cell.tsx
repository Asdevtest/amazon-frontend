import { FC, memo } from 'react'

import { ISupplierEmployee } from '@typings/models/suppliers/supplier-employee'

import { useStyles } from './supplier-employees-cell.style'

import { SupplierEmployee } from './supplier-employee/supplier-employee'

interface SupplierEmployeesCellProps {
  employees: ISupplierEmployee[]
}

export const SupplierEmployeesCell: FC<SupplierEmployeesCellProps> = memo(({ employees }) => {
  const { classes: styles } = useStyles()

  return (
    <div>
      {employees?.map(employee => (
        <SupplierEmployee key={employee._id} employee={employee} />
      ))}
    </div>
  )
})
