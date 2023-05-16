import { Action } from '@ngrx/store';

import * as PromptsActions from './prompts.actions';
import { PromptsEntity } from './prompts.models';
import {
  PromptsState,
  initialPromptsState,
  promptsReducer,
} from './prompts.reducer';

describe('Prompts Reducer', () => {
  const createPromptsEntity = (id: string, name = ''): PromptsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Prompts actions', () => {
    it('loadPromptsSuccess should return the list of known Prompts', () => {
      const prompts = [
        createPromptsEntity('PRODUCT-AAA'),
        createPromptsEntity('PRODUCT-zzz'),
      ];
      const action = PromptsActions.loadPromptsSuccess({ prompts });

      const result: PromptsState = promptsReducer(initialPromptsState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = promptsReducer(initialPromptsState, action);

      expect(result).toBe(initialPromptsState);
    });
  });
});
