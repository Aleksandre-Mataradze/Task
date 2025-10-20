import { Routes } from '@angular/router';
import { Table } from './pages/table/table';
import { Users } from './pages/users/users';
import { Posts } from './pages/posts/posts';

export const routes: Routes = [
    { path: '', component: Table}, // default route
    { path: 'users', component: Users}, // default route
    { path: 'posts', component: Posts}, // default route
    { path: '**', redirectTo: '', pathMatch: 'full' } // wildcard route
];
