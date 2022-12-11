import { knex } from 'knex'

import * as dotenv from 'dotenv';

dotenv.config();

const {
    OUR_DB_NAME,
    OUR_DB_USER,
    OUR_DB_PASSWORD,
} = process.env;

export interface MeasurementRow {
    MeasurementId: string
    TS_or_Distance: string
    Created_Date: Date
    Updated_Date: Date
    lat: number
    lon: number
    isComputed: boolean
    FK_Trip: string
    FK_MeasurementType: string
    T: string
    message: string
}

export class EnergyDB {
    private readonly liradb = knex({
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

    public async persist(data: MeasurementRow) {
        console.log(`[${new Date().toLocaleString('da')}] Writing calculated power measurement ${data.MeasurementId} to database.`)
        this.liradb.insert(data).into('measurements')
            .then(() => {
                //console.log(`${new Date().toLocaleString('da')}: Succesfully wrote calculated power measurement to database.`);
            })
            .catch((e) => {
                console.log(`[${new Date().toLocaleString('da')}] Something went wrong, most likely not connected to PostgreSQL.`);
                console.error(e);
            });
    }
}