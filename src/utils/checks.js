import {UserRole} from '@constants/user-roles'

export const isNotUndefined = value => typeof value !== 'undefined'
export const isUndefined = value => typeof value === 'undefined'

export const isNull = value => typeof value === null
export const isNotNull = value => typeof value !== null

export const checkIsResearcher = userRole => userRole === UserRole.RESEARCHER
export const checkIsSupervisor = userRole => userRole === UserRole.SUPERVISOR
export const checkIsBuyer = userRole => userRole === UserRole.BUYER
export const checkIsClient = userRole => userRole === UserRole.CLIENT
