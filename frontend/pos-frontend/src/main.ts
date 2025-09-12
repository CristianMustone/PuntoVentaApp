import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http'; // 👈 importar
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []), // conserva tus providers anteriores
    provideHttpClient(), // 👈 agrega el HttpClient global
  ],
}).catch((err) => console.error(err));
