import { db } from '$lib/server/kysely.js';
import { getTeam } from './team/getTeam.js';

export const load = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	const { data } = await supabase.from('total_participants').select('*').single();

	const { teamsCount } = await db
		.selectFrom('teams')
		.select(({ fn }) => fn.count('id').as('teamsCount'))
		.executeTakeFirstOrThrow();

	const team = session ? await getTeam(session.user.id) : undefined;

	return {
		totalParticipants: data?.amount ?? 0,
		teamsCount,
		team
	};
};
