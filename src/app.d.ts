import type { Database } from '$lib/supabase/types';
import type { SupabaseClient, Session, User } from '@supabase/supabase-js';

export interface GitHubSession extends Session {
	user: User & {
		user_metadata: {
			avatar_url: string;
			email: string;
			email_verified: boolean;
			full_name: string;
			iss: string;
			name: string;
			preferred_username: string;
			provider_id: string;
			sub: string;
			user_name: string;
		};
	};
}

declare global {
	namespace App {
		interface Locals {
			supabase: SupabaseClient<Database>;
			getSession(): Promise<GitHubSession | null>;
		}
		interface PageData {
			supabase: SupabaseClient<Database>;
			session: GitHubSession | null;
			profile: Database['public']['Tables']['profiles']['Row'] | null;
			loginWithGitHub: () => void;
		}
		// interface Error {}
		// interface Platform {}
	}
}
