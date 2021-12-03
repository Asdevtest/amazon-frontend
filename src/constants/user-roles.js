import {objectFlip} from '@utils/object'

export const UserRole = {
  ADMIN: 'ADMIN',
  CLIENT: 'CLIENT',
  SUPERVISOR: 'SUPERVISOR',
  RESEARCHER: 'RESEARCHER',
  BUYER: 'BUYER',
  STOREKEEPER: 'STOREKEEPER',
  CANDIDATE: `CANDIDATE`,
}

export const UserRoleCodeMap = {
  0: UserRole.ADMIN,
  10: UserRole.CLIENT,
  20: UserRole.SUPERVISOR,
  30: UserRole.RESEARCHER,
  40: UserRole.BUYER,
  45: UserRole.STOREKEEPER,
  50: UserRole.CANDIDATE,
}

export const mapUserRoleEnumToKey = objectFlip(UserRoleCodeMap, parseInt)
