<script lang="ts" context="module">
	import { page } from '$app/stores';

	export const shouldRedirectToProfile = derived(
		page,
		({ data, url }) => !!data.session && !data.profile && url.pathname !== '/profile'
	);
</script>

<script lang="ts">
	import './global.css';

	import { onMount } from 'svelte';
	import { goto, invalidate } from '$app/navigation';
	import { derived } from 'svelte/store';
	import UserMenu from './UserMenu.svelte';
	import Toaster from './(app)/Toaster.svelte';

	onMount(() => {
		if ($shouldRedirectToProfile) goto('/profile');
	});

	onMount(() => {
		const { data } = $page.data.supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== $page.data.session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<nav class="flex shrink-0 items-center border-b border-sky-500 bg-gray-900 p-2 h-16">
	<div class="flex-grow flex gap-2 items-center">
		<a
			href="/"
			class="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500"
			>CodeFest</a
		>
		{#if $page.data.session}
			<a href="/team" class="py-1 px-2 hover:bg-gray-700 rounded">Equipo</a>
		{/if}
	</div>
	<div class="mr-4">
		{#if $page.data.session}
			<UserMenu session={$page.data.session} />
		{:else}
			<button on:click={$page.data.loginWithGitHub}>Ingresa</button>
		{/if}
	</div>
</nav>

<div class="flex-grow">
	<slot />
</div>

<footer class="px-4 py-2 text-center shrink-0">
	Evento organizado por la comunidad de <a href="https://osuc.dev" class="text-sky-200 underline"
		>Open Source UC</a
	>, con apoyo del
	<a href="https://ccc.ing.puc.cl" class="text-sky-200 underline"
		>Capítulo de Ciencia de la Computación</a
	>
</footer>

<Toaster />
