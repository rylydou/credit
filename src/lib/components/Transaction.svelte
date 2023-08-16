<script lang="ts">
	import type { AccountTransaction } from '$lib/models'
	import { currency_format_signed } from '$lib/store'

	export let transaction: AccountTransaction

	$: segs = $currency_format_signed.format(transaction.amount).split('.', 2)
	$: whole = segs[0]
	$: fract = segs[1]
</script>

<div class="flex justify-between items-start w-full min-h-8">
	<div class="">{transaction.summary}</div>
	<div class="font-mono">
		<span>{whole}</span><span class="text-xs">.{fract}</span>
	</div>
</div>
