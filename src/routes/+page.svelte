<script lang="ts">
	import { Transaction } from '$lib/components'
	import { Create, Footer, Header } from '$lib/parts'
	import { account_name, initialize, transactions } from '$lib/store/account'
	import { onMount, tick } from 'svelte'

	let create_dialog: Create

	onMount(async () => {
		await tick()
		await initialize()
	})
</script>

<svelte:head>
	<title>{$account_name} - Credit</title>
</svelte:head>

<Header />
<Footer on:create={() => create_dialog.open()} />
<Create bind:this={create_dialog} />

<!-- It might be better to use Array.prototype.reverse() instead of
	flex-row-reverse because accessibility is better -->
<div class="flex flex-col items-center pt-16 pb-32">
	{#each $transactions.reverse() as transaction (transaction.id)}
		<Transaction {transaction} on:click={() => create_dialog.open(transaction)} />
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
