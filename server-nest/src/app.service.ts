//@Author(s) s184230

import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
    @Inject(ConfigService)
    public config: ConfigService;

    getHello(): string {
        return 'Hello World!';
    }
}
