import { Body, Controller, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Method } from '📚libs/enums/method.enum';
import { ResponseEntity } from '📚libs/utils/respone.entity';
import { Route } from '🔥apps/server/common/decorators/router/route.decorator';
import { PostSendFeedbackRequestBodyDto } from '🔥apps/server/users/dtos/post-feedback.dto';
import { UserService } from '🔥apps/server/users/user.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // TODO RoleGuard 세우거나 Public, Private 스위칭하기
  /**
   * 피드백을 서버로 전송합니다.
   *
   * 피드백 내용을 받아서 데이터베이스에 저장합니다.
   *
   * @param postSendFeedbackRequestBodyDto 피드백 내용을 담은 request body입니다.
   */
  @Route({
    request: {
      path: 'feedback',
      method: Method.POST,
    },
    response: {
      code: HttpStatus.CREATED,
      description: '### ✅ 피드백 제출에 성공했습니다.\n유저가 작성한 내용이 서버에 그대로 적재됩니다.',
      type: String,
    },
    summary: '피드백 제출 API',
    description:
      '# 피드백 제출 API\n## Description\n유저가 회원 탈퇴한 후에 피드백을 서버로 제출합니다.   \n주로 탈퇴한 이유 등의 피드백이 제출됩니다. 최종적으로 데이터베이스에 적재될 예정이며, 별도로 부가 데이터는 필요하지 않습니다.\n## Note.\n피드백의 제한 길이는 300자 입니다.\n## etc.\n⛳️ [피드백 전송](https://www.figma.com/file/0ZJ1ulwtU8k0KQuroxU9Wc/%EC%9D%B8%EC%82%AC%EC%9D%B4%ED%8A%B8%EC%95%84%EC%9B%83?type=design&node-id=1815-11807&t=fcBrncd1yBcOT49W-4)',
  })
  async sendFeedback(@Body() postSendFeedbackRequestBodyDto: PostSendFeedbackRequestBodyDto): Promise<ResponseEntity<string>> {
    await this.userService.sendFeedback(postSendFeedbackRequestBodyDto);

    return ResponseEntity.CREATED_WITH_MESSAGE('Feedback has been sent');
  }
}
