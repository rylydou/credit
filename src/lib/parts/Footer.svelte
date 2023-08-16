<script lang="ts">
	import { account_name } from '$lib/store'
</script>

<div
	class="fixed bottom-0 z-10 flex justify-center items-end max-w-sm w-full h-32 p-4 font-black bg-gradient-(linear from-transparent to-bg) pointer-events-none"
>
	<div class="flex w-full h-16 gap-2">
		<button
			class="flex justify-center items-center h-full w-full bg-fg c-bg rounded-2xl pointer-events-auto"
		>
			{$account_name}
		</button>
		<button
			class="flex justify-center items-center h-full min-w-16 bg-fg c-bg rounded-2xl pointer-events-auto"
		>
			<div class="i-material-symbols-add w-6 h-6" />
		</button>
	</div>
</div>
