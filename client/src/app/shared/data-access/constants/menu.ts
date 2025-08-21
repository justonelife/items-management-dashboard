import { InjectionToken } from '@angular/core';
import { NavItem } from '@libs/hys-layouts';

export const APP_MENU = new InjectionToken<NavItem[]>('APP_MENU');

export const MENU: NavItem[] = [
  {
    title: 'Items Management',
    path: 'items-management',
    icon: 'deployed_code',
    iconSet: 'outlined',
  },
  { title: 'Workflow', path: 'workflow', icon: 'graph_1', iconSet: 'outlined' },
  {
    title: 'Challenges',
    path: 'challenges',
    icon: 'swords',
    iconSet: 'outlined',
  },
];
