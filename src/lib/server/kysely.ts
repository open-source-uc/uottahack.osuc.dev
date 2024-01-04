import type { Database } from '../supabase/types';
import { Kysely, PostgresDialect, type Generated } from 'kysely';
import pkg from 'pg';
import { env } from '$env/dynamic/private';

const { Pool } = pkg;

type Tables = Database['public']['Tables'];
type Views = Database['public']['Views'];

type DB = {
	[TableName in keyof Tables]: {
		[ColumnName in keyof Tables[TableName]['Insert']]-?: undefined extends Tables[TableName]['Insert'][ColumnName]
			? Generated<NoUndefined<Tables[TableName]['Insert'][ColumnName]>>
			: Tables[TableName]['Insert'][ColumnName];
	};
} & {
	[TableName in keyof Views]: {
		[ColumnName in keyof Views[TableName]['Row']]-?: undefined extends Views[TableName]['Row'][ColumnName]
			? Generated<NoUndefined<Views[TableName]['Row'][ColumnName]>>
			: Views[TableName]['Row'][ColumnName];
	};
};

type NoUndefined<T> = T extends undefined ? never : T;

const dialect = new PostgresDialect({
	pool: new Pool({
		database: env.DB_NAME,
		host: env.DB_HOST,
		user: env.DB_USER,
		port: env.DB_PORT ? parseInt(env.DB_PORT) : 5432,
		password: env.DB_PASSWORD,
		max: 5
	})
});

export const db = new Kysely<DB>({ dialect });
