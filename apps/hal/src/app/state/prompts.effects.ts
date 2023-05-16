import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import * as PromptsActions from './prompts.actions';

import { switchMap, catchError, of, map, tap } from 'rxjs';
import { PromptsService } from '../prompts/prompts.service';
import { Prompt } from '@space-odyssey/eva';

@Injectable()
export class PromptsEffects {
  private actions$ = inject(Actions);

  constructor(private promptsService: PromptsService) {
  }

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PromptsActions.submitPrompt),
      switchMap((action) => {
        return this.promptsService.submitPrompt(action.prompt).pipe(
          map( (responsePrompt: Prompt) => PromptsActions.submitPromptSuccess(
            { prompt: responsePrompt }
          ))
        );
      }),
      catchError((error) => {
        console.error('Error', error);
        return of(PromptsActions.submitPromptFailure({ error }));
      })
    )
  );
}
