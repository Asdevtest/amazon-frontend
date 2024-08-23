import { Roles } from '@typings/enums/roles'
import { TypeGuard } from '@typings/guards/type-guard'

const createTypeGuard =
  <T>(role: T): TypeGuard<T> =>
  (value: unknown): value is T =>
    value === role

export const isAdmin = createTypeGuard(Roles.ADMIN)
export const isClient = createTypeGuard(Roles.CLIENT)
export const isSupervisor = createTypeGuard(Roles.SUPERVISOR)
export const isResearcher = createTypeGuard(Roles.RESEARCHER)
export const isFreelancer = createTypeGuard(Roles.FREELANCER)
export const isBuyer = createTypeGuard(Roles.BUYER)
export const isStorekeeper = createTypeGuard(Roles.STOREKEEPER)
export const isCandidate = createTypeGuard(Roles.CANDIDATE)
export const isModerator = createTypeGuard(Roles.MODERATOR)
