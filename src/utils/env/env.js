import { NODE_ENV } from '@constants/keys/env'

export const isDebug = () => NODE_ENV === 'development'

export const isProduction = () => NODE_ENV === 'production'
