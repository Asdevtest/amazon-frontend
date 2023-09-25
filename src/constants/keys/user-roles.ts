// import {objectFlip} from '../utils/object-utils'
import { objectFlip } from '@utils/object'

// console.log('objectFlip', objectFlip)

export const UserRole = {
  ADMIN: 'ADMIN',
  CLIENT: 'CLIENT',
  SUPERVISOR: 'SUPERVISOR',
  RESEARCHER: 'RESEARCHER',
  BUYER: 'BUYER',
  STOREKEEPER: 'STOREKEEPER',
  CANDIDATE: `CANDIDATE`,
  FREELANCER: `FREELANCER`,
  MODERATOR: `MODERATOR`,
}

export const UserRoleCodeMap: Record<number, string> = {
  0: UserRole.ADMIN,
  10: UserRole.CLIENT,
  20: UserRole.SUPERVISOR,
  30: UserRole.RESEARCHER,
  35: UserRole.FREELANCER,
  40: UserRole.BUYER,
  45: UserRole.STOREKEEPER,
  50: UserRole.CANDIDATE,
  60: UserRole.MODERATOR,
}

export const UserRoleCodeMapForRoutes: Record<number, string> = {
  0: 'admin',
  10: 'client',
  20: 'supervisor',
  30: 'researcher',
  35: 'freelancer',
  40: 'buyer',
  45: 'warehouse',
  50: 'candidate',
  60: 'moderator',
}

export const UserRolePrettyMap = {
  0: 'Admin',
  10: 'Client',
  20: 'Supervisor',
  30: 'Researcher',
  35: 'Freelancer',
  40: 'Buyer',
  45: 'Storekeeper',
  50: 'Candidate',
  60: 'Moderator',
}

export const UserRolesForAdminProduct = {
  client: 10,
  supervisor: 20,
  researcher: 30,
  buyer: 40,
}

export const mapUserRoleEnumToKey = objectFlip(UserRoleCodeMap, parseInt)
