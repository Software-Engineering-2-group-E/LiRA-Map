import { Knex } from 'knex';

interface Altitude {
    way_id: string;
    way_dist: number;
    altitude: number;
}

export const Altitudes = (k: Knex) => k.from<Altitude>('altitude');
