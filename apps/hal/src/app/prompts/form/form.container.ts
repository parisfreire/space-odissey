import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromptsFormComponent } from './form.component';
import { Store } from '@ngrx/store';
import { selectAllPrompts } from '../../state/prompts.selectors';
import { Prompt } from '@space-odyssey/eva';
import { submitPrompt } from '../../state/prompts.actions';

@Component({
  selector: 'prompts-form-container',
  standalone: true,
  imports: [CommonModule, PromptsFormComponent],
  template: '<prompts-form (promptSubmit)="sendPrompt($event)" [prompts]="(prompts$ | async) || []"></prompts-form>',
  styles: [
    `
      :host {
        height: inherit;
        width: inherit;
      }
    `,
  ],
})
export class PromptsFormContainer {

  prompts$ = this.store.select(selectAllPrompts);
  constructor(private store: Store) {
  }

  sendPrompt(prompt: Prompt) {
    this.store.dispatch(submitPrompt({ prompt }))
  }
}
