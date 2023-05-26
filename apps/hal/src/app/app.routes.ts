import { Route } from '@angular/router';
import { PromptsFormContainer } from './prompts/form/form.container';
export const appRoutes: Route[] = [
  { path: '', redirectTo: 'prompts', pathMatch: 'full' },
  { path: 'prompts', component: PromptsFormContainer },
];
