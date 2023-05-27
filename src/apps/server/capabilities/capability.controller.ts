import { Body, HttpStatus, Param, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RouteTable } from '../common/decorators/router/route-table.decorator';
import { Route } from '../common/decorators/router/route.decorator';
import { User } from '../common/decorators/request/user.decorator';
import { UserJwtToken } from '../auth/types/jwt-tokwn.type';
import { Method } from '../../../enums/method.enum';
import { CapabilityService } from './capability.service';
import { ExperienceIdParamReqDto } from '../experiences/dto/req/experienceIdParam.dto';
import { CapabilityReqDto } from './dto/req/createCapability.req.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@RouteTable({
  path: '/experience/:experienceId/capability',
  tag: {
    title: '경험 역량 키워드 API',
  },
})
export class CapabilityController {
  constructor(private capabilityService: CapabilityService) {}

  @Route({
    request: {
      method: Method.POST,
      path: '/',
    },
    response: {
      code: HttpStatus.CREATED,
    },
    description: '경험 역량 키워드 생성 API입니다.',
    summary: '경험 역량 키워드 생성 API',
  })
  public async createCapability(
    @User() user: UserJwtToken,
    @Param(ValidationPipe) param: ExperienceIdParamReqDto,
    @Body(ValidationPipe) body: CapabilityReqDto,
  ) {
    const userId = user.userId;
    const experiencId = param.experienceId;
    const keyword = body.keyword;

    return await this.capabilityService.createCapability(userId, experiencId, keyword);
  }
}
