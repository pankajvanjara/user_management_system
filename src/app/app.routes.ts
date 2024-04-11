import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'user',
        children: [
            {
                path: '',
                loadComponent: () => import('./user/user.component').then(c => c.UserComponent)
            },
            {
                path: 'add',
                loadComponent: () => import('./user/add/add.component').then(c => c.AddComponent)
            }
        ]
    },
    {
        path: '' || '**',
        redirectTo: 'user',
        pathMatch: 'full'
    }
];
