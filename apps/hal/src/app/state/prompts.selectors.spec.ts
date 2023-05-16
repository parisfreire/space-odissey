import { PromptsEntity } from './prompts.models';
import {
  promptsAdapter,
  PromptsPartialState,
  initialPromptsState,
} from './prompts.reducer';
import * as PromptsSelectors from './prompts.selectors';

describe('Prompts Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getPromptsId = (it: PromptsEntity) => it.id;
  const createPromptsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as PromptsEntity);

  let state: PromptsPartialState;

  beforeEach(() => {
    state = {
      prompts: promptsAdapter.setAll(
        [
          createPromptsEntity('PRODUCT-AAA'),
          createPromptsEntity('PRODUCT-BBB'),
          createPromptsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialPromptsState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Prompts Selectors', () => {
    it('selectAllPrompts() should return the list of Prompts', () => {
      const results = PromptsSelectors.selectAllPrompts(state);
      const selId = getPromptsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = PromptsSelectors.selectEntity(state) as PromptsEntity;
      const selId = getPromptsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectPromptsLoaded() should return the current "loaded" status', () => {
      const result = PromptsSelectors.selectPromptsLoaded(state);

      expect(result).toBe(true);
    });

    it('selectPromptsError() should return the current "error" state', () => {
      const result = PromptsSelectors.selectPromptsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
