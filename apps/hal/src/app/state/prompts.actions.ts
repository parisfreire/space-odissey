import { createAction, props } from '@ngrx/store';
import { Prompt } from '@space-odyssey/eva';

export const submitPrompt = createAction(
  '[Prompts Page] Submit prompt',
  props<{ prompt: Prompt }>()
);

export const submitPromptSuccess = createAction(
  '[Prompts/API] Submit Prompt Success',
  props<{ prompt: Prompt }>()
);

export const submitPromptFailure = createAction(
  '[Prompts/API] Submit Prompt Failure',
  props<{ error: any }>()
);
