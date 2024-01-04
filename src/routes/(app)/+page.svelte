<script lang="ts">
	import { createCollapsible } from '@melt-ui/svelte';

	const { open: open1, root: root1, content: content1, trigger: trigger1 } = createCollapsible();
	const { open: open2, root: root2, content: content2, trigger: trigger2 } = createCollapsible();
	const { open: open3, root: root3, content: content3, trigger: trigger3 } = createCollapsible();
	import ProjectCard from './ProjectCard.svelte';
</script>

<main class="py-24 px-2">
	<div class="mx-auto my-12 text-center">
		<h1
			class="font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 block"
		>
			<div class="text-7xl sm:text-9xl">CodeFest</div>
			<div class="text-5xl sm:text-8xl">UC 2023-2</div>
		</h1>
		<div class="text-center text-3xl sm:text-4xl mt-4 text-sky-200">20 a 22 de octubre</div>
	</div>

	<div class="opacity-80">
		<h2 class="mx-auto text-center text-sky-400 font-bold text-3xl mb-2">Auspiciado por</h2>
		<div class="h-16 flex items-center justify-center">
			<a href="https://www.buk.cl/quienes-somos" class="contents">
				<img src="/buk.png" alt="Logo de buk" class="h-full" />
			</a>
		</div>
	</div>

	<div class="text-center mx-auto max-w-2xl my-16">
		<h2 class="font-bold text-5xl text-sky-400 my-4">Acerca del evento</h2>
		<p class="text-xl text-gray-200 [text-wrap:balance]">
			CodeFest fue una hackathon de 48 horas para todos los estudiantes de la UC. La hackathon
			partió en el campus con un evento presencial con comida y charlas, en donde equipos crearon
			proyectos de software en una de las categorías disponibles.
		</p>
	</div>

	<div class="my-16 max-w-7xl mx-auto">
		<h2 class="text-center font-bold text-5xl text-sky-400 mb-2">Tracks y Categorías</h2>
		<p class="text-center mb-6 text-xl max-2w-xl mx-auto">
			Al participar, los equipos trabajaron en torno a los siguientes tracks:
		</p>

		<ul class="flex flex-col max-w-2xl mx-auto gap-2 px-4">
			<li melt={$root1} class="flex p-2 border border-green-400 gap-2 bg-green-950 rounded-md">
				<div
					class="bg-green-400 text-green-900 flex h-12 w-12 flex-shrink-0 rounded-lg items-center justify-center"
				>
					<svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" viewBox="0 0 512 512"
						><path
							fill="currentColor"
							d="M459.94 53.25a16.06 16.06 0 0 0-23.22-.56L424.35 65a8 8 0 0 0 0 11.31l11.34 11.32a8 8 0 0 0 11.34 0l12.06-12c6.1-6.09 6.67-16.01.85-22.38ZM399.34 90L218.82 270.2a9 9 0 0 0-2.31 3.93L208.16 299a3.91 3.91 0 0 0 4.86 4.86l24.85-8.35a9 9 0 0 0 3.93-2.31L422 112.66a9 9 0 0 0 0-12.66l-9.95-10a9 9 0 0 0-12.71 0Z"
						/><path
							fill="currentColor"
							d="M386.34 193.66L264.45 315.79A41.08 41.08 0 0 1 247.58 326l-25.9 8.67a35.92 35.92 0 0 1-44.33-44.33l8.67-25.9a41.08 41.08 0 0 1 10.19-16.87l122.13-121.91a8 8 0 0 0-5.65-13.66H104a56 56 0 0 0-56 56v240a56 56 0 0 0 56 56h240a56 56 0 0 0 56-56V199.31a8 8 0 0 0-13.66-5.65Z"
						/></svg
					>
				</div>
				<div class="w-full">
					<div class="text-2xl flex justify-between w-full text-green-100 leading-tight">
						<div>Herramienta Universitaria</div>
						<button melt={$trigger1}>
							<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
								><path
									fill="currentColor"
									d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
								/></svg
							>
						</button>
					</div>
					<p class="leading-tight text-green-50">
						Programa una herramienta que te pueda ayudar a estudiar u organizarte.
					</p>
					{#if $open1}
						<div melt={$content1} class="text-green-100 mt-2 mb-1 leading-snug flex flex-col gap-1">
							<p>
								El objetivo es que puedan desarrollar una herramienta que pueda ser usada para
								estudiar o cubrir otra necesidad universitaria. Piensa en algo que podrías
								automatizar o mantener un seguimiento en la universidad, considerando desde momentos
								de estudio hasta el día a día.
							</p>
						</div>
					{/if}
				</div>
			</li>
			<li melt={$root2} class="flex p-2 border border-purple-400 gap-2 bg-purple-950 rounded-md">
				<div
					class="bg-purple-400 text-purple-900 flex h-12 w-12 flex-shrink-0 rounded-lg items-center justify-center"
				>
					<svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" viewBox="0 0 512 512"
						><path
							fill="currentColor"
							d="M208 512a24.84 24.84 0 0 1-23.34-16l-39.84-103.6a16.06 16.06 0 0 0-9.19-9.19L32 343.34a25 25 0 0 1 0-46.68l103.6-39.84a16.06 16.06 0 0 0 9.19-9.19L184.66 144a25 25 0 0 1 46.68 0l39.84 103.6a16.06 16.06 0 0 0 9.19 9.19l103 39.63a25.49 25.49 0 0 1 16.63 24.1a24.82 24.82 0 0 1-16 22.82l-103.6 39.84a16.06 16.06 0 0 0-9.19 9.19L231.34 496A24.84 24.84 0 0 1 208 512Zm66.85-254.84ZM88 176a14.67 14.67 0 0 1-13.69-9.4l-16.86-43.84a7.28 7.28 0 0 0-4.21-4.21L9.4 101.69a14.67 14.67 0 0 1 0-27.38l43.84-16.86a7.31 7.31 0 0 0 4.21-4.21L74.16 9.79A15 15 0 0 1 86.23.11a14.67 14.67 0 0 1 15.46 9.29l16.86 43.84a7.31 7.31 0 0 0 4.21 4.21l43.84 16.86a14.67 14.67 0 0 1 0 27.38l-43.84 16.86a7.28 7.28 0 0 0-4.21 4.21l-16.86 43.84A14.67 14.67 0 0 1 88 176Zm312 80a16 16 0 0 1-14.93-10.26l-22.84-59.37a8 8 0 0 0-4.6-4.6l-59.37-22.84a16 16 0 0 1 0-29.86l59.37-22.84a8 8 0 0 0 4.6-4.6l22.67-58.95a16.45 16.45 0 0 1 13.17-10.57a16 16 0 0 1 16.86 10.15l22.84 59.37a8 8 0 0 0 4.6 4.6l59.37 22.84a16 16 0 0 1 0 29.86l-59.37 22.84a8 8 0 0 0-4.6 4.6l-22.84 59.37A16 16 0 0 1 400 256Z"
						/></svg
					>
				</div>
				<div class="w-full">
					<div class="flex justify-between text-2xl text-purple-100 leading-tight">
						<div>Inteligencia Artificial</div>
						<button melt={$trigger2}>
							<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
								><path
									fill="currentColor"
									d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
								/></svg
							>
						</button>
					</div>
					<p class="leading-tight text-purple-50">
						Usa inteligencia artificial de forma creativa, como GPT o clustering.
					</p>
					{#if $open2}
						<div
							melt={$content2}
							class="text-purple-100 mt-2 mb-1 leading-snug flex flex-col gap-1"
						>
							<p>
								El objetivo es que puedan explorar y utilizar inteligencia artificial de una forma
								creativa para solucionar el problema que deseen. Te recomendamos revisar la
								grabación de las <a
									class="underline"
									href="https://www.youtube.com/playlist?list=PLBdhqsuZpaisyDguWHkI7zQzVl-gmoPxB"
									>charlas de IA</a
								> que ha hecho Open Source UC.
							</p>
						</div>
					{/if}
				</div>
			</li>
			<li melt={$root3} class="flex p-2 border border-orange-400 gap-2 bg-orange-950 rounded-md">
				<div
					class="bg-orange-400 text-orange-900 flex h-12 w-12 flex-shrink-0 rounded-lg items-center justify-center"
				>
					<svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" viewBox="0 0 512 512"
						><circle cx="152" cy="184" r="72" fill="currentColor" /><path
							fill="currentColor"
							d="M234 296c-28.16-14.3-59.24-20-82-20c-44.58 0-136 27.34-136 82v42h150v-16.07c0-19 8-38.05 22-53.93c11.17-12.68 26.81-24.45 46-34Z"
						/><path
							fill="currentColor"
							d="M340 288c-52.07 0-156 32.16-156 96v48h312v-48c0-63.84-103.93-96-156-96Z"
						/><circle cx="340" cy="168" r="88" fill="currentColor" /></svg
					>
				</div>
				<div class="w-full">
					<div class="flex justify-between text-2xl text-orange-100 leading-tight">
						<div>Modo Multijugador</div>
						<button melt={$trigger3}>
							<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
								><path
									fill="currentColor"
									d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
								/></svg
							>
						</button>
					</div>
					<p class="leading-tight text-orange-50">
						Crea algo con participación de varias personas, como juegos y herramientas.
					</p>
					{#if $open3}
						<div melt={$content3} class="text-orange-100 mt-2 mb-1">
							<p class="leading-snug">
								El objetivo es que creen un sistema que permita la participación de varias personas,
								no necesariamente en tiempo real. Puedes sockets, WebSockets, WebRTC/PeerJS, o
								simplemente tener una base de datos que permita la participación de varias personas
								en torno a algo (como un juego).
							</p>
						</div>
					{/if}
				</div>
			</li>
		</ul>
		<p class="text-center my-6 max-w-xl mx-auto text-xl">
			Además, todos participarán en las siguientes categorías:
		</p>
		<ul class="max-w-2xl flex flex-col gap-4 mx-auto px-2">
			<li class="border-2 rounded px-2 py-2 bg-gray-900 border-gray-600 text-gray-200">
				<div class="text-lg">Mejor presentación</div>
				Para el proyecto que tenga el mejor demo, readme, y código.
			</li>
			<li class="border-2 rounded px-2 py-2 bg-gray-900 border-gray-600 text-gray-200">
				<div class="text-lg">Mejor accesibilidad y usabilidad</div>
				Para el proyecto que es más fácil y ágil de usar.
			</li>
			<li class="border-2 rounded px-2 py-2 bg-gray-900 border-gray-600 text-gray-200">
				<div class="text-lg">Premio Buk: Mayor impacto y más prometedor</div>
				Para el proyecto que desarrolle una propuesta con el mayor valor e impacto potencial.
			</li>
		</ul>
	</div>

	<div class="text-center mx-auto max-w-7xl">
		<h2 class="font-bold text-5xl text-sky-400 my-8" id="winners">
			<a href="#winners">Ganadores </a>
		</h2>
		<ul class="grid gap-4 grid-cols-1 md:grid-cols-2 px-2">
			<ProjectCard
				name="Calendarización de programas"
				github="https://github.com/gustavopalaciosc/proyecto-equipo-rocklet"
				img="/projects/cal-programas.png"
				members={[
					{ name: 'Ignacio Villanueva', user: 'ignaciovilla' },
					{ name: 'Domingo2000', user: 'domingo2000' },
					{ name: 'Gustavo Palacios', user: 'gustavopalaciosc' }
				]}
			>
				<ul slot="prizes" class="prizes">
					<li class="border-purple-400 bg-purple-950 text-purple-100">
						Track Inteligencia Artificial
					</li>
					<li class="border-blue-400 bg-blue-950 text-blue-100">
						Premio Buk: Mayor impacto y más prometedor
					</li>
				</ul>

				App web para obtener las evaluaciones y fechas de los programas de cursos
			</ProjectCard>

			<ProjectCard
				name="CupoSmart"
				github="https://github.com/diegocostares/CupoSmart"
				img="/projects/cuposmart.png"
				members={[
					{ name: 'Manuel Blanco', user: 'MBlancoC' },
					{ name: 'Diego Costa R.', user: 'diegocostares' },
					{ name: 'Vasco Antonio Varas', user: 'Vasco-Varas' }
				]}
			>
				<ul slot="prizes" class="prizes">
					<li class="border-green-400 bg-green-950 text-green-100">
						Track Herramienta Universitaria
					</li>
				</ul>
				Optimizador del orden en el que uno inscribe los ramos
			</ProjectCard>

			<ProjectCard
				name="nerdy.chat"
				github="https://github.com/MathItYT/nerdy.chat"
				img="/projects/nerdy.chat.png"
				members={[{ name: 'Benjamín Ubilla', user: 'MathItYT' }]}
			>
				<ul slot="prizes" class="prizes">
					<li class="border-orange-400 bg-orange-950 text-orange-100">Track Modo Multijugador</li>
				</ul>
				Chat para hablar con otros usuarios en tiempo real
			</ProjectCard>

			<ProjectCard
				name="electric"
				github="https://github.com/NatC18/electric"
				img="https://github.com/NatC18/electric/blob/main/Assets/random.gif?raw=true"
				members={[
					{ name: 'Juan Enrique', user: 'juanenriquehurtado' },
					{ name: 'Nati', user: 'NatC18' },
					{ name: 'Etienne Cabiac', user: 'eti144' },
					{ name: 'Rafael Kaempfer', user: 'Rafoxxa' }
				]}
			>
				<ul slot="prizes" class="prizes">
					<li class="border-sky-400 bg-sky-950 text-sky-100">Categoría Mejor Presentación</li>
				</ul>
				Simulador de comportamiento de un electron en un campo eléctrico usando Processing
			</ProjectCard>
		</ul>
	</div>
</main>

<style>
	main {
		background-color: theme('colors.gray.950');
		background-image: linear-gradient(#7dd4fc17 1px, transparent 1px),
			linear-gradient(90deg, #7dd4fc17 1px, transparent 1px);
		background-size: 17px 17px, 17px 17px;
		background-position: center center;
	}
	.prizes {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		font-size: theme('fontSize.base');
		gap: theme('spacing.1');
	}
	.prizes > li {
		border-width: 1px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		padding-left: theme('spacing.2');
		padding-right: theme('spacing.2');
		border-radius: 9999px;
	}
</style>
