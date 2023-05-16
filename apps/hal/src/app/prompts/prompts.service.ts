import { Injectable } from '@angular/core';
import { HttpService } from '@space-odyssey/moonbase';
import { Prompt } from '@space-odyssey/eva';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PromptsService {

  private API_URL = `${environment.API_URL}/discovery`;
  constructor(private api : HttpService) { }

  submitPrompt(prompt: Prompt): Observable<Prompt> {
    return this.api.post(
      this.API_URL,
      'application/json',
      prompt,
    )
  }


}
