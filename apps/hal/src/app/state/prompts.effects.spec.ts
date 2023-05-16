import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as PromptsActions from './prompts.actions';
import { PromptsEffects } from './prompts.effects';
import { Prompt, PromptType } from '@space-odyssey/eva';

describe('PromptsEffects', () => {
  let actions: Observable<Action>;
  let effects: PromptsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        PromptsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(PromptsEffects);
  });

  describe('submitPrompt', () => {
    const prompt: Prompt = { text: 'text', type: PromptType.HUMAN};
    it('should work', () => {
      actions = hot('-a-|', { a: PromptsActions.submitPrompt({ prompt }) });

      const expected = hot('-a-|', {
        a: PromptsActions.submitPromptSuccess({ prompts: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
