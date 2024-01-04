<script lang="ts">
	export let name: string;
	export let github: string;
	export let members: Array<{ name: string; user: string }>;
	export let img: string;
</script>

<li
	class=" border-gray-800 bg-gray-900 border-2 rounded-md shadow-sm shadow-gray-800 flex flex-col overflow-clip"
>
	<img src={img} alt="" class="h-24 object-cover border-b-2 border-gray-800" />
	<div class="p-2 flex flex-col gap-4 flex-grow">
		<p class="font-semibold text-3xl leading-none">{name}</p>
		<slot name="prizes" />
		<p
			class="text-lg text-gray-300 flex-grow flex justify-center items-center balanca [text-wrap:balance] leading-tight"
		>
			<slot />
		</p>
		<ul class="flex gap-x-1.5 gap-y-1 flex-wrap items-center justify-center">
			{#each members as member (member.user)}
				<li class="contents">
					<a
						href={`https://github.com/${member.user}`}
						class="text-sm text-gray-300 font-semibold rounded-full bg-gray-800 border-gray-600 border-2 flex items-center gap-2 pr-3 hover:underline"
					>
						<img
							src={`https://github.com/${member.user}.png`}
							alt={`Foto de ${member.name}`}
							class="rounded-full h-6 w-6 outline-2 outline outline-gray-600 block"
						/>
						{member.name}
					</a>
				</li>
			{/each}
		</ul>
		<a
			href={github}
			class="border border-gray-500 bg-gray-800 text-gray-300 rounded py-1 font-bold hover:underline"
		>
			Link al repositorio
		</a>
	</div>
</li>
