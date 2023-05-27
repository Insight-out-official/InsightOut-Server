import { PickType } from '@nestjs/swagger';
import { CapabilityDto } from '../capability.dto';

export class CapabilityReqDto extends PickType(CapabilityDto, ['keyword'] as const) {}
