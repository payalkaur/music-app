import { loadRemoteModule } from '@angular-architects/native-federation';
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CallbackComponent } from './callback/callback.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'callback',
        component: CallbackComponent,
    },
    // {
    //     path: 'song-list',
    //     loadComponent: () =>
    //         loadRemoteModule('songList', './Component').then((m) => m.AppComponent),
    // },
    // {
    //     path: 'song-details',
    //     loadComponent: () =>
    //         loadRemoteModule('songDetails', './Component').then((m) => m.AppComponent),
    // },
    {
        path: 'home',
        component: HomeComponent,
        children: [
            {
                path: '',
                loadComponent: () =>
                    loadRemoteModule('songList', './Component').then((m) => m.AppComponent),
            }, {
                path: 'song-details',
                loadComponent: () =>
                    loadRemoteModule('songDetails', './Component').then((m) => m.AppComponent),
            }
        ],
        canActivate: [authGuard]
    }
];