import { Module } from '@nestjs/common';
import { ResumesController } from './controllers/resumes.controller';
import { ResumesService } from './services/resumes.service';
import { ResumesRepository } from '../../../modules/database/repositories/resume.repository';

@Module({
  imports: [],
  controllers: [ResumesController],
  providers: [ResumesService, ResumesRepository],
})
export class ResumesModule {}
