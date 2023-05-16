import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import * as fromPrompts from './app/state/prompts.reducer';
import { PromptsEffects } from './app/state/prompts.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient } from '@angular/common/http';
import { HttpService } from '@space-odyssey/moonbase';
import { environment } from './environments/environment';
import { enableProdMode } from '@angular/core';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideStore(),
    provideStoreDevtools(),
    provideState(fromPrompts.PROMPTS_FEATURE_KEY, fromPrompts.promptsReducer),
    provideEffects(PromptsEffects),
    provideHttpClient(),
    {provide: HttpService, useClass: HttpService},
  ],
}).catch((err) => console.error(err));
