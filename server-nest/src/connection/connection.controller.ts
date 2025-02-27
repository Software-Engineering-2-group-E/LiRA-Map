//@Author(s) s204442, s204433, s184230

import { Controller, Get } from '@nestjs/common';
import { ConnectionService } from './connection.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('connection')
@ApiTags('Connection')
export class ConnectionController {
    constructor(private readonly service: ConnectionService) {}

    @Get()
    getConnection(): Promise<boolean> {
        return this.service.getConnection();
    }
}
