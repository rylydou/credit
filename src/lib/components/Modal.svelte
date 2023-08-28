<script lang="ts">
	export let title = 'Dialog'

	let dialog_element: HTMLDialogElement
</script>

<dialog
	bind:this={dialog_element}
	class="flex-col justify-end gap-2 h-full p-0 mb-0 max-w-sm w-full p-4 bg-transparent backdrop:(c-bg bg-current)"
	aria-label={title}
>
	<div class="relative flex flex-col max-w-sm w-full p-8 rounded-4 bg-fg c-bg">
		<h1
			class="sticky z-100 font-bold h-16 text-center text-lg bg-gradient-(linear from-fg to-transparent)"
		>
			<slot name="title">
				{title}
			</slot>
		</h1>

		<div class="flex flex-col">
			<slot />
		</div>
	</div>

	<div class="flex flex-row-reverse max-w-sm w-full min-h-12 h-16 gap-2 font-bold">
		<slot name="buttons" />
	</div>
</dialog>
