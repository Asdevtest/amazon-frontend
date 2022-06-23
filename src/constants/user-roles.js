import {objectFlip} from '@utils/object'

export const UserRole = {
  ADMIN: 'ADMIN',
  CLIENT: 'CLIENT',
  SUPERVISOR: 'SUPERVISOR',
  RESEARCHER: 'RESEARCHER',
  BUYER: 'BUYER',
  STOREKEEPER: 'STOREKEEPER',
  CANDIDATE: `CANDIDATE`,
  FREELANCER: `FREELANCER`,
}

export const UserRoleCodeMap = {
  0: UserRole.ADMIN,
  10: UserRole.CLIENT,
  20: UserRole.SUPERVISOR,
  30: UserRole.RESEARCHER,
  35: UserRole.FREELANCER,
  40: UserRole.BUYER,
  45: UserRole.STOREKEEPER,
  50: UserRole.CANDIDATE,
}

export const UserRoleCodeMapForRoutes = {
  0: 'admin',
  10: 'client',
  20: 'supervisor',
  30: 'researcher',
  35: 'freelancer',
  40: 'buyer',
  45: 'storekeeper',
  50: 'candidate',
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
}

export const mapUserRoleEnumToKey = objectFlip(UserRoleCodeMap, parseInt)
