import { loadRemoteModule } from '@angular-architects/native-federation';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'song-details',
        loadComponent: () =>
            loadRemoteModule('songDetails', './Component').then((m) => m.AppComponent),
    }
];