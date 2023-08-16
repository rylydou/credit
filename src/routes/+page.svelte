<script lang="ts">
	import { Transaction } from '$lib/components'
	import { Header, Footer } from '$lib/parts'
	import Create from '$lib/parts/Create.svelte'
	import { transactions } from '$lib/store'
</script>

<Header />
<Footer />
<Create />

<div class="flex flex-col items-center px-6 pt-16 pb-32">
	{#each $transactions as transaction}
		<Transaction {transaction} />
	{/each}
</div>

<style lang="postcss">
	:global(html) {
		--apply: overscroll-none flex flex-col items-center;
	}

	:global(body) {
		--apply: relative overscroll-none max-w-sm w-full;
	}
</style>
