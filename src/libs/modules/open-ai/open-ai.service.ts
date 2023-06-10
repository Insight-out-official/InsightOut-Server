import { Injectable } from '@nestjs/common';
import { EnvService } from '📚libs/modules/env/env.service';
import { EnvEnum } from '📚libs/modules/env/env.enum';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { openAIModelEnum } from '📚libs/modules/open-ai/openAIModel.enum';

@Injectable()
export class OpenAiService {
  private openAIHeader: { [key in string] };
  private OPEN_AI_URL = 'https://api.openai.com/v1/chat/completions';
  private OPEN_AI_MODEL = openAIModelEnum.GPT_3DOT5_TERBO;

  constructor(private readonly envService: EnvService, private readonly httpService: HttpService) {
    this.openAIHeader = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.envService.get(EnvEnum.OPENAI_API_KEY)}`,
    };
  }

  public async promptChatGPT(content: string) {
    const data = {
      model: this.OPEN_AI_MODEL,
      messages: [
        {
          role: 'user',
          content,
        },
      ],
    };

    const response = await firstValueFrom(
      this.httpService.post(this.OPEN_AI_URL, data, { headers: this.openAIHeader }).pipe(
        catchError((error) => {
          console.error(error.response.data);
          throw error;
        }),
      ),
    );

    const responseData = response.data;

    return responseData;
  }
}
