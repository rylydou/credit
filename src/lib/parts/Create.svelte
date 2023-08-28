<script lang="ts">
	import { transaction_fallback_date_format } from '$lib/consts'
	import type { AccountTransaction } from '$lib/models'
	import { default_as_income, format_signed, next_id, transactions } from '$lib/store/account'
	import { createEventDispatcher } from 'svelte'

	const dispatcher = createEventDispatcher<{ submit: AccountTransaction }>()

	let _transaction: AccountTransaction = {
		id: -1,
		amount: 0.0,
	}
	let is_create_mode: boolean

	let dialog_element: HTMLDialogElement
	let amount_input_element: HTMLInputElement
	export function open(transaction?: AccountTransaction) {
		dialog_element.showModal()
		amount_input_element.focus()

		if (transaction == null) {
			is_create_mode = true
			_transaction = {
				id: $next_id,
				amount: 0.0,
			}
			amount_input = '$'
		} else {
			is_create_mode = false
			_transaction = transaction

			amount_input = $format_signed.format(transaction.amount)
		}
	}

	function submit() {
		_transaction.amount = Math.abs(amount_number) * (is_income ? 1 : -1)
		if (is_create_mode) {
			$next_id++
			_transaction.date = new Date()
			$transactions.unshift(_transaction)
		}
		$transactions = $transactions

		dialog_element.close()
		dispatcher('submit')
	}

	let amount_input = ''
	$: is_income = $default_as_income ? !amount_input.startsWith('-') : amount_input.startsWith('+')

	$: amount_number = Number(amount_input.replace(/[^0-9.]+/g, '')) * (is_income ? 1 : -1) || 0
	let get_amount_number = () => amount_number

	let default_summary = new Date().toLocaleDateString(undefined, transaction_fallback_date_format)

	function pretty_format() {
		// Take note of the sign to reuse it later
		const has_sign = /^[+-]/.test(amount_input)
		const sign = has_sign ? amount_input.charAt(0) : ''
		let amount_number = get_amount_number()
		// If the number is zero then don't pretty format because that would be pointless
		if (amount_number == 0) {
			amount_input = sign + '$'
			return
		}
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

	function delete_transaction() {
		$transactions.splice($transactions.indexOf(_transaction), 1)
		$transactions = $transactions
		dialog_element.close()
	}
</script>

<!-- overflow-y-auto fixed inset-0 z-50 flex flex-col items-center justify-end gap-2 p-4 bg-bg -->
<dialog
	bind:this={dialog_element}
	class="flex-col justify-end gap-2 h-full p-0 mb-0 max-w-sm w-full p-4 bg-transparent backdrop:(c-bg bg-current)"
	aria-label="Edit transaction"
>
	<div class="relative flex flex-col max-w-sm w-full p-8 rounded-4 bg-fg c-bg">
		<h1
			class="sticky z-100 font-bold h-16 text-center text-lg bg-gradient-(linear from-fg to-transparent)"
		>
			{#if is_create_mode}
				New transaction
			{:else}
				Edit transaction
			{/if}
		</h1>

		<div class="flex flex-col">
			<!-- <label class="sec">
				<span>Date</span>
				<input type="date" bind:value={_transaction.date} />
			</label> -->

			<label class="sec">
				<span>Summary</span>
				<input
					type="text"
					inputmode="text"
					placeholder={default_summary}
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
					bind:this={amount_input_element}
				/>
				<div class="flex flex-row justify-stretch w-full h-12 mt-2">
					<button class="radio-btn" class:active={is_income} on:click={() => change_sign('+')}
						>Income</button
					>
					<button class="radio-btn" class:active={!is_income} on:click={() => change_sign('-')}
						>Expense</button
					>
				</div>
			</label>
		</div>
	</div>

	<div class="flex flex-row-reverse max-w-sm w-full min-h-12 h-16 gap-2 font-bold">
		<button
			class="flex justify-center items-center w-full h-full px-6 bg-fg c-bg rounded-4"
			on:click={submit}
		>
			{#if is_create_mode}
				Log transaction
			{:else}
				Update transaction
			{/if}
		</button>

		{#if is_create_mode}
			<button
				class="flex justify-center items-center h-full px-6 bg-fg c-bg rounded-4"
				on:click={() => dialog_element.close()}
			>
				Cancel
			</button>
		{:else}
			<button
				class="flex justify-center items-center h-full px-4 bg-fg c-bg rounded-4"
				title="Delete transaction"
				on:click={delete_transaction}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="32"
					height="32"
					viewBox="0 0 24 24"
					aria-label="Trash icon"
					><path
						fill="currentColor"
						d="M7 21q-.825 0-1.413-.588T5 19V6q-.425 0-.713-.288T4 5q0-.425.288-.713T5 4h4q0-.425.288-.713T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5q0 .425-.288.713T19 6v13q0 .825-.588 1.413T17 21H7ZM7 6v13h10V6H7Zm2 10q0 .425.288.713T10 17q.425 0 .713-.288T11 16V9q0-.425-.288-.713T10 8q-.425 0-.713.288T9 9v7Zm4 0q0 .425.288.713T14 17q.425 0 .713-.288T15 16V9q0-.425-.288-.713T14 8q-.425 0-.713.288T13 9v7ZM7 6v13V6Z"
					/></svg
				>
			</button>
		{/if}
	</div>
</dialog>
