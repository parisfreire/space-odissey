import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as PromptsActions from './prompts.actions';
import { Prompt } from '@space-odyssey/eva';

export const PROMPTS_FEATURE_KEY = 'prompts';

export interface PromptsState extends EntityState<Prompt> {
  selectedId?: string | number; // which Prompts record has been selected
  loaded?: boolean; // has the Prompts list been loaded
  error?: string | null; // last known error (if any)
}

export interface PromptsPartialState {
  readonly [PROMPTS_FEATURE_KEY]: PromptsState;
}

export const promptsAdapter: EntityAdapter<Prompt> =
  createEntityAdapter<Prompt>();

export const initialPromptsState: PromptsState = promptsAdapter.getInitialState(
  {
    loaded: false,
  },
);

const reducer = createReducer(
  initialPromptsState,
  on(PromptsActions.submitPrompt, (state, { prompt }) =>
      promptsAdapter.addOne(prompt, state)
  ),
  on(PromptsActions.submitPromptSuccess, (state, { prompt }) =>
    promptsAdapter.addOne(prompt, {
      ...state,
      loaded: true
    })
  ),
  on(PromptsActions.submitPromptFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function promptsReducer(
  state: PromptsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
