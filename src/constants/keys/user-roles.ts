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
