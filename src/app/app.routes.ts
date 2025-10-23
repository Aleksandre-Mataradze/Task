import { Routes } from '@angular/router';
import { Table } from './pages/table/table';
import { Users } from './pages/users/users';
import { Posts } from './pages/posts/posts';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./pages/table/table').then(c => c.Table)},
    { path: 'users', loadComponent: () => import('./pages/users/users').then(c => c.Users) },
    { path: 'posts', loadComponent: () => import('./pages/posts/posts').then(c => c.Posts) },
    { path: 'posts/:userId', loadComponent: () => import('./pages/posts/posts').then(c => c.Posts) },
    { path: '**', redirectTo: '', pathMatch: 'full' } // wildcard route
];
