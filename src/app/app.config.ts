import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, Route } from '@angular/router';

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
        loadComponent: async () => await import('./segment/segment'),
      },
      {
        path: 'signal-segment',
        loadComponent: async () =>
          await import('./signal-segment/signal-segment'),
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
