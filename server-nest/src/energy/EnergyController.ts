import { Controller, Get } from '@nestjs/common';
import { EnergyService } from './EnergyService';

@Controller('/energy-consumption')
export class EnergyController {
  constructor(private readonly service: EnergyService) {}

  @Get()
  getTest() {
    return this.service.get(
      '2857262b-71db-49df-8db6-a042987bf0eb',
    );
  }
}
