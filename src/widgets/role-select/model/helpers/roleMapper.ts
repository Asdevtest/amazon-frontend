import { Roles } from '@typings/enums/roles'

export const roleMapper = (roleCode: number) => ({
  label: Roles[roleCode],
  value: roleCode,
})
