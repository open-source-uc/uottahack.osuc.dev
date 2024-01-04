import { db } from '$lib/server/kysely.js';

export const getTeam = (userId: string) =>
	db
		.selectFrom('teams')
		.leftJoin('members', 'teams.id', 'members.team_id')
		.where('members.user_id', '=', userId)
		.select(['team_id', 'team_name', 'github_link'])
		.executeTakeFirst();

export const getTeamProfiles = (teamId: string) =>
	db
		.selectFrom('profiles')
		.leftJoin('members', 'profiles.id', 'members.user_id')
		.where('members.team_id', '=', teamId)
		.orderBy('members.is_owner', 'desc')
		.select(['is_owner', 'profiles.name as name', 'user_id'])
		.execute();
