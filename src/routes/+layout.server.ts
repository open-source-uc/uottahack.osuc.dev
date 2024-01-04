export const load = async ({ locals: { getSession, supabase } }) => {
	const session = await getSession();

	const profile = session
		? (await supabase.from('profiles').select('*').eq('id', session.user.id).single()).data
		: null;

	return { session, profile };
};
