import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, provideRoutes, Route } from '@angular/router';

const routes: Route[] = [
  {
    path: '',
    loadComponent: async () => await import('./app'),
  },
  // {
  //   path: 'forms-demo',
  // }
];
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
  ],
};
