import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./pages/table/table').then(c => c.Table)},
    { path: 'users', loadComponent: () => import('./pages/users/users').then(c => c.Users) },
    { path: 'posts', loadComponent: () => import('./pages/posts/posts').then(c => c.Posts) },
    { path: 'posts/:userId', loadComponent: () => import('./pages/posts/posts').then(c => c.Posts) },
    { path: 'todo/:userId', loadComponent: () => import('./pages/todo/todo.component').then(c => c.TodoComponent) },
    { path: '**', redirectTo: '', pathMatch: 'full' } // wildcard route
];
