import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'visualizer/n-queens',
    pathMatch: 'full',
  },
  {
    path: 'visualizer',
    title: 'Visualizer',
    children: [
      {
        path: 'n-queens',
        loadComponent: () =>
          import(
            './features/n-queen-visualizer/n-queen-visualizer.component'
          ).then((c) => c.NqueenVisualizerComponent),
        title: 'N-Queens Visualizer',
      },
    ],
  },
];
