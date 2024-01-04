<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { createLabel, createToaster } from '@melt-ui/svelte';
	import { addToast } from '../Toaster.svelte';

	export let data;

	onMount(() => {
		if (!$page.data.session) $page.data.loginWithGitHub();
	});

	const label = createLabel();
	const { form, enhance } = superForm(data.form!, {
		onResult(event) {
			console.log(event);
			if (event.result.type === 'success') {
				addToast({
					data: { title: 'Datos guardados' },
					closeDelay: 3000
				});
			}
		}
	});
</script>

<div class="py-8 px-2">
	<main class="max-w-md mx-auto bg-gray-900 py-6 px-4 rounded-lg">
		<h1 class="font-bold text-xl text-sky-200 my-4">Necesitamos completar algunos datos</h1>
		<form method="POST" use:enhance class="grid grid-cols-1 gap-y-8">
			<div>
				<label for="name" class="block" use:label>Nombre</label>
				<input
					type="text"
					name="name"
					id="name"
					class="rounded-md bg-gray-800 w-full"
					bind:value={$form.name}
				/>
			</div>

			<div>
				<label for="email" class="block" use:label>E-mail</label>
				<input
					type="email"
					name="email"
					id="email"
					class="rounded-md bg-gray-800 w-full"
					bind:value={$form.email}
				/>
			</div>

			<div>
				<label for="gen" class="block" use:label>Generación (Año) de Ingreso</label>
				<input
					type="number"
					min="2000"
					max="2024"
					name="gen"
					id="gen"
					class="rounded-md bg-gray-800 w-full"
					bind:value={$form.gen}
				/>
			</div>

			<div>
				<label for="degree" class="block">Carrera</label>
				<select name="degree" class="rounded-md bg-gray-800 w-full" bind:value={$form.degree}>
					<option>Ingeniería Major DCC</option>
					<option>Ingeniería Otro Major</option>
					<option>Licenciatura de Computación</option>
					<option>Otra carrera relacionada a Ingeniería</option>
					<option>Otra carrera relacionada a Diseño</option>
					<option>Otra carrera</option>
				</select>
			</div>

			<div>
				<label for="pizza_type" class="block">Tipo de Pizza</label>
				<select name="pizza_type" class="rounded-md bg-gray-800 w-full">
					<option>Pepperoni</option>
					<option>Queso</option>
					<option>Veggie</option>
					<option>Sin pizza</option>
				</select>
			</div>

			<div>
				<div>Link a GitHub (obtenido por login)</div>
				<div
					class="form-input rounded-md bg-gray-800 text-gray-400 w-full block cursor-not-allowed"
				>
					<a
						href={`https://github.com/${$page.data.session?.user.user_metadata.user_name}`}
						class="underline"
					>
						https://github.com/{$page.data.session?.user.user_metadata.user_name}
					</a>
				</div>
			</div>

			<div>
				<label for="linkedin" class="block" use:label>Link a LinkedIn (opcional)</label>
				<input
					type="url"
					name="linkedin"
					id="linkedin"
					class="rounded-md bg-gray-800 w-full"
					placeholder="https://www.linkedin.com/in/<tu-usuario>"
					bind:value={$form.linkedin}
				/>
			</div>

			<div>
				<label for="linkedin" class="block" use:label>Notas adicionales</label>
				<textarea
					name="notes"
					id="notes"
					class="rounded-md bg-gray-800 w-full"
					placeholder="Añade cualquier información que creas relevante"
					bind:value={$form.notes}
				/>
			</div>

			<div>
				<label for="accepts_to_be_contacted_by_companies"
					>Aceptas ser contactados por nuestros sponsors</label
				>
				<input
					type="checkbox"
					name="accepts_to_be_contacted_by_companies"
					bind:checked={$form.accepts_to_be_contacted_by_companies}
				/>
			</div>

			<div class="text-center">
				Al registrarte, aceptas el
				<a href="https://ccc.ing.puc.cl/codigo-de-conducta/" class="underline text-sky-200">
					código de conducta del Capítulo de Ciencia de la Computación
				</a>
			</div>

			<button class="text-sky-50 bg-sky-600 py-1 rounded">Guardar</button>
		</form>
	</main>
</div>
