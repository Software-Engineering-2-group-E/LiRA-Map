import * as dotenv from 'dotenv';

dotenv.config();

const {
    DB_USER,
    DB_PASSWORD,
    DB_USER_VIS,
    DB_PASSWORD_VIS,
    DB_USER_POSTGIS,
    DB_PWD_POSTGIS,
    OUR_DB_NAME,
    OUR_DB_USER,
    OUR_DB_PASSWORD,
    FB_API_KEY,
    FB_AUTH_DOMAIN,
    FB_PROJECT_ID,
    FB_STORAGE_BUCKET,
    FB_MSG_SENDER_ID,
    FB_APP_ID,
} = process.env;

const BASE_CONFIG = {
    client: 'pg',
    debug: true,
    useNullAsDefault: true,
    pool: {
        min: 2,
        max: 10,
        createTimeoutMillis: 3000,
        acquireTimeoutMillis: 30000,
        idleTimeoutMillis: 30000,
        reapIntervalMillis: 1000,
        createRetryIntervalMillis: 100,
        propagateCreateError: false,
    },
    log: {
        warn(msg: any) {
            console.log('warning', msg);
        },
        error(msg: any) {
            console.log('error', msg);
        },
        deprecate(msg: any) {
            console.log('deprecate', msg);
        },
        debug(msg: any) {
            console.log('debug', msg);
        },
    },
};

export const FIREBASE_CONFIG = {
    apiKey: FB_API_KEY,
    authDomain: FB_AUTH_DOMAIN,
    projectId: FB_PROJECT_ID,
    storageBucket: FB_STORAGE_BUCKET,
    messagingSenderId: FB_MSG_SENDER_ID,
    appId: FB_APP_ID,
};

export const LIRA_DB_CONFIG = {
    ...BASE_CONFIG,
    connection: {
        host: 'liradb.compute.dtu.dk', // "liradbdev.compute.dtu.dk",
        port: 5435,
        user: DB_USER,
        password: DB_PASSWORD,
        database: 'postgres',
    },
};

export const OUR_LIRA_DB_CONFIG = {
    ...BASE_CONFIG,
    connection: {
        host: 'se2-e.compute.dtu.dk',
        port: 5432,
        user: OUR_DB_USER,
        password: OUR_DB_PASSWORD,
        database: OUR_DB_NAME,
    },
}

export const VISUAL_DB_CONFIG = {
  ...BASE_CONFIG,
  connection: {
    host: "liravisualization.postgres.database.azure.com",
    port: 5432,
    user: DB_USER_VIS,
    password: DB_PASSWORD_VIS,
    database: "postgres",
    ssl: true,
  },
};

export const POSTGIS_DB_CONFIG = {
  ...BASE_CONFIG,
  connection: {
    host: "liradb.postgres.database.azure.com",
    port: 5432,
    user: DB_USER_POSTGIS,
    password: DB_PWD_POSTGIS,
    database: "postgis",
    ssl: true,
  },
};
