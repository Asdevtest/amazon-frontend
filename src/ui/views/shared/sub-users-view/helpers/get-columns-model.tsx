import { subUsersColumns } from '@components/table/table-columns/sub-users-columns'
import { subUsersFreelancerColumns } from '@components/table/table-columns/sub-users-freelancer-columns'

export const getColumnsModel = (pathname: string) => {
  if (pathname === '/freelancer/users/sub-users') {
    return subUsersFreelancerColumns
  } else {
    return subUsersColumns
  }
}
