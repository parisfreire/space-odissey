import { Injectable } from '@nestjs/common';
import { AppService } from './app.service';
import { Configuration, OpenAIApi } from 'openai';
import { Prompt, PromptType } from '@space-odyssey/eva';

@Injectable()
export class ProductionAppService extends AppService {
  constructor() {
    super();
    this.logger.verbose('ProductionAppService');
  }

  async getResponsePrompt(prompt: Prompt) {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
      model: "text-ada-001",
      prompt: prompt.text,
      temperature: 0.5,
      max_tokens: 256,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    // Check response.status / response.statusText.
    // Maybe store response.config.data for logging purposes.
    // Store response.data.usage for billing purposes
    console.log(response.data)

    const responseText = response.data.choices[0].text;

    return new Prompt(undefined, responseText, PromptType.MACHINE);
  }
}
