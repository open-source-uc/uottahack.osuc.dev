import { db } from '$lib/server/kysely.js';
import { redirect, error } from '@sveltejs/kit';
import { z } from 'zod';
import { getTeam, getTeamProfiles } from './getTeam.js';

export const load = async (event) => {
	const session = await event.locals.getSession();
	if (!session) throw redirect(303, '/');

	const team = await getTeam(session.user.id);
	console.log(team);
	if (!team?.team_id) return { isInTeam: false } as const;

	const teamProfiles = await getTeamProfiles(team.team_id);

	const teamsProfileWithIsSelf = teamProfiles.map((profile) => ({
		...profile,
		isSelf: profile.user_id === session.user.id
	}));

	const isOwner = teamsProfileWithIsSelf.find((profile) => profile.is_owner)?.is_owner;

	return { team, members: teamsProfileWithIsSelf, isInTeam: true, isOwner };
};

const uuidValidator = z.string().uuid();
const nameValidator = z.string().min(3).max(50);

export const actions = {
	create: async (event) => {
		const session = await event.locals.getSession();
		if (!session) throw redirect(303, '/');

		const formData = await event.request.formData();
		const unsafeName = formData.get('team-name');
		const validated = nameValidator.safeParse(unsafeName);

		if (!validated.success) throw error(400, 'Invalid name');

		const team = await getTeam(session.user.id);

		if (team) throw error(400, 'Already in a team');

		const latestEvent = await db.selectFrom('current_event').select('id').executeTakeFirst();

		if (!latestEvent?.id) throw error(400, 'No events found');

		const eventId = latestEvent.id;

		await db.transaction().execute(async (trx) => {
			const team = await trx
				.insertInto('teams')
				.values({
					event_id: eventId,
					team_name: validated.data
				})
				.returning('id')
				.executeTakeFirstOrThrow();

			await trx
				.insertInto('members')
				.values({ team_id: team.id, user_id: session.user.id, is_owner: true })
				.execute();
		});
	},
	join: async (event) => {
		const session = await event.locals.getSession();
		if (!session) throw redirect(303, '/');
		const formData = await event.request.formData();

		const unsafeTeamId = formData.get('team-id');
		const validated = uuidValidator.safeParse(unsafeTeamId);

		if (!validated.success) return new Response('Invalid team ID', { status: 400 });

		const team = await getTeam(session.user.id);
		if (team) throw new Error('Already in a team');

		const teamToJoin = await db
			.selectFrom('teams')
			.where('id', '=', validated.data)
			.executeTakeFirst();

		if (!teamToJoin) throw error(404, 'Team not found');

		await db
			.insertInto('members')
			.values({ team_id: validated.data, user_id: session.user.id })
			.execute();
	},
	removeFromTeam: async (event) => {
		const session = await event.locals.getSession();
		if (!session) throw redirect(303, '/');

		const formData = await event.request.formData();
		const unsafeUserId = formData.get('user-id');
		const validatedUserID = uuidValidator.safeParse(unsafeUserId);
		const unsafeTeamId = formData.get('team-id');
		const validatedTeamID = uuidValidator.safeParse(unsafeTeamId);

		if (!validatedUserID.success) throw error(400, 'Invalid user ID');
		if (!validatedTeamID.success) throw error(400, 'Invalid team ID');

		// Can't remove yourself
		if (validatedUserID.data === session.user.id) throw error(400, 'Invalid user ID');

		const members = await getTeamProfiles(validatedTeamID.data);

		const self = members.find((member) => member.user_id === session.user.id);
		if (!self) throw error(400, 'Not in team');

		const isOwner = self.is_owner;

		// Can't remove if not owner
		if (!isOwner) throw error(400, 'Not owner');

		// Can't remove if not in team
		const userToRemove = members.find((member) => member.user_id === validatedUserID.data);
		if (!userToRemove) throw error(400, 'Not in team');

		await db
			.deleteFrom('members')
			.where('user_id', '=', validatedUserID.data)
			.where('team_id', '=', validatedTeamID.data)
			.execute();
	},
	leave: async (event) => {
		const session = await event.locals.getSession();
		if (!session) throw redirect(303, '/');

		const team = await getTeam(session.user.id);
		if (!team) throw error(400, 'Not in a team');

		await event.locals.supabase
			.from('members')
			.delete()
			.match({ team_id: team.team_id, user_id: session.user.id })
			.throwOnError();
	},
	deleteTeam: async (event) => {
		const session = await event.locals.getSession();
		if (!session) throw redirect(303, '/');

		const formData = await event.request.formData();
		const unsafeTeamId = formData.get('team-id');
		const validated = uuidValidator.safeParse(unsafeTeamId);
		if (!validated.success) throw error(400, 'Invalid team ID');

		const result = await event.locals.supabase.from('teams').delete().match({ id: validated.data });

		if (result.error) throw error(400, result.error.message);
	},
	editTeam: async (event) => {
		const session = await event.locals.getSession();
		if (!session) throw redirect(303, '/');
		const formData = await event.request.formData();

		const teamId = formData.get('team-id');
		const newTeamName = formData.get('team-name');
		const newTeamRepo = formData.get('team-repo');

		const team = await getTeam(session.user.id);

		if (!teamId || team?.team_id != teamId) throw error(400, 'Invalid team ID');
		if (typeof newTeamName !== 'string') throw error(400, 'Invalid team name');
		if (typeof newTeamRepo !== 'string') throw error(400, 'Invalid team repo');

		const result = await db
			.updateTable('teams')
			.set({
				team_name: newTeamName,
				github_link: newTeamRepo
			})
			.where('id', '=', teamId)
			.executeTakeFirst();

		if (!result) throw error(400, 'Equipo no encontrado');

		const url = new URL(event.request.url);
		url.searchParams.delete('editing');
		url.searchParams.delete('/editTeam');
		throw redirect(303, url.toString());
	}
};
