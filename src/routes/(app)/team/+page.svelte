<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { derived } from 'svelte/store';

	export let data;

	if (data.session === null) throw new Error('Invalid state');
	const self = data.session.user;

	const isEditing = derived(page, ($page) => $page.url.searchParams.has('editing'));
	const setIsEditing = (editing: boolean) => {
		const params = new URLSearchParams($page.url.searchParams);
		editing ? params.set('editing', 'true') : params.delete('editing');
		goto(`?${params.toString()}`);
	};

	let editedName = data.team?.team_name;
	let editedGitHubLink = data.team?.github_link;
</script>

<div class="py-8 px-2">
	<main class="bg-gray-900 max-w-4xl mx-auto rounded px-4 py-3">
		{#if data.isInTeam}
			<div class="mb-4">
				{#if $isEditing}
					<form use:enhance method="POST" action="?/editTeam" class="grid grid-cols-1 gap-y-2">
						<input type="hidden" name="team-id" value={data.team.team_id} />

						<div>
							<label for="edited-team-name">Nombre del equipo</label>
							<input
								bind:value={editedName}
								id="edited-team-name"
								name="team-name"
								required
								class="text-gray-700 p-2 rounded mb-2 w-full"
							/>
						</div>

						<div>
							<label for="edited-team-repo">Repositorio</label>
							<input
								bind:value={editedGitHubLink}
								id="edited-team-repo"
								type="url"
								pattern="^https:\/\/github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+$"
								name="team-repo"
								class="text-gray-700 p-2 rounded mb-2 w-full"
							/>
						</div>

						<div class="flex justify-between w-full">
							<button type="submit" class="bg-sky-600 text-sky-50 p-2 rounded"
								>Guardar cambios</button
							>
							<button
								type="button"
								class="bg-red-600 text-red-50 p-2 rounded"
								on:click={() => setIsEditing(false)}>Cancelar</button
							>
						</div>
					</form>
				{:else}
					<div class="flex justify-between items-center">
						<div>
							<h1 class="text-2xl">Equipo <span>{data.team.team_name}</span></h1>
							{#if data.team.github_link}
								<div>
									<div>Repositorio:</div>
									<div>{data.team.github_link}</div>
								</div>
							{:else}
								<div>
									No se ha agregado link a un repositorio, puedes hacerlo desde la opción de editar.
								</div>
							{/if}
						</div>
						{#if data.isOwner}
							<button
								on:click={() => setIsEditing(true)}
								class="flex p-2.5 items-center justify-center bg-blue-500 rounded-xl hover:bg-blue-600 transition-all duration-300 text-white"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-6 w-6 mr-1"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="2"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
									/>
								</svg>
							</button>
						{/if}
					</div>
					<div class="flex gap-2 my-3">
						<div>Id del equipo:</div>
						<div>{data.team.team_id}</div>
					</div>
				{/if}
			</div>
			<div>
				<ul class="flex flex-col gap-4">
					{#each data.members as { name, user_id, is_owner }}
						<li class="border-sky-500 border-2 rounded px-2 py-1">
							<div>
								{name}
								{#if is_owner}
									<span>(Dueño)</span>
								{/if}
							</div>
							{#if data.isOwner && user_id !== self.id}
								<form action="/?removeFromTeam" class="bg-red-600 text-red-50">
									<input type="hidden" name="team-id" value={user_id} />
									<input type="hidden" name="user-id" value={user_id} />
									<button type="submit">Eliminar del equipo</button>
								</form>
							{/if}
						</li>
					{/each}
				</ul>

				{#if data.isOwner}
					<form use:enhance method="POST" class="contents" action="?/deleteTeam">
						<input type="hidden" name="team-id" value={data.team.team_id} />
						<button type="submit" class="bg-red-600 w-full text-red-50 mt-4 rounded text-center"
							>Eliminar equipo</button
						>
					</form>
				{/if}
			</div>
		{:else}
			<h1 class="text-3xl text-center">Asigna tu equipo</h1>
			<div class="grid md:grid-cols-2 mt-4 gap-2">
				<form use:enhance method="POST" class="border border-sky-600 roudned p-2" action="?/create">
					<h2 class="text-xl text-center">Crea un equipo</h2>
					<div class="flex-grow flex flex-col">
						<label for="team-name">Nombre del equipo</label>
						<input
							type="text"
							id="team-name"
							name="team-name"
							class="text-gray-700"
							placeholder="Equipo de CodeFest"
							required
							minlength="3"
							maxlength="50"
						/>
					</div>
					<button type="submit" class="bg-sky-600 text-sky-50 w-full mt-4">Crear equipo</button>
				</form>
				<form use:enhance method="POST" class="border border-sky-600 roudned p-2" action="?/join">
					<h2 class="text-xl text-center">Únete a uno existente</h2>
					<div class="flex-grow flex flex-col">
						<label for="team-id">Id del grupo</label>
						<input
							type="text"
							name="team-id"
							id="team-id"
							class="text-gray-700"
							placeholder="xxxx-xxxx-xxxx-xxxx"
							required
						/>
					</div>
					<button type="submit" class="bg-sky-600 text-sky-50 w-full mt-4">Unirse</button>
				</form>
			</div>
		{/if}
	</main>
</div>
