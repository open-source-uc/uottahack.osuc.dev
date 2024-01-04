import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';

import type { Config } from '@sveltejs/adapter-vercel';

export const config: Config = {
	runtime: 'nodejs18.x'
};

export const load = async ({ fetch, data, depends, url }) => {
	depends('supabase:auth');

	const supabase = createSupabaseLoadClient({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event: { fetch },
		serverSession: data.session
	});

	const { session } = (await supabase.auth.getSession()).data;

	const loginWithGitHub = () =>
		supabase.auth.signInWithOAuth({
			provider: 'github',
			options: {
				redirectTo: url.host
			}
		});

	return { session, supabase, loginWithGitHub, profile: data.profile };
};
