import { Injectable } from '@nestjs/common';
import { Prompt, PromptType } from '@space-odyssey/eva';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError, AxiosResponse } from 'axios';
import { AppService } from './app.service';
import { CreateCompletionResponse } from 'openai';
@Injectable()
export class DevelopmentAppService extends AppService {
  constructor(
    private configService: ConfigService,
    private httpService: HttpService) {
      super();
      this.logger.verbose('DevelopmentAppService');
  }

  private readonly API_URL = this.configService.get<string>('API_URL');

  async getResponsePrompt(prompt: Prompt): Promise<Prompt> {
    const { data: response } = await firstValueFrom(
      this.httpService.get<AxiosResponse<CreateCompletionResponse>>(`${this.API_URL}/completion.json`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.statusText);
          throw 'An error happened!';
        }),
      ),
    );

    console.log(response);
    console.log(response.data.usage)

    const responseText = response.data.choices[0].text;

    return new Prompt(undefined, responseText, PromptType.MACHINE);
  }
}
