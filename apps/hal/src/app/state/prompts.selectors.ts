import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  PROMPTS_FEATURE_KEY,
  PromptsState,
  promptsAdapter,
} from './prompts.reducer';

// Lookup the 'Prompts' feature state managed by NgRx
export const selectPromptsState =
  createFeatureSelector<PromptsState>(PROMPTS_FEATURE_KEY);

const { selectAll, selectEntities } = promptsAdapter.getSelectors();

export const selectPromptsLoaded = createSelector(
  selectPromptsState,
  (state: PromptsState) => state.loaded
);

export const selectPromptsError = createSelector(
  selectPromptsState,
  (state: PromptsState) => state.error
);

export const selectAllPrompts = createSelector(
  selectPromptsState,
  (state: PromptsState) => selectAll(state)
);

export const selectPromptsEntities = createSelector(
  selectPromptsState,
  (state: PromptsState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectPromptsState,
  (state: PromptsState) => state.selectedId
);

export const selectEntity = createSelector(
  selectPromptsEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
