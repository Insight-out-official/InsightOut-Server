import { BadRequestException, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateExperienceInfoReqDto } from '../../../apps/server/experiences/dto/req/createExperienceInfo.dto';
import { UserJwtToken } from '../../../apps/server/auth/types/jwt-tokwn.type';
import { Experience, ExperienceInfo, ExperienceStatus } from '@prisma/client';
import { ExperienceTransactionInterface } from '../../../apps/server/experiences/interface/experience-repository.interface';

@Injectable()
export class ExperienceTransactionRepository implements ExperienceTransactionInterface {
  constructor(private readonly prisma: PrismaService) {}

  public async createExperienceInfo(body: CreateExperienceInfoReqDto, user: UserJwtToken): Promise<[Experience, ExperienceInfo]> {
    return await this.prisma.$transaction(async (tx) => {
      const experience = await tx.experience.create({
        data: {
          title: body.title,
          startDate: body.startDate,
          endDate: body.endDate,
          experienceStatus: ExperienceStatus.inprogress,
          userId: user.userId,
        },
      });

      const experienceInfo = await tx.experienceInfo.create({
        data: {
          experienceRole: body.experienceRole,
          motivation: body.motivation,
          experienceId: experience.id,
        },
      });
      return [experience, experienceInfo];
    });
  }
}
