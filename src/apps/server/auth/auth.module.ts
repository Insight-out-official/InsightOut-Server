import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RedisCacheModule } from '📚libs/modules/cache/redis/redis.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserRepository } from '📚libs/modules/database/repositories/user.repository';
import { UserInfoRepository } from '📚libs/modules/database/repositories/userInfo.repository';
import { ApiModule } from '📚libs/modules/api/api.module';

import { SigninGuard } from '../common/guards/signin.guard';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../common/guards/strategies/jwt.strategy';
import { JwtRefreshStrategy } from '../common/guards/strategies/jwtRefresh.strategy';
import { FirebaseModule } from '📚libs/modules/firebase/firebase.module';
import { ResumeRepository } from '📚libs/modules/database/repositories/resume.repository';
import { CapabilityRepository } from '📚libs/modules/database/repositories/capability.repository';
import { OnboardingsModule } from '🔥apps/server/onboardings/onboarding.module';
import { EnvService } from '📚libs/modules/env/env.service';
import { EnvEnum } from '📚libs/modules/env/env.enum';

@Module({
  imports: [
    RedisCacheModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (envService: EnvService) => {
        return {
          secret: envService.get<string>(EnvEnum.JWT_ACCESS_TOKEN_SECRET),
        };
      },
    }),
    ApiModule,
    FirebaseModule,

    // Domains
    OnboardingsModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    SigninGuard,
    JwtStrategy,
    JwtRefreshStrategy,

    // Repositories
    UserRepository,
    UserInfoRepository,
    ResumeRepository,
    CapabilityRepository,
  ],
  exports: [AuthService],
})
export class AuthModule {}
