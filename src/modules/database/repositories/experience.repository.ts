import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Experience, ExperienceInfo } from '@prisma/client';
import { ExperienceSelect } from '../../../apps/server/experiences/interface/experience-select.interface';
import { ExperienceRepositoryInterface } from '../../../apps/server/experiences/interface/experience-repository.interface';

@Injectable()
export class ExperienceRepository implements ExperienceRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  public async selectOneById(
    experienceId: number,
    select: ExperienceSelect,
  ): Promise<Partial<Experience & { experienceInfo: ExperienceInfo }>> {
    return await this.prisma.experience.findUnique({
      select,
      where: { id: experienceId },
    });
  }
}
