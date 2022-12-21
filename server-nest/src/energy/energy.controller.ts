//@Author s175182, s164420

import { Controller, Get, Query } from '@nestjs/common';
import { EnergyService } from './energy.service';

@Controller('/energy-consumption')
export class EnergyController {
  constructor(private readonly service: EnergyService) {}

  @Get()
  getTest(@Query('trip_id') trip_id) {
    if (trip_id) {
      return this.service.getEnergy(
        trip_id,
      );
    }

    const emptyMsgObj = {
      err: null,
      data: []
    }

    return JSON.stringify(emptyMsgObj)
  }
}
