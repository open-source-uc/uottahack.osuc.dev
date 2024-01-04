<script>
    export let time = '';
    export let description = '';
    export let subdescription = '';
    export let color = 'bg-red-400';
    export let title = '';
</script>

{#if title}
    <span class="text-white text-sm sm:text-base relative inline-block date uppercase font-medium tracking-widest">{title}</span>
{/if}
<div class="flex mb-4 mt-2">
    <div class="w-2/12 sm:w-3/12">
        <span class="text-sm text-gray-400 block">{time}</span>
    </div>
    <div class="w-1/12">
        <span class="{color} h-2 w-2 rounded-full block mt-2" />
    </div>
    <div class="w-7/12 lg:w-9/12">
        <span class="text-sm font-semibold block">{description}</span>
        {#if subdescription}
            <span class="text-sm text-gray-500 block">{subdescription}</span>
        {/if}
    </div>
</div>
