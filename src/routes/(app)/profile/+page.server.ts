import { z } from 'zod';
import { superValidate, message } from 'sveltekit-superforms/server';
import { fail, redirect } from '@sveltejs/kit';

const profileSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	gen: z
		.number()
		.int()
		.min(2000)
		.max(new Date().getFullYear() + 1),
	pizza_type: z.string(),
	degree: z.string(),
	linkedin: z.string().url().startsWith('https://www.linkedin.com/in/').nullable(),
	accepts_to_be_contacted_by_companies: z.boolean(),
	notes: z.string().nullable()
});

export const load = async ({ parent }) => {
	const { session, profile } = await parent();
	if (!session) return redirect(303, '/');

	const defaultProfile = profile || {
		name: session.user.user_metadata.full_name,
		email: session.user.user_metadata.email
	};

	const form = await superValidate(defaultProfile, profileSchema);

	return { form };
};

export const actions = {
	default: async ({ request, locals: { supabase, getSession } }) => {
		const form = await superValidate(request, profileSchema);

		if (!form.valid) return fail(400, { form });

		const session = await getSession();
		if (!session) return fail(401, { form });

		const profile = { ...form.data, id: session.user.id };

		const { data } = await supabase.from('profiles').upsert(profile).select().single();

		if (!data) return fail(500, { form });

		form.data = data;
		return message(form, { saved: true });
	}
};
