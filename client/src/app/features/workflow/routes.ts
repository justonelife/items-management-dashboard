import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'board',
    pathMatch: 'full'
  },
  {
    path: 'board',
    loadComponent: () => import('./features/board/board.component').then(c => c.BoardContainerComponent),
    title: 'Workflow Board',
    data: {
      subTitle: "Manage your team's workflow"
    }
  }
];
