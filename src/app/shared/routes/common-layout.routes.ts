import { Routes } from '@angular/router';

export const CommonLayout_ROUTES: Routes = [
  {
    path: 'public',
    loadChildren: () =>
      import('../../public/public.module').then((m) => m.PublicModule),
  },

  {
    path: 'private',
    loadChildren: () =>
      import('../../private/private.module').then((m) => m.PrivateModule),
  },
];
