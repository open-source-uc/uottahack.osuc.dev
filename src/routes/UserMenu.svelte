<script lang="ts">
	import './global.css';
	import { page } from '$app/stores';

	import { createAvatar, createDropdownMenu } from '@melt-ui/svelte';
	import type { GitHubSession } from '../app';
	import { goto } from '$app/navigation';

	export let session: GitHubSession;

	const { image, fallback } = createAvatar({
		src: session.user.user_metadata.avatar_url
	});
	const { menu, item, trigger, separator } = createDropdownMenu();
</script>

<button
	melt={$trigger}
	class="flex h-8 w-8 items-center justify-center rounded-full bg-sky-600 overflow-clip ring-1 ring-sky-400"
>
	<img melt={$image} alt="Avatar" class="h-full w-full" />
	<span melt={$fallback} class="font-medium text-sky-100">
		{session.user.user_metadata.full_name
			? session.user.user_metadata.full_name
					.split(' ')
					.map((name) => name[0])
					.slice(0, 2)
					.join('')
			: session.user.user_metadata.user_name}
	</span>
</button>

<div
	melt={$menu}
	class="flex flex-col shadow-lg bg-gray-800 rounded-md p-1 shadow-gray-900 ring-0 border-"
>
	<a melt={$item} href="/profile" class="text-gray-100 item">Editar perfil</a>
	<div melt={$separator} class="m-[5px] h-[1px] bg-sky-700" />
	<button
		melt={$item}
		on:click={() => {
			$page.data.supabase.auth.signOut();
			goto('/');
		}}
		class="text-red-400 item">Cerrar sesión</button
	>
</div>

<style lang="postcss">
	.item {
		@apply px-4 py-2 data-[highlighted]:bg-gray-700 rounded;
	}
</style>
