<script lang="ts">
	import { transaction_fallback_date_format } from '$lib/consts'
	import type { AccountTransaction } from '$lib/models'
	import { format_point, format_signed } from '$lib/store/account'
	import { createEventDispatcher } from 'svelte'

	const dispatcher = createEventDispatcher<{ click: void }>()

	export let transaction: AccountTransaction

	$: segs = $format_signed.format(transaction.amount).split($format_point, 2)
	$: whole = segs[0]
	$: fract = segs[1]
</script>

<button
	class="flex justify-between items-start w-full px-6 py-1"
	on:click={() => dispatcher('click')}
	{...$$restProps}
>
	<div>
		{transaction.summary ||
			transaction.date?.toLocaleDateString(undefined, transaction_fallback_date_format) ||
			'Transaction'}
	</div>
	<div class="font-mono">
		<span>{whole}</span><span class="text-xs">.{fract}</span>
	</div>
</button>
