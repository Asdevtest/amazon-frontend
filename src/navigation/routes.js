import { AuthView } from '@views/auth';

import { ClientDashboardView } from '@views/client/client-dashboard-view';
import { ClientInventoryView } from '@views/client/client-inventory-view';
import { DocumentationView } from '@views/documentation';
import { RegistrationView } from '@views/registration';
import { Product } from '@views/client/product';

export const routes = [
  {
    routePath: '/auth',
    component: AuthView,
    exact: false
  },
  {
    routePath: '/product',
    component: Product,
    exact: false
  },
  {
    routePath: '/registration',
    component: RegistrationView,
    exact: false
  },
  {
    routePath: '/documentation',
    component: DocumentationView,
    exact: false
  },
  {
    routePath: '/inventory',
    component: ClientInventoryView,
    exact: false
  },
  {
    routePath: '/dashboard',
    component: ClientDashboardView,
    exact: false
  }
];
