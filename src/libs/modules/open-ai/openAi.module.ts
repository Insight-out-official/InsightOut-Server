import { Module } from '@nestjs/common';
import { OpenAiService } from './openAi.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule.register({})],
  providers: [OpenAiService],
  exports: [OpenAiService],
})
export class OpenAiModule {}
