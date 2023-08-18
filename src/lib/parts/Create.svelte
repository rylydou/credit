<script lang="ts">
	import type { AccountTransaction } from '$lib/models'
	import { format_signed } from '$lib/store'
	import { createEventDispatcher } from 'svelte'

	const dispatcher = createEventDispatcher<{ submit: AccountTransaction }>()

	let _transaction: AccountTransaction = {
		summary: '',
		amount: 0.0,
	}
	let is_create_mode: boolean

	let dialog: HTMLDialogElement
	export function open(transaction?: AccountTransaction) {
		if (transaction == null) {
			is_create_mode = true
			_transaction = {
				summary: '',
				amount: 0.0,
				date: new Date(),
			}
			amount_input = '$'
		} else {
			is_create_mode = false
			_transaction = transaction
			amount_input = transaction.amount.toString()
			pretty_format()
		}

		dialog.showModal()
	}

	let amount_input = ''
	$: amount_number = Number(amount_input.replace(/[^0-9.-]+/g, ''))
	let get_amount_number = () => amount_number

	let defualt_summary_format = new Date(Date.now()).toLocaleDateString(undefined, {
		weekday: 'long',
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	})

	function pretty_format() {
		let amount_number = get_amount_number()
		amount_input = $format_signed.format(amount_number)
	}

	function change_sign(c: string) {
		// It should be impossible to press the button without blurring the
		// input an thus calling pretty format_first() but just in case...
		if (/^[+-]/.test(amount_input)) {
			amount_input = c + amount_input.substring(1)
			return
		}
		amount_input = c + amount_input
	}
</script>

<!-- overflow-y-auto fixed inset-0 z-50 flex flex-col items-center justify-end gap-2 p-4 bg-bg -->
<dialog
	bind:this={dialog}
	class="flex-col justify-end gap-2 h-full p-0 bg-transparent backdrop:(c-bg bg-current)"
>
	<div class="relative flex flex-col max-w-sm w-full p-8 rounded-2xl bg-fg c-bg">
		<h1
			class="sticky z-100 font-bold h-16 text-center text-lg bg-gradient-(linear from-fg to-transparent)"
		>
			Transaction
		</h1>

		<div class="flex flex-col">
			<label class="sec">
				<span>Date</span>
				<input type="date" bind:value={_transaction.date} />
			</label>
			<label class="sec">
				<span>Summary</span>
				<input
					type="text"
					inputmode="text"
					placeholder={defualt_summary_format}
					bind:value={_transaction.summary}
				/>
			</label>
			<label class="sec">
				<span>Amount</span>
				<input
					type="text"
					inputmode="decimal"
					on:blur={pretty_format}
					bind:value={amount_input}
					autofocus
				/>
				<div class="flex flex-row justify-stretch w-full h-12 mt-2">
					<button
						class="radio-btn"
						class:active={amount_input.startsWith('+')}
						on:click={() => change_sign('+')}>Income</button
					>
					<button
						class="radio-btn"
						class:active={amount_input.startsWith('-')}
						on:click={() => change_sign('-')}>Expense</button
					>
				</div>
			</label>
		</div>
	</div>

	<div class="flex max-w-sm w-full min-h-12 h-16 gap-2 font-bold">
		<button
			class="flex justify-center items-center h-full px-6 bg-fg c-bg rounded-2xl"
			on:click={() => dialog.close()}
		>
			Cancel
		</button>
		<button
			class="flex justify-center items-center w-full h-full px-6 bg-fg c-bg rounded-2xl"
			on:click={() => dispatcher('submit')}
		>
			{#if is_create_mode}
				Log transaction
			{:else}
				Update transaction
			{/if}
		</button>
	</div>
</dialog>

<style lang="postcss">
	dialog:modal {
		display: flex;
	}

	.sec {
		/* b-t-1 b-bg last:b-b-1 */
		--apply: relative
			before:(content-[''] absolute left-2 right-2 -top-1px h-1px bg-bg)
	}

	.sec > span {
		--apply: absolute -top-4 left-[50%] -translate-x-[50%] px-4 text-center bg-fg
	}

	input {
		--apply: appearance-none w-full h-16 p-4 bg-transparent rounded-xl
			placeholder:(c-bg opacity-50 text-center)
			focus-within:(outline outline-4 outline-bg -outline-offset-2 placeholder:opacity-0)
	}

	input[type='text'] {
		/* --apply: text-center
			focus:(text-left) */
	}

	input[inputmode='decimal'] {
		--apply: font-mono text-center text-2xl
	}

	input[type='date'] {
		--apply: text-center
	}

	.radio-btn {
		--apply: w-full bg-transparent font-bold
			relative after:(content-[''] absolute -z-1 inset-0 rounded-xl bg-bg opacity-0)
	}

	.radio-btn:active {
		--apply: after:(opacity-25 transition-opacity duration-200 ease-out)
	}

	.radio-btn.active {
		--apply: c-fg
			after:(opacity-100 transition-opacity duration-0)
	}
</style>
