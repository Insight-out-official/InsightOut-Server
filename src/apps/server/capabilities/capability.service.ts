import { Injectable } from '@nestjs/common';

@Injectable()
export class CapabilityService {
  public async createCapability(userId: number, experienceId: number, keyword: string) {}
}
