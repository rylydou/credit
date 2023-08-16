<script lang="ts">
	import type { AccountTransaction } from '$lib/models'
	import { account_name, currency_format, currency_format_signed } from '$lib/store'
	import Dayjs from 'dayjs'

	export let transaction = { summary: '', amount: 0.0 } as AccountTransaction

	let amount_input = '$10.00'
	$: amount_number = Number(amount_input.replace(/[^0-9.-]+/g, ''))
	let get_amount_number = () => amount_number

	let defualt_summary_format = new Date(Date.now()).toLocaleDateString(undefined, {
		weekday: 'long',
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	})

	$: {
		// let amount_number = get_amount_number()
		// amount_input = amount_input.replace(/[$+-]/g, '')
		// amount_input = (amount_number < 0 ? '-' : '+') + '$' + amount_input
	}

	function pretty_format() {
		let amount_number = get_amount_number()
		amount_input = $currency_format_signed.format(amount_number)
	}

	function change_sign(c: string) {
		if (amount_input.startsWith('-') || amount_input.startsWith('+')) {
			amount_input = amount_input.replace(/[-+]/, c)
			return
		}
		amount_input = c + amount_input
	}
</script>

<div class="fixed inset-0 z-50 flex flex-col items-center justify-end gap-2 p-4 bg-bg">
	<div class="relative flex flex-col max-w-sm w-full p-8 rounded-2xl bg-fg c-bg">
		<h1
			class="sticky z-100 font-bold h-16 text-center text-lg bg-gradient-(linear from-fg to-transparent)"
			>Transaction</h1
		>

		<div class="flex flex-col">
			<label class="sec">
				<span>Date</span>
				<input type="date" bind:value={transaction.date} />
			</label>
			<label class="sec">
				<span>Summary</span>
				<input
					type="text"
					inputmode="text"
					placeholder={defualt_summary_format}
					bind:value={transaction.summary}
				/>
			</label>
			<label class="sec">
				<span>Amount</span>
				<input type="text" inputmode="decimal" on:blur={pretty_format} bind:value={amount_input} />
			</label>
			<div class="sec">
				<div class="flex flex-row justify-stretch w-full h-12">
					<button
						class="radio-btn"
						class:active={amount_number > 0}
						on:click={() => change_sign('+')}>Income</button
					>
					<button
						class="radio-btn"
						class:active={amount_number < 0}
						on:click={() => change_sign('-')}>Expense</button
					>
				</div>
			</div>
		</div>
	</div>

	<div class="flex max-w-sm w-full h-16 gap-2 font-bold">
		<button class="flex justify-center items-center h-full px-6 bg-fg c-bg rounded-2xl">
			Cancel
		</button>
		<button class="flex justify-center items-center w-full h-full px-6 bg-fg c-bg rounded-2xl">
			Log transaction
		</button>
	</div>
</div>

<style lang="postcss">
	.sec {
		--apply: relative b-t-1 b-bg last:b-b-1
	}

	.sec > span {
		--apply: absolute -top-4 left-[50%] -translate-x-[50%] px-4 text-center bg-fg;
	}

	input {
		--apply: appearance-none w-full h-16 bg-transparent p-4
			placeholder:(c-bg opacity-50 text-center)
			focus:(outline outline-bg placeholder:opacity-0);
	}

	input[type='text'] {
		/* --apply: text-center
			focus:(text-left); */
	}

	input[inputmode='decimal'] {
		--apply: font-mono text-center text-2xl;
	}

	input[type='date'] {
		--apply: text-center;
	}

	.radio-btn {
		--apply: w-full bg-fg c-bg font-bold
			relative after:(content-[''] absolute -z-1 inset-0 bg-bg opacity-0);
	}
	.radio-btn:active {
		--apply: after:(opacity-25 transition-opacity duration-200 ease-out);
	}
	.radio-btn.active {
		--apply: c-fg
			after:(opacity-100 transition-opacity duration-0);
			transition: opacity 400ms;
	}
</style>
