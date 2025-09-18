import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, Route } from '@angular/router';
import { async } from 'rxjs';

const routes: Route[] = [
  {
    path: '',
    loadComponent: async () => await import('./app'),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'segment',
      },
      {
        path: 'segment',
        loadComponent: async () => await import('./wrapper/wrapper'),
      },
      {
        path: 'signal-segment',
        loadComponent: async () => await import('./wrapper/wrapper'),
      },
      {
        path: 'demo',
        loadComponent: async () => await import('./simple-demos/user'),
      },
    ],
  },
];
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
  ],
};
