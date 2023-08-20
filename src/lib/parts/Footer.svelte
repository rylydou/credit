<script lang="ts">
	import { account_name } from '$lib/store/account'
	import { createEventDispatcher } from 'svelte'

	const dispatcher = createEventDispatcher<{ create: void }>()
</script>

<footer
	class="fixed bottom-0 z-10 flex justify-center items-end max-w-sm w-full h-32 p-4 font-black bg-gradient-(linear from-transparent to-bg) pointer-events-none"
>
	<div class="flex flex-row-reverse w-full h-16 gap-2">
		<button
			on:click={() => dispatcher('create')}
			class="flex justify-center items-center h-full min-w-16 bg-fg c-bg rounded-4 pointer-events-auto"
			title="Add transaction"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="32"
				height="32"
				viewBox="0 0 24 24"
				aria-label="Add icon"
				><path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2v-6Z" /></svg
			>
		</button>

		<button
			class="flex justify-center items-center h-full w-full bg-fg c-bg rounded-4 pointer-events-auto"
			title="Change account"
		>
			{$account_name}
		</button>
	</div>
</footer>
