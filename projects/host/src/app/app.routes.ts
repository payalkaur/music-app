import { loadRemoteModule } from '@angular-architects/native-federation';
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CallbackComponent } from './callback/callback.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
    },
    {
        path: 'callback',
        component: CallbackComponent,
    },
    {
        path: 'song-list',
        loadComponent: () =>
            loadRemoteModule('songList', './Component').then((m) => m.AppComponent),
    },
    {
        path: 'song-details',
        loadComponent: () =>
            loadRemoteModule('songDetails', './Component').then((m) => m.AppComponent),
    },
    { path: '**', redirectTo: '' }
];