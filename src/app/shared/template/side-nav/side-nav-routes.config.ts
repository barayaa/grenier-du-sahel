import { SideNavInterface } from '../../interfaces/side-nav.type';

export const ROUTES: SideNavInterface[] = [
  {
    path: 'public/pubdashboard',
    title: 'Public Dashboard',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'dashboard',
    submenu: [],
  },

  {
    path: 'public/produits',
    title: 'Produits',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'appstore',
    submenu: [],
  },

  {
    path: 'public/demandes',
    title: 'Demandes',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'shop',
    submenu: [],
  },
  {
    path: 'public/cartographie',
    title: 'Cartographie',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'shop',
    submenu: [
      {
        path: 'public/cartographie/production',
        title: 'Production',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'shop',
        submenu: [],
      },
      {
        path: 'public/cartographie/stockage',
        title: 'Stockage',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'fund-view',
        submenu: [],
      },
    ],
  },

  {
    path: 'private/private-dashboard',
    title: 'Private Dashboard',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'dashboard',
    submenu: [],
  },

  {
    path: 'private/data_collect/',
    title: 'Data Collecte',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'fund',
    submenu: [
      {
        path: 'private/data_collect/collecteur',
        title: 'Collecteur',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'user-switch',
        submenu: [],
      },
      {
        path: 'private/data_collect/data_collect',
        title: 'Data Collecte',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'database',
        submenu: [],
      },
    ],
  },
  {
    path: 'private/user',
    title: 'Utilisateur',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'user',
    submenu: [
      {
        path: 'private/user/user',
        title: 'Liste Utilisateur',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'user-add',
        submenu: [],
      },
      {
        path: 'private/user/profile',
        title: 'Profil Utilisateur',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'usergroup-add',
        submenu: [],
      },
    ],
  },
  {
    path: 'private/decoupage',
    title: 'Decoupage Administratif',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'global',
    submenu: [],
  },
  {
    path: 'private/marcher',
    title: 'Marche',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'shop',
    submenu: [],
  },
  {
    path: 'private/magasin',
    title: 'Magasin',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'container',
    submenu: [],
  },

  {
    path: 'private/conseil_agricole',
    title: 'Conseil Agricole',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'read',
    submenu: [],
  },
];
