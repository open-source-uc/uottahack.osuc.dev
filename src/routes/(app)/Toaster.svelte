<script lang="ts" context="module">
	export type ToastData = {
		title: string;
	};

	const toaster = createToaster<ToastData>();
	const { content, close, toasts, title, portal } = toaster;

	export const addToast = toaster.addToast;
</script>

<script lang="ts">
	import { createToaster, createProgress } from '@melt-ui/svelte';
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
</script>

<div class="fixed bottom-0 right-0 z-50 m-4 flex flex-col items-end gap-2" use:portal>
	{#each $toasts as { id, data } (id)}
		<div
			melt={$content(id)}
			animate:flip={{ duration: 500 }}
			in:fly={{ duration: 150, x: '100%' }}
			out:fly={{ duration: 150, x: '100%' }}
			class="rounded-lg bg-gray-800 text-white shadow-md"
		>
			<div
				class="relative flex w-[24rem] max-w-[calc(100vw-2rem)] items-center justify-between gap-4 p-5"
			>
				<div>
					<h3 melt={$title(id)} class="flex items-center gap-2 font-semibold">
						{data.title}
					</h3>
				</div>
				<button melt={$close(id)} class="text-red-500">Cerrar</button>
			</div>
		</div>
	{/each}
</div>
