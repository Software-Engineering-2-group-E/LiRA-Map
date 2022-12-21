//@Author(s) s164420

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { knex } from 'knex';
import { AppModule } from './app.module';

import * as dotenv from 'dotenv';

dotenv.config();

const {
    OUR_DB_NAME,
    OUR_DB_USER,
    OUR_DB_PASSWORD,
} = process.env;

const pg = knex({
    client: 'pg',
    connection: {
        host: 'se2-e.compute.dtu.dk',
        port: 5432,
        user: OUR_DB_USER,
        password: OUR_DB_PASSWORD,
        database: OUR_DB_NAME,
    },
    searchPath: ['knex', 'public', 'lira'],
});


pg.raw('SELECT 1')
    .then(() => {
        console.log('PostgreSQL connected');
    })
    .catch((e) => {
        console.log('PostgreSQL not connected');
        console.error(e);
    });

declare const module: any;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();

    const config = new DocumentBuilder()
        .setTitle('LiRA API')
        .setDescription('The LiRA API description')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(3002);

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}

bootstrap();
