import { NavItem } from '@/types';

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard/overview',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: [], // Empty array as there are no child items for Dashboard
  },
  {
    title: 'Applications Board',
    url: '/dashboard/applications-boards',
    icon: 'product',
    shortcut: ['a', 'a'],
    isActive: false,
    items: [], // No child items
  },
  {
    title: 'Job Network',
    url: '#', // Placeholder as there is no direct link for the parent
    icon: 'briefcase',
    isActive: true,

    items: [
      {
        title: 'Job Portals',
        url: '/dashboard/job-network/job-portals',
        icon: 'lists',
        shortcut: ['m', 'm'],
      },
      {
        title: 'Recruiters List',
        url: '/dashboard/job-network/recruiters-list',
        icon: 'users',
        shortcut: ['r', 'r'],
      },
      {
        title: 'Company List',
        url: '/dashboard/job-network/company-list',
        icon: 'company',
        shortcut: ['c', 'c'],
      },
    ],
  },
  // {
  //   title: 'Employee',
  //   url: '/dashboard/employee',
  //   icon: 'user',
  //   shortcut: ['e', 'e'],
  //   isActive: false,
  //   items: [], // No child items
  // },
  // {
  //   title: 'Product',
  //   url: '/dashboard/product',
  //   icon: 'product',
  //   shortcut: ['p', 'p'],
  //   isActive: false,
  //   items: [], // No child items
  // },
  // {
  //   title: 'Account',
  //   url: '#', // Placeholder as there is no direct link for the parent
  //   icon: 'billing',
  //   isActive: true,

  //   items: [
  //     {
  //       title: 'Profile',
  //       url: '/dashboard/profile',
  //       icon: 'userPen',
  //       shortcut: ['m', 'm'],
  //     },
  //   ],
  // },
];
