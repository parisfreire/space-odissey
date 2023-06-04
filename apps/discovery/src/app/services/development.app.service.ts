import { Injectable } from '@nestjs/common';
import { Prompt, PromptType } from '@space-odyssey/eva';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { AppService } from './app.service';
import MOCKED_RESPONSE from '../../assets/completion.json'
import { UsageService } from '../usage/usage.service';
@Injectable()
export class DevelopmentAppService extends AppService {
  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
    private usageService: UsageService) {
      super();
      this.logger.verbose('DevelopmentAppService');
  }

  private readonly API_URL = this.configService.get<string>('API_URL');

  async getResponsePrompt(prompt: Prompt): Promise<Prompt> {
    // const { data: response } = await firstValueFrom(
    //   this.httpService.get<AxiosResponse<CreateCompletionResponse>>(`${this.API_URL}/completion.json`).pipe(
    //     catchError((error: AxiosError) => {
    //       this.logger.error(error);
    //       this.logger.error(error.response);
    //       this.logger.error(error.response.statusText);
    //       throw 'An error happened!';
    //     }),
    //   ),
    // );

    // Storing usage in MongoDB for billing purposes
    await this.usageService.save(MOCKED_RESPONSE.data.usage);

    const responseText = MOCKED_RESPONSE.data.choices[0].text;

    return new Prompt(undefined, responseText, PromptType.MACHINE);
  }
}
