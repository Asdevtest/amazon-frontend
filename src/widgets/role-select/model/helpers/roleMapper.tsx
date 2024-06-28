import { Roles } from '@typings/enums/roles'

export const roleMapper = (roleCode: number) => ({
  label: <span style={{ textTransform: 'capitalize' }}>{Roles[roleCode]}</span>,
  value: roleCode,
})
