import { AppRoute } from '@shared/types/app-route/app-route.enum'

export const routerPath: Record<AppRoute, string> = {
  [AppRoute.MAIN]: '/',
  [AppRoute.AUTH]: '/auth',
  [AppRoute.REGISTRATION]: '/registration',
}
